/**
 * dsh-card-workbench — Host half.
 *
 * A card-oriented butler for the Harness Web UI. The Host owns the job board,
 * the worker Sessions, the stall watchdog and the verification loop; the Client
 * half is only the card surface and the intake form.
 */

import path from 'node:path'
import os from 'node:os'
import { BoardStore } from './lib/store.js'
import { Butler } from './lib/engine.js'
import { createModelRunner } from './lib/model.js'
import { registerRoutes } from './lib/server.js'
import { booleanOr, positiveInt } from './lib/util.js'

/** Services the engine cannot work without. */
export const inject = ['webServer', 'sessionController', 'llm', 'sessions', 'agents', 'tools']

const DEFAULTS = {
  maxCards: 6,
  maxConcurrency: 3,
  stallMs: 240_000,
  maxStalls: 3,
  maxAttempts: 5,
  maxFixRounds: 2,
  maxGapRounds: 2,
  llmTimeoutMs: 120_000,
  fullAccess: false,
  dataDir: null,
  provider: null,
  model: null,
}

function normalizeConfig(raw) {
  const input = raw && typeof raw === 'object' ? raw : {}
  return {
    maxCards: positiveInt(input.maxCards, DEFAULTS.maxCards, 20),
    maxConcurrency: positiveInt(input.maxConcurrency, DEFAULTS.maxConcurrency, 8),
    stallMs: positiveInt(input.stallMs, DEFAULTS.stallMs, 24 * 60 * 60 * 1000),
    maxStalls: positiveInt(input.maxStalls, DEFAULTS.maxStalls, 10),
    maxAttempts: positiveInt(input.maxAttempts, DEFAULTS.maxAttempts, 12),
    maxFixRounds: positiveInt(input.maxFixRounds, DEFAULTS.maxFixRounds, 6),
    maxGapRounds: positiveInt(input.maxGapRounds, DEFAULTS.maxGapRounds, 5),
    llmTimeoutMs: positiveInt(input.llmTimeoutMs, DEFAULTS.llmTimeoutMs, 10 * 60 * 1000),
    fullAccess: booleanOr(input.fullAccess, DEFAULTS.fullAccess),
    dataDir: typeof input.dataDir === 'string' && input.dataDir.trim() ? input.dataDir.trim() : null,
    provider: typeof input.provider === 'string' && input.provider.trim() ? input.provider.trim() : null,
    model: typeof input.model === 'string' && input.model.trim() ? input.model.trim() : null,
  }
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

  const store = new BoardStore(dataDir)
  const model = createModelRunner(ctx, config)
  const butler = new Butler({ ctx, config, store, model, defaultCwd })

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

  ctx.effect(() => registerRoutes(ctx, butler), 'butler: http bridge')

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
    const timer = setInterval(() => {
      void butler.tick()
    }, 5_000)
    if (typeof timer.unref === 'function') timer.unref()
    return () => {
      clearInterval(timer)
      void butler.shutdown()
    }
  }, 'butler: watchdog')

  butler.init().catch((error) => {
    console.error('[butler] init failed:', error)
  })
}

