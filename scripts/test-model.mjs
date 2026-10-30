#!/usr/bin/env node
/**
 * Deterministic check for the plugin-native model/reasoning selector.
 *
 * Run: node scripts/test-model.mjs
 */

import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

const calls = []
const butler = new Butler({
  ctx: {
    get: () => undefined,
    sessions: { get: () => undefined },
    agents: { get: () => undefined },
    sessionController: {
      async selectModel(request) {
        calls.push(request)
        return {
          selected: {
            provider: request.provider,
            model: request.model,
            ...(request.reasoningEffort ? { reasoningEffort: request.reasoningEffort } : {}),
          },
        }
      },
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

const now = Date.now()
const job = {
  id: 'job-model',
  kind: 'session',
  sessionId: 'session-model',
  title: '模型测试',
  brief: '模型测试',
  cwd: process.cwd(),
  status: 'watching',
  createdAt: now,
  updatedAt: now,
  cards: [],
  log: [],
  gapRounds: 0,
  summary: '',
  chat: [],
}
butler.board = { version: 1, settings: {}, jobs: [job] }
butler.sessionGroups = new Map([['session-model', 'job-model']])
butler.save = () => {}

await butler.selectSessionModel('job-model', {
  provider: 'deepseek',
  model: 'deepseek-chat',
  reasoningEffort: 'high',
})

assert.equal(calls.length, 1)
assert.deepEqual(calls[0], {
  sessionId: 'session-model',
  provider: 'deepseek',
  model: 'deepseek-chat',
  reasoningEffort: 'high',
})
assert.deepEqual(job.modelSelection, {
  provider: 'deepseek',
  model: 'deepseek-chat',
  reasoningEffort: 'high',
})

console.log('PASS selectSessionModel: provider/model/reasoningEffort forwarded and persisted')
console.log(JSON.stringify({ request: calls[0], saved: job.modelSelection }, null, 2))
