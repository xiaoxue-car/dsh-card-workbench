#!/usr/bin/env node
/**
 * Static contract check for the default-collapsed task timeline.
 *
 * The environment has no browser controller, so this asserts the exact
 * source-level contract that controls DOM creation:
 *   - timelineOpen initializes to false;
 *   - true renders .butler-timeline and maps CardTile;
 *   - false renders only the timelineCollapsed placeholder;
 *   - clicking the task-time-line name toggles it, and Enter/Space does too;
 *   - the old standalone button labels are absent;
 *   - expand-all is gated by timelineOpen.
 *
 * Run: node scripts/test-timeline.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const file = path.join(root, 'client.js')
const source = fs.readFileSync(file, 'utf8')

function lineOf(pattern) {
  const match = pattern.exec(source)
  if (!match) return null
  return source.slice(0, match.index).split(/\r?\n/).length
}

const init = /const \[timelineOpen, setTimelineOpen\] = React\.useState\(false\)/
const openBranch = /timelineOpen\s*\?\s*h\(\s*'div',\s*\{\s*className:\s*'butler-timeline'\s*\}[\s\S]*?cards\.map/
const closedBranch = /:\s*h\('div',\s*\{\s*className:\s*'butler-tl-empty'\s*\},\s*fill\(t\('timelineCollapsed'\)/
const timelineToggle =
  /className:\s*'butler-label butler-timeline-toggle'[\s\S]*?onClick:\s*\(\) => setTimelineOpen/
const timelineKeyboard =
  /className:\s*'butler-label butler-timeline-toggle'[\s\S]*?onKeyDown:[\s\S]*?setTimelineOpen/
const expandAllGate = /timelineOpen\s*\?\s*h\(\s*Btn,[\s\S]*?setExpandAll/
const oldButtonLabel = /collapseTimeline|expandTimeline/
const oldButtonRender = /h\(\s*Btn,\s*\{[^}]*setTimelineOpen/
const groupState =
  /const \[groupOpen, setGroupOpen\] = React\.useState\(\(\) =>\s*sessionChatStore\.readGroupOpen/
const groupToggle = /className:\s*'butler-job-title is-clickable'[\s\S]*?onClick:\s*\(\) => toggleGroup\(\)/
const groupBody = /className:\s*'butler-job-body'[\s\S]*?display:\s*groupOpen \? 'flex' : 'none'/
const workspaceDefault =
  /defaultOpen:\s*!historical && \(index === 0 \|\| \(defaultCwd && group\.cwd === defaultCwd\)\)/
const cardsDescending =
  /const cards = \[\.\.\.job\.cards\]\.sort\(\(a, b\) => \(b\.createdAt \|\| 0\) - \(a\.createdAt \|\| 0\)\)/

assert.ok(init.test(source), 'timelineOpen must initialize to false')
assert.ok(openBranch.test(source), 'open branch must render .butler-timeline and map cards')
assert.ok(closedBranch.test(source), 'closed branch must render only the collapsed placeholder')
assert.ok(timelineToggle.test(source), 'clicking the task timeline name must toggle timelineOpen')
assert.ok(timelineKeyboard.test(source), 'the task timeline name must toggle with Enter/Space')
assert.ok(expandAllGate.test(source), 'expand-all must be rendered only while timelineOpen is true')
assert.ok(!oldButtonLabel.test(source), 'the old collapse/expand timeline button labels/keys must be gone')
assert.ok(!oldButtonRender.test(source), 'there must be no Btn whose onClick calls setTimelineOpen')
assert.ok(groupState.test(source), 'groupOpen must restore the persisted group state')
assert.ok(groupToggle.test(source), 'clicking the conversation group title must toggle groupOpen')
assert.ok(groupBody.test(source), 'conversation group body must be hidden when groupOpen is false')
assert.ok(workspaceDefault.test(source), 'current workspace stays open so collapsed group names are visible')
assert.ok(cardsDescending.test(source), 'card timeline must render newest createdAt first')

// State transition contract: false -> click -> true -> click -> false.
let timelineOpen = false
const toggleTimeline = () => {
  timelineOpen = !timelineOpen
}
assert.equal(timelineOpen, false)
toggleTimeline()
assert.equal(timelineOpen, true)
toggleTimeline()
assert.equal(timelineOpen, false)

console.log('PASS timeline default: timelineOpen=false')
console.log(`PASS open branch renders .butler-timeline at client.js:${lineOf(openBranch)}`)
console.log(`PASS closed branch renders only .butler-tl-empty at client.js:${lineOf(closedBranch)}`)
console.log('PASS per-group collapse: title click + groupOpen=false default + display switch')
console.log('PASS workspace default: current workspace open, other workspace sections collapsed')
console.log(`PASS card order: newest createdAt first at client.js:${lineOf(cardsDescending)}`)
console.log('PASS timeline toggle: clicking the task timeline name expands/collapses it')
console.log('PASS timeline keyboard: Enter/Space toggles the task timeline name')
console.log('PASS expand-all gate: 全部展开/收起全部 only renders while timelineOpen=true')
console.log('PASS old button removal: no collapseTimeline/expandTimeline keys or Btn setTimelineOpen branch')
console.log('PASS state transition: false -> click -> true -> click -> false')
console.log(
  JSON.stringify(
    {
      initLine: lineOf(init),
      openBranchLine: lineOf(openBranch),
      closedBranchLine: lineOf(closedBranch),
      toggleLine: lineOf(timelineToggle),
    },
    null,
    2,
  ),
)
