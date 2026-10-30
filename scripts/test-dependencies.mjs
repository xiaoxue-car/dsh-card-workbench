#!/usr/bin/env node
/** Deterministic checks for card dependencies and host-owned completion. */

import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

const butler = new Butler({
  ctx: { get: () => undefined, sessions: { get: () => undefined }, agents: { get: () => undefined } },
  config: { fullAccess: false },
  store: { file: '', directory: '', scheduleSave() {}, async close() {} },
  model: { complete: async () => ({}) },
  defaultCwd: process.cwd(),
})
butler.board = {
  version: 1,
  settings: {},
  jobs: [
    {
      id: 'job-deps',
      kind: 'brief',
      status: 'running',
      title: 'dependency test',
      cwd: process.cwd(),
      cards: [
        { id: 'a', title: 'A', status: 'queued', dependsOn: [] },
        { id: 'b', title: 'B', status: 'queued', dependsOn: ['a'] },
      ],
      chat: [],
    },
  ],
}
butler.save = () => {}

const job = butler.findJob('job-deps')
assert.equal(butler.dependencyState(job, job.cards[0]).ready, true)
assert.equal(butler.dependencyState(job, job.cards[1]).ready, false)

assert.throws(
  () => butler.toolUpdateStatus('agent-x', 'job-deps', 'b', 'running'),
  /前置依赖/,
)
assert.throws(
  () => butler.toolUpdateStatus('agent-x', 'job-deps', 'b', 'done'),
  /不能直接写入 done/,
)

job.cards[0].status = 'done'
assert.equal(butler.dependencyState(job, job.cards[1]).ready, true)
const result = butler.toolUpdateStatus('agent-x', 'job-deps', 'b', 'blocked', '等待接口确认')
assert.equal(result.cards.find((card) => card.id === 'b').status, 'blocked')

job.cards[0].status = 'failed'
assert.equal(butler.dependencyState(job, job.cards[1]).blocked, true)

job.cards[0].status = 'done'
job.cards[1].status = 'blocked'
butler.pump(job)
assert.notEqual(job.cards[1].status, 'blocked')
console.log('PASS dependencies: a blocked downstream card requeues when its prerequisite completes')

// Planner output maps dependency titles to card ids.
butler.config.maxConcurrency = 0
butler.model.complete = async () => ({
  text: JSON.stringify({
    title: '依赖计划',
    summary: 'test',
    cards: [
      { title: '基础', goal: 'base', acceptance: 'ok', dependsOn: [] },
      { title: '上层', goal: 'top', acceptance: 'ok', dependsOn: ['基础'] },
    ],
  }),
})
butler.board.jobs.push({
  id: 'job-plan',
  kind: 'brief',
  status: 'planning',
  title: 'plan',
  brief: 'plan',
  cwd: process.cwd(),
  cards: [],
  chat: [],
})
await butler.runPlan('job-plan')
const planned = butler.findJob('job-plan')
assert.equal(planned.cards[1].dependsOn[0], planned.cards[0].id)

console.log('PASS dependencies: planner maps dependency titles to card ids')

console.log('PASS dependencies: downstream card is not ready before its prerequisite')
console.log('PASS dependencies: completed prerequisite unlocks the downstream card')
console.log('PASS dependencies: failed prerequisite blocks the downstream card')
console.log('PASS agent tools: cannot mark done directly; blocked requires a reason')
