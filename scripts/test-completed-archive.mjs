import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')
const start = source.indexOf("    const COMPLETED_ARCHIVE_KEY = 'butler:completed-archive'")
const end = source.indexOf('    function ActiveTaskCard', start)
assert.ok(start >= 0 && end > start, 'completed archive helpers must be discoverable')

const store = new Map()
const localStorage = {
  getItem: (key) => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => store.set(key, String(value)),
}
const helpers = new Function(
  'window',
  `${source.slice(start, end)}; return { readArchiveRecords, writeArchiveRecords, readArchiveClosed, writeArchiveClosed }`,
)({ localStorage })

const records = [
  { key: 'job_a:card_a', title: 'A', at: 2 },
  { key: 'job_b:card_b', title: 'B', at: 1 },
]
helpers.writeArchiveRecords(records)
assert.deepEqual(helpers.readArchiveRecords().map((item) => item.key), [
  'job_a:card_a',
  'job_b:card_b',
])

// Closing one record only removes that record.
const closed = helpers.readArchiveClosed()
closed.add('job_a:card_a')
helpers.writeArchiveClosed(closed)
helpers.writeArchiveRecords(records.filter((item) => item.key !== 'job_a:card_a'))
assert.deepEqual(helpers.readArchiveRecords().map((item) => item.key), ['job_b:card_b'])
assert.ok(helpers.readArchiveClosed().has('job_a:card_a'))

// Clear-all persists an empty list and blocks the old keys from being re-seeded.
const allClosed = helpers.readArchiveClosed()
for (const record of helpers.readArchiveRecords()) allClosed.add(record.key)
helpers.writeArchiveClosed(allClosed)
helpers.writeArchiveRecords([])
assert.deepEqual(helpers.readArchiveRecords(), [])
assert.ok(helpers.readArchiveClosed().has('job_b:card_b'))

console.log(new Date().toISOString())
console.log('PASS completed archive: persisted records =', JSON.stringify(records.map((item) => item.key)))
console.log('PASS completed archive: per-record close only removes one key')
console.log('PASS completed archive: clear-all persists an empty archive and closed keys')
