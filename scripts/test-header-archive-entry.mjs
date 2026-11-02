import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')

function extractBalanced(marker, openChar, closeChar) {
  const start = source.indexOf(marker)
  assert.ok(start >= 0, `missing marker: ${marker}`)
  const open = source.indexOf(openChar, start)
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
    if (char === openChar) depth += 1
    if (char === closeChar) {
      depth -= 1
      if (depth === 0) return source.slice(start, index + 1)
    }
  }
  throw new Error(`unbalanced block: ${marker}`)
}

const h = (type, props, ...children) => ({ type, props: props || {}, children: children.flat(Infinity) })
function collect(node, predicate, found = []) {
  if (!node || typeof node !== 'object') return found
  if (predicate(node)) found.push(node)
  for (const child of node.children || []) collect(child, predicate, found)
  return found
}

// Build a stateful binding from the real openCompletedArchiveList function.
const openStart = source.indexOf('const openCompletedArchiveList')
const openCode = extractBalanced(source.slice(openStart), '{', '}')
let archiveKey = ''
const invokeOpen = new Function(
  'setArchiveKey',
  'data',
  'archiveClosed',
  'ensureArchiveFromData',
  `${openCode}; return openCompletedArchiveList`,
)((value) => {
  archiveKey = value
}, null, { current: new Set() }, () => {})

// Extract the real header button expression that follows the refresh button.
const refreshAt = source.indexOf("onClick: () => void refreshNow()")
const archiveAt = source.indexOf("onClick: openCompletedArchiveList", refreshAt)
assert.ok(refreshAt >= 0 && archiveAt > refreshAt, 'archive button must follow the refresh button')
const buttonStart = source.lastIndexOf('h(', archiveAt)
const buttonCode = extractBalanced(source.slice(buttonStart), '(', ')')
const labels = { archiveButton: '已完成记录', refresh: '刷新', refreshing: '刷新中' }
const button = new Function('h', 'Btn', 't', 'openCompletedArchiveList', `return ${buttonCode}`)(
  h,
  'Btn',
  (key) => labels[key] || key,
  invokeOpen,
)
assert.equal(button.children.join(''), '已完成记录')

invokeOpen()
assert.equal(archiveKey, '__archive__')
button.props.onClick()
assert.equal(archiveKey, '__archive__')

// The actual archive branch must render CompletedArchivePage for the sentinel.
const branch = extractBalanced(
  source.slice(source.indexOf('if (archiveKey) {'), source.indexOf('const filterLabels')),
  '{',
  '}',
)
const CompletedArchivePage = function CompletedArchivePage() {
  return null
}
const tree = new Function(
  'archiveKey',
  'h',
  'CompletedArchivePage',
  'CSS',
  'props',
  't',
  'archiveRecords',
  'openSession',
  'closeArchiveRecord',
  'clearArchiveRecords',
  'setArchiveKey',
  `${branch}; return null`,
)(
  archiveKey,
  h,
  CompletedArchivePage,
  'css',
  { topbar: () => null },
  (key) => key,
  [],
  () => {},
  () => {},
  () => {},
  () => {},
)
const archivePages = collect(tree, (node) => node.type === CompletedArchivePage)
assert.equal(archivePages.length, 1, 'the archive branch must render CompletedArchivePage')
const archiveProps = archivePages[0].props
assert.equal(archiveProps.initialKey, '__archive__')
assert.equal(archiveProps.records.length, 0)

console.log(new Date().toISOString())
console.log('PASS header archive: button label =', button.children.join(''))
console.log('PASS header archive: button is after refresh')
console.log('PASS header archive: click sets archiveKey =', archiveKey)
console.log('PASS header archive: branch renders CompletedArchivePage')
console.log('PASS header archive: sentinel falls through to the archive page default selection')
