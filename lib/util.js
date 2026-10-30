/**
 * Small, dependency-free helpers for the butler engine.
 *
 * Everything here runs in the Host process, so only Node built-ins and plain
 * JavaScript are used. The functions are pure unless stated otherwise.
 */

/** Milliseconds since the Unix epoch. */
export function now() {
  return Date.now();
}

/** A stable-enough unique id for cards, jobs and prompt requests. */
export function randomId(prefix = '') {
  const uuid = globalThis.crypto?.randomUUID?.()
  const id = uuid || Math.random().toString(36).slice(2) + Date.now().toString(36)
  return prefix ? `${prefix}_${id}` : id
}

/** Coerce a configuration value to a positive integer. */
export function positiveInt(value, fallback, max = 1_000_000) {
  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value ?? ''), 10)
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback
  return Math.min(Math.floor(parsed), max)
}

/** Coerce a configuration value to a boolean, keeping the fallback for junk. */
export function booleanOr(value, fallback) {
  if (typeof value === 'boolean') return value
  if (value === 'true' || value === '1' || value === 1) return true
  if (value === 'false' || value === '0' || value === 0) return false
  return fallback
}

/** Resolve after `ms` milliseconds. */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Join the text blocks of a stored message. */
export function messageText(message) {
  if (!message || !Array.isArray(message.content)) return ''
  return message.content
    .filter((block) => block && block.type === 'text' && typeof block.text === 'string')
    .map((block) => block.text)
    .join('\n')
    .trim()
}

/**
 * Read the last `limit` assistant texts of a live session, newest last.
 * Uses only committed events, so it is safe to call after `turn/end`.
 */
export function recentAssistantTexts(session, limit = 3) {
  if (!session || typeof session.ownEvents !== 'function') return []
  let events
  try {
    events = session.ownEvents()
  } catch {
    return []
  }
  const texts = []
  for (let i = events.length - 1; i >= 0 && texts.length < limit; i -= 1) {
    const event = events[i]
    if (event?.type !== 'assistant/message') continue
    const text = messageText(event.data?.message)
    if (text) texts.unshift(text)
  }
  return texts
}

/** The last non-empty assistant text of a live session. */
export function lastAssistantText(session) {
  const texts = recentAssistantTexts(session, 1)
  return texts.length ? texts[texts.length - 1] : ''
}

/** Detect whether a session currently holds an open turn. */
export function sessionBusy(session) {
  if (!session || typeof session.ownEvents !== 'function') return false
  try {
    const events = session.ownEvents()
    for (let i = events.length - 1; i >= 0; i -= 1) {
      if (events[i].type === 'turn/end') return false
      if (events[i].type === 'turn/start') return true
    }
  } catch {
    return false
  }
  return false
}

/**
 * Extract one tagged JSON payload from model text.
 * The last matching tag wins so a worker may quote the template earlier.
 */
export function extractTaggedJson(text, tag = 'butler-result') {
  if (typeof text !== 'string' || !text) return null
  const pattern = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'gi')
  let match
  let last = null
  while ((match = pattern.exec(text)) !== null) last = match[1]
  if (last == null) return null
  return parseJsonLoose(last)
}

/** Parse JSON that may be wrapped in prose, fences or trailing commas. */
export function parseJsonLoose(text) {
  if (text == null) return null
  if (typeof text === 'object') return text
  let source = String(text).trim()
  if (!source) return null
  source = source.replace(/^```(?:json|JSON)?\s*/m, '').replace(/```\s*$/m, '').trim()
  const candidates = [source]
  const firstBrace = source.indexOf('{')
  const lastBrace = source.lastIndexOf('}')
  if (firstBrace >= 0 && lastBrace > firstBrace) candidates.push(source.slice(firstBrace, lastBrace + 1))
  const firstBracket = source.indexOf('[')
  const lastBracket = source.lastIndexOf(']')
  if (firstBracket >= 0 && lastBracket > firstBracket) candidates.push(source.slice(firstBracket, lastBracket + 1))
  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate)
    } catch {
      const repaired = candidate
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/[\u201c\u201d]/g, '"')
      try {
        return JSON.parse(repaired)
      } catch {
        /* try the next candidate */
      }
    }
  }
  return null
}

/** Shorten a string for the card surface and the log. */
export function truncate(text, length = 220) {
  const value = typeof text === 'string' ? text.replace(/\s+/g, ' ').trim() : ''
  if (value.length <= length) return value
  return `${value.slice(0, Math.max(0, length - 1))}…`
}

/** Human-readable elapsed time, e.g. 2m 14s. */
export function formatDuration(ms) {
  const total = Math.max(0, Math.round(Number(ms) || 0) / 1000)
  if (total < 60) return `${Math.round(total)}s`
  const minutes = Math.floor(total / 60)
  const seconds = Math.round(total % 60)
  if (minutes < 60) return `${minutes}m ${seconds}s`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m`
}

/** Clamp a number to an inclusive range. */
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

/** A shallow clone that drops undefined values. */
export function compact(object) {
  const result = {}
  for (const [key, value] of Object.entries(object || {})) {
    if (value !== undefined) result[key] = value
  }
  return result
}

/** Turn an unknown thrown value into a readable single line. */
export function errorText(error) {
  if (error == null) return 'unknown error'
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message || error.name || 'error'
  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}
