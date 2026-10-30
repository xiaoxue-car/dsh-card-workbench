#!/usr/bin/env node
/** Deterministic check for per-conversation agent preset listing and selection. */

import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

const selected = []
const agent = { id: 'agent-1' }
const agentPresets = {
  list: async () => [
    { id: 'default', name: '创造模式', isDefault: true },
    { id: 'review', name: '审查模式', isDefault: false },
  ],
  select: async (target, id) => {
    selected.push({ target, id })
    return id
  },
}
const butler = new Butler({
  ctx: {
    get: (key) => (key === 'agentPresets' ? agentPresets : undefined),
    sessions: { get: () => ({ header: { agentPreset: 'default' } }) },
    agents: { get: () => agent, list: () => [agent] },
    agentPresets,
  },
  config: { fullAccess: true },
  store: { file: '', directory: '', scheduleSave() {}, async close() {} },
  model: { complete: async () => ({}) },
  defaultCwd: process.cwd(),
})
butler.board = {
  version: 1,
  settings: {},
  jobs: [
    {
      id: 'job-preset',
      kind: 'session',
      sessionId: 'session-preset',
      status: 'watching',
      title: 'preset test',
      cards: [],
      chat: [],
    },
  ],
}
butler.save = () => {}

await butler.refreshPresetCatalog()
assert.equal(butler.presetCatalog.presets.length, 2)
const view = await butler.selectPreset('job-preset', 'review')
assert.equal(selected.length, 1)
assert.equal(selected[0].target, agent)
assert.equal(selected[0].id, 'review')
assert.equal(view.preset, 'review')
assert.equal(butler.findJob('job-preset').preset, 'review')

console.log('PASS presets: catalog exposes the available modes')
console.log('PASS presets: selectPreset forwards the chosen mode and persists it on the conversation')
console.log(JSON.stringify({ presets: butler.presetCatalog.presets.map((p) => p.id), selected: selected[0], current: view.preset }, null, 2))
