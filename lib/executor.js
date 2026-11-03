/**
 * Global execution runtime.
 *
 * The card workshop's execution loop used to exist only as a 5 s timer created
 * inside the Host plugin entry point, while the only client-side observer lived
 * in the workbench route component. This module makes the execution heartbeat a
 * first-class Host service:
 *
 *  - it runs independently of HTTP requests, page mounts and the conversation
 *    route;
 *  - events call `kick()` so a freed execution slot is refilled immediately
 *    instead of waiting for the next timer tick;
 *  - kicks are coalesced while a tick is in flight, so bursts of session events
 *    cannot overlap `tick()`;
 *  - the last tick/kick timings are exposed to `/api/state` for verification.
 *
 * It has no Cordis, DOM or HTTP dependency, which keeps it testable on its own.
 */

export const DEFAULT_INTERVAL_MS = 1_000
export const MIN_INTERVAL_MS = 200
export const MAX_INTERVAL_MS = 10_000

function clampInterval(value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_INTERVAL_MS
  return Math.min(MAX_INTERVAL_MS, Math.max(MIN_INTERVAL_MS, Math.floor(parsed)))
}

export class ExecutionRuntime {
  /**
   * @param {object} options
   * @param {() => unknown | Promise<unknown>} options.tick Work to run on every beat.
   * @param {number} [options.intervalMs] Fail-safe beat interval.
   * @param {() => number} [options.now] Clock seam for deterministic tests.
   */
  constructor({ tick, intervalMs = DEFAULT_INTERVAL_MS, now = () => Date.now() } = {}) {
    if (typeof tick !== 'function') throw new TypeError('ExecutionRuntime requires a tick function')
    this.tick = tick
    this.intervalMs = clampInterval(intervalMs)
    this.now = now
    this.timer = null
    this.started = false
    this.running = false
    this.pending = false
    this.startedAt = 0
    this.lastTickAt = 0
    this.lastTickStartedAt = 0
    this.lastDurationMs = 0
    this.tickCount = 0
    this.kickCount = 0
    this.lastReason = ''
    this.lastError = ''
    this.stoppedAt = 0
  }

  start() {
    if (this.started) return
    this.started = true
    this.stoppedAt = 0
    this.startedAt = this.now()
    // Do not wait one interval for the first beat: a plugin reload must resume
    // queued cards immediately, even if no workbench page is mounted.
    void this.run('start')
    this.timer = setInterval(() => void this.run('heartbeat'), this.intervalMs)
    if (typeof this.timer.unref === 'function') this.timer.unref()
  }

  stop() {
    if (!this.started) return
    this.started = false
    this.stoppedAt = this.now()
    if (this.timer) clearInterval(this.timer)
    this.timer = null
  }

  /**
   * Ask for an immediate beat. Safe to call from synchronous event handlers:
   * while a tick is in flight the request is coalesced into one replay.
   */
  kick(reason = 'event') {
    if (!this.started) return
    this.kickCount += 1
    this.lastReason = reason
    void this.run(reason)
  }

  async run(reason = 'heartbeat') {
    if (!this.started) return
    if (this.running) {
      this.pending = true
      return
    }
    this.running = true
    this.lastReason = reason
    this.lastTickStartedAt = this.now()
    const started = performance.now()
    try {
      await this.tick()
      this.lastError = ''
    } catch (error) {
      this.lastError = error instanceof Error ? error.message : String(error)
      console.error('[butler] execution tick failed:', error)
    } finally {
      this.lastDurationMs = Math.round((performance.now() - started) * 10) / 10
      this.lastTickAt = this.now()
      this.tickCount += 1
      this.running = false
      if (this.pending) {
        this.pending = false
        queueMicrotask(() => void this.run('coalesced'))
      }
    }
  }

  setInterval(intervalMs) {
    const next = clampInterval(intervalMs)
    if (next === this.intervalMs) return this.intervalMs
    this.intervalMs = next
    if (this.started) {
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => void this.run('heartbeat'), this.intervalMs)
      if (typeof this.timer.unref === 'function') this.timer.unref()
    }
    return this.intervalMs
  }

  stats() {
    return {
      intervalMs: this.intervalMs,
      started: this.started,
      running: this.running,
      pending: this.pending,
      startedAt: this.startedAt,
      stoppedAt: this.stoppedAt,
      lastTickAt: this.lastTickAt,
      lastTickStartedAt: this.lastTickStartedAt,
      lastDurationMs: this.lastDurationMs,
      tickCount: this.tickCount,
      kickCount: this.kickCount,
      lastReason: this.lastReason,
      lastError: this.lastError,
    }
  }
}

export function createExecutionRuntime(options) {
  return new ExecutionRuntime(options)
}
