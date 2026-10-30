#!/usr/bin/env node
/** Deterministic check for clearing finished jobs, including fully finished session groups. */

import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

const butler = new Butler({
  ctx: { get: () => undefined, sessions: { get: () => undefined }, agents: { get: () => undefined } },
  config: { fullAccess: true },
  store: { file: '', directory: '', scheduleSave() {}, async close() {} },
  model: { complete: async () => ({}) },
  defaultCwd: process.cwd(),
})
const now = Date.now()
const card = (status) => ({ id: `card-${status}-${now}-${Math.random()}`, status, sessionId: 's' })
butler.board = {
  version: 1,
  settings: {},
  jobs: [
    { id: 'done-job', kind: 'task', status: 'done', cards: [] },
    { id: 'failed-job', kind: 'task', status: 'failed', cards: [] },
    { id: 'finished-session', kind: 'session', status: 'watching', cards: [card('done'), card('skipped')], liveTurn: { open: false } },
    { id: 'active-session', kind: 'session', status: 'watching', cards: [card('done'), card('running')], liveTurn: { open: true } },
    { id: 'empty-session', kind: 'session', status: 'watching', cards: [], liveTurn: { open: false } },
  ],
}
butler.save = () => {}
const result = butler.clearFinished()
assert.equal(result.removed, 3)
assert.deepEqual(
  butler.board.jobs.map((job) => job.id),
  ['active-session', 'empty-session'],
)
console.log('PASS clearFinished: removes done/failed jobs and fully finished session groups')
console.log('PASS clearFinished: keeps running sessions and sessions without cards')
console.log(JSON.stringify({ removed: result.removed, remaining: butler.board.jobs.map((job) => job.id) }, null, 2))
