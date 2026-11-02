import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')

const globalSidebar = /\[class\*="_sidebarCol"\]\{visibility:hidden!important/
const globalFrame = /div\[class\*="_frame"\]\{grid-template-columns:0 minmax\(0,1fr\) 0!important;/
const observer = /new MutationObserver\(\(\) => \{[\s\S]*?attributeFilter: \['class', 'data-butler-page'\]/
const slowFallback = /setInterval\(apply, 2000\)/
const oldFastInterval = /setInterval\(apply, 500\)/
const oldSidebarScan = /querySelectorAll\('\[class\*="_sidebarCol"\]'\)\.forEach/
const pluginDispose = /style\.remove\(\)/

assert.ok(globalSidebar.test(source), 'sidebar must stay hidden while the plugin is enabled')
assert.ok(globalFrame.test(source), 'full-width frame columns must stay applied while the plugin is enabled')
assert.ok(observer.test(source), 'layout refresh must react to page/DOM mutations')
assert.ok(slowFallback.test(source), 'layout fallback must be low frequency')
assert.ok(!oldFastInterval.test(source), 'the 500ms full-DOM layout loop must be removed')
assert.ok(!oldSidebarScan.test(source), 'sidebar nodes must not be scanned and restyled in JS')
assert.ok(pluginDispose.test(source), 'sidebar style must only be removed with the plugin')
assert.match(
  source,
  /document\.body\.dataset\.butlerPage = '1'[\s\S]*?delete document\.body\.dataset\.butlerPage/,
  'the workbench page must toggle its overlay marker',
)

console.log(new Date().toISOString())
console.log('PASS layout performance: sidebar/frame stay hidden while plugin is enabled')
console.log('PASS layout performance: 500ms full-DOM apply loop removed')
console.log('PASS layout performance: MutationObserver + 2s fallback')
console.log('PASS layout performance: page lifecycle toggles data-butler-page')
