/**
 * dsh-card-workbench — Host half.
 *
 * A card-oriented butler for the Harness Web UI. The Host owns the job board,
 * the worker Sessions, the stall watchdog and the verification loop; the Client
 * half is only the card surface and the intake form.
 */

import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs'
import { BoardStore } from './lib/store.js'
import { Butler } from './lib/engine.js'
import { ExecutionRuntime, DEFAULT_INTERVAL_MS } from './lib/executor.js'
import { createModelRunner } from './lib/model.js'
import { registerRoutes } from './lib/server.js'
import { booleanOr, clamp, positiveInt } from './lib/util.js'

/** Services the engine cannot work without. */
export const inject = ['webServer', 'sessionController', 'llm', 'sessions', 'agents', 'tools']

export const DEFAULTS = {
  maxCards: 6,
  // Runtime execution slots. The measured highest stable concurrency is 8
  // (see 并发能力评估.md); the engineering default stays at 4 to leave room for
  // verification, rework and provider rate limits. Raising this to 8 is a
  // supported configuration change, not a code change.
  maxConcurrency: 4,
  // Verification runs in its own queue and never occupies an execution slot.
  maxVerifications: 2,
  stallMs: 600_000,
  // A tool call is allowed to run longer than a quiet turn before the watchdog
  // treats it as stalled (builds, test suites, large scans).
  toolStallMs: 1_800_000,
  maxStalls: 3,
  maxAttempts: 5,
  maxFixRounds: 2,
  maxGapRounds: 2,
  // Global execution heartbeat. It runs in the Host process, independently of
  // any page, so a mounted workbench is never the thing that drives cards.
  schedulerIntervalMs: DEFAULT_INTERVAL_MS,
  // The adoptable-session inventory opens cold Session logs. It must not run on
  // every status poll; the workbench fetches it through /api/sessions instead.
  sessionsTtlMs: 30_000,
  llmTimeoutMs: 120_000,
  fullAccess: false,
  dataDir: null,
  provider: null,
  model: null,
}

export function normalizeConfig(raw) {
  const input = raw && typeof raw === 'object' ? raw : {}
  return {
    maxCards: positiveInt(input.maxCards, DEFAULTS.maxCards, 20),
    maxConcurrency: positiveInt(input.maxConcurrency, DEFAULTS.maxConcurrency, 8),
    maxVerifications: positiveInt(input.maxVerifications, DEFAULTS.maxVerifications, 4),
    stallMs: positiveInt(input.stallMs, DEFAULTS.stallMs, 24 * 60 * 60 * 1000),
    toolStallMs: positiveInt(input.toolStallMs, DEFAULTS.toolStallMs, 24 * 60 * 60 * 1000),
    maxStalls: positiveInt(input.maxStalls, DEFAULTS.maxStalls, 10),
    maxAttempts: positiveInt(input.maxAttempts, DEFAULTS.maxAttempts, 12),
    maxFixRounds: positiveInt(input.maxFixRounds, DEFAULTS.maxFixRounds, 6),
    maxGapRounds: positiveInt(input.maxGapRounds, DEFAULTS.maxGapRounds, 5),
    schedulerIntervalMs: clamp(
      positiveInt(input.schedulerIntervalMs, DEFAULTS.schedulerIntervalMs, 60_000),
      200,
      10_000,
    ),
    sessionsTtlMs: clamp(
      positiveInt(input.sessionsTtlMs, DEFAULTS.sessionsTtlMs, 600_000),
      1_000,
      600_000,
    ),
    llmTimeoutMs: positiveInt(input.llmTimeoutMs, DEFAULTS.llmTimeoutMs, 10 * 60 * 1000),
    fullAccess: booleanOr(input.fullAccess, DEFAULTS.fullAccess),
    dataDir: typeof input.dataDir === 'string' && input.dataDir.trim() ? input.dataDir.trim() : null,
    provider: typeof input.provider === 'string' && input.provider.trim() ? input.provider.trim() : null,
    model: typeof input.model === 'string' && input.model.trim() ? input.model.trim() : null,
  }
}

const CONFIG_LIMITS = {
  maxCards: ['最大拆卡数', 1, 20],
  maxConcurrency: ['最大并发执行数', 1, 8],
  maxVerifications: ['最大并行核对数', 1, 4],
  stallMs: ['卡顿判定时间', 1_000, 24 * 60 * 60 * 1000],
  toolStallMs: ['工具执行宽限', 1_000, 24 * 60 * 60 * 1000],
  maxStalls: ['最大自动续跑次数', 1, 10],
  maxAttempts: ['最大派单尝试次数', 1, 12],
  maxFixRounds: ['最大返工轮数', 1, 6],
  maxGapRounds: ['最大补卡轮数', 1, 5],
  schedulerIntervalMs: ['调度心跳间隔', 200, 10_000],
  sessionsTtlMs: ['会话清单缓存', 1_000, 600_000],
  llmTimeoutMs: ['模型调用超时', 5_000, 600_000],
}

