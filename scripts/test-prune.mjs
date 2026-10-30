#!/usr/bin/env node
/**
 * Deterministic check for pruning conversation groups whose Session is gone
 * from both the Harness session list and the live in-memory registry.
 *
 * Run: node scripts/test-prune.mjs
 */

import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

const now = Date.now()
const butler = new Butler({
  ctx: {
    get: () => undefined,
    sessions: { get: () => undefined },
    agents: { get: () => undefined },
    sessionController: {
      list: async () => ({ items: [{ sessionId: 'session-alive' }] }),
    },
  },
  config: {
    maxCards: 6,
    maxConcurrency: 3,
    stallMs: 240000,
    maxStalls: 3,
    maxAttempts: 5,
    maxFixRounds: 2,
    maxGapRounds: 2,
    llmTimeoutMs: 120000,
    fullAccess: true,
  },
  store: { file: '', directory: '', scheduleSave() {}, async close() {} },
  model: { complete: async () => { throw new Error('model must not be called') } },
  defaultCwd: process.cwd(),
})

const job = (id, sessionId) => ({
  id,
  kind: 'session',
  sessionId,
  title: id,
  brief: id,
  cwd: process.cwd(),
  status: 'watching',
  createdAt: now,
  updatedAt: now,
  cards: [],
  log: [],
  gapRounds: 0,
  summary: '',
})

butler.board = {
  version: 1,
  settings: {},
  jobs: [job('job-alive', 'session-alive'), job('job-missing', 'session-missing')],
  hiddenSessions: [],
}
butler.sessionGroups = new Map([
  ['session-alive', 'job-alive'],
  ['session-missing', 'job-missing'],
])
butler.save = () => {}

const result = await butler.pruneMissingGroups()

assert.equal(result.removed, 1)
assert.equal(butler.board.jobs.length, 1)
assert.equal(butler.board.jobs[0].id, 'job-alive')
assert.equal(butler.sessionGroups.has('session-missing'), false)
assert.equal(butler.sessionGroups.has('session-alive'), true)

console.log('PASS pruneMissingGroups: removed missing conversation group, kept visible one')
console.log(
  JSON.stringify(
    { removed: result.removed, remainingJobs: butler.board.jobs.map((item) => item.id) },
    null,
    2,
  ),
)
