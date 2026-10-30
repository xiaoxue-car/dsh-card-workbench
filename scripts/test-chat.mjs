#!/usr/bin/env node
/**
 * Deterministic check for inline card chat, without touching a real Session.
 *
 * Run: node scripts/test-chat.mjs
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
  settings: {},
  jobs: [
    {
      id: 'job-chat',
      kind: 'session',
      sessionId: 'session-chat',
      title: '测试对话组',
      brief: '测试对话组',
      cwd: process.cwd(),
      status: 'watching',
      createdAt: now,
      updatedAt: now,
      cards: [
        {
          id: 'card-chat',
          kind: 'session',
          title: '测试任务节点',
          goal: '原始任务',
          status: 'done',
          turnOpen: false,
          createdAt: now,
          lastActivityAt: now,
          chat: [],
        },
      ],
      log: [],
      gapRounds: 0,
      summary: '',
    },
  ],
}
butler.sessionGroups = new Map([['session-chat', 'job-chat']])
butler.promptSession = async (job, card, text, mode) => {
  calls.push({ jobId: job.id, cardId: card.id, text, mode })
}
butler.save = () => {}

const job = butler.findJob('job-chat')
const card = butler.findCard(job, 'card-chat')
const view = await butler.sendCardMessage('job-chat', 'card-chat', '把标题再短一点')

assert.equal(card.status, 'running')
assert.equal(card.chatMode, true)
assert.equal(job.chatTarget, 'card-chat')
assert.equal(card.chat.length, 1)
assert.equal(card.chat[0].role, 'user')
assert.equal(card.chat[0].text, '把标题再短一点')
assert.equal(calls.length, 1)
assert.match(calls[0].text, /^【总管家对话】/)
assert.equal(calls[0].mode, 'queue')
assert.equal(view.cards[0].chat.length, 1)

// Simulate the real Session turn: start -> assistant message -> end.
const fakeSession = { id: 'session-chat', header: { cwd: process.cwd() }, ownEvents: () => [] }
butler.handleGroupEvent(job, fakeSession, {
  type: 'turn/start',
  data: { turn: 7 },
  time: now + 1,
})
butler.handleGroupEvent(job, fakeSession, {
  type: 'assistant/message',
  data: {
    message: {
      role: 'assistant',
      content: [{ type: 'text', text: 'CHAT-OK' }],
    },
  },
  time: now + 2,
})
butler.handleGroupEvent(job, fakeSession, {
  type: 'turn/end',
  data: { turn: 7, reason: { kind: 'completed' } },
  time: now + 3,
})

assert.equal(job.cards.length, 1, 'card chat must not create a new task node')
assert.equal(card.status, 'done')
assert.equal(card.chat.length, 2)
assert.equal(card.chat[1].role, 'assistant')
assert.equal(card.chat[1].text, 'CHAT-OK')
assert.equal(job.chatTarget, null)

console.log('PASS sendCardMessage: card re-opened, chat stored, prompt sent to the same session')
console.log('PASS chat turn: assistant reply appended, no new task node, card returned to done')
console.log(
  JSON.stringify(
    {
      status: card.status,
      chatMode: card.chatMode,
      chatTarget: job.chatTarget,
      chatMessages: card.chat.length,
      chatReply: card.chat[1].text,
      cardsAfter: job.cards.length,
      promptPrefix: calls[0].text.slice(0, 8),
      mode: calls[0].mode,
    },
    null,
    2,
  ),
)