export function validateConfigPatch(patch) {
  const input = patch && typeof patch === 'object' ? patch : {}
  for (const [key, [label, min, max]] of Object.entries(CONFIG_LIMITS)) {
    if (!Object.prototype.hasOwnProperty.call(input, key)) continue
    const value = input[key]
    const number = typeof value === 'number' ? value : Number(value)
    if (!Number.isFinite(number)) {
      throw new Error(`${label}必须是数字`)
    }
    if (number < min || number > max) {
      throw new Error(`${label}必须在 ${min} 到 ${max} 之间`)
    }
  }
  if (Object.prototype.hasOwnProperty.call(input, 'fullAccess') && typeof input.fullAccess !== 'boolean') {
    throw new Error('最高权限必须是布尔值')
  }
  for (const [key, label] of [['provider', '模型服务商'], ['model', '模型名称']]) {
    if (Object.prototype.hasOwnProperty.call(input, key) && typeof input[key] !== 'string') {
      throw new Error(`${label}必须是文本`)
    }
  }
  return true
}

function detectWorkspaceCwd(ctx) {
  try {
    let best = null
    for (const session of ctx.sessions.list()) {
      const cwd = session.header?.cwd
      if (!cwd || session.header?.parentSession || session.header?.origin === 'subagent') continue
      if (!best || (session.header.createdAt || 0) > (best.header.createdAt || 0)) best = session
    }
    if (best) return best.header.cwd
  } catch {
    /* fall through to the workspace registry */
  }
  try {
    const workspaces = ctx.get('workspaceRegistry')?.list?.()
    if (Array.isArray(workspaces) && workspaces.length) {
      return workspaces[0].path || workspaces[0].directory || null
    }
  } catch {
    /* fall through to the configured default */
  }
  return null
}

