#!/usr/bin/env node
/**
 * Deterministic check for the composer permission selector bridge.
 *
 * Run: node scripts/test-permission.mjs
 */

import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

const calls = []
const session = { id: 'session-permission' }
const agent = { id: 'session-permission' }
const butler = new Butler({
  ctx: {
    get: (name) => {
      if (name === 'permissionPresets') {
        return {
          catalog: () => ({
            options: [
              { value: 'read-only', name: '只读', description: '' },
              { value: 'danger-full-access', name: '最高权限', description: '' },
            ],
            defaultOptions: [],
            defaultPreset: 'read-only',
          }),
          current: () => calls.find((call) => call.preset)?.preset || 'danger-full-access',
          resolve: (preset) => ({
            sandbox: preset === 'danger-full-access' ? 'danger-full-access' : 'read-only',
            approval: preset === 'danger-full-access' ? 'never' : 'ask',
          }),
          set: (target, preset) => calls.push({ target, preset }),
        }
      }
      if (name === 'approval') {
        return { setPolicy: (target, policy) => calls.push({ target, policy }) }
      }
      return undefined
    },
    sessions: { get: () => session },
    agents: { get: () => agent },
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
  id: 'job-permission',
  kind: 'session',
  sessionId: 'session-permission',
  title: '权限测试',
  brief: '权限测试',
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
butler.sessionGroups = new Map([['session-permission', 'job-permission']])
butler.save = () => {}

const view = await butler.setSessionPermission('job-permission', 'read-only')

assert.equal(job.permissionPreset, 'read-only')
assert.equal(view.permission, 'read-only')
assert.deepEqual(calls[0], { target: session, preset: 'read-only' })
assert.deepEqual(calls[1], { target: agent, policy: 'ask' })

console.log('PASS setSessionPermission: preset applied, approval policy set, job view updated')
console.log(JSON.stringify({ permission: job.permissionPreset, calls }, null, 2))
