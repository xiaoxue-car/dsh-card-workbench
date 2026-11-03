import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')
const start = source.indexOf('    function CompletedArchivePage(')
const end = source.indexOf('    function BoardView(', start)
assert.ok(start >= 0 && end > start, 'CompletedArchivePage source must be discoverable')
const componentSource = source.slice(start, end)

const hookState = []
let hookIndex = 0
const React = {
  Fragment: 'Fragment',
  useState(initial) {
    const index = hookIndex
    hookIndex += 1
    if (!(index in hookState)) {
      hookState[index] = typeof initial === 'function' ? initial() : initial
    }
    return [
      hookState[index],
      (value) => {
        hookState[index] = typeof value === 'function' ? value(hookState[index]) : value
      },
    ]
  },
  useEffect() {},
}
const h = (type, props, ...children) => ({ type, props: props || {}, children: children.flat(Infinity) })
const t = (key) => ({
  archiveBack: '返回',
  archiveTitle: '已完成工作',
  archiveSub: '倒序',
  archiveCount: '{n} 项已完成',
  archiveClearAll: '全部清理',
  archiveCloseRecord: '关闭这条记录',
  archiveClose: '关闭',
  archiveEmpty: '暂无',
  archiveSummary: '摘要',
  archiveResult: '结果',
  archiveEvidence: '证据',
  archiveOpen: '打开对话',
  archiveSelect: '选择',
  archiveLoadMore: '再显示 48 项（剩余 {n} 项）',
}[key] || key)
const CompletedArchivePage = new Function(
  'React',
  'h',
  'clock',
  't',
  `${componentSource}; return CompletedArchivePage`,
)(React, h, () => '00:00', t)

function collect(node, className, found = []) {
  if (!node || typeof node !== 'object') return found
  if (node.props?.className === className) found.push(node)
  for (const child of node.children || []) collect(child, className, found)
  return found
}

function countItems(node, found = []) {
  if (!node || typeof node !== 'object') return found
  if (String(node.props?.className || '').split(' ').includes('butler-archive-item')) {
    found.push(node)
  }
  for (const child of node.children || []) countItems(child, found)
  return found
}

const records = Array.from({ length: 60 }, (_, index) => ({
  key: `job_${index}:card_${index}`,
  title: `任务 ${index}`,
  jobTitle: `工作区 ${index}`,
  at: 100 - index,
}))
function renderPage() {
  hookIndex = 0
  return CompletedArchivePage({
    t,
    records,
    initialKey: '__archive__',
    onBack() {},
    onOpenSession() {},
    onCloseRecord() {},
    onClearAll() {},
  })
}

const first = renderPage()
assert.equal(countItems(first).length, 48)
const more = collect(first, 'butler-archive-more')
assert.equal(more.length, 1)
assert.match(more[0].children.join(''), /剩余 12 项/)
more[0].props.onClick()
const second = renderPage()
assert.equal(countItems(second).length, 60)
assert.equal(collect(second, 'butler-archive-more').length, 0)

console.log(new Date().toISOString())
console.log('PASS archive pagination: initial rendered rows = 48 / 60')
console.log('PASS archive pagination: load-more label =', more[0].children.join(''))
console.log('PASS archive pagination: remaining rows are rendered on demand')
