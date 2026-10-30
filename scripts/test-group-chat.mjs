#!/usr/bin/env node
/**
 * Deterministic check for conversation-group chat (the box above the task
 * summary). A group question must append the user message, materialise a
 * timeline card from the resulting user/message event, and keep all further
 * work on that card instead of opening a separate chat.
 *
 * Run: node scripts/test-group-chat.mjs
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
  store: { file: '', directory: '', scheduleSave() {}, async close() {} },
  model: { complete: async () => { throw new Error('model must not be called') } },
  defaultCwd: process.cwd(),
})

butler.board = {
  version: 1,
  settings: { verifyConversations: false },
  jobs: [
    {
      id: 'job-group-chat',
      kind: 'session',
      sessionId: 'session-group-chat',
      title: '测试对话组',
      brief: '测试对话组',
      cwd: process.cwd(),
      status: 'watching',
      createdAt: now,
      updatedAt: now,
      cards: [],
      log: [],
      gapRounds: 0,
      summary: '',
      chat: [],
    },
  ],
}
butler.sessionGroups = new Map([['session-group-chat', 'job-group-chat']])
butler.promptSession = async (job, card, text, mode) => {
  calls.push({ jobId: job.id, card, text, mode })
}
butler.save = () => {}

const question = '这个工作区先聊一下方案'
const job = butler.findJob('job-group-chat')
const view = await butler.sendGroupMessage('job-group-chat', question)

assert.equal(job.groupChatOpen, true)
assert.equal(job.chat.length, 1)
assert.equal(job.chat[0].text, question)
assert.equal(calls.length, 1)
assert.equal(calls[0].card, null)
assert.equal(calls[0].text, question, 'the group question must not be prefixed as a system message')
assert.equal(view.chat.length, 1)

const fakeSession = { id: 'session-group-chat', header: { cwd: process.cwd() }, ownEvents: () => [] }
butler.handleGroupEvent(job, fakeSession, {
  type: 'user/message',
  seq: 42,
  data: { message: { role: 'user', content: [{ type: 'text', text: question }] } },
  time: now + 1,
})

assert.equal(job.groupChatOpen, false)
assert.equal(job.chat.length, 1, 'assistant output must not be appended to the separate group chat')
assert.equal(job.cards.length, 1, 'the group question must materialise as a timeline card')
assert.match(job.cards[0].title, /这个工作区先聊一下方案/)

butler.handleGroupEvent(job, fakeSession, {
  type: 'turn/start',
  data: { turn: 1 },
  time: now + 2,
})
butler.handleGroupEvent(job, fakeSession, {
  type: 'assistant/message',
  data: { message: { role: 'assistant', content: [{ type: 'text', text: '方案可以这样' }] } },
  time: now + 3,
})
butler.handleGroupEvent(job, fakeSession, {
  type: 'turn/end',
  data: { turn: 1, reason: { kind: 'completed' } },
  time: now + 4,
})
await new Promise((resolve) => setTimeout(resolve, 20))

const card = job.cards[0]
assert.equal(card.turnOpen, false)
assert.equal(card.status, 'done')
assert.equal(card.result.summary, '方案可以这样')
assert.equal(job.liveTurn.open, false)
assert.equal(job.cards.length, 1)

job.liveTurn = { open: true, turn: 8 }
await assert.rejects(
  () => butler.sendGroupMessage('job-group-chat', '执行中不应该抢占'),
  /正在执行任务/,
)
assert.equal(job.chat.length, 1)
job.liveTurn = { open: false, turn: null }

console.log('PASS sendGroupMessage: group question stored and sent to the same session')
console.log('PASS group question: user event materialises exactly one timeline card')
console.log('PASS group card: assistant summary stays on the card, not in the separate chat box')
console.log('PASS group chat input contract: rejected while a task turn is open')
console.log(
  JSON.stringify(
    {
      messages: job.chat.map((message) => `${message.role}:${message.text}`),
      taskNodes: job.cards.length,
      cardStatus: card.status,
      cardSummary: card.result.summary,
      groupChatOpen: job.groupChatOpen,
      promptText: calls[0].text,
    },
    null,
    2,
  ),
)
