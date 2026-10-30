#!/usr/bin/env node
/**
 * Deterministic check for the intake folder -> Workspace path.
 *
 * The Host must call workspaceRegistry.create(path) so a folder that is not in
 * the existing workspace list becomes a new Workspace (create is idempotent and
 * reuses an existing one).
 *
 * Run: node scripts/test-workspace.mjs
 */

import assert from 'node:assert/strict'
import path from 'node:path'
import { Butler } from '../lib/engine.js'

const calls = []
const butler = new Butler({
  ctx: {
    get: (name) =>
      name === 'workspaceRegistry'
        ? {
            async create(target) {
              calls.push(target)
              return { id: 'workspace-from-test', path: target, title: path.basename(target) }
            },
          }
        : undefined,
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

const cwd = process.cwd()
const workspace = await butler.ensureWorkspace(cwd)

assert.equal(workspace.id, 'workspace-from-test')
assert.equal(calls.length, 1)
assert.equal(calls[0], cwd)

console.log('PASS ensureWorkspace: calls workspaceRegistry.create(path) for a chosen folder')
console.log(
  JSON.stringify(
    {
      requestedPath: cwd,
      workspaceId: workspace.id,
      createCalls: calls.length,
    },
    null,
    2,
  ),
)
