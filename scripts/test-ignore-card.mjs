#!/usr/bin/env node
/** Deterministic check for ignoring a failed card. */

import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

const butler = new Butler({
  ctx: { get: () => undefined, sessions: { get: () => undefined }, agents: { get: () => undefined } },
  config: { fullAccess: false },
  store: { file: '', directory: '', scheduleSave() {}, async close() {} },
  model: { complete: async () => ({}) },
  defaultCwd: process.cwd(),
})
const now = Date.now()
butler.board = {
  version: 1,
  settings: {},
  jobs: [
    {
      id: 'job-ignore',
      kind: 'brief',
      title: 'Ignore failed card',
      brief: 'test',
      cwd: process.cwd(),
      status: 'failed',
      createdAt: now,
      cards: [
        { id: 'card-failed', title: 'Failed task', status: 'failed', sessionId: 's1', createdAt: now },
        { id: 'card-done', title: 'Done task', status: 'done', sessionId: 's2', createdAt: now },
      ],
    },
  ],
}
butler.save = () => {}
const view = butler.ignoreCard('job-ignore', 'card-failed')
assert.equal(view.cards.find((card) => card.id === 'card-failed').status, 'ignored')
assert.equal(view.stats.failed, 0)
assert.equal(view.stats.ignored, 1)
assert.equal(view.status, 'done')
assert.throws(() => butler.ignoreCard('job-ignore', 'card-done'), /只有失败的卡片可以忽略/)

console.log('PASS ignoreCard: failed card becomes ignored')
console.log('PASS ignoreCard: ignored card no longer counts as failed')
console.log('PASS ignoreCard: non-failed card cannot be ignored')
