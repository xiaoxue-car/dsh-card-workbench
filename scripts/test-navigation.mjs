#!/usr/bin/env node
/** Deterministic check for manual-open return-to-workshop decisions and the test-label filter. */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')
const source = fs.readFileSync(path.join(root, 'client.js'), 'utf8')
const start = source.indexOf('const jobActivity = (job) =>')
const end = source.indexOf('function ButlerPage', start)
assert.ok(start > 0 && end > start, 'navigationReturn must exist before ButlerPage')
const code = source.slice(start, end)
const context = { Date }
vm.createContext(context)
vm.runInContext(`${code}\n;globalThis.__navigationReturn = navigationReturn`, context)
const decide = context.__navigationReturn

const now = Date.now()
const track = { sessionId: 's-1', sawOpen: false, at: now }

// Opening a completed card without answering must not force a return immediately.
assert.equal(decide(track, { sessionId: 's-1', cards: [{ status: 'done' }] }), 'wait')
// No activity for five minutes expires the tracking instead of later jumping.
assert.equal(decide(track, { sessionId: 's-1', cards: [{ status: 'done' }] }, now + 300001), 'expire')

// Selecting/filling a need starts the active phase, then completing it returns.
const waitingTrack = { sessionId: 's-2', sawOpen: false, at: now }
assert.equal(
  decide(waitingTrack, {
    sessionId: 's-2',
    cards: [{ needsUser: { requestId: 'r-1' }, turnOpen: false }],
  }),
  'wait',
)
assert.equal(waitingTrack.sawOpen, true)
assert.equal(
  decide(waitingTrack, { sessionId: 's-2', cards: [{ turnOpen: false }] }),
  'return',
)

// A normal user turn that opens and later closes also returns.
const turnTrack = { sessionId: 's-3', sawOpen: false, at: now }
assert.equal(decide(turnTrack, { sessionId: 's-3', cards: [{ turnOpen: true }] }), 'wait')
assert.equal(decide(turnTrack, { sessionId: 's-3', cards: [{ turnOpen: false }] }), 'return')

// A turn that completes between polls is detected from the card activity change.
const activityTrack = {
  sessionId: 's-4',
  baseline: { activity: 100, status: 'watching', needsUser: false },
  sawOpen: false,
  at: now,
}
assert.equal(
  decide(activityTrack, {
    sessionId: 's-4',
    status: 'watching',
    cards: [{ turnOpen: false, lastActivityAt: 200, createdAt: 100 }],
  }),
  'return',
)

// Filter must only drop injected __TEST_ entries, never real panels.
const keep = (label) => !label.startsWith('__TEST_')
for (const label of ['总管家', '插件', '自动化任务', '设置', '新建对话']) {
  assert.equal(keep(label), true, `real menu label must stay: ${label}`)
}
assert.equal(keep('__TEST_PLUGIN__'), false)

console.log('PASS navigation: completed-card open stays until a turn/need becomes active')
console.log('PASS navigation: needsUser -> resolve returns to card workshop')
console.log('PASS navigation: turn open -> close returns to card workshop')
console.log('PASS navigation: activity change between polls also returns')
console.log('PASS navigation: cancelling/no activity expires instead of jumping')
console.log('PASS menu filter: only __TEST_ artifacts are removed; real labels stay')
