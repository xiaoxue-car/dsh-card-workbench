import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')

const scopedSidebar = /body\[data-butler-page="1"\] \[class\*="_sidebarCol"\]/
const scopedFrame = /body\[data-butler-page="1"\] div\[class\*="_frame"\]/
const observer = /new MutationObserver\(\(\) => \{[\s\S]*?attributeFilter: \['class', 'data-butler-page'\]/
const slowFallback = /setInterval\(apply, 2000\)/
const oldFastInterval = /setInterval\(apply, 500\)/
const oldSidebarScan = /querySelectorAll\('\[class\*="_sidebarCol"\]'\)\.forEach/

assert.ok(scopedSidebar.test(source), 'sidebar hiding must be scoped to the workbench page')
assert.ok(scopedFrame.test(source), 'full-width frame columns must be scoped to the workbench page')
assert.ok(observer.test(source), 'layout refresh must react to page/DOM mutations')
assert.ok(slowFallback.test(source), 'layout fallback must be low frequency')
assert.ok(!oldFastInterval.test(source), 'the 500ms full-DOM layout loop must be removed')
assert.ok(!oldSidebarScan.test(source), 'sidebar nodes must not be scanned and restyled in JS')
assert.match(
  source,
  /document\.body\.dataset\.butlerPage = '1'[\s\S]*?delete document\.body\.dataset\.butlerPage/,
  'the workbench page must toggle its body layout marker',
)

console.log(new Date().toISOString())
console.log('PASS layout performance: sidebar/frame CSS is scoped to the workbench page')
console.log('PASS layout performance: 500ms full-DOM apply loop removed')
console.log('PASS layout performance: MutationObserver + 2s fallback')
console.log('PASS layout performance: page lifecycle toggles data-butler-page')
