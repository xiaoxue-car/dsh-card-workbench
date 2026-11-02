import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')
const start = source.indexOf('    function TaskBoard(')
const end = source.indexOf('    function CompletedArchivePage', start)
assert.ok(start >= 0 && end > start, 'TaskBoard source must be discoverable')
const componentSource = source.slice(start, end)

const React = {
  useState(initial) {
    return [typeof initial === 'function' ? initial() : initial, () => {}]
  },
  useRef(initial) {
    return { current: initial }
  },
  useEffect() {},
}
const h = (type, props, ...children) => ({
  type,
  props: props || {},
  children: children.flat(Infinity),
})
const ActiveTaskCard = function ActiveTaskCard() {
  return null
}
const labels = {
  taskCompletedLane: '已完成',
  taskClearCompleted: '清空已完成',
  taskNoCompleted: '暂无已完成任务',
  archiveViewAll: '查看全部 {n} 项',
  taskExpandHint: '展开',
}
const t = (key) => labels[key] || key
const TaskBoard = new Function(
  'React',
  'h',
  'ActiveTaskCard',
  't',
  `${componentSource}; return TaskBoard`,
)(React, h, ActiveTaskCard, t)

const completedTasks = Array.from({ length: 8 }, (_, index) => ({
  job: { id: `job_${index}`, title: `Work ${index}` },
  card: { id: `card_${index}`, title: `Task ${index}` },
}))
const laneClosed = []
const tree = TaskBoard({
  t,
  activeTasks: [],
  completedTasks,
  nowTime: Date.now(),
  onOpen() {},
  onOpenArchive({}) {},
  onOpenArchiveAll() {},
  onCloseLane(item) {
    laneClosed.push(`${item.job.id}:${item.card.id}`)
  },
  onClearCompleted() {},
})

function collect(node, className, found = []) {
  if (!node || typeof node !== 'object') return found
  if (node.props?.className === className) found.push(node)
  for (const child of node.children || []) collect(child, className, found)
  return found
}

const rows = collect(tree, 'butler-task-completed-row')
const more = collect(tree, 'butler-task-completed-more')
const laneCloses = collect(tree, 'butler-task-completed-close')
assert.equal(rows.length, 3, 'at most three completed rows must render')
assert.equal(laneCloses.length, 3, 'each previewed completed row must expose a close button')
laneCloses[0].props.onClick({ stopPropagation() {} })
assert.deepEqual(laneClosed, ['job_0:card_0'], 'row close must remove only its own key')
assert.equal(more.length, 1, 'a view-all action must render when there are more than three')
assert.equal(more[0].children.join(''), '查看全部 8 项')
assert.equal(collect(tree, 'butler-task-completed-list').length, 1)

console.log(new Date().toISOString())
console.log('PASS completed preview: rendered rows =', rows.length)
console.log('PASS completed preview: each row has an independent close button')
console.log('PASS completed preview: view-all label =', more[0].children.join(''))
console.log('PASS completed preview: 8 completed tasks did not create 8 rows')
