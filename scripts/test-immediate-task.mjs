import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')
const start = source.indexOf('    function allActiveTasks(jobs) {')
const end = source.indexOf('    function currentCompletedTasks', start)
assert.ok(start >= 0 && end > start, 'allActiveTasks source must be discoverable')
const functionSource = source.slice(start, end)
const allActiveTasks = new Function(`${functionSource}; return allActiveTasks`)()

const now = 1_700_000_000_000

const planning = [{
  id: 'job_planning',
  title: '检查新任务是否立刻显示',
  status: 'planning',
  createdAt: now,
  updatedAt: now,
  cards: [],
}]
const planningItems = allActiveTasks(planning)
assert.equal(planningItems.length, 1, 'planning job must produce one placeholder')
assert.equal(planningItems[0].card.id, 'planning:job_planning')
assert.equal(planningItems[0].card.status, 'planning')
assert.equal(planningItems[0].job.id, 'job_planning')

const queued = [{ id: 'job_queued', title: '排队任务', status: 'queued', createdAt: now, updatedAt: now, cards: [] }]
const queuedItems = allActiveTasks(queued)
assert.equal(queuedItems.length, 1)
assert.equal(queuedItems[0].card.id, 'planning:job_queued')
assert.equal(queuedItems[0].card.status, 'queued')

const materialized = [{
  id: 'job_planning',
  title: '检查新任务是否立刻显示',
  status: 'planning',
  createdAt: now,
  updatedAt: now,
  cards: [{ id: 'card_real_1', title: '真实任务卡', status: 'running', createdAt: now, lastActivityAt: now }],
}]
const materializedItems = allActiveTasks(materialized)
assert.equal(materializedItems.length, 1)
assert.equal(materializedItems[0].card.id, 'card_real_1')
assert.ok(!materializedItems[0].card.id.startsWith('planning:'), 'placeholder must be replaced')

const terminal = [{
  id: 'job_done',
  title: '已完成任务',
  status: 'done',
  createdAt: now,
  updatedAt: now,
  cards: [{ id: 'card_done', title: '完成', status: 'done', createdAt: now }],
}]
assert.equal(allActiveTasks(terminal).length, 0)

console.log(new Date().toISOString())
console.log('PASS allActiveTasks: planning placeholder =', JSON.stringify(planningItems[0].card))
console.log('PASS allActiveTasks: queued placeholder =', JSON.stringify(queuedItems[0].card))
console.log('PASS allActiveTasks: materialized card replaces placeholder =', JSON.stringify(materializedItems[0].card))
console.log('PASS allActiveTasks: terminal cards are excluded')
