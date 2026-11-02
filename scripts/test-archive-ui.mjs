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
globalThis.window = { innerWidth: 800, innerHeight: 600 }
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
function renderPage() {
  hookIndex = 0
  return CompletedArchivePage({
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
}
const tree = renderPage()

function collect(node, className, found = []) {
  if (!node || typeof node !== 'object') return found
  if (node.props?.className === className) found.push(node)
  for (const child of node.children || []) collect(child, className, found)
  return found
}

const rowCloses = collect(tree, 'butler-archive-item-close')
const titles = collect(tree, 'butler-archive-item-title')
assert.equal(titles.length, 2, 'every archive record must render its task title')
assert.deepEqual(titles.map((node) => node.children.join('')), ['Task A', 'Task B'])
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

const activeItem = collect(tree, 'butler-archive-item is-active')[0]
assert.ok(activeItem?.props.onMouseEnter, 'archive items must expose a hover tooltip handler')
activeItem.props.onMouseEnter({
  currentTarget: {
    querySelector(selector) {
      return selector.includes('title')
        ? { scrollWidth: 300, clientWidth: 100 }
        : { scrollWidth: 200, clientWidth: 100 }
    },
    getBoundingClientRect: () => ({ left: 20, bottom: 120 }),
  },
})
const tooltipTree = renderPage()
const tips = collect(tooltipTree, 'butler-archive-tip')
assert.equal(tips.length, 1, 'hovering a clipped summary must render a tooltip')
assert.match(tips[0].children.join(''), /Task A/)
assert.match(tips[0].children.join(''), /Job A/)
assert.equal(tips[0].props.style.left, 20)
assert.equal(tips[0].props.style.top, 126)

console.log(new Date().toISOString())
console.log('PASS archive UI: every record has its own close button')
console.log('PASS archive UI: every record renders its task title =', JSON.stringify(titles.map((node) => node.children.join(''))))
console.log('PASS archive UI: closing one row sends only that key =', JSON.stringify(closed[0]))
console.log('PASS archive UI: selected detail can also be closed =', JSON.stringify(closed[1]))
console.log('PASS archive UI: open conversation uses the selected session')
console.log('PASS archive UI: clipped summary hover renders a full tooltip =', JSON.stringify(tips[0].children.join('')))
const fallbackTree = CompletedArchivePage({
  t,
  records: [{ key: 'job_fallback:card_fallback', title: '', summary: 'Fallback summary', jobTitle: 'Fallback job', at: 3 }],
  initialKey: '__archive__',
  onBack() {},
  onOpenSession() {},
  onCloseRecord() {},
  onClearAll() {},
})
const fallbackTitle = collect(fallbackTree, 'butler-archive-item-title')
assert.equal(fallbackTitle.length, 1)
assert.equal(fallbackTitle[0].children.join(''), 'Fallback summary')
console.log('PASS archive UI: empty title falls back to summary')

const workspaceFallbackTree = CompletedArchivePage({
  t,
  records: [{ key: 'job_workspace:card_workspace', title: '', summary: '', resultSummary: '', jobTitle: 'Fallback job', at: 4 }],
  initialKey: '__archive__',
  onBack() {},
  onOpenSession() {},
  onCloseRecord() {},
  onClearAll() {},
})
const workspaceFallbackTitle = collect(workspaceFallbackTree, 'butler-archive-item-title')
assert.equal(workspaceFallbackTitle[0].children.join(''), 'Fallback job')
console.log('PASS archive UI: empty title and summary fall back to workspace title')

console.log('PASS archive UI: sentinel key selects the first record by default')
