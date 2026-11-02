import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')
const start = source.indexOf('    function CompletedArchivePage(')
const end = source.indexOf('    function BoardView(', start)
assert.ok(start >= 0 && end > start, 'CompletedArchivePage source must be discoverable')
const componentSource = source.slice(start, end)

const React = {
  Fragment: 'Fragment',
  useState(initial) {
    return [typeof initial === 'function' ? initial() : initial, () => {}]
  },
  useEffect() {},
}
const h = (type, props, ...children) => ({
  type,
  props: props || {},
  children: children.flat(Infinity),
})
const clock = () => '00:00'
const labels = {
  archiveBack: '返回',
  archiveTitle: '已完成工作',
  archiveSub: '倒序',
  archiveCount: '{n} 项已完成',
  archiveClearAll: '全部清理',
  archiveCloseRecord: '关闭这条已完成记录',
  archiveClose: '关闭',
  archiveEmpty: '暂无',
  archiveSummary: '摘要',
  archiveResult: '结果',
  archiveEvidence: '证据',
  archiveOpen: '打开对话',
  archiveSelect: '选择',
}
const t = (key) => labels[key] || key
const CompletedArchivePage = new Function(
  'React',
  'h',
  'clock',
  't',
  `${componentSource}; return CompletedArchivePage`,
)(React, h, clock, t)

const records = [
  { key: 'job_a:card_a', title: 'Task A', jobTitle: 'Job A', summary: 'Summary A', at: 2, sessionId: 's1' },
  { key: 'job_b:card_b', title: 'Task B', jobTitle: 'Job B', summary: 'Summary B', at: 1, sessionId: 's2' },
]
const closed = []
let opened = ''
const tree = CompletedArchivePage({
  t,
  records,
  initialKey: '__archive__',
  onBack() {},
  onOpenSession(id) {
    opened = id
  },
  onCloseRecord(key) {
    closed.push(key)
  },
  onClearAll() {},
})

function collect(node, className, found = []) {
  if (!node || typeof node !== 'object') return found
  if (node.props?.className === className) found.push(node)
  for (const child of node.children || []) collect(child, className, found)
  return found
}

const rowCloses = collect(tree, 'butler-archive-item-close')
const summaries = collect(tree, 'butler-archive-item-summary')
assert.equal(summaries.length, 2, 'every archive record must render its task summary')
assert.deepEqual(summaries.map((node) => node.children.join('')), ['Summary A', 'Summary B'])
assert.equal(collect(tree, 'butler-archive-item-title').length, 2)
const detailClose = collect(tree, 'butler-archive-detail-close')
assert.equal(rowCloses.length, 2, 'every archive record must expose a close button')
assert.equal(detailClose.length, 1, 'the detail pane must expose a close button for the selected record')

rowCloses[1].props.onClick({ stopPropagation() {} })
assert.deepEqual(closed, ['job_b:card_b'])
detailClose[0].props.onClick()
assert.deepEqual(closed, ['job_b:card_b', 'job_a:card_a'])

const openButton = collect(tree, 'butler-btn small').find((node) => node.children.join('') === '打开对话')
assert.ok(openButton, 'the detail must expose the open-conversation action')
openButton.props.onClick()
assert.equal(opened, 's1')

console.log(new Date().toISOString())
console.log('PASS archive UI: every record has its own close button')
console.log('PASS archive UI: every record renders its task summary =', JSON.stringify(summaries.map((node) => node.children.join(''))))
console.log('PASS archive UI: closing one row sends only that key =', JSON.stringify(closed[0]))
console.log('PASS archive UI: selected detail can also be closed =', JSON.stringify(closed[1]))
console.log('PASS archive UI: open conversation uses the selected session')
console.log('PASS archive UI: sentinel key selects the first record by default')