export function apply(ctx, rawConfig = {}) {
  const config = normalizeConfig(rawConfig)
  const workingDirectory = ctx.get('workingDirectory')
  const defaultCwd = detectWorkspaceCwd(ctx) || workingDirectory?.defaultDirectory || process.cwd()
  const dataRoot = process.env.DSH_HOME || path.join(os.homedir(), '.dsh')
  const dataDir = config.dataDir
    ? path.resolve(defaultCwd, config.dataDir)
    : path.join(dataRoot, '.dsh-butler')
  const settingsFile = path.join(dataDir, 'settings.json')
  let storedSettings = {}
  try {
    const parsed = JSON.parse(fs.readFileSync(settingsFile, 'utf8'))
    if (parsed && typeof parsed === 'object') storedSettings = parsed
  } catch {
    /* no saved settings yet */
  }
  Object.assign(config, normalizeConfig({ ...config, ...storedSettings }))

  const store = new BoardStore(dataDir)
  const model = createModelRunner(ctx, config)
  const butler = new Butler({ ctx, config, store, model, defaultCwd })
  const executor = new ExecutionRuntime({
    tick: () => butler.tick(),
    intervalMs: config.schedulerIntervalMs,
  })
  butler.setExecutor(executor)

  const editableConfig = new Set([
    'maxCards',
    'maxConcurrency',
    'maxVerifications',
    'stallMs',
    'toolStallMs',
    'maxStalls',
    'maxAttempts',
    'maxFixRounds',
    'maxGapRounds',
    'schedulerIntervalMs',
    'sessionsTtlMs',
    'llmTimeoutMs',
    'fullAccess',
    'provider',
    'model',
  ])
  const publicConfig = () =>
    Object.fromEntries([...editableConfig].map((key) => [key, config[key]]))
  const updateConfig = (patch) => {
    const input = patch && typeof patch === 'object' ? patch : {}
    const accepted = {}
    for (const key of editableConfig) {
      if (Object.prototype.hasOwnProperty.call(input, key)) accepted[key] = input[key]
    }
    validateConfigPatch(accepted)
    const next = normalizeConfig({ ...config, ...accepted })
    Object.assign(config, next)
    executor.setInterval(config.schedulerIntervalMs)
    model.invalidate()
    try {
      fs.mkdirSync(dataDir, { recursive: true })
      const merged = { ...storedSettings, ...accepted }
      const temp = `${settingsFile}.${process.pid}.tmp`
      fs.writeFileSync(temp, JSON.stringify(merged, null, 2), 'utf8')
      fs.renameSync(temp, settingsFile)
      storedSettings = merged
    } catch (error) {
      console.error('[butler] settings save failed:', error)
    }
    return publicConfig()
  }
  const setPluginEnabled = async (enabled) => {
    const manager = ctx.get('pluginManager')
    if (!manager?.setPluginEnabled || !manager?.listPlugins) {
      throw new Error('插件管理器不可用')
    }
    const plugins = await manager.listPlugins()
    const own = (plugins || []).find(
      (plugin) =>
        plugin.moduleName === 'dsh-card-workbench' ||
        plugin.patchId === 'dsh-butler' ||
        plugin.entryId === 'include:dsh-butler',
    )
    if (!own?.entryId) throw new Error('未找到卡片工坊插件条目')
    return manager.setPluginEnabled(own.entryId, Boolean(enabled))
  }

  ctx.effect(() => {
    if (!ctx.tools?.register) return
    const output = {
      schema: { type: 'object', additionalProperties: true },
      render: (value) => [{ type: 'text', text: JSON.stringify(value) }],
    }
    const definitions = [
      {
        name: 'card_workshop_split',
        description: 'Split a work brief into 1-6 task cards in the card workshop.',
        parameters: {
          type: 'object',
          properties: {
            brief: { type: 'string', description: 'The complete work brief.' },
            cwd: { type: 'string', description: 'Workspace folder; defaults to the current session folder.' },
            title: { type: 'string', description: 'Optional project title.' },
          },
          required: ['brief'],
          additionalProperties: false,
        },
        execute: (args, exec) =>
          butler.toolSplit(exec.agent?.id, args.brief, args.cwd, args.title),
      },
      {
        name: 'card_workshop_get_list',
        description: 'List the cards and dependency state for the current card-workshop project.',
        parameters: {
          type: 'object',
          properties: { jobId: { type: 'string' } },
          additionalProperties: false,
        },
        execute: (args, exec) => butler.toolList(exec.agent?.id, args.jobId),
      },
      {
        name: 'card_workshop_update_status',
        description:
          'Submit a card as verifying/blocked/queued/running. Agent cannot write done or failed; the host verifies completion.',
        parameters: {
          type: 'object',
          properties: {
            jobId: { type: 'string' },
            cardId: { type: 'string' },
            status: { type: 'string', enum: ['queued', 'running', 'verifying', 'blocked', 'skipped'] },
            note: { type: 'string' },
          },
          required: ['cardId', 'status'],
          additionalProperties: false,
        },
        execute: (args, exec) =>
          butler.toolUpdateStatus(exec.agent?.id, args.jobId, args.cardId, args.status, args.note),
      },
      {
        name: 'card_workshop_block',
        description: 'Mark a card blocked with a required human-readable reason.',
        parameters: {
          type: 'object',
          properties: {
            jobId: { type: 'string' },
            cardId: { type: 'string' },
            reason: { type: 'string' },
          },
          required: ['cardId', 'reason'],
          additionalProperties: false,
        },
        execute: (args, exec) =>
          butler.toolBlock(exec.agent?.id, args.jobId, args.cardId, args.reason),
      },
      {
        name: 'card_workshop_summary',
        description: 'Return a deterministic progress summary for the current project.',
        parameters: {
          type: 'object',
          properties: { jobId: { type: 'string' } },
          additionalProperties: false,
        },
        execute: (args, exec) => butler.toolSummary(exec.agent?.id, args.jobId),
      },
    ]
    definitions.forEach((definition) => {
      definition.output = output
    })
    const dispose = definitions.map((definition) => ctx.tools.register(definition))
    return () => dispose.forEach((fn) => fn())
  }, 'butler: card workshop tools')

  ctx.effect(
    () => registerRoutes(ctx, butler, { getConfig: publicConfig, updateConfig, setPluginEnabled }),
    'butler: http bridge',
  )

  ctx.on('agent/created', (payload) => {
    try {
      butler.handleAgentCreated(payload?.agent)
    } catch (error) {
      console.error('[butler] agent/created handler failed:', error)
    }
  })

  ctx.on('agent/status', (payload) => {
    try {
      butler.handleAgentStatus(payload)
    } catch (error) {
      console.error('[butler] agent/status handler failed:', error)
    }
  })

  ctx.on('session/event', (session, event) => {
    try {
      butler.handleSessionEvent(session, event)
    } catch (error) {
      console.error('[butler] session/event handler failed:', error)
    }
  })

  ctx.on('session/created', (session) => {
    try {
      butler.handleSessionCreated(session)
    } catch (error) {
      console.error('[butler] session/created handler failed:', error)
    }
  })

  ctx.on('approval/request', (request, next) => {
    let claimed = null
    try {
      claimed = butler.claimApproval(request)
    } catch (error) {
      console.error('[butler] approval/request handler failed:', error)
    }
    if (claimed) return claimed
    return typeof next === 'function' ? next() : undefined
  }, { prepend: true })

  ctx.on('user-questions/request', function (request, next) {
    let claimed = null
    try {
      butler.debugQuestionEvent(this, request)
      const agentId = request?.agent?.id || this?.id
      const normalized = agentId && !request?.agent ? { ...request, agent: { id: agentId } } : request
      claimed = butler.claimQuestion(normalized)
    } catch (error) {
      console.error('[butler] user-questions/request handler failed:', error)
    }
    if (claimed) return claimed
    return typeof next === 'function' ? next() : undefined
  }, { prepend: true })

  ctx.effect(() => {
    // The global runtime is the only execution heartbeat. It starts with the
    // plugin, not with a page, and keeps running while the user is in a
    // conversation, the plugin market or any other route.
    executor.start()
    return () => {
      executor.stop()
      void butler.shutdown()
    }
  }, 'butler: global execution runtime')

  butler.init().catch((error) => {
    console.error('[butler] init failed:', error)
  })
}

