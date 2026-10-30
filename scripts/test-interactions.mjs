#!/usr/bin/env node
/**
 * Deterministic check for in-plugin approvals and structured questions.
 *
 * Run: node scripts/test-interactions.mjs
 */

import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

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
  store: { file: '', directory: '', scheduleSave() {}, async close() {} },
  model: { complete: async () => { throw new Error('model must not be called') } },
  defaultCwd: process.cwd(),
})

const card = {
  id: 'card-1',
  title: '测试卡',
  goal: '测试',
  status: 'running',
  turnOpen: true,
  createdAt: now,
  lastActivityAt: now,
  chat: [],
}
const job = {
  id: 'job-1',
  kind: 'session',
  sessionId: 'session-1',
  title: '测试对话组',
  brief: '测试',
  cwd: process.cwd(),
  status: 'watching',
  createdAt: now,
  updatedAt: now,
  cards: [card],
  log: [],
  gapRounds: 0,
  summary: '',
  chat: [],
}
butler.board = { version: 1, settings: {}, jobs: [job] }
butler.sessionGroups = new Map([['session-1', 'job-1']])
butler.save = () => {}

const approvalPromise = butler.claimApproval({
  agent: { id: 'session-1' },
  toolName: 'write',
  reason: '需要写入文件',
})
assert.ok(approvalPromise, 'approval must be claimed for a managed session')
assert.equal(card.needsUser.type, 'approval')
const approvalId = card.needsUser.requestId
assert.ok(approvalId)
await butler.resolveInteraction('job-1', 'card-1', approvalId, { decision: 'allowed-once' })
assert.equal(await approvalPromise, 'allowed-once')
assert.equal(card.needsUser, null)

const questionPromise = butler.claimQuestion({
  agent: { id: 'session-1' },
  questions: [
    {
      id: 'q1',
      question: '选哪个方案？',
      header: '方案选择',
      options: [{ label: '方案 A' }, { label: '方案 B' }],
    },
  ],
})
assert.ok(questionPromise, 'question must be claimed for a managed session')
assert.equal(card.needsUser.type, 'question')
assert.equal(card.needsUser.questions[0].id, 'q1')
const questionId = card.needsUser.requestId
await butler.resolveInteraction('job-1', 'card-1', questionId, {
  answers: [{ id: 'q1', selected: ['方案 A'], custom: '' }],
})
assert.deepEqual(await questionPromise, {
  answers: [{ id: 'q1', selected: ['方案 A'] }],
})
assert.equal(card.needsUser, null)

console.log('PASS approval claim/resolve: allowed-once returned to the agent')
console.log('PASS question claim/resolve: structured answer returned to the agent')
console.log(
  JSON.stringify(
    {
      approvalId,
      questionId,
      approvalsCleared: card.needsUser === null,
    },
    null,
    2,
  ),
)
