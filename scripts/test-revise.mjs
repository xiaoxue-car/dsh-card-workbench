#!/usr/bin/env node
/**
 * Deterministic check for per-task rework, without touching a real Session.
 *
 * It builds a minimal Butler with one finished card, replaces promptSession
 * with a recorder, calls reviseCard(), and asserts that the same card is
 * re-opened, the rework instruction is appended, and the prompt is sent to the
 * original conversation with the rework marker.
 *
 * Run: node scripts/test-revise.mjs
 */

import assert from 'node:assert/strict'
import path from 'node:path'
import { Butler } from '../lib/engine.js'

const calls = []
const now = Date.now()
const butler = new Butler({
  ctx: {
    get: () => undefined,
    sessions: { get: () => undefined },
    agents: { get: () => undefined },
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
  store: {
    file: '',
    directory: '',
    scheduleSave() {},
    async close() {},
  },
  model: {
    complete: async () => {
      throw new Error('model must not be called by reviseCard')
    },
  },
  defaultCwd: process.cwd(),
})

butler.board = {
  version: 1,
  settings: {},
  jobs: [
    {
      id: 'job-test',
      kind: 'session',
      sessionId: 'session-test',
      title: '测试对话组',
      brief: '测试对话组',
      cwd: process.cwd(),
      status: 'watching',
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-test',
          kind: 'session',
          title: '测试任务节点',
          goal: '原始任务内容',
          acceptance: '原始验收标准',
          status: 'done',
          turnOpen: false,
          createdAt: now,
          lastActivityAt: now,
          result: { status: 'done', summary: '旧结果' },
          verify: { pass: true, summary: '旧核对' },
          revisions: [],
        },
      ],
      log: [],
      gapRounds: 0,
      summary: '',
    },
  ],
}
butler.sessionGroups = new Map([['session-test', 'job-test']])
butler.promptSession = async (job, card, text, mode) => {
  calls.push({ jobId: job.id, cardId: card.id, text, mode })
}
butler.save = () => {}

const job = butler.findJob('job-test')
const card = butler.findCard(job, 'card-test')
const view = await butler.reviseCard('job-test', 'card-test', '请把颜色改成蓝色，并保留原有布局')

assert.equal(card.status, 'running')
assert.equal(card.imported, false)
assert.equal(card.verify, null)
assert.equal(card.revisions.length, 1)
assert.match(card.goal, /【用户返工要求】/)
assert.match(card.goal, /颜色改成蓝色/)
assert.equal(calls.length, 1)
assert.equal(calls[0].jobId, 'job-test')
assert.equal(calls[0].cardId, 'card-test')
assert.match(calls[0].text, /【总管家返工】/)
assert.match(calls[0].text, /颜色改成蓝色/)
assert.equal(calls[0].mode, 'queue')
assert.equal(view.cards[0].status, 'running')

console.log(
  'PASS reviseCard: same card re-opened, instruction appended, prompt sent to original session',
)
console.log(
  JSON.stringify(
    {
      status: card.status,
      revisions: card.revisions.length,
      mode: calls[0].mode,
      promptStartsWith: calls[0].text.slice(0, 14),
      goalAdded: card.goal.includes('【用户返工要求】'),
    },
    null,
    2,
  ),
)
