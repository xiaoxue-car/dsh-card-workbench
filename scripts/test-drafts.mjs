#!/usr/bin/env node
/**
 * Execute the real draft helpers extracted from client.js against a fake
 * localStorage. This models typing, closing the page, and reopening it with
 * both conversation-group and card drafts intact.
 *
 * Run: node scripts/test-drafts.mjs
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')
const source = fs.readFileSync(path.join(root, 'client.js'), 'utf8')
const start = source.indexOf("const DRAFT_PREFIX = 'butler:draft:'")
const marker = "const clearDraft = (key) => writeDraft(key, '')"
const end = source.indexOf('\n', source.indexOf(marker)) + 1
assert.ok(start > 0 && end > start, 'draft helper block must exist in client.js')
const helperCode = source.slice(start, end)

const storage = new Map()
const localStorage = {
  getItem(key) {
    return storage.has(key) ? storage.get(key) : null
  },
  setItem(key, value) {
    storage.set(key, String(value))
  },
  removeItem(key) {
    storage.delete(key)
  },
}
const context = { window: { localStorage }, console }
vm.createContext(context)
const load = () =>
  vm.runInContext(
    `(() => {\n${helperCode}\nreturn { readDraft, writeDraft, clearDraft }\n})()`,
    context,
  )

const firstPage = load()
firstPage.writeDraft('group:job-1', '未发送的对话组问题')
firstPage.writeDraft('card:card-1', '未发送的卡片补充')
firstPage.writeDraft('intake:brief', '未交办的工作内容')
firstPage.writeDraft('intake:cwd', 'D:\\Project\\Demo')
firstPage.writeDraft('intake:preset', 'ptc')
firstPage.writeDraft('intake:permission', 'danger-full-access')
firstPage.writeDraft('intake:model', JSON.stringify({ provider: 'deepseek', model: 'deepseek-chat', reasoningEffort: 'high' }))

// Simulate closing the page and opening a fresh page with the same storage.
const reopenedPage = load()
assert.equal(reopenedPage.readDraft('group:job-1'), '未发送的对话组问题')
assert.equal(reopenedPage.readDraft('card:card-1'), '未发送的卡片补充')
assert.equal(reopenedPage.readDraft('intake:brief'), '未交办的工作内容')
assert.equal(reopenedPage.readDraft('intake:cwd'), 'D:\\Project\\Demo')
assert.equal(reopenedPage.readDraft('intake:preset'), 'ptc')
assert.equal(reopenedPage.readDraft('intake:permission'), 'danger-full-access')
assert.equal(
  JSON.parse(reopenedPage.readDraft('intake:model')).reasoningEffort,
  'high',
)

reopenedPage.clearDraft('group:job-1')
assert.equal(reopenedPage.readDraft('group:job-1'), '')
assert.equal(reopenedPage.readDraft('card:card-1'), '未发送的卡片补充')

assert.match(source, /React\.useState\(\(\) => readDraft\(`group:\$\{job\.id\}`\)\)/)
assert.match(source, /cardDraft = \(id\) => chatDrafts\[id\] \?\? readDraft\(`card:\$\{id\}`\)/)
assert.match(source, /writeDraft\(`group:\$\{job\.id\}`, event\.target\.value\)/)
assert.match(source, /writeDraft\(`card:\$\{id\}`, value\)/)

assert.match(source, /React\.useState\(\(\) => readDraft\('intake:brief'\)\)/)
assert.match(source, /React\.useState\(\(\) => readDraft\('intake:cwd'\)\)/)
assert.match(source, /readDraft\('intake:preset'\)/)
assert.match(source, /readDraft\('intake:permission'\)/)
assert.match(source, /readJsonDraft\('intake:model'\)/)
assert.match(source, /writeDraft\('intake:preset', newPreset\)/)
assert.match(source, /writeDraft\('intake:permission', newPermission\)/)
assert.match(source, /writeDraft\('intake:model', newModelSelection/)
assert.match(source, /writeDraft\('intake:brief', brief\)/)
assert.match(source, /writeDraft\('intake:cwd', cwd\)/)

console.log('PASS drafts: group and card text survives a simulated page close/reopen')
console.log('PASS drafts: intake brief and cwd survive a simulated page close/reopen')
console.log('PASS drafts: intake mode, permission, model and reasoning survive a simulated page close/reopen')
console.log('PASS drafts: successful send clears only the corresponding draft')
console.log('PASS drafts: both group and card composers read/write localStorage')
console.log(
  JSON.stringify(
    {
      keys: [...storage.keys()],
      groupDraft: reopenedPage.readDraft('group:job-1'),
      cardDraft: reopenedPage.readDraft('card:card-1'),
    },
    null,
    2,
  ),
)
