/**
 * Durable board storage.
 *
 * The board is plugin-owned derived task state, not a Session event stream, so
 * it lives as one JSON document under the workspace. Writes are debounced and
 * atomic (temp file + rename) to survive a crash mid-save.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { errorText } from './util.js'

export function emptyBoard() {
  return { version: 1, jobs: [], updatedAt: 0 }
}

export class BoardStore {
  constructor(directory) {
    this.directory = directory
    this.file = path.join(directory, 'board.json')
    this.board = emptyBoard()
    this.timer = null
    this.pending = null
    this.closed = false
    this.lastError = null
  }

  async load() {
    try {
      const raw = await fs.readFile(this.file, 'utf8')
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.jobs)) {
        this.board = {
          version: 1,
          jobs: parsed.jobs,
          updatedAt: Number(parsed.updatedAt) || 0,
        }
      }
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        this.lastError = errorText(error)
        console.error('[butler] board load failed:', error)
      }
    }
    return this.board
  }

  scheduleSave() {
    if (this.closed) return
    if (this.timer) return
    this.timer = setTimeout(() => {
      this.timer = null
      void this.flush()
    }, 250)
  }

  flush() {
    if (this.closed) return Promise.resolve()
    if (this.pending) return this.pending
    this.board.updatedAt = Date.now()
    const payload = JSON.stringify(this.board)
    this.pending = (async () => {
      try {
        await fs.mkdir(this.directory, { recursive: true })
        const temp = `${this.file}.${process.pid}.tmp`
        await fs.writeFile(temp, payload, 'utf8')
        try {
          await fs.rename(temp, this.file)
        } catch {
          await fs.writeFile(this.file, payload, 'utf8')
          await fs.rm(temp, { force: true })
        }
        this.lastError = null
      } catch (error) {
        this.lastError = errorText(error)
        console.error('[butler] board save failed:', error)
      } finally {
        this.pending = null
      }
    })()
    return this.pending
  }

  async close() {
    this.closed = true
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    await this.flush().catch(() => {})
  }
}
