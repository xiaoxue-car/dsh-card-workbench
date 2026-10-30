import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')
const start = source.indexOf("    const WORKSPACE_ORDER_KEY = 'butler:workspace-order'")
const end = source.indexOf('    function WorkspaceList', start)
assert.ok(start >= 0 && end > start, 'workspace order helpers must be discoverable')

const store = new Map()
const localStorage = {
  getItem: (key) => (store.has(key) ? store.get(key) : null),
  setItem: (key, value) => store.set(key, String(value)),
}
const helpers = new Function(
  'window',
  `${source.slice(start, end)}; return { readWorkspaceOrder, saveWorkspaceOrder, WORKSPACE_ORDER_KEY }`,
)({ localStorage })

assert.equal(helpers.readWorkspaceOrder().size, 0)
const order = new Map([
  ['D:\\Project\\A', 0],
  ['D:\\Project\\B', 1],
  ['D:\\Project\\C', 2],
])
helpers.saveWorkspaceOrder(order)
const restored = helpers.readWorkspaceOrder()
assert.deepEqual([...restored.entries()], [...order.entries()])
assert.equal(helpers.WORKSPACE_ORDER_KEY, 'butler:workspace-order')

console.log(new Date().toISOString())
console.log('PASS workspace order: persisted entries =', JSON.stringify([...restored.entries()]))
console.log('PASS workspace order: reload restores identical order')
