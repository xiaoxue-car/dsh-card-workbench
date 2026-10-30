import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')
const start = source.indexOf('    const DISMISSED_COMPLETED_KEY')
const end = source.indexOf('    function ActiveTaskCard', start)
assert.ok(start >= 0 && end > start, 'completed dismissal helpers must be discoverable')

const store = new Map()
const localStorage = {
  getItem: (key) => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => store.set(key, String(value)),
}
const helpers = new Function(
  'window',
  `${source.slice(start, end)}; return { readDismissedCompleted, writeDismissedCompleted, currentCompletedTasks, completedTaskKey }`,
)({ localStorage })

const now = 1_700_000_000_000
const jobs = [{
  id: 'job_demo',
  title: 'Demo',
  cards: [
    { id: 'card_done_1', title: 'done 1', status: 'done', finishedAt: now + 2 },
    { id: 'card_done_2', title: 'done 2', status: 'done', finishedAt: now + 1 },
    { id: 'card_running', title: 'running', status: 'running' },
  ],
}]
const dismissed = helpers.readDismissedCompleted()
assert.equal(dismissed.size, 0)
const item = { job: jobs[0], card: jobs[0].cards[0] }
dismissed.add(helpers.completedTaskKey(item))
helpers.writeDismissedCompleted(dismissed)
const restored = helpers.readDismissedCompleted()
assert.ok(restored.has('job_demo:card_done_1'))
const visible = helpers.currentCompletedTasks(jobs, 8, restored)
assert.deepEqual(visible.map((entry) => entry.card.id), ['card_done_2'])

console.log(new Date().toISOString())
console.log('PASS completed dismissal: persistent keys =', JSON.stringify([...restored]))
console.log('PASS completed dismissal: dismissed card stays hidden after remount')
console.log('PASS completed dismissal: other completed cards remain visible')
