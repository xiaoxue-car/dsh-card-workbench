import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')

const globalSidebar = /\[class\*="_sidebarCol"\]\{visibility:hidden!important/
const globalFrame = /div\[class\*="_frame"\]\{grid-template-columns:0 minmax\(0,1fr\) 0!important;/
const overlayCss =
  /body\[data-butler-page="1"\] \[data-shell-overlay\]\{position:fixed!important/
const oldFastInterval = /setInterval\(apply, 500\)/
const oldSidebarScan = /querySelectorAll\('\[class\*="_sidebarCol"\]'\)\.forEach/
const pluginDispose = /style\.remove\(\)/
const prepareConversation = /window\.__butlerPrepareConversation = prepareConversation/
const activateButler = /window\.__butlerActivate = activateButler/
const openPrepares = /window\.__butlerPrepareConversation\?\.\(\)/
const returnActivates = /window\.__butlerActivate\?\.\(\)/

assert.ok(globalSidebar.test(source), 'sidebar must stay hidden while the plugin is enabled')
assert.ok(globalFrame.test(source), 'full-width frame columns must stay applied while the plugin is enabled')
assert.ok(overlayCss.test(source), 'shell overlay layout must be scoped by the page marker in CSS')
assert.ok(!oldFastInterval.test(source), 'the 500ms full-DOM layout loop must be removed')
assert.ok(!oldSidebarScan.test(source), 'sidebar nodes must not be scanned and restyled in JS')
assert.ok(pluginDispose.test(source), 'sidebar style must only be removed with the plugin')
assert.ok(prepareConversation.test(source), 'conversation opening must prepare layout synchronously')
assert.ok(activateButler.test(source), 'returning to the workbench must re-activate its layout marker')
assert.ok(openPrepares.test(source), 'openSession must invoke the layout preparation hook')
assert.ok(returnActivates.test(source), 'returnToButler and the topbar must re-activate the workbench layout')
assert.match(
  source,
  /document\.body\.dataset\.butlerPage = '1'[\s\S]*?delete document\.body\.dataset\.butlerPage/,
  'the workbench page must toggle its overlay marker',
)

console.log(new Date().toISOString())
console.log('PASS layout performance: sidebar/frame stay hidden while plugin is enabled')
console.log('PASS layout performance: 500ms full-DOM apply loop removed')
console.log('PASS layout performance: shell overlay layout is CSS-scoped')
console.log('PASS layout performance: page lifecycle toggles data-butler-page')
console.log('PASS layout performance: conversation opening drops the page marker synchronously')
console.log('PASS layout performance: returning to workbench reactivates the marker')
