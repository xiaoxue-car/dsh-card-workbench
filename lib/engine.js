/**
 * The butler engine.
 *
 * Responsibilities:
 *  - split one brief into cards with the model (deterministic fallback);
 *  - open one worker Session per card and drive it with prompts;
 *  - watch Session events, detect stalls, cancel and resume them;
 *  - verify each finished card against its acceptance criteria;
 *  - audit the whole job at the end and auto-create cards for missing work.
 *
 * The engine never touches the DOM and never writes the Session log itself.
 * All Session mutations go through `sessionController`; all model calls go
 * through the shared `llm` service.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID, createHash } from 'node:crypto'
import * as prompts from './prompts.js'
import {
  errorText,
  extractTaggedJson,
  formatDuration,
  lastAssistantText,
  messageText,
  now,
  parseJsonLoose,
  randomId,
  recentAssistantTexts,
  truncate,
} from './util.js'

const ACTIVE_CARD = new Set(['starting', 'running', 'stalled', 'fixing', 'verifying'])
const TERMINAL_CARD = new Set(['done', 'failed', 'skipped'])
const MAX_SESSION_META = 256
const MAX_ACCESS_APPLIED = 512
const SESSION_SETTINGS = {
  autoAdopt: false,
  verifyConversations: true,
  nudgeConversations: true,
}
const WORK_TEXT =
  /(帮|做|写|改|查|看|修|建|加|删|跑|测|实现|创建|分析|优化|部署|配置|落地|开发|处理|fix|add|write|build|test|check|create|update|refactor|implement|analy|debug|deploy|optimi)/i
const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.dsh-butler',
  '.svn',
  '.hg',
  'dist',
  'build',
  'out',
  '.next',
  '.nuxt',
  '.cache',
  '.venv',
  'venv',
  '__pycache__',
  'target',
  'coverage',
])

function asString(value, fallback = '') {
  if (typeof value === 'string') return value.trim()
  if (value == null) return fallback
  return String(value).trim()
}

function asStringArray(value, limit = 12) {
  if (!Array.isArray(value)) {
    if (typeof value === 'string' && value.trim()) return [value.trim()]
    return []
  }
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : asString(item?.text ?? item?.path ?? '')))
    .filter(Boolean)
    .slice(0, limit)
}

function normalizeCard(source, index) {
  const title = asString(source?.title) || `卡片 ${index + 1}`
  const goal = asString(source?.goal) || asString(source?.task) || asString(source?.description) || title
  const acceptance =
    asString(source?.acceptance) || asString(source?.criteria) || '按卡片任务逐项交付，并给出可核验的证据。'
  const deliverables = asStringArray(source?.deliverables ?? source?.outputs, 8)
  const dependsOn = asStringArray(source?.dependsOn ?? source?.dependencies, 8)
  const priorityRaw = Number(source?.priority)
  const priority = [1, 2, 3].includes(priorityRaw) ? priorityRaw : 2
  const stepsRaw = Number(source?.estimateSteps ?? source?.agentSteps)
  const estimateSteps = Number.isFinite(stepsRaw)
    ? Math.max(1, Math.min(30, Math.round(stepsRaw)))
    : null
  return {
    title: title.slice(0, 120),
    goal,
    acceptance,
    deliverables,
    dependsOn,
    priority,
    estimateSteps,
  }
}

function timeText(time) {
  if (!time) return '—'
  const date = new Date(time)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
    date.getSeconds(),
  ).padStart(2, '0')}`
}

export class Butler {
  constructor({ ctx, config, store, model, defaultCwd }) {
    this.ctx = ctx
    this.config = config
    this.store = store
    this.model = model
    this.defaultCwd = defaultCwd
    this.lastSessionCwd = defaultCwd
    this.board = store.board
    this.workerCards = new Map()
    this.sessionGroups = new Map()
    this.sessionMetaCache = new Map()
    this.lastActiveSessionId = null
    this.autoAdoptInFlight = new Set()
    this.bulkAdopting = false
    this.creatingWorker = false
    this.pruning = false
    this.lastPruneAt = 0
    this.modelCatalog = null
    this.lastCatalogAt = 0
    this.permissionCatalog = null
    this.presetCatalog = null
    this.lastPermissionAt = 0
    this.pendingInteractions = new Map()
    this.questionDebug = { count: 0, last: null }
    this.scopedListeners = new Map()
    this.requestClaims = new WeakMap()
    this.processing = new Map()
    this.agentStatus = new Map()
    this.accessApplied = new Set()
    this.ready = false
    this.closed = false
    this.presetResolved = false
    this.presetName = null
    this.presetLabel = ''
    this.tickBusy = false
  }

  async init() {
    this.board = await this.store.load()
    this.board.jobs = Array.isArray(this.board.jobs) ? this.board.jobs : []
    this.ensureSettings()
    for (const job of this.board.jobs) {
      job.kind = job.kind === 'session' ? 'session' : 'brief'
      job.log = Array.isArray(job.log) ? job.log : []
      job.cards = Array.isArray(job.cards) ? job.cards : []
      if (job.kind === 'session' && job.sessionId) {
        this.sessionGroups.set(job.sessionId, job.id)
        if (this.config.fullAccess) {
          const agent = this.ctx.agents.get(job.sessionId)
          if (agent) this.applyFullAccess(agent)
        }
        job.chatTarget = null
        for (const card of job.cards) card.chatMode = false
        job.liveTurn = { open: false, turn: null }
        const live = this.ctx.sessions.get(job.sessionId)
        if (live) {
          let openTurn = null
          try {
            for (const event of live.ownEvents()) {
              if (event.type === 'turn/start') openTurn = event.data?.turn ?? null
              if (event.type === 'turn/end') openTurn = null
            }
          } catch {
            openTurn = null
          }
          if (openTurn != null) {
            job.liveTurn = { open: true, turn: openTurn }
            const last = job.cards[job.cards.length - 1]
            if (last && ['queued', 'stalled', 'running'].includes(last.status)) {
              last.status = 'running'
              last.turnOpen = true
              last.turn = openTurn
              last.startedAt = last.startedAt || now()
              last.lastActivityAt = now()
              last.butlerNote = ''
            }
          }
        }
        for (const card of job.cards) {
          if (job.liveTurn?.open && card === job.cards[job.cards.length - 1]) continue
          if (card.status === 'running' || card.status === 'verifying') {
            card.status = 'stalled'
            card.turnOpen = false
            card.butlerNote = '宿主重启，等待这段对话的新进展'
          }
        }
        if (job.status === 'running' || job.status === 'verifying') job.status = 'watching'
        continue
      }
      for (const card of job.cards) {
        if (card.sessionId) this.workerCards.set(card.sessionId, { jobId: job.id, cardId: card.id })
      }
      if (job.status === 'running' || job.status === 'planning' || job.status === 'verifying') {
        const wasPlanning = job.status === 'planning'
        job.status = 'paused'
        job.butlerNote = '宿主已重启，运行中的工作暂时停住；点「继续」即可续跑。'
        this.log(
          job,
          wasPlanning
            ? '宿主重启时还在拆解，已暂停；点「继续」会重新拆解。'
            : '宿主重启，已暂停盯办；执行会话与进度都保留，点「继续」续跑。',
          'warn',
        )
        for (const card of job.cards) {
          if (card.status === 'starting' || card.status === 'running' || card.status === 'fixing') {
            card.status = 'stalled'
            card.butlerNote = '宿主重启，等待续跑'
          }
        }
      }
    }
    this.ready = true
    void this.refreshModelCatalog()
    this.refreshPermissionCatalog()
    void this.refreshPresetCatalog()
    try {
      for (const agent of this.ctx.agents.list()) this.installAgentListeners(agent)
    } catch {
      /* the agent registry may still be starting */
    }
    await this.store.flush()
    for (const job of this.board.jobs) {
      if (job.status === 'paused' && job.cards.length === 0 && job.replan) {
        void this.runPlan(job.id)
      }
    }
    setTimeout(() => {
      void this.adoptAllSessions({ auto: true, jump: false }).catch((error) =>
        console.error('[butler] startup adoption failed:', error),
      )
    }, 700)
  }

  ensureSettings() {
    const current = this.board.settings && typeof this.board.settings === 'object' ? this.board.settings : {}
    this.board.settings = { ...SESSION_SETTINGS, ...current }
    this.board.hiddenSessions = Array.isArray(this.board.hiddenSessions) ? this.board.hiddenSessions : []
    return this.board.settings
  }

  isRootSession(session) {
    return Boolean(session?.header) && !session.header.parentSession && session.header.origin !== 'subagent'
  }

  metaForSession(session) {
    const cached = this.sessionMetaCache.get(session.id)
    if (cached) return cached
    const meta = this.buildMeta(session.id, session.header, session.ownEvents())
    this.sessionMetaCache.set(session.id, meta)
    while (this.sessionMetaCache.size > MAX_SESSION_META) {
      const oldest = this.sessionMetaCache.keys().next().value
      this.sessionMetaCache.delete(oldest)
    }
    return meta
  }

  buildMeta(id, header, events = []) {
    let title = ''
    let updatedAt = header?.createdAt || now()
    let running = false
    let lastText = ''
    let lastTool = ''
    let hasRealUser = false
    for (const event of events) {
      updatedAt = Math.max(updatedAt, event.time || 0)
      if (event.type === 'user/message') {
        const text = messageText(event.data?.message || event.data)
        if (text && !this.isSystemUserText(text)) {
          hasRealUser = true
          if (!title) title = truncate(text.split(/\r?\n/).find((line) => line.trim()) || text, 64)
        }
      }
      if (event.type === 'turn/start') running = true
      if (event.type === 'turn/end') running = false
      if (event.type === 'assistant/message') {
        const text = messageText(event.data?.message || event.data)
        if (text) lastText = text
      }
      if (event.type === 'tool/call') lastTool = event.data?.name || lastTool
    }
    return {
      id,
      title: title || path.basename(header?.cwd || '') || '未命名对话',
      cwd: header?.cwd || null,
      updatedAt,
      running,
      lastText,
      lastTool,
      hasRealUser,
    }
  }

  noteSessionActivity(session, event) {
    if (!this.isRootSession(session)) return
    if (this.workerCards.has(session.id)) return
    const meta = this.metaForSession(session)
    meta.updatedAt = Math.max(meta.updatedAt || 0, event.time || 0)
    if (event.type === 'turn/start') meta.running = true
    if (event.type === 'turn/end') meta.running = false
    if (event.type === 'tool/call') meta.lastTool = event.data?.name || meta.lastTool
    if (event.type === 'assistant/message') {
      const text = messageText(event.data?.message || event.data)
      if (text) meta.lastText = text
    }
    this.lastActiveSessionId = session.id
    if (event.type === 'user/message') {
      const text = messageText(event.data?.message || event.data)
      if (text && !this.isSystemUserText(text)) {
        meta.hasRealUser = true
        if (!meta.title || meta.title === path.basename(session.header?.cwd || '')) {
          meta.title = truncate(text.split(/\r?\n/).find((line) => line.trim()) || text, 64)
        }
      }
      if (
        text &&
        !this.isSystemUserText(text) &&
        !this.workerCards.has(session.id) &&
        !this.sessionGroups.has(session.id) &&
        !this.board.hiddenSessions?.includes(session.id) &&
        this.board.settings?.autoAdopt &&
        this.isWorkText(text) &&
        !this.autoAdoptInFlight.has(session.id)
      ) {
        this.autoAdoptInFlight.add(session.id)
        this.adoptSession(session.id, { auto: true })
          .catch((error) => console.error('[butler] auto adopt failed:', error))
          .finally(() => this.autoAdoptInFlight.delete(session.id))
      }
    }
  }

  isWorkText(text) {
    const value = typeof text === 'string' ? text.trim() : ''
    if (!value || value.startsWith('/')) return false
    if (value.length >= 8) return true
    return WORK_TEXT.test(value)
  }

  isSystemUserText(text) {
    const value = typeof text === 'string' ? text.trim() : ''
    if (!value) return true
    if (value.startsWith('【总管家')) return true
    if (value.startsWith('Current runtime context.')) return true
    if (value.startsWith('Time sampled')) return true
    if (value.startsWith('Elapsed since')) return true
    if (value.startsWith('The approval policy changed')) return true
    if (value.startsWith('Current time:')) return true
    if (value.startsWith('<system-reminder>')) return true
    if (value.startsWith('<environment_context>')) return true
    if (value.startsWith('You are an AI assistant')) return true
    return false
  }

  sessionCandidates() {
    const candidates = []
    let sessions = []
    try {
      sessions = this.ctx.sessions.list()
    } catch {
      return candidates
    }
    for (const session of sessions) {
      if (!this.isRootSession(session)) continue
      if (this.workerCards.has(session.id)) continue
      if (this.board.hiddenSessions?.includes(session.id)) continue
      const meta = this.metaForSession(session)
      if (!meta.hasRealUser) continue
      const adoptedJobId = this.sessionGroups.get(session.id) || null
      const group = adoptedJobId ? this.findJob(adoptedJobId) : null
      const cards = group?.cards || []
      candidates.push({
        id: session.id,
        title: meta.title,
        cwd: meta.cwd,
        updatedAt: meta.updatedAt,
        running: meta.running,
        lastText: truncate(meta.lastText || '', 160),
        adoptedJobId,
        groupStatus: group?.status || null,
        groupTotal: cards.length,
        groupDone: cards.filter((card) => card.status === 'done').length,
        groupRunning: cards.filter((card) => ACTIVE_CARD.has(card.status)).length,
        groupFailed: cards.filter((card) => card.status === 'failed').length,
        groupComplete:
          cards.length > 0 && cards.every((card) => card.status === 'done' || card.status === 'skipped'),
        current: session.id === this.lastActiveSessionId,
      })
    }
    return candidates.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).slice(0, 24)
  }

  log(job, text, level = 'info') {
    if (!job) return
    job.log = Array.isArray(job.log) ? job.log : []
    job.log.push({ t: now(), level, text })
    if (job.log.length > 140) job.log.splice(0, job.log.length - 140)
    job.updatedAt = now()
    this.store.scheduleSave()
    if (level === 'error') console.error(`[butler] ${job.title}: ${text}`)
  }

  save() {
    this.store.scheduleSave()
  }

  state() {
    this.ensureSettings()
    const jobs = [...this.board.jobs].sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0))
    return {
      ok: true,
      now: now(),
      defaultCwd: this.lastSessionCwd || this.defaultCwd,
      storageFile: this.store.file,
      storageError: this.store.lastError,
      settings: { ...this.board.settings },
      autoAdopt: this.board.settings.autoAdopt,
      verifyConversations: this.board.settings.verifyConversations,
      lastActiveSessionId: this.lastActiveSessionId,
      sessions: this.sessionCandidates(),
      modelCatalog: this.modelCatalog || null,
      permissionCatalog: this.permissionCatalog || null,
      presetCatalog: this.presetCatalog || null,
      questionDebug: this.questionDebug,
      config: {
        maxCards: this.config.maxCards,
        maxConcurrency: this.config.maxConcurrency,
        stallMs: this.config.stallMs,
        fullAccess: this.config.fullAccess,
        maxFixRounds: this.config.maxFixRounds,
        maxGapRounds: this.config.maxGapRounds,
      },
      jobs: jobs.map((job) => this.jobView(job)),
    }
  }

  sessionModel(job) {
    if (!job?.sessionId) return null
    try {
      const header = this.ctx.sessions.get(job.sessionId)?.requestHeader?.()
      const config = header?.config
      if (!config?.provider || !config?.model) return null
      return {
        provider: config.provider,
        model: config.model,
        ...(config.reasoningEffort ? { reasoningEffort: String(config.reasoningEffort) } : {}),
      }
    } catch {
      return null
    }
  }

  jobView(job) {
    const kind = job.kind === 'session' ? 'session' : 'brief'
    const cards = (job.cards || []).map((card) => ({
      id: card.id,
      kind: card.kind || (kind === 'session' ? 'session' : 'brief'),
      title: card.title,
      goal: card.goal,
      acceptance: card.acceptance,
      deliverables: card.deliverables || [],
      status: card.status,
      attempts: card.attempts || 0,
      stallCount: card.stallCount || 0,
      fixRounds: card.fixRounds || 0,
      toolCalls: card.toolCalls || 0,
      sessionId: card.sessionId || job.sessionId || null,
      createdAt: card.createdAt,
      startedAt: card.startedAt || null,
      finishedAt: card.finishedAt || null,
      lastActivityAt: card.lastActivityAt || null,
      lastTool: card.lastTool || '',
      dependsOn: card.dependsOn || [],
      priority: card.priority || 2,
      estimateSteps: card.estimateSteps || null,
      blockedReason: card.blockedReason || '',
      history: card.history || [],
      note: card.butlerNote || '',
      imported: Boolean(card.imported),
      turnOpen: Boolean(card.turnOpen),
      needsUser: card.needsUser || null,
      revisions: card.revisions || [],
      chat: card.chat || [],
      result: card.result
        ? {
            status: card.result.status || '',
            summary: card.result.summary || '',
            evidence: card.result.evidence || [],
            open: card.result.open || [],
          }
        : null,
      verify: card.verify || null,
    }))
    const done = cards.filter((card) => card.status === 'done').length
    const failed = cards.filter((card) => card.status === 'failed').length
    const running = cards.filter((card) => ACTIVE_CARD.has(card.status)).length
    return {
      id: job.id,
      kind,
      title: job.title,
      brief: job.brief,
      summary: job.summary || '',
      cwd: job.cwd,
      sessionId: job.sessionId || null,
      status: job.status,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      lastActiveAt: job.lastActiveAt || job.updatedAt || null,
      finishedAt: job.finishedAt || null,
      gapRounds: job.gapRounds || 0,
      note: job.butlerNote || '',
      chat: job.chat || [],
      groupChatOpen: Boolean(job.groupChatOpen),
      liveTurnOpen: Boolean(job.liveTurn?.open),
      modelSelection: job.modelSelection || null,
      currentModel: this.sessionModel(job),
      permission: this.currentPermission(job),
      preset: this.sessionPreset(job),
      stats: {
        total: cards.length,
        done,
        failed,
        blocked: cards.filter((card) => card.status === 'blocked').length,
        running,
        queued: cards.filter((card) => card.status === 'queued').length,
        skipped: cards.filter((card) => card.status === 'skipped').length,
        progress: cards.length ? Math.round((done / cards.length) * 100) : 0,
      },
      cards,
      log: (job.log || []).slice(-70).map((entry) => ({
        t: entry.t,
        time: timeText(entry.t),
        level: entry.level || 'info',
        text: entry.text,
      })),
    }
  }

  findJob(jobId) {
    return this.board.jobs.find((job) => job.id === jobId)
  }

  findCard(job, cardId) {
    return (job?.cards || []).find((card) => card.id === cardId)
  }

  async ensureWorkspace(cwd) {
    const registry = this.ctx.get('workspaceRegistry')
    if (!registry) return null
    if (registry.create) {
      try {
        return await registry.create(cwd)
      } catch (error) {
        console.error('[butler] workspace create failed:', error)
      }
    }
    if (registry.resolveByPath) {
      try {
        return await registry.resolveByPath(cwd)
      } catch {
        return null
      }
    }
    return null
  }

  async createJob({ brief, cwd, title }) {
    const text = asString(brief)
    if (!text) throw new Error('工作内容不能为空')
    if (text.length > 40_000) throw new Error('工作内容太长（上限 40000 字）')
    const resolvedCwd = path.resolve(asString(cwd) || this.lastSessionCwd || this.defaultCwd)
    const stat = await fs.stat(resolvedCwd).catch(() => null)
    if (!stat?.isDirectory()) throw new Error('工作目录不存在或不是文件夹')
    const workspace = await this.ensureWorkspace(resolvedCwd)
    const job = {
      id: randomId('job'),
      title: asString(title) || truncate(text.split(/\r?\n/).find((line) => line.trim()) || '未命名工作', 60),
      brief: text,
      cwd: resolvedCwd,
      workspaceId: workspace?.id || null,
      status: 'planning',
      createdAt: now(),
      updatedAt: now(),
      cards: [],
      log: [],
      gapRounds: 0,
      summary: '',
      chat: [],
    }
    this.board.jobs.push(job)
    this.log(job, '卡片工坊接单，正在把工作拆成卡片…')
    this.save()
    setTimeout(() => {
      void this.runPlan(job.id)
    }, 30)
    return this.jobView(job)
  }

  async loadSessionData(sessionId) {
    const live = this.ctx.sessions.get(sessionId)
    if (live) {
      return { id: sessionId, header: live.header, events: live.ownEvents(), live: true }
    }
    try {
      const inspection = await this.ctx.sessionController.inspect(sessionId)
      if (!inspection || !Array.isArray(inspection.events)) return null
      return { id: sessionId, header: inspection.meta, events: inspection.events, live: false }
    } catch {
      return null
    }
  }

  async adoptSession(sessionId, { auto = false, history = true, title = null, data = null, jump = true } = {}) {
    const id = asString(sessionId)
    if (!id) throw new Error('sessionId 不能为空')
    const existingId = this.sessionGroups.get(id)
    if (existingId) return this.findJob(existingId)
    if (this.workerCards.has(id)) throw new Error('这是管家派出的执行会话，已经由卡片管理')
    const payload = data || (await this.loadSessionData(id))
    if (!payload) throw new Error('这段对话当前不可用，无法接管')
    const header = payload.header
    if (header?.parentSession || header?.origin === 'subagent') throw new Error('子会话不能单独接管')
    const meta = payload.live
      ? this.metaForSession(this.ctx.sessions.get(id) || { id, header, ownEvents: () => payload.events })
      : this.buildMeta(id, header, payload.events)
    const createdAt = now()
    const job = {
      id: randomId('grp'),
      kind: 'session',
      sessionId: id,
      title: asString(title) || meta.title || '工作对话',
      brief: `工作对话：${asString(title) || meta.title || id}`,
      cwd: meta.cwd || this.lastSessionCwd || this.defaultCwd,
      status: 'watching',
      createdAt,
      updatedAt: createdAt,
      lastActiveAt: createdAt,
      cards: [],
      log: [],
      gapRounds: 0,
      summary: '',
      chat: [],
      groupChatOpen: false,
    }
    this.board.jobs.push(job)
    this.sessionGroups.set(id, job.id)
    this.lastActiveSessionId = id
    if (this.config.fullAccess) {
      const agent = this.ctx.agents.get(id)
      if (agent) this.applyFullAccess(agent)
    }
    this.log(
      job,
      auto ? '自动接管了这段工作对话，开始盯守。' : '已接管这段工作对话，开始盯守。',
    )
    if (history) this.importHistory(job, payload.events)
    this.save()
    return job
  }

  importHistory(job, events) {
    const segments = []
    let pending = []
    let current = null
    for (const event of Array.isArray(events) ? events : []) {
      if (event.type === 'user/message') {
        const text = messageText(event.data?.message || event.data)
        if (!text || this.isSystemUserText(text)) continue
        const item = { text, seq: event.seq, time: event.time || now() }
        if (current) current.users.push(item)
        else pending.push(item)
        continue
      }
      if (event.type === 'turn/start') {
        current = {
          turn: event.data?.turn ?? null,
          users: pending,
          startedAt: event.time || now(),
          assistant: '',
          toolCalls: 0,
          lastTool: '',
          finishedAt: null,
          reason: '',
        }
        pending = []
        segments.push(current)
        continue
      }
      if (!current) continue
      if (event.type === 'tool/call') {
        current.toolCalls += 1
        current.lastTool = event.data?.name || current.lastTool
      } else if (event.type === 'assistant/message') {
        const text = messageText(event.data?.message || event.data)
        if (text) current.assistant = text
      } else if (event.type === 'turn/end') {
        current.finishedAt = event.time || now()
        current.reason = event.data?.reason?.kind || 'completed'
        current = null
      }
    }
    if (pending.length) {
      segments.push({
        turn: null,
        users: pending,
        startedAt: pending[0].time,
        assistant: '',
        toolCalls: 0,
        lastTool: '',
        finishedAt: null,
        reason: '',
      })
    }
    const usable = segments.filter((segment) => segment.users.length).slice(-12)
    if (!usable.length) {
      this.log(job, '这段对话还没有真实的工作请求，先保持盯守。')
      return
    }
    const cards = usable.map((segment, index) => {
      const first = segment.users[0]
      const lastUser = segment.users[segment.users.length - 1]
      const text = segment.users.map((item) => item.text).join('\n\n')
      const isLast = index === usable.length - 1
      const open = isLast && !segment.finishedAt
      const status = open
        ? 'running'
        : segment.reason && segment.reason !== 'completed'
          ? 'failed'
          : 'done'
      return {
        id: randomId('card'),
        kind: 'session',
        title: truncate(text.split(/\r?\n/).find((line) => line.trim()) || text, 64),
        goal: text,
        acceptance: '用户的这次请求得到完整回应；涉及文件或代码改动时有实际落地与验证。',
        status,
        imported: !open,
        turnOpen: open,
        turn: segment.turn,
        userSeq: lastUser?.seq || null,
        createdAt: first.time,
        startedAt: segment.startedAt,
        finishedAt: segment.finishedAt,
        lastActivityAt: segment.finishedAt || now(),
        lastAssistant: segment.assistant,
        lastTool: segment.lastTool,
        toolCalls: segment.toolCalls,
        attempts: 0,
        stallCount: 0,
        fixRounds: 0,
        butlerNote: open ? '接管时这一轮还没结束，继续盯守' : '',
        result: segment.assistant
          ? {
              status: status === 'failed' ? 'blocked' : 'done',
              summary: truncate(segment.assistant, 900),
              evidence: segment.lastTool ? [segment.lastTool] : [],
              open: [],
              lastText: segment.assistant.slice(0, 3000),
              at: now(),
            }
          : null,
        verify: null,
      }
    })
    job.cards.push(...cards)
    job.updatedAt = now()
    job.lastActiveAt = now()
    this.log(job, `已按轮次拆成 ${cards.length} 张卡片。`)
    this.save()
  }

  async pruneMissingGroups() {
    if (this.pruning || this.closed) return { removed: 0 }
    this.pruning = true
    let removed = 0
    try {
      const value = await this.ctx.sessionController.list({}, new AbortController().signal)
      if (!value || !Array.isArray(value.items)) return { removed: 0 }
      const visible = new Set(value.items.map((item) => item.sessionId))
      for (const job of [...this.board.jobs]) {
        if (job.kind !== 'session' || !job.sessionId) continue
        if (visible.has(job.sessionId)) continue
        if (this.ctx.sessions.get(job.sessionId)) continue
        this.board.jobs = this.board.jobs.filter((item) => item.id !== job.id)
        this.sessionGroups.delete(job.sessionId)
        removed += 1
      }
      if (removed) {
        this.save()
        console.log(`[butler] pruned ${removed} conversation groups not present in the session list`)
      }
    } catch (error) {
      console.error('[butler] prune missing groups failed:', error)
    } finally {
      this.pruning = false
    }
    return { removed }
  }

  async adoptAllSessions({ auto = true, jump = false } = {}) {
    if (this.bulkAdopting || this.closed) return { adopted: 0, scanned: 0 }
    if (auto && !this.board.settings?.autoAdopt) return { adopted: 0, scanned: 0 }
    this.bulkAdopting = true
    let adopted = 0
    let scanned = 0
    try {
      const value = await this.ctx.sessionController.list({}, new AbortController().signal)
      const items = (Array.isArray(value?.items) ? value.items : []).filter(
        (item) =>
          item &&
          !item.blank &&
          !item.parentSessionId &&
          item.origin !== 'subagent' &&
          !this.workerCards.has(item.sessionId) &&
          !this.sessionGroups.has(item.sessionId) &&
          !this.board.hiddenSessions?.includes(item.sessionId),
      )
      for (const item of items) {
        if (this.closed) break
        scanned += 1
        try {
          const data = await this.loadSessionData(item.sessionId)
          if (!data) continue
          if (data.header?.parentSession || data.header?.origin === 'subagent') continue
          const meta = this.buildMeta(item.sessionId, data.header, data.events)
          if (!meta.hasRealUser) continue
          await this.adoptSession(item.sessionId, { auto, history: true, data, jump })
          adopted += 1
          await new Promise((resolve) => setTimeout(resolve, 0))
        } catch (error) {
          console.error('[butler] bulk adopt failed:', error)
        }
      }
    } catch (error) {
      console.error('[butler] session inventory failed:', error)
    } finally {
      this.bulkAdopting = false
    }
    if (adopted) console.log(`[butler] adopted ${adopted}/${scanned} existing conversations`)
    void this.pruneMissingGroups()
    return { adopted, scanned }
  }

  handleSessionCreated(session) {
    if (!session?.id || !this.isRootSession(session)) return
    if (!this.board.settings?.autoAdopt) return
    if (this.creatingWorker || this.workerCards.has(session.id) || this.sessionGroups.has(session.id)) return
    if (this.board.hiddenSessions?.includes(session.id)) return
    const meta = this.metaForSession(session)
    if (!meta.hasRealUser) return
    setTimeout(() => {
      if (this.closed || this.sessionGroups.has(session.id) || this.workerCards.has(session.id)) return
      void this.adoptSession(session.id, { auto: true, history: false, jump: false }).catch((error) =>
        console.error('[butler] adopt new session failed:', error),
      )
    }, 120)
  }

  adoptRecent() {
    const candidates = this.sessionCandidates().filter((candidate) => !candidate.adoptedJobId)
    if (!candidates.length) throw new Error('没有可接管的工作对话')
    const target =
      candidates.find((candidate) => candidate.id === this.lastActiveSessionId) || candidates[0]
    return this.adoptSession(target.id, { auto: false })
  }

  async adoptWorkspace() {
    const cwd = this.lastSessionCwd || this.defaultCwd
    const candidates = this.sessionCandidates().filter(
      (candidate) => !candidate.adoptedJobId && (!cwd || !candidate.cwd || candidate.cwd === cwd),
    )
    const adopted = []
    for (const candidate of candidates.slice(0, 10)) {
      try {
        adopted.push(await this.adoptSession(candidate.id, { auto: false }))
      } catch (error) {
        console.error('[butler] adopt workspace candidate failed:', error)
      }
    }
    return { cwd, adopted: adopted.length, jobs: adopted.map((job) => this.jobView(job)) }
  }

  updateSettings(patch) {
    this.ensureSettings()
    const input = patch && typeof patch === 'object' ? patch : {}
    for (const key of Object.keys(SESSION_SETTINGS)) {
      if (typeof input[key] === 'boolean') this.board.settings[key] = input[key]
    }
    this.save()
    return { settings: { ...this.board.settings } }
  }

  async hideSession(sessionId) {
    this.ensureSettings()
    const id = asString(sessionId)
    if (!id) throw new Error('sessionId 不能为空')
    if (!this.board.hiddenSessions.includes(id)) this.board.hiddenSessions.push(id)
    await this.store.flush()
    return { hidden: true, sessionId: id }
  }

  async runPlan(jobId) {
    const job = this.findJob(jobId)
    if (!job || job.status === 'paused' || job.status === 'done' || job.status === 'failed') return
    if ((job.cards || []).length) return
    job.replan = false
    this.log(job, '卡片工坊正在阅读交办内容，拆解可验收的卡片…')
    let plan = null
    try {
      const response = await this.model.complete({
        system: prompts.planSystem(),
        prompt: prompts.planUser(job.brief, job.cwd, this.config.maxCards),
        maxTokens: 2600,
        label: '拆解',
      })
      plan = parseJsonLoose(response.text)
    } catch (error) {
      this.log(job, `拆解模型不可用（${errorText(error)}），改用保底拆解。`, 'warn')
    }

    const rawCards = Array.isArray(plan?.cards) ? plan.cards : []
    const normalized = rawCards
      .map((card, index) => normalizeCard(card, index))
      .filter((card) => card.title && card.goal)
      .slice(0, this.config.maxCards)

    if (plan?.title) job.title = asString(plan.title).slice(0, 80) || job.title
    if (plan?.summary) job.summary = asString(plan.summary).slice(0, 300)
    if (!normalized.length) {
      normalized.push(
        normalizeCard(
          {
            title: '完成交办工作',
            goal: job.brief,
            acceptance: '按交办内容逐项交付，并给出可核验的证据。',
          },
          0,
        ),
      )
    }

    const createdAt = now()
    const ids = normalized.map(() => randomId('card'))
    const byTitle = new Map(
      normalized.map((card, index) => [card.title.trim().toLowerCase(), ids[index]]),
    )
    const dependencies = normalized.map((card, index) => {
      const set = new Set()
      for (const raw of card.dependsOn || []) {
        const key = String(raw).trim().toLowerCase()
        const numeric = /^\d+$/.test(key) ? Number(key) - 1 : -1
        const id = byTitle.get(key) || (numeric >= 0 ? ids[numeric] : null)
        if (id && id !== ids[index]) set.add(id)
      }
      return set
    })
    let cycleTrimmed = false
    const visiting = new Set()
    const visited = new Set()
    const walk = (index) => {
      if (visiting.has(index)) {
        dependencies[index].clear()
        cycleTrimmed = true
        return
      }
      if (visited.has(index)) return
      visiting.add(index)
      for (const depId of dependencies[index]) {
        const depIndex = ids.indexOf(depId)
        if (depIndex >= 0) walk(depIndex)
      }
      visiting.delete(index)
      visited.add(index)
    }
    normalized.forEach((_, index) => walk(index))
    if (cycleTrimmed) this.log(job, '拆卡结果包含循环依赖，已移除成环的前置关系。', 'warn')

    job.cards = normalized.map((card, index) => ({
      id: ids[index],
      title: card.title,
      goal: card.goal,
      acceptance: card.acceptance,
      deliverables: card.deliverables,
      dependsOn: [...dependencies[index]],
      priority: card.priority,
      estimateSteps: card.estimateSteps,
      status: 'queued',
      index,
      createdAt,
      attempts: 0,
      stallCount: 0,
      fixRounds: 0,
      toolCalls: 0,
      lastActivityAt: createdAt,
      result: null,
      verify: null,
      butlerNote: '',
      blockedReason: '',
      history: [{ at: createdAt, actor: 'host', from: '', to: 'queued', note: '拆卡创建' }],
    }))
    job.status = 'running'
    job.updatedAt = now()
    this.log(job, `拆成 ${job.cards.length} 张卡片：${job.cards.map((card) => `「${card.title}」`).join('、')}`)
    this.log(job, '卡片工坊开始盯办；卡住会自动续跑，完成会逐张核对。')
    this.save()
    this.pump(job)
  }

  dependencyState(job, card) {
    const dependencies = Array.isArray(card.dependsOn) ? card.dependsOn : []
    if (!dependencies.length) return { ready: true, blocked: false }
    const missing = []
    const failed = []
    const waiting = []
    for (const id of dependencies) {
      const dependency = (job.cards || []).find((item) => item.id === id)
      if (!dependency) {
        missing.push(id)
        continue
      }
      if (dependency.status === 'failed') failed.push(dependency)
      else if (!['done', 'skipped'].includes(dependency.status)) waiting.push(dependency)
    }
    return {
      ready: !missing.length && !failed.length && !waiting.length,
      blocked: missing.length > 0 || failed.length > 0,
      missing,
      failed,
      waiting,
    }
  }

  activeCardCount() {
    let count = 0
    for (const job of this.board.jobs || []) {
      for (const card of job.cards || []) {
        if (ACTIVE_CARD.has(card.status)) count += 1
      }
    }
    return count
  }

  pump(job) {
    if (!job || job.kind === 'session' || job.status !== 'running' || this.closed) return
    for (const card of job.cards) {
      if (card.status !== 'blocked' || !card.dependsOn?.length) continue
      const state = this.dependencyState(job, card)
      if (state.ready) {
        card.status = 'queued'
        card.blockedReason = ''
        card.butlerNote = ''
        card.history = [
          ...(card.history || []),
          { at: now(), actor: 'host', from: 'blocked', to: 'queued', note: '前置依赖已解除' },
        ]
        this.log(job, `卡片「${card.title}」的前置依赖已解除，重新排队。`)
        this.save()
      }
    }
    const active = this.activeCardCount()
    let slots = this.config.maxConcurrency - active
    for (const card of job.cards) {
      if (slots <= 0) break
      if (card.status !== 'queued') continue
      const dependencyState = this.dependencyState(job, card)
      if (dependencyState.blocked) {
        const reason = dependencyState.missing.length
          ? '前置卡片不存在'
          : `前置卡片未通过：${dependencyState.failed.map((item) => item.title).join('、')}`
        card.status = 'blocked'
        card.blockedReason = reason
        card.butlerNote = reason
        card.history = [
          ...(card.history || []),
          { at: now(), actor: 'host', from: 'queued', to: 'blocked', note: reason },
        ]
        this.log(job, `卡片「${card.title}」被前置依赖阻塞：${reason}`, 'warn')
        this.save()
        continue
      }
      if (!dependencyState.ready) continue
      slots -= 1
      void this.startCard(job, card)
    }
    if (job.cards.length && job.cards.every((card) => TERMINAL_CARD.has(card.status))) {
      void this.auditJob(job)
    }
  }

  async createWorkerSession(job) {
    const controller = this.ctx.sessionController
    if (!controller?.create) throw new Error('sessionController 不可用，无法创建执行会话')
    this.creatingWorker = true
    try {
      const body = { cwd: job.cwd }
      const workspace = await this.ensureWorkspace(job.cwd)
      if (workspace?.id) body.workspaceId = workspace.id
      try {
        const created = await controller.create(body)
        const sessionId = created?.sessionId || created
        if (!sessionId) throw new Error('创建会话没有返回 sessionId')
        return sessionId
      } catch (error) {
        if (body.workspaceId) {
          const created = await controller.create({ cwd: job.cwd })
          const sessionId = created?.sessionId || created
          if (sessionId) return sessionId
        }
        throw error
      }
    } finally {
      this.creatingWorker = false
    }
  }

  async startCard(job, card) {
    if (card.status !== 'queued' || this.closed) return
    card.status = 'starting'
    card.attempts = (card.attempts || 0) + 1
    card.lastActivityAt = now()
    this.save()
    try {
      if (!card.sessionId) {
        card.sessionId = await this.createWorkerSession(job)
        this.workerCards.set(card.sessionId, { jobId: job.id, cardId: card.id })
      }
      card.status = 'running'
      card.startedAt = card.startedAt || now()
      card.finishedAt = null
      card.lastActivityAt = now()
      this.log(job, `▶ 卡片「${card.title}」开工（第 ${card.attempts} 次派单）`)
      await this.promptWorker(
        job,
        card,
        prompts.workerPrompt({
          job,
          card,
          fullAccess: this.config.fullAccess,
          resumed: card.attempts > 1,
        }),
      )
      const agent = this.ctx.agents?.get?.(card.sessionId)
      if (agent) this.applyFullAccess(agent)
    } catch (error) {
      card.status = 'failed'
      card.butlerNote = `无法开工：${truncate(errorText(error), 200)}`
      card.finishedAt = now()
      this.log(job, `卡片「${card.title}」无法开工：${errorText(error)}`, 'error')
      this.save()
      this.pump(job)
    }
  }

  async promptWorker(job, card, text, mode = 'queue') {
    const sessionId = card.sessionId
    if (!sessionId) throw new Error('卡片还没有执行会话')
    const liveAgent = this.ctx.agents?.get?.(sessionId)
    if (liveAgent) this.applyFullAccess(liveAgent)
    await this.ctx.sessionController.prompt(
      {
        requestId: randomUUID(),
        sessionId,
        mode,
        content: [{ type: 'text', text }],
      },
      new AbortController().signal,
    )
    card.lastActivityAt = now()
    this.save()
  }

  bestPreset() {
    if (this.presetResolved) return this.presetName
    const service = this.ctx.get('permissionPresets')
    if (!service?.catalog || !service?.resolve) return null
    this.presetResolved = true
    let fallback = null
    let fallbackLabel = ''
    try {
      const catalog = service.catalog()
      for (const option of catalog?.options || []) {
        try {
          const spec = service.resolve(option.value)
          if (spec?.sandbox !== 'danger-full-access') continue
          if (spec.approval === 'never') {
            this.presetName = option.value
            this.presetLabel = option.name || option.value
            return this.presetName
          }
          if (!fallback) {
            fallback = option.value
            fallbackLabel = option.name || option.value
          }
        } catch {
          /* an unavailable preset must not block the scan */
        }
      }
    } catch {
      return null
    }
    this.presetName = fallback
    this.presetLabel = fallbackLabel
    return this.presetName
  }

  applyFullAccess(agent) {
    if (!this.config.fullAccess || !agent?.id) return
    if (this.accessApplied.has(agent.id)) return
    let approvalOk = false
    try {
      const approval = this.ctx.get('approval')
      if (approval?.setPolicy) {
        approval.setPolicy(agent, 'never')
        approvalOk = true
      }
    } catch (error) {
      console.error('[butler] approval policy failed:', error)
    }
    let presetOk = false
    const preset = this.bestPreset()
    const service = this.ctx.get('permissionPresets')
    if (preset && service?.set) {
      try {
        const session = this.ctx.sessions.get(agent.id)
        if (session) {
          service.set(session, preset)
          presetOk = true
        }
      } catch (error) {
        console.error('[butler] permission preset failed:', error)
      }
    }
    if (approvalOk || presetOk) {
      this.accessApplied.add(agent.id)
      while (this.accessApplied.size > MAX_ACCESS_APPLIED) {
        this.accessApplied.delete(this.accessApplied.values().next().value)
      }
      const label = presetOk ? `最高权限预设「${this.presetLabel || preset}」` : '免审批（未找到最高权限预设）'
      const entry = this.workerCards.get(agent.id)
      const groupJobId = this.sessionGroups.get(agent.id)
      const job = entry ? this.findJob(entry.jobId) : groupJobId ? this.findJob(groupJobId) : null
      if (job) this.log(job, `🔓 会话已开启${label}。`)
    }
  }

  handleAgentCreated(agent) {
    if (!agent?.id) return
    this.installAgentListeners(agent)
    if (this.workerCards.has(agent.id) || this.sessionGroups.has(agent.id)) {
      this.applyFullAccess(agent)
    }
  }

  handleAgentStatus(payload) {
    const agent = payload?.agent
    if (!agent?.id) return
    this.agentStatus.set(agent.id, payload.status)
    const entry = this.workerCards.get(agent.id)
    if (!entry) return
    const job = this.findJob(entry.jobId)
    const card = this.findCard(job, entry.cardId)
    if (!card) return
    card.lastActivityAt = now()
    this.save()
  }

  handleSessionEvent(session, event) {
    if (!session?.id || !event) return
    if (!this.workerCards.has(session.id) && session.header?.cwd && !session.header?.parentSession) {
      this.lastSessionCwd = session.header.cwd
    }
    this.noteSessionActivity(session, event)
    const groupId = this.sessionGroups.get(session.id)
    if (groupId) {
      const group = this.findJob(groupId)
      if (group) this.handleGroupEvent(group, session, event)
    }
    const entry = this.workerCards.get(session.id)
    if (!entry) return
    const job = this.findJob(entry.jobId)
    const card = this.findCard(job, entry.cardId)
    if (!job || !card) return
    card.lastActivityAt = now()
    card.lastEventAt = now()
    if (event.type === 'tool/call') {
      card.toolCalls = (card.toolCalls || 0) + 1
      card.lastTool = event.data?.name || ''
    }
    if (event.type === 'turn/end') {
      const seq = event.seq
      if (card.lastTurnEndSeq !== seq) {
        card.lastTurnEndSeq = seq
        this.track(`${job.id}:${card.id}:end:${seq}`, () => this.onTurnEnd(job, card, event.data?.reason))
      }
    }
    this.save()
  }

  makeSessionCard(text, userSeq) {
    const title = truncate(text.split(/\r?\n/).find((line) => line.trim()) || text, 64)
    return {
      id: randomId('card'),
      kind: 'session',
      title,
      goal: text,
      acceptance: '用户的这次请求得到完整回应；涉及文件或代码改动时有实际落地与验证。',
      status: 'queued',
      imported: false,
      turnOpen: false,
      turn: null,
      userSeq: userSeq || null,
      createdAt: now(),
      startedAt: null,
      finishedAt: null,
      lastActivityAt: now(),
      lastAssistant: '',
      lastTool: '',
      toolCalls: 0,
      attempts: 0,
      stallCount: 0,
      fixRounds: 0,
      butlerNote: '',
      result: null,
      verify: null,
    }
  }

  handleGroupEvent(job, session, event) {
    if (!job || job.kind !== 'session' || this.closed) return
    job.lastActiveAt = now()
    job.updatedAt = now()

    if (job.groupChatOpen) {
      if (event.type === 'turn/start') {
        job.liveTurn = { open: true, turn: event.data?.turn ?? null }
        this.save()
        return
      }
      if (event.type === 'assistant/message') {
        const text = messageText(event.data?.message || event.data)
        if (text) job.groupChatLast = text
        this.save()
        return
      }
      if (event.type === 'turn/end') {
        const reason = event.data?.reason?.kind || 'completed'
        const lastText = job.groupChatLast || ''
        if (lastText) {
          job.chat = [
            ...(job.chat || []),
            { role: 'assistant', text: lastText.slice(0, 2000), at: now() },
          ]
          if (job.chat.length > 40) job.chat.splice(0, job.chat.length - 40)
        }
        job.groupChatOpen = false
        job.groupChatLast = ''
        job.liveTurn = { open: false, turn: event.data?.turn ?? null }
        this.log(
          job,
          `💬 对话组内对话结束${reason !== 'completed' ? `（${reason}）` : ''}。`,
        )
        this.save()
        return
      }
      if (event.type === 'tool/call' || event.type === 'tool/result') {
        this.save()
        return
      }
      if (event.type === 'user/message') {
        const text = messageText(event.data?.message || event.data)
        if (!text || this.isSystemUserText(text)) {
          this.save()
          return
        }
        job.groupChatOpen = false
      } else {
        this.save()
        return
      }
    }

    const latest = job.cards[job.cards.length - 1]
    const current = job.cards.find((card) => card.turnOpen) || latest

    if (event.type === 'user/message') {
      const text = messageText(event.data?.message || event.data)
      if (!text || this.isSystemUserText(text)) {
        this.save()
        return
      }
      if (job.cards.length === 0) {
        job.title = truncate(text.split(/\r?\n/).find((line) => line.trim()) || text, 64)
        job.brief = `工作对话：${job.title}`
        job.updatedAt = now()
      }
      if (latest && latest.userSeq === event.seq) {
        this.save()
        return
      }
      if (latest && latest.turnOpen) {
        latest.goal = `${latest.goal}\n\n${text}`.slice(0, 12000)
        latest.lastActivityAt = now()
        this.save()
        return
      }
      const card = this.makeSessionCard(text, event.seq)
      if (job.liveTurn?.open) {
        card.status = 'running'
        card.turnOpen = true
        card.turn = job.liveTurn.turn
        card.startedAt = now()
        card.lastActivityAt = now()
      }
      job.cards.push(card)
      if (job.cards.length > 40) job.cards.splice(0, job.cards.length - 40)
      this.log(job, `收到新的工作请求：${card.title}`)
      this.save()
      return
    }

    if (event.type === 'turn/start') {
      job.liveTurn = { open: true, turn: event.data?.turn ?? null }
      const target = [...job.cards]
        .reverse()
        .find((card) => card.status === 'queued' || (card.status === 'running' && !card.turnOpen))
      if (target) {
        target.turn = event.data?.turn ?? target.turn
        target.status = 'running'
        target.turnOpen = true
        target.startedAt = target.startedAt || event.time || now()
        target.lastActivityAt = now()
      }
      this.save()
      return
    }

    if (!current) {
      this.save()
      return
    }

    if (event.type === 'tool/call') {
      current.toolCalls = (current.toolCalls || 0) + 1
      current.lastTool = event.data?.name || current.lastTool
      current.lastActivityAt = now()
      if (event.data?.name === 'ask_user_question' && !current.needsUser?.requestId) {
        const args = parseJsonLoose(event.data?.arguments)
        const question = Array.isArray(args?.questions) ? args.questions[0] : args
        const options = Array.isArray(question?.options)
          ? question.options
              .slice(0, 6)
              .map((option) => asString(option?.label || option?.text || option?.value || option))
              .filter(Boolean)
          : []
        current.needsUser = {
          type: 'question',
          callId: event.data?.callId || null,
          title: asString(question?.header || question?.question || '等待你的回答').slice(0, 160),
          detail: asString(question?.question || '').slice(0, 800),
          options,
          at: now(),
        }
        this.log(job, `⏸ 任务「${current.title}」等待你在对话中回答。`, 'warn')
      }
    } else if (event.type === 'tool/result') {
      for (const card of job.cards) {
        if (card.needsUser) card.needsUser = null
      }
      current.lastActivityAt = now()
    } else if (event.type === 'assistant/message') {
      const text = messageText(event.data?.message || event.data)
      if (text) current.lastAssistant = text
      current.lastActivityAt = now()
    } else if (event.type === 'turn/end') {
      job.liveTurn = { open: false, turn: event.data?.turn ?? job.liveTurn?.turn ?? null }
      const target =
        job.cards.find((card) => card.turn === event.data?.turn && card.turnOpen) ||
        job.cards.find((card) => card.turnOpen) ||
        current
      if (target.cancelling) {
        target.turnOpen = false
        this.save()
        return
      }
      if (target.suppressEndUntil && now() < target.suppressEndUntil) {
        target.turnOpen = false
        target.suppressEndUntil = 0
        this.save()
        return
      }
      target.turnOpen = false
      for (const card of job.cards) {
        if (card.needsUser) card.needsUser = null
      }
      target.finishedAt = event.time || now()
      target.lastActivityAt = now()
      const reason = event.data?.reason?.kind || 'completed'
      const lastText = target.lastAssistant || lastAssistantText(session)
      target.result = {
        status: reason === 'completed' ? 'done' : 'blocked',
        summary: truncate(lastText || '本轮结束，没有留下可读的总结。', 900),
        evidence: target.lastTool ? [target.lastTool] : [],
        open: [],
        lastText: (lastText || '').slice(0, 3000),
        at: now(),
      }
      const chatCard = job.chatTarget ? this.findCard(job, job.chatTarget) : null
      if (chatCard) {
        if (lastText) {
          chatCard.chat = [
            ...(chatCard.chat || []),
            { role: 'assistant', text: lastText.slice(0, 2000), at: now() },
          ]
          if (chatCard.chat.length > 40) chatCard.chat.splice(0, chatCard.chat.length - 40)
        }
        job.chatTarget = null
        if (chatCard.chatMode) {
          chatCard.chatMode = false
          chatCard.status = reason === 'completed' ? 'done' : 'failed'
          chatCard.finishedAt = now()
          chatCard.butlerNote = reason === 'completed' ? '' : `对话结束：${reason}`
          this.log(job, `💬 卡片「${chatCard.title}」内对话结束。`)
          this.save()
          return
        }
      }
      if (reason !== 'completed') {
        target.status = 'failed'
        target.butlerNote = `本轮结束：${reason}`
        this.log(job, `卡片「${target.title}」本轮结束（${reason}），等待你的下一步。`, 'warn')
        this.save()
        return
      }
      target.butlerNote = ''
      target.status = 'verifying'
      this.save()
      void this.verifyGroupCard(job, target)
      return
    }
    this.save()
  }

  resolveInteractionTarget(agentId) {
    const jobId = this.sessionGroups.get(agentId)
    if (jobId) {
      const job = this.findJob(jobId)
      if (!job) return null
      const card =
        [...job.cards].reverse().find((item) => item.turnOpen || item.status === 'running') ||
        job.cards[job.cards.length - 1]
      return card ? { job, card } : null
    }
    const entry = this.workerCards.get(agentId)
    if (!entry) return null
    const job = this.findJob(entry.jobId)
    const card = job ? this.findCard(job, entry.cardId) : null
    return job && card ? { job, card } : null
  }

  claimApproval(req) {
    const existing = this.requestClaims.get(req)
    if (existing) return existing
    const target = this.resolveInteractionTarget(req?.agent?.id)
    if (!target) return null
    const { job, card } = target
    const requestId = randomUUID()
    let settle = null
    const promise = new Promise((resolve) => {
      settle = resolve
    })
    this.requestClaims.set(req, promise)
    const pending = { kind: 'approval', requestId, jobId: job.id, cardId: card.id, resolve: settle }
    this.pendingInteractions.set(requestId, pending)
    card.needsUser = {
      type: 'approval',
      requestId,
      toolName: req.toolName || '',
      title: `等待权限确认：${req.toolName || '工具'}`,
      detail: asString(req.reason || '').slice(0, 800),
      options: [
        { label: '允许一次', value: 'allowed-once' },
        { label: '拒绝', value: 'rejected' },
      ],
      at: now(),
    }
    const abort = () => this.finishInteraction(requestId, 'cancelled')
    if (req.signal) {
      if (req.signal.aborted) abort()
      else req.signal.addEventListener('abort', abort, { once: true })
    }
    job.updatedAt = now()
    this.log(job, `⏸ 等待你在卡片工坊内确认：${req.toolName || '工具'}`, 'warn')
    this.save()
    return promise
  }

  installAgentListeners(agent) {
    if (!agent?.id || this.scopedListeners.has(agent.id)) return
    const contexts = [...new Set([agent.ctx, agent.loopCtx].filter((ctx) => ctx && typeof ctx.on === 'function'))]
    if (!contexts.length) return
    const disposers = []
    try {
      for (const context of contexts) {
        disposers.push(
          context.on('approval/request', (request, next) => {
            let claimed = null
            try {
              claimed = this.claimApproval(request)
            } catch (error) {
              console.error('[butler] scoped approval failed:', error)
            }
            return claimed || next()
          }),
        )
        disposers.push(
          context.on('user-questions/request', (request, next) => {
            let claimed = null
            try {
              this.debugQuestionEvent(agent, request)
              claimed = this.claimQuestion(
                request?.agent ? request : { ...request, agent: { id: agent.id } },
              )
            } catch (error) {
              console.error('[butler] scoped question failed:', error)
            }
            return claimed || next()
          }),
        )
      }
      this.scopedListeners.set(agent.id, disposers)
    } catch (error) {
      console.error('[butler] scoped listeners failed:', error)
      for (const dispose of disposers) {
        try {
          dispose()
        } catch {
          /* best-effort */
        }
      }
    }
  }

  listenerDebug() {
    let agents = []
    let error = null
    try {
      agents = this.ctx.agents.list().map((agent) => ({
        id: agent.id,
        keys: Object.keys(agent).slice(0, 20),
        hasCtx: Boolean(agent.ctx),
        ctxKeys: agent.ctx ? Object.keys(agent.ctx).slice(0, 20) : [],
      }))
    } catch (caught) {
      error = errorText(caught)
    }
    return {
      scopedListeners: this.scopedListeners.size,
      agents,
      error,
      questionDebug: this.questionDebug,
    }
  }

  debugQuestionEvent(scope, req) {
    this.questionDebug = {
      count: (this.questionDebug?.count || 0) + 1,
      at: now(),
      thisId: scope?.id || null,
      thisKeys: Object.keys(scope || {}).slice(0, 24),
      agentId: req?.agent?.id || null,
      callId: req?.wait?.callId || null,
      hasQuestions: Array.isArray(req?.questions) ? req.questions.length : 0,
    }
  }

  claimQuestion(req) {
    const existing = this.requestClaims.get(req)
    if (existing) return existing
    let target = this.resolveInteractionTarget(req?.agent?.id)
    if (!target && req?.wait?.callId) {
      for (const job of this.board.jobs) {
        for (const card of job.cards || []) {
          if (card.needsUser?.callId === req.wait.callId) {
            target = { job, card }
            break
          }
        }
        if (target) break
      }
    }
    if (!target) return null
    const { job, card } = target
    const questions = (Array.isArray(req.questions) ? req.questions : []).map((question, index) => ({
      id: asString(question?.id) || `question-${index + 1}`,
      question: asString(question?.question),
      header: asString(question?.header),
      detail: asString(question?.detail),
      multiSelect: Boolean(question?.multiSelect),
      options: (Array.isArray(question?.options) ? question.options : []).map((option) =>
        typeof option === 'string' ? { label: option } : {
          label: asString(option?.label),
          description: asString(option?.description),
        },
      ),
    }))
    if (!questions.length) return null
    const requestId = randomUUID()
    let settle = null
    const promise = new Promise((resolve) => {
      settle = resolve
    })
    this.requestClaims.set(req, promise)
    const pending = { kind: 'question', requestId, jobId: job.id, cardId: card.id, resolve: settle }
    this.pendingInteractions.set(requestId, pending)
    card.needsUser = {
      type: 'question',
      requestId,
      callId: req.wait?.callId || null,
      title: questions[0].header || questions[0].question || '等待你的选择',
      detail: questions[0].detail || '',
      questions,
      options: questions[0].options.map((option) => option.label),
      at: now(),
    }
    const abort = () => this.finishInteraction(requestId, { answers: [] })
    if (req.signal) {
      if (req.signal.aborted) abort()
      else req.signal.addEventListener('abort', abort, { once: true })
    }
    job.updatedAt = now()
    this.log(job, `⏸ 等待你在卡片工坊内选择：${card.needsUser.title}`, 'warn')
    this.save()
    return promise
  }

  finishInteraction(requestId, result) {
    const pending = this.pendingInteractions.get(requestId)
    if (!pending) return false
    this.pendingInteractions.delete(requestId)
    const job = this.findJob(pending.jobId)
    const card = job ? this.findCard(job, pending.cardId) : null
    if (card?.needsUser?.requestId === requestId) card.needsUser = null
    if (job) {
      job.updatedAt = now()
      this.save()
    }
    pending.resolve(result)
    return true
  }

  async resolveInteraction(jobId, cardId, requestId, { decision, answers } = {}) {
    const pending = this.pendingInteractions.get(requestId)
    if (!pending) throw new Error('这个确认已经失效，请刷新')
    if (pending.jobId !== jobId || pending.cardId !== cardId) throw new Error('确认不属于这张卡')
    let result
    if (pending.kind === 'approval') {
      result = decision === 'allowed-once' ? 'allowed-once' : 'rejected'
    } else {
      const list = (Array.isArray(answers) ? answers : [])
        .map((item) => ({
          id: asString(item?.id),
          selected: (Array.isArray(item?.selected) ? item.selected : [])
            .map((value) => asString(value))
            .filter(Boolean),
          ...(asString(item?.custom) ? { custom: asString(item.custom) } : {}),
        }))
        .filter((item) => item.id)
      result = { answers: list }
    }
    this.finishInteraction(requestId, result)
    return this.jobView(this.findJob(jobId))
  }

  cancelPendingForJob(jobId) {
    for (const [requestId, pending] of [...this.pendingInteractions]) {
      if (pending.jobId !== jobId) continue
      this.finishInteraction(
        requestId,
        pending.kind === 'approval' ? 'cancelled' : { answers: [] },
      )
    }
  }

  async promptSession(job, card, text, mode = 'queue') {
    if (!job?.sessionId) throw new Error('对话组没有绑定会话')
    await this.ctx.sessionController.prompt(
      {
        requestId: randomUUID(),
        sessionId: job.sessionId,
        mode,
        content: [{ type: 'text', text }],
      },
      new AbortController().signal,
    )
    if (card) card.lastActivityAt = now()
    this.save()
  }

  verifyGroupCard(job, card, { manual = false } = {}) {
    if (!job || job.kind !== 'session' || this.closed) return Promise.resolve()
    const key = `${job.id}:${card.id}:gverify`
    return this.track(key, async () => {
      if (!this.findJob(job.id)) return
      if (card.imported && !manual) {
        card.status = 'done'
        card.finishedAt = card.finishedAt || now()
        this.save()
        return
      }
      if (!manual && !this.board.settings?.verifyConversations) {
        card.status = 'done'
        card.finishedAt = now()
        card.butlerNote = '对话核对已关闭'
        this.save()
        return
      }
      if (job.status === 'paused') {
        card.status = 'done'
        card.finishedAt = now()
        card.butlerNote = '已暂停，跳过核对'
        this.save()
        return
      }
      if (!manual && !(card.toolCalls > 0 || this.isWorkText(card.goal))) {
        card.status = 'done'
        card.finishedAt = now()
        card.verify = { pass: true, score: 80, summary: '聊天式回答，无需核对', gaps: [], at: now() }
        this.save()
        return
      }
      card.status = 'verifying'
      card.butlerNote = '管家核对中…'
      this.log(job, `🔍 对话卡片「${card.title}」本轮结束，管家开始核对。`)
      this.save()
      let files = ''
      try {
        files = await this.describeChanges(job.cwd, card.startedAt || job.createdAt)
      } catch {
        files = ''
      }
      let verdict = null
      try {
        const response = await this.model.complete({
          system: prompts.verifySystem(),
          prompt: prompts.sessionVerifyUser({
            card,
            report: card.result,
            evidenceCheck: '（对话轮次没有单独的路径证据，以下为管家直接读到的事实）',
            files,
          }),
          maxTokens: 1800,
          label: '对话核对',
        })
        verdict = parseJsonLoose(response.text)
      } catch (error) {
        this.log(job, `对话核对模型不可用（${errorText(error)}），按本轮结果放行。`, 'warn')
      }
      if (!verdict || typeof verdict !== 'object') {
        card.status = 'done'
        card.finishedAt = now()
        card.verify = {
          pass: true,
          score: 60,
          summary: '核对模型不可用，按本轮结果放行',
          gaps: [],
          at: now(),
        }
        this.save()
        return
      }
      const pass = verdict.pass === true
      const gaps = asStringArray(verdict.gaps, 6)
      card.verify = {
        pass,
        score: Number.isFinite(Number(verdict.score)) ? Number(verdict.score) : pass ? 80 : 0,
        summary: asString(verdict.summary) || (pass ? '通过核对' : '未通过核对'),
        gaps,
        at: now(),
      }
      if (pass) {
        card.status = 'done'
        card.finishedAt = now()
        card.butlerNote = ''
        this.log(job, `✅ 对话卡片「${card.title}」通过核对：${card.verify.summary}`)
        this.save()
        return
      }
      if ((card.fixRounds || 0) < 1) {
        card.fixRounds = 1
        card.imported = false
        card.status = 'running'
        card.turnOpen = false
        card.lastActivityAt = now()
        card.butlerNote = truncate(gaps.join('；') || card.verify.summary, 220)
        this.log(job, `↻ 对话卡片「${card.title}」核对未通过，管家在原对话里继续盯办。`, 'warn')
        this.save()
        try {
          await this.promptSession(
            job,
            card,
            prompts.sessionFixPrompt({ card, gaps, round: 1 }),
            'queue',
          )
        } catch (error) {
          card.status = 'failed'
          card.butlerNote = `退回失败：${errorText(error)}`
          this.log(job, `对话卡片「${card.title}」退回失败：${errorText(error)}`, 'error')
          this.save()
        }
        return
      }
      card.status = 'done'
      card.finishedAt = now()
      card.butlerNote = truncate(gaps.join('；') || card.verify.summary, 220)
      this.log(job, `对话卡片「${card.title}」核对仍有缺口，已记录在卡片上。`, 'warn')
      this.save()
    })
  }

  async sendGroupMessage(jobId, message) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('对话组不存在')
    if (job.kind !== 'session' || !job.sessionId) throw new Error('这个对话组没有可对话的会话')
    if (job.liveTurn?.open) throw new Error('这个对话正在执行任务，等本轮结束后再聊')
    const text = asString(message)
    if (!text) throw new Error('请输入要对话的内容')
    job.chat = [...(job.chat || []), { role: 'user', text: text.slice(0, 4000), at: now() }]
    if (job.chat.length > 40) job.chat.splice(0, job.chat.length - 40)
    job.groupChatOpen = true
    job.groupChatLast = ''
    this.log(job, `💬 对话组内对话：${truncate(text, 60)}`)
    this.save()
    try {
      // Send the raw question so the session event is treated as a work turn and
      // materialises as a timeline card; do not prefix it as a system chat message.
      await this.promptSession(job, null, text, 'queue')
    } catch (error) {
      job.groupChatOpen = false
      job.groupChatLast = ''
      this.log(job, `对话组内对话发送失败：${errorText(error)}`, 'error')
      this.save()
      throw error
    }
    this.save()
    return this.jobView(job)
  }

  async sendCardMessage(jobId, cardId, message) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('工作不存在')
    const card = this.findCard(job, cardId)
    if (!card) throw new Error('卡片不存在')
    if (!job.sessionId) throw new Error('这张卡没有可对话的会话')
    if (card.status === 'verifying') throw new Error('这张卡正在核对，请稍后再对话')
    const text = asString(message)
    if (!text) throw new Error('请输入要对话的内容')
    const wasIdle = !(card.status === 'running' && card.turnOpen)
    card.chat = [...(card.chat || []), { role: 'user', text: text.slice(0, 4000), at: now() }]
    if (card.chat.length > 40) card.chat.splice(0, card.chat.length - 40)
    job.chatTarget = card.id
    card.chatMode = wasIdle
    card.needsUser = null
    card.lastActivityAt = now()
    if (wasIdle) {
      card.status = 'running'
      card.turnOpen = false
      card.finishedAt = null
    }
    this.log(job, `💬 卡片「${card.title}」内对话：${truncate(text, 60)}`)
    this.save()
    try {
      await this.promptSession(
        job,
        card,
        `【总管家对话】${text}`,
        card.turnOpen ? 'steer' : 'queue',
      )
    } catch (error) {
      job.chatTarget = null
      card.chatMode = false
      card.status = 'failed'
      card.butlerNote = `卡片内对话发送失败：${errorText(error)}`
      this.log(job, `卡片「${card.title}」内对话发送失败：${errorText(error)}`, 'error')
      this.save()
      throw error
    }
    this.save()
    return this.jobView(job)
  }

  async reviseCard(jobId, cardId, instruction) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('工作不存在')
    const card = this.findCard(job, cardId)
    if (!card) throw new Error('卡片不存在')
    const text = asString(instruction)
    if (!text) throw new Error('请说明希望怎么修改')
    if (card.status === 'verifying') throw new Error('这张卡正在核对，请稍后再提交返工')
    card.goal = `${card.goal || ''}\n\n【用户返工要求】${text}`.slice(0, 16000)
    card.revisions = [...(card.revisions || []), { at: now(), instruction: text.slice(0, 4000) }]
    card.imported = false
    card.needsUser = null
    card.verify = null
    card.finishedAt = null
    card.startedAt = card.startedAt || now()
    card.lastActivityAt = now()
    card.butlerNote = '已提交返工，等待执行'
    card.status = 'running'
    this.log(job, `↻ 用户对任务「${card.title}」提交返工：${truncate(text, 80)}`)
    this.save()
    try {
      if (job.kind === 'session') {
        const mode = card.turnOpen ? 'steer' : 'queue'
        await this.promptSession(
          job,
          card,
          prompts.revisionPrompt({ card, instruction: text }),
          mode,
        )
      } else {
        if (!card.sessionId) throw new Error('这张卡还没有执行会话')
        card.attempts = (card.attempts || 0) + 1
        await this.promptWorker(
          job,
          card,
          prompts.revisionWorkerPrompt({ card, instruction: text }),
        )
      }
    } catch (error) {
      card.status = 'failed'
      card.butlerNote = `返工提交失败：${errorText(error)}`
      this.log(job, `任务「${card.title}」返工提交失败：${errorText(error)}`, 'error')
      this.save()
      throw error
    }
    this.save()
    return this.jobView(job)
  }

  nudgeGroupCard(jobId, cardId) {    const job = this.findJob(jobId)
    if (!job) throw new Error('对话组不存在')
    if (job.kind !== 'session') throw new Error('只有对话卡片支持催办')
    const card = this.findCard(job, cardId)
    if (!card) throw new Error('卡片不存在')
    if (TERMINAL_CARD.has(card.status)) throw new Error('这张卡已经结束')
    card.attempts = (card.attempts || 0) + 1
    card.butlerNote = '管家已催办，等待回应'
    this.log(job, `📣 已催办对话卡片「${card.title}」。`)
    this.save()
    const mode = card.turnOpen ? 'steer' : 'queue'
    this.track(`${job.id}:${card.id}:nudge`, async () => {
      try {
        await this.promptSession(job, card, prompts.sessionNudgePrompt({ card, lastTool: card.lastTool }), mode)
        card.lastActivityAt = now()
      } catch (error) {
        card.butlerNote = `催办失败：${errorText(error)}`
        this.log(job, `催办失败：${errorText(error)}`, 'error')
      }
      this.save()
    })
    return this.jobView(job)
  }

  async handleSessionStall(job, card, idleMs) {
    if (!job || job.kind !== 'session' || this.closed) return
    if (!this.board.settings?.nudgeConversations) return
    if (card.status !== 'running' || card.cancelling) return
    if (card.suppressEndUntil && now() < card.suppressEndUntil) return
    const turnOpen = Boolean(card.turnOpen)
    card.stallCount = (card.stallCount || 0) + 1
    if (card.stallCount === 1) {
      card.lastActivityAt = now()
      this.log(
        job,
        `⏳ 对话卡片「${card.title}」已 ${formatDuration(idleMs)} 没有新进展，管家先催办一次。`,
        'warn',
      )
      try {
        await this.promptSession(
          job,
          card,
          prompts.sessionStallPrompt({ card, attempt: 1, lastTool: card.lastTool }),
          turnOpen ? 'steer' : 'queue',
        )
        card.butlerNote = '管家已催办，等待回应'
      } catch (error) {
        card.butlerNote = `催办失败：${errorText(error)}`
        this.log(job, `催办失败：${errorText(error)}`, 'error')
      }
      this.save()
      return
    }
    if (card.stallCount < this.config.maxStalls) {
      card.cancelling = true
      this.log(
        job,
        `⏳ 对话卡片「${card.title}」仍无进展，管家${turnOpen ? '中断并续跑' : '再次催办'}（第 ${card.stallCount} 次）。`,
        'warn',
      )
      this.save()
      if (turnOpen) {
        try {
          this.ctx.sessionController.cancel({ sessionId: job.sessionId })
        } catch (error) {
          console.error('[butler] cancel conversation failed:', error)
        }
        await new Promise((resolve) => setTimeout(resolve, 1400))
        card.turnOpen = false
        card.suppressEndUntil = now() + 6000
      }
      card.cancelling = false
      card.lastActivityAt = now()
      try {
        await this.promptSession(
          job,
          card,
          prompts.sessionStallPrompt({ card, attempt: card.stallCount, lastTool: card.lastTool }),
          'queue',
        )
        card.butlerNote = turnOpen ? '管家已中断并续跑' : '管家已再次催办'
      } catch (error) {
        card.status = 'failed'
        card.butlerNote = `续跑失败：${errorText(error)}`
        this.log(job, `对话卡片「${card.title}」续跑失败：${errorText(error)}`, 'error')
      }
      this.save()
      return
    }
    card.status = 'failed'
    card.finishedAt = now()
    card.butlerNote = `连续 ${card.stallCount} 次无进展，已停止自动催办`
    this.log(job, `对话卡片「${card.title}」连续无进展，已停止自动催办。`, 'error')
    this.save()
  }

  track(key, task) {
    if (this.processing.has(key)) return this.processing.get(key)
    const promise = Promise.resolve()
      .then(task)
      .catch((error) => console.error(`[butler] task ${key} failed:`, error))
      .finally(() => this.processing.delete(key))
    this.processing.set(key, promise)
    return promise
  }

  async onTurnEnd(job, card, reason) {
    if (this.closed || !this.findJob(job.id)) return
    if (card.cancelling) return
    if (card.suppressEndUntil && now() < card.suppressEndUntil) return
    card.everRan = true
    if (TERMINAL_CARD.has(card.status) || card.status === 'verifying') return
    const reasonKind = reason?.kind || 'completed'
    const session = this.ctx.sessions.get(card.sessionId)
    const texts = recentAssistantTexts(session, 4)
    const lastText = texts.length ? texts[texts.length - 1] : ''
    let report = null
    for (let i = texts.length - 1; i >= 0 && !report; i -= 1) {
      report = extractTaggedJson(texts[i])
    }

    if (report) {
      card.result = {
        status: asString(report.status).toLowerCase() === 'blocked' ? 'blocked' : 'done',
        summary: asString(report.summary).slice(0, 1200),
        evidence: asStringArray(report.evidence, 12),
        open: asStringArray(report.open, 12),
        lastText: lastText.slice(0, 3000),
        at: now(),
      }
      if (card.result.status === 'blocked') {
        card.butlerNote = truncate(card.result.open.join('；') || card.result.summary, 200)
        if ((card.attempts || 0) < this.config.maxAttempts) {
          card.attempts = (card.attempts || 0) + 1
          card.status = 'running'
          card.lastActivityAt = now()
          this.log(job, `卡片「${card.title}」报告受阻，管家自动带着缺口继续盯办。`, 'warn')
          await this.promptWorker(
            job,
            card,
            prompts.fixPrompt({
              card,
              gaps: card.result.open.length ? card.result.open : [card.result.summary],
              round: card.attempts,
            }),
          )
        } else {
          card.status = 'failed'
          card.finishedAt = now()
          this.log(job, `卡片「${card.title}」多次受阻，已标记失败并转到终审。`, 'error')
          this.pump(job)
        }
        this.save()
        return
      }
      card.status = 'verifying'
      this.save()
      await this.verifyCard(job, card, { reason: '交付完成' })
      return
    }

    if (reasonKind !== 'completed') {
      card.status = 'stalled'
      card.butlerNote = `执行中断（${reasonKind}）`
      if ((card.attempts || 0) < this.config.maxAttempts) {
        this.log(job, `卡片「${card.title}」执行中断（${reasonKind}），管家自动续跑。`, 'warn')
        setTimeout(() => void this.resumeStalled(job, card), 1200)
      } else {
        card.status = 'failed'
        card.finishedAt = now()
        this.log(job, `卡片「${card.title}」中断次数过多，已标记失败。`, 'error')
        this.pump(job)
      }
      this.save()
      return
    }

    if ((card.attempts || 0) < 2 && lastText) {
      card.attempts = (card.attempts || 0) + 1
      card.status = 'running'
      card.lastActivityAt = now()
      card.butlerNote = '未按格式交结果，已要求补交'
      this.log(job, `卡片「${card.title}」结束时没有结果块，管家自动要求补交。`, 'warn')
      await this.promptWorker(job, card, prompts.reportPrompt())
      this.save()
      return
    }

    card.result = {
      status: 'done',
      summary: truncate(lastText || '执行者没有留下可读的总结。', 800),
      evidence: [],
      open: [],
      lastText: lastText.slice(0, 3000),
      at: now(),
    }
    card.status = 'verifying'
    card.butlerNote = '没有结果块，按最后发言进入核对'
    this.save()
    await this.verifyCard(job, card, { reason: '按最后发言核对' })
  }

  async resumeStalled(job, card) {
    if (this.closed || !this.findJob(job.id) || !this.findCard(job, card.id)) return
    if (TERMINAL_CARD.has(card.status) || card.status === 'running' || card.status === 'verifying') return
    if (!card.sessionId) {
      card.status = 'queued'
      this.pump(job)
      return
    }
    card.attempts = (card.attempts || 0) + 1
    card.status = 'running'
    card.lastActivityAt = now()
    this.log(job, `↻ 卡片「${card.title}」续跑（第 ${card.attempts} 次）`)
    try {
      await this.promptWorker(
        job,
        card,
        prompts.stallPrompt({ card, attempt: card.attempts, lastTool: card.lastTool }),
      )
      card.butlerNote = ''
    } catch (error) {
      card.status = 'failed'
      card.butlerNote = `续跑失败：${errorText(error)}`
      card.finishedAt = now()
      this.log(job, `卡片「${card.title}」续跑失败：${errorText(error)}`, 'error')
      this.pump(job)
    }
    this.save()
  }

  async verifyCard(job, card, { reason = '管家核对' } = {}) {
    if (this.closed || !this.findJob(job.id)) return
    const key = `${job.id}:${card.id}:verify`
    return this.track(key, async () => {
      card.status = 'verifying'
      card.butlerNote = '管家核对中…'
      this.log(job, `🔍 卡片「${card.title}」完成，管家开始核对（${reason}）。`)
      this.save()
      const result = card.result || {}
      let evidenceCheck = ''
      let files = ''
      try {
        evidenceCheck = await this.describeEvidence(job.cwd, result.evidence || [])
        files = await this.describeChanges(job.cwd, job.createdAt)
      } catch (error) {
        evidenceCheck = `（证据检查失败：${errorText(error)}）`
      }

      let verdict = null
      try {
        const response = await this.model.complete({
          system: prompts.verifySystem(),
          prompt: prompts.verifyUser({
            brief: job.brief,
            card,
            report: result,
            evidenceCheck,
            files,
          }),
          maxTokens: 1800,
          label: '核对',
        })
        verdict = parseJsonLoose(response.text)
      } catch (error) {
        this.log(job, `核对模型不可用（${errorText(error)}），按交付结果放行。`, 'warn')
      }

      if (!verdict || typeof verdict !== 'object') {
        verdict = {
          pass: result.status === 'done',
          score: result.status === 'done' ? 60 : 0,
          summary: '核对输出不可用，按执行者交回的状态处理。',
          gaps: result.status === 'done' ? [] : ['核对未通过，请补齐交付并给出证据。'],
        }
      }

      const pass = verdict.pass === true && result.status !== 'blocked'
      const gaps = asStringArray(verdict.gaps, 8)
      card.verify = {
        pass,
        score: Number.isFinite(Number(verdict.score)) ? Number(verdict.score) : pass ? 80 : 0,
        summary: asString(verdict.summary) || (pass ? '通过核对' : '未通过核对'),
        gaps,
        at: now(),
      }

      if (pass) {
        card.status = 'done'
        card.finishedAt = now()
        card.butlerNote = ''
        this.log(job, `✅ 卡片「${card.title}」通过核对：${card.verify.summary}`)
        this.save()
        this.pump(job)
        return
      }

      if ((card.fixRounds || 0) < this.config.maxFixRounds) {
        card.fixRounds = (card.fixRounds || 0) + 1
        card.status = 'running'
        card.lastActivityAt = now()
        card.butlerNote = truncate(gaps.join('；') || card.verify.summary, 220)
        this.log(
          job,
          `↻ 卡片「${card.title}」未通过核对（第 ${card.fixRounds} 轮），管家已把缺口退回继续做。`,
          'warn',
        )
        this.save()
        try {
          await this.promptWorker(
            job,
            card,
            prompts.fixPrompt({ card, gaps, round: card.fixRounds }),
          )
        } catch (error) {
          card.status = 'failed'
          card.finishedAt = now()
          this.log(job, `卡片「${card.title}」退回失败：${errorText(error)}`, 'error')
          this.pump(job)
        }
        return
      }

      card.status = 'failed'
      card.finishedAt = now()
      card.butlerNote = truncate(gaps.join('；') || card.verify.summary, 220)
      this.log(job, `卡片「${card.title}」补齐轮次用完仍未通过，已标记失败并转到终审。`, 'error')
      this.save()
      this.pump(job)
    })
  }

  async auditJob(job) {
    if (this.closed || !this.findJob(job.id)) return
    if (job.kind === 'session') return
    if (job.status === 'done') return
    if (!job.cards.length || !job.cards.every((card) => TERMINAL_CARD.has(card.status))) return
    if (job.cards.every((card) => card.status === 'failed' && !card.everRan)) {
      job.status = 'paused'
      job.butlerNote = '所有卡片都没能真正开工（可能是创建会话或派单失败），已暂停等待修复后重试。'
      this.log(job, '没有卡片真正跑起来，停止自动补卡并暂停；请查看日志后排错重试。', 'error')
      this.save()
      return
    }
    const key = `${job.id}:audit`
    return this.track(key, async () => {
      job.status = 'verifying'
      job.butlerNote = ''
      this.log(job, '📋 所有卡片已跑完，卡片工坊开始整体终审…')
      this.save()
      let files = ''
      try {
        files = await this.describeChanges(job.cwd, job.createdAt)
      } catch {
        files = ''
      }
      let verdict = null
      try {
        const response = await this.model.complete({
          system: prompts.auditSystem(),
          prompt: prompts.auditUser({ brief: job.brief, cards: job.cards, files }),
          maxTokens: 2200,
          label: '终审',
        })
        verdict = parseJsonLoose(response.text)
      } catch (error) {
        this.log(job, `终审模型不可用（${errorText(error)}）。`, 'warn')
      }

      if (!verdict || typeof verdict !== 'object') {
        const failed = job.cards.filter((card) => card.status === 'failed').length
        if (failed === 0) {
          job.status = 'done'
          job.finishedAt = now()
          job.butlerNote = '终审模型不可用，按卡片核对结果收尾。'
          this.log(job, '🏁 终审模型不可用，但所有卡片均通过核对，工作收尾。', 'warn')
        } else {
          job.status = 'paused'
          job.butlerNote = '有卡片失败，且终审模型不可用；请查看日志后手动续跑或补卡。'
          this.log(job, '终审不可用，工作暂停等待人工确认。', 'error')
        }
        this.save()
        return
      }

      if (verdict.complete === true) {
        job.status = 'done'
        job.finishedAt = now()
        job.summary = asString(verdict.summary) || job.summary
        job.butlerNote = ''
        this.log(job, `🏁 卡片工坊终审通过：${asString(verdict.summary) || '工作已完整交付。'}`)
        this.save()
        return
      }

      const missing = Array.isArray(verdict.missing) ? verdict.missing : []
      if (!missing.length) {
        job.status = 'done'
        job.finishedAt = now()
        job.butlerNote = '终审判定未完成但未列出缺口，按现有交付收尾。'
        this.log(job, '终审未通过但没有给出可执行的缺口，工作先收尾。', 'warn')
        this.save()
        return
      }

      if ((job.gapRounds || 0) >= this.config.maxGapRounds || job.cards.length >= this.config.maxCards * 2) {
        job.status = 'paused'
        job.butlerNote = `终审还发现 ${missing.length} 项缺口，但补卡轮次已用完；请查看日志后决定是否继续。`
        this.log(job, `终审还发现 ${missing.length} 项缺口，但补卡轮次已用完，工作暂停待确认。`, 'error')
        this.save()
        return
      }

      job.gapRounds = (job.gapRounds || 0) + 1
      const createdAt = now()
      const additions = missing
        .map((item, index) => normalizeCard(item, index))
        .filter((item) => item.title && item.goal)
        .slice(0, Math.max(1, this.config.maxCards))
        .map((item) => ({
          id: randomId('card'),
          title: item.title,
          goal: item.goal,
          acceptance: item.acceptance,
          deliverables: item.deliverables,
          status: 'queued',
          createdAt,
          attempts: 0,
          stallCount: 0,
          fixRounds: 0,
          toolCalls: 0,
          lastActivityAt: createdAt,
          result: null,
          verify: null,
          butlerNote: `终审补卡（第 ${job.gapRounds} 轮）`,
          gapCard: true,
        }))
      if (!additions.length) {
        job.status = 'paused'
        job.butlerNote = '终审缺口无法转成卡片，等待人工处理。'
        this.save()
        return
      }
      job.cards.push(...additions)
      job.status = 'running'
      job.butlerNote = ''
      this.log(
        job,
        `🧩 终审发现 ${additions.length} 项未完成，卡片工坊已自动补卡并继续盯办：${additions
          .map((card) => `「${card.title}」`)
          .join('、')}`,
      )
      this.save()
      this.pump(job)
    })
  }

  async tick() {
    if (!this.ready || this.closed || this.tickBusy) return
    this.tickBusy = true
    try {
      const timestamp = now()
      if (timestamp - this.lastPruneAt > 60_000) {
        this.lastPruneAt = timestamp
        void this.pruneMissingGroups()
      }
      if (timestamp - this.lastCatalogAt > 60_000) {
        this.lastCatalogAt = timestamp
        void this.refreshModelCatalog()
      }
      if (timestamp - this.lastPermissionAt > 60_000) {
        this.lastPermissionAt = timestamp
        this.refreshPermissionCatalog()
      }
      for (const job of this.board.jobs) {
        if (job.kind === 'session') {
          if (job.status !== 'watching') continue
          for (const card of job.cards) {
            if (card.status !== 'running' || card.cancelling) continue
            const idleMs = timestamp - (card.lastActivityAt || timestamp)
            if (idleMs < this.config.stallMs) continue
            const key = `${job.id}:${card.id}:sstall`
            if (this.processing.has(key)) continue
            void this.track(key, () => this.handleSessionStall(job, card, idleMs))
          }
          continue
        }
        if (job.status === 'running' || job.status === 'verifying') {
          for (const card of job.cards) {
            if (card.status !== 'running' && card.status !== 'fixing') continue
            if (card.cancelling || !card.sessionId) continue
            const idleMs = timestamp - (card.lastActivityAt || card.startedAt || timestamp)
            if (idleMs < this.config.stallMs) continue
            const key = `${job.id}:${card.id}:stall`
            if (this.processing.has(key)) continue
            void this.track(key, () => this.handleStall(job, card, idleMs))
          }
          this.pump(job)
        }
      }
    } catch (error) {
      console.error('[butler] tick failed:', error)
    } finally {
      this.tickBusy = false
    }
  }

  async handleStall(job, card, idleMs) {
    if (this.closed || !this.findJob(job.id) || !this.findCard(job, card.id)) return
    if (card.status !== 'running' && card.status !== 'fixing') return
    if (card.cancelling) return
    if ((card.stallCount || 0) >= this.config.maxStalls) {
      card.status = 'failed'
      card.finishedAt = now()
      card.butlerNote = `连续卡顿 ${card.stallCount} 次，已标记失败`
      this.log(job, `卡片「${card.title}」连续卡顿，已标记失败并转到终审。`, 'error')
      this.save()
      this.pump(job)
      return
    }
    card.stallCount = (card.stallCount || 0) + 1
    card.cancelling = true
    card.status = 'stalled'
    card.butlerNote = `卡顿 ${formatDuration(idleMs)}，管家处理中`
    this.log(
      job,
      `⏳ 卡片「${card.title}」已 ${formatDuration(idleMs)} 没有新进展，管家自动中断并续跑（第 ${card.stallCount} 次）。`,
      'warn',
    )
    this.save()
    try {
      this.ctx.sessionController.cancel({ sessionId: card.sessionId })
    } catch (error) {
      console.error('[butler] cancel failed:', error)
    }
    await new Promise((resolve) => setTimeout(resolve, 1400))
    if (this.closed || !this.findJob(job.id) || !this.findCard(job, card.id)) return
    card.attempts = (card.attempts || 0) + 1
    card.status = 'running'
    card.lastActivityAt = now()
    card.suppressEndUntil = now() + 6000
    try {
      await this.promptWorker(job, card, prompts.stallPrompt({ card, attempt: card.attempts, lastTool: card.lastTool }))
      card.butlerNote = ''
    } catch (error) {
      card.status = 'failed'
      card.finishedAt = now()
      card.butlerNote = `卡顿后续跑失败：${errorText(error)}`
      this.log(job, `卡片「${card.title}」卡顿后续跑失败：${errorText(error)}`, 'error')
      this.pump(job)
    } finally {
      card.cancelling = false
    }
    this.save()
  }

  async describeEvidence(cwd, evidence) {
    if (!Array.isArray(evidence) || !evidence.length) return '（执行者没有提供路径型证据）'
    const lines = []
    for (const raw of evidence.slice(0, 8)) {
      const value = asString(raw)
      if (!value) continue
      if (value.length > 300) {
        lines.push(`· 证据过长，已忽略：${truncate(value, 80)}`)
        continue
      }
      const cleaned = value.replace(/^[`'"]+|[`'"]+$/g, '').trim()
      const looksLikeCommand = /\s/.test(cleaned) && !/^[A-Za-z]:[\\/]/.test(cleaned)
      if (looksLikeCommand && !/^[./~]/.test(cleaned)) {
        lines.push(`· 自述命令（未自动执行）：${cleaned}`)
        continue
      }
      const target = path.isAbsolute(cleaned) ? cleaned : path.resolve(cwd, cleaned)
      try {
        const stat = await fs.stat(target)
        if (stat.isDirectory()) {
          let names = []
          try {
            const entries = await fs.readdir(target, { withFileTypes: true })
            names = entries.slice(0, 8).map((entry) => entry.name + (entry.isDirectory() ? '/' : ''))
          } catch {
            names = []
          }
          lines.push(`✓ 目录存在：${cleaned}${names.length ? `（${names.join('、')}${names.length >= 8 ? '…' : ''}）` : ''}`)
          continue
        }
        let detail = stat.size < 1024 ? `${stat.size} B` : `${(stat.size / 1024).toFixed(1)} KB`
        if (stat.size <= 65_536) {
          try {
            const bytes = await fs.readFile(target)
            detail += `，sha256:${createHash('sha256').update(bytes).digest('hex').slice(0, 16)}`
            const text = bytes.includes(0) ? null : bytes.toString('utf8')
            if (text != null && !text.includes('\uFFFD')) {
              const preview = text.length > 160 ? `${text.slice(0, 160)}…` : text
              detail += `，内容预览:${JSON.stringify(preview)}`
            } else {
              detail += '，二进制内容'
            }
          } catch {
            detail += '，内容不可读'
          }
        }
        lines.push(`✓ 路径存在：${cleaned}（${detail}）`)
      } catch {
        lines.push(`✗ 路径不存在：${cleaned}`)
      }
    }
    return lines.join('\n') || '（没有可核验的证据）'
  }

  async describeChanges(cwd, since) {
    const found = []
    let visited = 0
    const walk = async (directory, depth) => {
      if (visited > 500 || found.length >= 40) return
      let entries
      try {
        entries = await fs.readdir(directory, { withFileTypes: true })
      } catch {
        return
      }
      visited += entries.length
      for (const entry of entries) {
        if (found.length >= 40 || visited > 700) break
        if (entry.name.startsWith('.dsh-butler')) continue
        if (entry.isDirectory()) {
          if (depth >= 2 || SKIP_DIRS.has(entry.name)) continue
          await walk(path.join(directory, entry.name), depth + 1)
          continue
        }
        if (!entry.isFile()) continue
        try {
          const full = path.join(directory, entry.name)
          const stat = await fs.stat(full)
          if (stat.mtimeMs + 1500 < since) continue
          found.push({
            path: path.relative(cwd, full).split(path.sep).join('/'),
            size: stat.size,
            mtime: stat.mtimeMs,
          })
        } catch {
          /* ignore a disappearing file */
        }
      }
    }
    await walk(cwd, 0)
    if (!found.length) return ''
    found.sort((a, b) => b.mtime - a.mtime)
    return found
      .slice(0, 24)
      .map((file) => `- ${file.path}（${file.size < 1024 ? `${file.size} B` : `${(file.size / 1024).toFixed(1)} KB`}）`)
      .join('\n')
  }

  pauseJob(jobId) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('工作不存在')
    if (job.status === 'done' || job.status === 'failed') throw new Error('工作已经结束')
    job.status = 'paused'
    job.butlerNote =
      job.kind === 'session'
        ? '已暂停：不再自动催办与核对，这段对话仍可正常使用。'
        : '已暂停：不再开新卡，已在跑的卡片会继续到本轮结束。'
    this.log(job, '⏸ 卡片工坊暂停盯办。')
    this.save()
    return this.jobView(job)
  }

  resumeJob(jobId) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('工作不存在')
    if (job.status === 'done') throw new Error('工作已经完成')
    job.butlerNote = ''
    if (job.kind === 'session') {
      job.status = 'watching'
      this.log(job, '▶ 继续盯守这段工作对话。')
      this.save()
      return this.jobView(job)
    }
    if (!job.cards.length) {
      job.status = 'planning'
      job.replan = true
      this.log(job, '▶ 继续：重新拆解。')
      this.save()
      void this.runPlan(job.id)
      return this.jobView(job)
    }
    job.status = 'running'
    this.log(job, '▶ 卡片工坊继续盯办。')
    for (const card of job.cards) {
      if (card.status === 'stalled' && !card.cancelling) {
        setTimeout(() => void this.resumeStalled(job, card), 50)
      }
    }
    this.save()
    this.pump(job)
    return this.jobView(job)
  }

  retryCard(jobId, cardId) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('工作不存在')
    if (job.kind === 'session') return this.nudgeGroupCard(jobId, cardId)
    const card = this.findCard(job, cardId)
    if (!card) throw new Error('卡片不存在')
    card.status = 'queued'
    card.stallCount = 0
    card.fixRounds = 0
    card.butlerNote = '人工重试'
    card.lastActivityAt = now()
    job.status = 'running'
    this.log(job, `手动重试卡片「${card.title}」。`)
    this.save()
    this.pump(job)
    return this.jobView(job)
  }

  skipCard(jobId, cardId) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('工作不存在')
    const card = this.findCard(job, cardId)
    if (!card) throw new Error('卡片不存在')
    card.status = 'skipped'
    card.finishedAt = now()
    card.butlerNote = '人工跳过'
    this.log(job, `手动跳过卡片「${card.title}」。`, 'warn')
    this.save()
    this.pump(job)
    return this.jobView(job)
  }

  verifyNow(jobId, cardId) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('工作不存在')
    const card = this.findCard(job, cardId)
    if (!card) throw new Error('卡片不存在')
    if (job.kind === 'session') {
      this.log(job, `手动触发对话卡片「${card.title}」核对。`)
      void this.verifyGroupCard(job, card, { manual: true })
      return this.jobView(job)
    }
    if (!card.sessionId) throw new Error('卡片还没有执行会话')
    this.log(job, `手动触发卡片「${card.title}」核对。`)
    void this.verifyCard(job, card, { reason: '人工核对' })
    return this.jobView(job)
  }

  deleteJob(jobId) {
    const index = this.board.jobs.findIndex((job) => job.id === jobId)
    if (index < 0) throw new Error('工作不存在')
    const [job] = this.board.jobs.splice(index, 1)
    this.cancelPendingForJob(job.id)
    if (job.sessionId) this.sessionGroups.delete(job.sessionId)
    for (const card of job.cards || []) {
      if (card.sessionId) this.workerCards.delete(card.sessionId)
    }
    this.save()
    return { id: job.id }
  }

  async archiveSession(sessionId) {
    const id = asString(sessionId)
    if (!id) throw new Error('sessionId 不能为空')
    this.workerCards.delete(id)
    const registry = this.ctx.get('workspaceRegistry')
    if (!registry?.archiveSession) throw new Error('workspaceRegistry 不可用')
    await registry.archiveSession(id, { stopActivity: true })
    return { archived: true, sessionId: id }
  }

  clearFinished() {
    const finished = (job) => {
      if (job.status === 'done' || job.status === 'failed') return true
      if (job.kind !== 'session' || !job.cards?.length || job.liveTurn?.open) return false
      return job.cards.every((card) => ['done', 'failed', 'skipped'].includes(card.status))
    }
    const before = this.board.jobs.length
    this.board.jobs = this.board.jobs.filter((job) => !finished(job))
    const removed = before - this.board.jobs.length
    this.workerCards.clear()
    this.sessionGroups.clear()
    for (const job of this.board.jobs) {
      if (job.kind === 'session' && job.sessionId) this.sessionGroups.set(job.sessionId, job.id)
      for (const card of job.cards || []) {
        if (card.sessionId && job.kind !== 'session') {
          this.workerCards.set(card.sessionId, { jobId: job.id, cardId: card.id })
        }
      }
    }
    this.save()
    return { removed }
  }

  async refreshModelCatalog() {
    if (!this.ctx.sessionController?.modelCatalog) return null
    try {
      this.modelCatalog = await this.ctx.sessionController.modelCatalog()
      this.lastCatalogAt = now()
    } catch (error) {
      console.error('[butler] model catalog failed:', error)
    }
    return this.modelCatalog
  }

  currentPermission(job) {
    if (!job?.sessionId) return job?.permissionPreset || 'custom'
    try {
      const service = this.ctx.get('permissionPresets')
      const session = this.ctx.sessions.get(job.sessionId)
      if (service?.current && session) return service.current(session)
    } catch {
      /* fall through */
    }
    return job.permissionPreset || 'custom'
  }

  refreshPermissionCatalog() {
    try {
      const service = this.ctx.get('permissionPresets')
      if (!service?.catalog) return null
      this.permissionCatalog = service.catalog()
      this.lastPermissionAt = now()
    } catch (error) {
      console.error('[butler] permission catalog failed:', error)
    }
    return this.permissionCatalog
  }

  async refreshPresetCatalog() {
    try {
      const service = this.ctx.get('agentPresets')
      if (!service) return null
      const roster =
        typeof service.remoteExportList === 'function'
          ? await service.remoteExportList()
          : { presets: await service.list?.() }
      const presets = Array.isArray(roster) ? roster : roster?.presets || []
      this.presetCatalog = {
        presets: presets.map((preset) => ({
          ...preset,
          name: preset.name || preset.id,
        })),
      }
      this.lastPresetAt = now()
    } catch (error) {
      console.error('[butler] agent preset catalog failed:', error)
    }
    return this.presetCatalog
  }

  sessionPreset(job) {
    if (!job?.sessionId) return job?.preset || null
    try {
      const session = this.ctx.sessions.get(job.sessionId)
      return job.preset || session?.header?.agentPreset || null
    } catch {
      return job.preset || null
    }
  }

  async selectPreset(jobId, presetId) {
    const job = this.findJob(jobId)
    if (!job?.sessionId) throw new Error('对话组没有绑定会话')
    const id = asString(presetId)
    if (!id) throw new Error('请选择模式')
    const agent = this.ctx.agents.get(job.sessionId)
    if (!agent) throw new Error('会话当前不可切换模式')
    await this.ctx.agentPresets.select(agent, id)
    job.preset = id
    this.save()
    return this.jobView(job)
  }

  jobForTool(agentId, jobId) {
    const job = jobId
      ? this.findJob(jobId)
      : this.findJob(this.sessionGroups.get(agentId))
    if (!job) throw new Error('当前会话没有对应的卡片工坊项目')
    if (jobId && agentId && this.sessionGroups.has(agentId) && this.sessionGroups.get(agentId) !== job.id) {
      throw new Error('不能操作其它会话的卡片项目')
    }
    return job
  }

  toolList(agentId, jobId) {
    const job = this.jobForTool(agentId, jobId)
    return {
      jobId: job.id,
      title: job.title,
      status: job.status,
      progress: this.jobView(job).stats,
      cards: this.jobView(job).cards.map((card) => ({
        id: card.id,
        title: card.title,
        status: card.status,
        dependsOn: card.dependsOn,
        priority: card.priority,
        estimateSteps: card.estimateSteps,
        blockedReason: card.blockedReason,
      })),
    }
  }

  toolUpdateStatus(agentId, jobId, cardId, status, note = '') {
    const job = this.jobForTool(agentId, jobId)
    const card = this.findCard(job, cardId)
    if (!card) throw new Error('卡片不存在')
    const next = asString(status)
    if (!['queued', 'running', 'verifying', 'blocked', 'skipped'].includes(next)) {
      throw new Error('Agent 不能直接写入 done/failed；请提交 verifying 或 blocked')
    }
    if (next === 'running') {
      const dependencyState = this.dependencyState(job, card)
      if (!dependencyState.ready) throw new Error('前置依赖尚未完成')
    }
    if (next === 'blocked' && !asString(note)) throw new Error('标记阻塞必须填写原因')
    const from = card.status
    card.status = next
    card.blockedReason = next === 'blocked' ? asString(note).slice(0, 500) : ''
    if (next === 'blocked' || next === 'skipped') card.finishedAt = next === 'skipped' ? now() : null
    card.history = [
      ...(card.history || []),
      {
        at: now(),
        actor: 'agent',
        from,
        to: next,
        note: asString(note).slice(0, 500),
      },
    ]
    this.log(job, `Agent 更新卡片「${card.title}」：${from} → ${next}`)
    this.save()
    if (next === 'skipped') this.pump(job)
    return this.toolList(agentId, job.id)
  }

  toolBlock(agentId, jobId, cardId, reason) {
    const text = asString(reason)
    if (!text) throw new Error('标记阻塞必须填写原因')
    const job = this.jobForTool(agentId, jobId)
    const card = this.findCard(job, cardId)
    if (!card) throw new Error('卡片不存在')
    const from = card.status
    card.status = 'blocked'
    card.blockedReason = text.slice(0, 500)
    card.butlerNote = card.blockedReason
    card.history = [
      ...(card.history || []),
      { at: now(), actor: 'agent', from, to: 'blocked', note: card.blockedReason },
    ]
    this.log(job, `卡片「${card.title}」由 Agent 标记阻塞：${card.blockedReason}`, 'warn')
    this.save()
    return this.toolList(agentId, job.id)
  }

  toolSummary(agentId, jobId) {
    const job = this.jobForTool(agentId, jobId)
    const view = this.jobView(job)
    return {
      jobId: job.id,
      title: job.title,
      status: job.status,
      progress: view.stats,
      cards: view.cards.map((card) => ({
        id: card.id,
        title: card.title,
        status: card.status,
        blockedReason: card.blockedReason,
        evidence: card.result?.evidence || [],
      })),
    }
  }

  async toolSplit(agentId, brief, cwd, title) {
    return this.createJob({ brief, cwd, title })
  }

  async setSessionPermission(jobId, preset) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('对话组不存在')
    if (!job.sessionId) throw new Error('这个对话组没有可设置的会话')
    const name = asString(preset)
    if (!name) throw new Error('请选择权限')
    const service = this.ctx.get('permissionPresets')
    const session = this.ctx.sessions.get(job.sessionId)
    if (!service?.set || !session) throw new Error('权限服务或会话当前不可用')
    const spec = service.resolve(name)
    service.set(session, name)
    const agent = this.ctx.agents.get(job.sessionId)
    const approval = this.ctx.get('approval')
    if (agent && approval?.setPolicy && spec?.approval) {
      approval.setPolicy(agent, spec.approval)
    }
    job.permissionPreset = name
    this.save()
    return this.jobView(job)
  }

  async selectSessionModel(jobId, selection) {
    const job = this.findJob(jobId)
    if (!job) throw new Error('对话组不存在')
    if (!job.sessionId) throw new Error('这个对话组没有可选择的会话')
    const provider = asString(selection?.provider)
    const model = asString(selection?.model)
    const reasoningEffort = asString(selection?.reasoningEffort)
    if (!provider || !model) throw new Error('请选择模型')
    const result = await this.ctx.sessionController.selectModel({
      sessionId: job.sessionId,
      provider,
      model,
      ...(reasoningEffort ? { reasoningEffort } : {}),
    })
    job.modelSelection = result?.selected || {
      provider,
      model,
      ...(reasoningEffort ? { reasoningEffort } : {}),
    }
    this.save()
    return this.jobView(job)
  }

  async sessionAudit() {
    const value = await this.ctx.sessionController.list({}, new AbortController().signal)
    const items = Array.isArray(value?.items) ? value.items : []
    const hidden = new Set(this.board.hiddenSessions || [])
    const adopted = []
    const hiddenItems = []
    const blank = []
    const workers = []
    const unadoptedReal = []
    for (const item of items) {
      const jobId = this.sessionGroups.get(item.sessionId)
      const job = jobId ? this.findJob(jobId) : null
      const isHidden = hidden.has(item.sessionId)
      const isWorker = this.workerCards.has(item.sessionId)
      const isReal =
        !item.blank &&
        !item.parentSessionId &&
        item.origin !== 'subagent' &&
        !isWorker
      if (job) adopted.push({ sessionId: item.sessionId, cwd: item.cwd || '', title: job.title })
      else if (isHidden) hiddenItems.push(item.sessionId)
      else if (isWorker) workers.push(item.sessionId)
      else if (item.blank) blank.push(item.sessionId)
      else if (isReal) {
        let meta = null
        try {
          const payload = await this.loadSessionData(item.sessionId)
          if (payload) {
            meta = payload.live
              ? this.metaForSession(
                  this.ctx.sessions.get(item.sessionId) || {
                    id: item.sessionId,
                    header: payload.header,
                    ownEvents: () => payload.events,
                  },
                )
              : this.buildMeta(item.sessionId, payload.header, payload.events)
          }
        } catch {
          meta = null
        }
        unadoptedReal.push({
          sessionId: item.sessionId,
          cwd: item.cwd || '',
          title: meta?.title || '',
          hasRealUser: Boolean(meta?.hasRealUser),
        })
      }
    }
    const byWorkspace = {}
    for (const item of items) {
      if (!item.blank && !item.parentSessionId && item.origin !== 'subagent' && !this.workerCards.has(item.sessionId)) {
        const key = item.cwd || ''
        byWorkspace[key] = byWorkspace[key] || { totalReal: 0, adopted: 0, hidden: 0, missing: 0 }
        byWorkspace[key].totalReal += 1
        if (this.sessionGroups.has(item.sessionId)) byWorkspace[key].adopted += 1
        else if (hidden.has(item.sessionId)) byWorkspace[key].hidden += 1
        else byWorkspace[key].missing += 1
      }
    }
    return {
      total: items.length,
      adoptedCount: adopted.length,
      hiddenCount: hiddenItems.length,
      blankCount: blank.length,
      workerCount: workers.length,
      unadoptedReal,
      adopted,
      byWorkspace,
      workspaces: (() => {
        try {
          return (this.ctx.get('workspaceRegistry')?.list() || []).map((item) => ({
            id: item.id,
            path: item.path,
            title: item.title,
          }))
        } catch {
          return []
        }
      })(),
    }
  }

  async probePermission() {
    const created = await this.ctx.sessionController.create({ cwd: this.defaultCwd })
    const sessionId = created?.sessionId || created
    if (!sessionId) throw new Error('probe session create failed')
    const job = await this.adoptSession(sessionId, {
      auto: false,
      history: false,
      jump: false,
      title: 'butler-permission-probe',
    })
    const first = await this.setSessionPermission(job.id, 'workspace-write')
    const session = this.ctx.sessions.get(sessionId)
    const approvalAfter = this.ctx.get('approval')?.overrideOf?.(session) || null
    await this.setSessionPermission(job.id, 'danger-full-access')
    const restored = this.jobView(job)
    this.deleteJob(job.id)
    try {
      await this.ctx.get('workspaceRegistry')?.archiveSession?.(sessionId, { stopActivity: true })
    } catch {
      /* best-effort cleanup */
    }
    return {
      jobId: job.id,
      sessionId,
      firstPermission: first.permission,
      approvalAfter,
      restoredPermission: restored.permission,
    }
  }

  async probeQuestion() {
    const created = await this.ctx.sessionController.create({ cwd: this.defaultCwd })
    const sessionId = created?.sessionId || created
    if (!sessionId) throw new Error('probe session create failed')
    const job = await this.adoptSession(sessionId, {
      auto: false,
      history: false,
      jump: false,
      title: 'butler-question-probe',
    })
    await this.ctx.sessionController.prompt(
      {
        requestId: randomUUID(),
        sessionId,
        mode: 'queue',
        content: [
          {
            type: 'text',
            text:
              'You are a Harness plugin test. You MUST call the ask_user_question tool exactly once, ' +
              'with questions:[{id:"probe",header:"Probe",question:"Pick A or B",options:[{label:"A"},{label:"B"}]}], ' +
              'and no other reply before the tool call. Do not answer the question yourself.',
          },
        ],
      },
      new AbortController().signal,
    )
    const deadline = Date.now() + 90_000
    while (Date.now() < deadline) {
      const card = job.cards.find(
        (item) => item.needsUser?.type === 'question' && item.needsUser?.requestId,
      )
      if (card) {
        return {
          jobId: job.id,
          sessionId,
          cardId: card.id,
          requestId: card.needsUser.requestId,
          questions: card.needsUser.questions,
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    throw new Error('probe question timed out before ask_user_question')
  }

  async probeWorkspace() {
    const registry = this.ctx.get('workspaceRegistry')
    if (!registry?.create) throw new Error('workspaceRegistry 不可用')
    const directory = path.join(this.defaultCwd, `.butler-workspace-probe-${Date.now()}`)
    await fs.mkdir(directory, { recursive: true })
    let workspace = null
    let deleted = false
    try {
      workspace = await registry.create(directory, 'butler-workspace-probe')
      const listed = registry.list().map((item) => ({
        id: item.id,
        path: item.path,
        title: item.title,
      }))
      return {
        directory,
        workspaceId: workspace.id,
        title: workspace.title,
        inList: listed.some((item) => item.id === workspace.id),
        workspaceCount: listed.length,
        listedPaths: listed.map((item) => item.path),
      }
    } finally {
      if (workspace?.id) {
        try {
          deleted = await registry.delete(workspace.id)
        } catch (error) {
          console.error('[butler] probe workspace cleanup failed:', error)
        }
      }
      try {
        await fs.rm(directory, { recursive: true, force: true })
      } catch {
        /* best-effort cleanup */
      }
      if (deleted) console.log('[butler] probe workspace deleted')
    }
  }

  async selftest() {
    const services = {}
    for (const name of [
      'sessionController',
      'llm',
      'sessions',
      'agents',
      'approval',
      'permissionPresets',
      'workspaceRegistry',
      'workingDirectory',
      'webServer',
    ]) {
      services[name] = Boolean(this.ctx.get(name))
    }
    let model = null
    try {
      model = await this.model.resolveSelection()
    } catch (error) {
      model = { error: errorText(error) }
    }
    const presets = []
    const service = this.ctx.get('permissionPresets')
    if (service?.catalog) {
      try {
        const catalog = service.catalog()
        for (const option of catalog?.options || []) {
          let spec = null
          try {
            spec = service.resolve(option.value)
          } catch (error) {
            spec = { error: errorText(error) }
          }
          presets.push({ value: option.value, name: option.name, spec })
        }
      } catch (error) {
        presets.push({ error: errorText(error) })
      }
    }
    let liveSessions = []
    try {
      liveSessions = this.ctx.sessions.list().slice(0, 30).map((session) => ({
        id: session.id,
        cwd: session.header?.cwd || null,
        origin: session.header?.origin || null,
        parentSession: session.header?.parentSession || null,
        createdAt: session.header?.createdAt || null,
        seq: session.seq,
      }))
    } catch (error) {
      liveSessions = [{ error: errorText(error) }]
    }
    let workspaces = []
    try {
      const registry = this.ctx.get('workspaceRegistry')
      workspaces = (registry?.list?.() || []).map((workspace) => ({
        id: workspace.id,
        path: workspace.path || workspace.directory || null,
        title: workspace.title || null,
      }))
    } catch (error) {
      workspaces = [{ error: errorText(error) }]
    }
    let advertisedUrl = null
    try {
      advertisedUrl = this.ctx.get('webApp')?.getAdvertisedUrl?.() || null
    } catch {
      advertisedUrl = null
    }
    let inventory = null
    try {
      const value = await this.ctx.sessionController.list({}, new AbortController().signal)
      const items = Array.isArray(value?.items) ? value.items : []
      inventory = {
        total: items.length,
        sample: items.slice(0, 8).map((item) => ({
          id: item.sessionId,
          cwd: item.cwd || null,
          origin: item.origin || null,
          parentSessionId: item.parentSessionId || null,
          blank: Boolean(item.blank),
          running: Boolean(item.running),
          updatedAt: item.updatedAt,
        })),
      }
    } catch (error) {
      inventory = { error: errorText(error) }
    }
    let clientPath = null
    let clientRevision = null
    let clientBaseline = null
    try {
      const clientModules = this.ctx.get('clientModules')
      clientPath = clientModules?.clientPath?.('dsh-card-workbench') || null
      clientRevision = clientModules?.rebuilt?.('dsh-card-workbench') || null
      const baseline = clientModules?.artifactBaseline?.('dsh-card-workbench')
      clientBaseline = baseline ? JSON.parse(JSON.stringify(baseline)) : null
    } catch {
      /* diagnostics only */
    }
    return {
      ok: true,
      version: 1,
      defaultCwd: this.lastSessionCwd || this.defaultCwd,
      storageFile: this.store.file,
      storageError: this.store.lastError,
      services,
      model,
      chosenPreset: this.presetName,
      presets,
      liveSessions,
      workspaces,
      inventory,
      advertisedUrl,
      clientPath,
      clientRevision,
      clientBaseline,
      fullAccess: this.config.fullAccess,
      settings: { ...this.board.settings },
      hiddenSessions: [...(this.board.hiddenSessions || [])],
      sessionGroups: this.sessionGroups.size,
      candidates: this.sessionCandidates().length,
      jobs: this.board.jobs.length,
      ready: this.ready,
    }
  }

  async shutdown() {
    for (const [requestId, pending] of [...this.pendingInteractions]) {
      this.finishInteraction(
        requestId,
        pending.kind === 'approval' ? 'cancelled' : { answers: [] },
      )
    }
    for (const disposers of this.scopedListeners.values()) {
      for (const dispose of disposers) {
        try {
          dispose()
        } catch {
          /* best-effort */
        }
      }
    }
    this.scopedListeners.clear()
    this.closed = true
    await this.store.close()
  }
}


