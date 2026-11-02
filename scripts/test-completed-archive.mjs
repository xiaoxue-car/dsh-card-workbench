import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')

function extractBlock(marker) {
  const start = source.indexOf(marker)
  assert.ok(start >= 0, `missing source block: ${marker}`)
  const open = source.indexOf('{', start)
  let depth = 0
  let quote = ''
  let escaped = false
  for (let index = open; index < source.length; index += 1) {
    const char = source[index]
    if (quote) {
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === quote) quote = ''
      continue
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char
      continue
    }
    if (char === '{') depth += 1
    if (char === '}') {
      depth -= 1
      if (depth === 0) return source.slice(start, index + 1)
    }
  }
  throw new Error(`unbalanced source block: ${marker}`)
}

const helperStart = source.indexOf("    const COMPLETED_ARCHIVE_KEY = 'butler:completed-archive'")
const helperEnd = source.indexOf('    function ActiveTaskCard', helperStart)
assert.ok(helperStart >= 0 && helperEnd > helperStart, 'archive helper block must exist')
const helperCode = source.slice(helperStart, helperEnd)
const closeCode = extractBlock('      const closeArchiveRecord = (key) => {')
const clearCode = extractBlock('      const clearArchiveRecords = () => {')
const laneClearCode = extractBlock('      const clearCompleted = () => {')

const store = new Map()
const localStorage = {
  getItem: (key) => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => store.set(key, String(value)),
}

const records = [
  { key: 'job_a:card_a', title: 'A', at: 2 },
  { key: 'job_b:card_b', title: 'B', at: 1 },
]

function createHarness() {
  let currentRecords = records.map((record) => ({ ...record }))
  const closed = { current: new Set() }
  const calls = { laneCleared: [], writes: [] }
  const setArchiveRecords = (updater) => {
    currentRecords = typeof updater === 'function' ? updater(currentRecords) : updater
  }
  const factory = new Function(
    'window',
    'archiveRecords',
    'archiveClosed',
    'setArchiveRecords',
    'latestCompletedAt',
    'completedClearedAt',
    'writeCompletedClearedAt',
    'setCompletedTasks',
    'data',
    `${helperCode}
${closeCode}
${clearCode}
${laneClearCode}
return {
  closeArchiveRecord,
  clearArchiveRecords,
  clearCompleted,
  readArchiveRecords,
  writeArchiveRecords,
  readArchiveClosed,
  writeArchiveClosed,
}
`,
  )
  const api = factory(
    { localStorage },
    currentRecords,
    closed,
    setArchiveRecords,
    () => 100,
    { current: 0 },
    (value) => calls.laneCleared.push(value),
    () => {},
    { jobs: [] },
  )
  return {
    api,
    getRecords: () => currentRecords,
    closed,
    calls,
  }
}

const harness = createHarness()
harness.api.writeArchiveRecords(records)
assert.deepEqual(
  harness.api.readArchiveRecords().map((item) => item.key),
  ['job_a:card_a', 'job_b:card_b'],
  'archive records must survive a simulated reload',
)
const reloaded = createHarness()
assert.deepEqual(
  reloaded.api.readArchiveRecords().map((item) => item.key),
  ['job_a:card_a', 'job_b:card_b'],
  'archive records must survive a fresh harness load',
)
console.log('PASS completed archive: fresh load records =', JSON.stringify(reloaded.api.readArchiveRecords()))

const beforeClose = JSON.stringify(harness.api.readArchiveRecords())
harness.api.closeArchiveRecord('job_a:card_a')
const afterClose = JSON.stringify(harness.api.readArchiveRecords())
assert.deepEqual(JSON.parse(afterClose).map((item) => item.key), ['job_b:card_b'])
assert.ok(harness.closed.current.has('job_a:card_a'))
console.log('PASS completed archive: before close =', beforeClose)
console.log('PASS completed archive: after close  =', afterClose)

harness.api.clearArchiveRecords()
assert.deepEqual(harness.api.readArchiveRecords(), [])
assert.ok(harness.closed.current.has('job_a:card_a'))
assert.ok(harness.closed.current.has('job_b:card_b'))
console.log('PASS completed archive: clear-all leaves archive =', JSON.stringify(harness.api.readArchiveRecords()))
console.log('PASS completed archive: closed keys =', JSON.stringify([...harness.closed.current]))

const lane = createHarness()
lane.api.writeArchiveRecords(records)
const archiveBeforeLaneClear = JSON.stringify(lane.api.readArchiveRecords())
const closedBeforeLaneClear = JSON.stringify([...lane.closed.current])
lane.api.clearCompleted()
const archiveAfterLaneClear = JSON.stringify(lane.api.readArchiveRecords())
const closedAfterLaneClear = JSON.stringify([...lane.closed.current])
assert.equal(archiveAfterLaneClear, archiveBeforeLaneClear, 'task-lane clear must not touch archive records')
assert.equal(closedAfterLaneClear, closedBeforeLaneClear, 'task-lane clear must not touch closed keys')
console.log('PASS completed lane clear: archive before =', archiveBeforeLaneClear)
console.log('PASS completed lane clear: archive after  =', archiveAfterLaneClear)
console.log('PASS completed lane clear: closed before =', closedBeforeLaneClear)
console.log('PASS completed lane clear: closed after  =', closedAfterLaneClear)
