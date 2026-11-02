#!/usr/bin/env node
/**
 * Execute the real Intake keyboard handler from client.js with a tiny React
 * stub, so Enter submission is tested by behaviour instead of by regex alone.
 *
 * Covered:
 *   - Enter submits exactly like the "拆解开工" button;
 *   - empty / whitespace-only brief does not submit;
 *   - an in-flight create (busy) does not submit again;
 *   - an empty workdir does not submit;
 *   - Shift+Enter keeps the newline;
 *   - Enter during IME composition only commits the candidate;
 *   - compositionend followed by Enter submits normally;
 *   - keyCode 229 (legacy IME path) is ignored.
 *
 * Run: node scripts/test-intake-enter.mjs
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const root = path.resolve(import.meta.dirname, '..')
const source = fs.readFileSync(path.join(root, 'client.js'), 'utf8')

const start = source.indexOf('    function Intake(')
const end = source.indexOf('\n    function HowItWorks(', start)
assert.ok(start > 0 && end > start, 'Intake component must exist in client.js')
const intakeSource = source.slice(start, end)

const React = {
  useRef(initial) {
    return { current: initial }
  },
}
const h = (type, props, ...children) => ({
  type,
  props: props || {},
  children: children.flat(Infinity),
})
const Btn = function Btn() {}
const DirectoryPicker = function DirectoryPicker() {}
const ComposerControls = function ComposerControls() {}

const context = vm.createContext({ React, h, Btn, DirectoryPicker, ComposerControls, console })
const Intake = vm.runInContext(
  `(() => {\n${intakeSource}\nreturn Intake\n})()`,
  context,
)

function findByType(node, type) {
  if (!node || typeof node !== 'object') return null
  if (node.type === type) return node
  for (const child of node.children || []) {
    const found = findByType(child, type)
    if (found) return found
  }
  return null
}

function findAll(node, type, found = []) {
  if (!node || typeof node !== 'object') return found
  if (node.type === type) found.push(node)
  for (const child of node.children || []) findAll(child, type, found)
  return found
}

function findClass(node, className) {
  if (!node || typeof node !== 'object') return null
  if (node.props?.className === className) return node
  for (const child of node.children || []) {
    const found = findClass(child, className)
    if (found) return found
  }
  return null
}

function render({ brief = '把首页改成暗色主题', cwd = 'D:\\Project\\virtualPet', busy = false, permission = '', onSubmit: override } = {}) {
  const submitted = []
  const onSubmit = override || (() => submitted.push(brief))
  const tree = Intake({
    t: (key) => key,
    brief,
    setBrief() {},
    cwd,
    setCwd() {},
    modelCatalog: null,
    modelSelection: null,
    onModelChange() {},
    presetCatalog: null,
    permissionCatalog: null,
    preset: '',
    setPreset() {},
    permission,
    setPermission() {},
    busy,
    error: '',
    onSubmit,
  })
  return {
    tree,
    submitted,
    onSubmit,
    textarea: findByType(tree, 'textarea'),
  }
}

function extractBraceBlock(marker) {
  const start = source.indexOf(marker)
  assert.ok(start >= 0, `missing source block: ${marker}`)
  const open = source.indexOf('{', start)
  let depth = 0
  let quote = null
  let escape = false
  for (let i = open; i < source.length; i += 1) {
    const ch = source[i]
    if (quote) {
      if (escape) escape = false
      else if (ch === '\\') escape = true
      else if (ch === quote) quote = null
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      quote = ch
      continue
    }
    if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) return source.slice(start, i + 1)
    }
  }
  throw new Error(`unbalanced source block: ${marker}`)
}

const submitSource = extractBraceBlock('      const submit = () => {')

function makeSubmitHarness({ brief = '回车与按钮一致性测试', cwd = 'D:\\Project\\virtualPet', busy = false } = {}) {
  const calls = []
  const errors = []
  const cleared = []
  const submitting = { current: false }
  const act = (action, payload, key) => {
    calls.push({ action, payload, key })
    return Promise.resolve({ ok: true })
  }
  const factory = new Function(
    'act',
    'brief',
    'busy',
    'submitting',
    'cwd',
    'setError',
    't',
    'setBrief',
    'newPreset',
    'newPermission',
    'newModelSelection',
    'clearDraft',
    `${submitSource}; return submit`,
  )
  const submit = factory(
    act,
    brief,
    busy,
    submitting,
    cwd,
    (message) => errors.push(message),
    (key) => key,
    () => cleared.push(true),
    'standard',
    'workspace-write',
    null,
    () => {},
  )
  return { submit, calls, errors, cleared, submitting, brief, cwd, busy }
}

const tick = () => new Promise((resolve) => setImmediate(resolve))

function press(textarea, overrides = {}) {
  const event = {
    key: 'Enter',
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
    keyCode: 13,
    nativeEvent: { isComposing: false, keyCode: 13 },
    preventDefault() {
      event.defaultPrevented = true
    },
    ...overrides,
  }
  event.defaultPrevented = false
  textarea.props.onKeyDown(event)
  return event
}

// 1. A plain Enter on a filled form submits through the same callback as the button.
{
  const view = render()
  assert.equal(typeof view.textarea.props.onCompositionStart, 'function')
  assert.equal(typeof view.textarea.props.onCompositionEnd, 'function')
  const startButton = findAll(view.tree, Btn).find((button) => button.children.includes('start'))
  assert.ok(startButton, 'the 拆解开工 button must render')
  assert.equal(startButton.props.onClick, view.onSubmit, 'Enter and the button must share onSubmit')
  const event = press(view.textarea)
  assert.equal(event.defaultPrevented, true, 'Enter must not insert a newline')
  assert.deepEqual(view.submitted, ['把首页改成暗色主题'], 'plain Enter must submit')
}

// 2. Empty and whitespace-only input must not submit.
for (const brief of ['', '   ', '\n\t']) {
  const view = render({ brief })
  const event = press(view.textarea)
  assert.equal(view.submitted.length, 0, `empty brief ${JSON.stringify(brief)} must not submit`)
  assert.equal(event.defaultPrevented, true, 'empty Enter must be swallowed, not insert a newline')
}

// 3. A create request already in flight must not submit again.
{
  const view = render({ busy: true })
  const event = press(view.textarea)
  assert.equal(view.submitted.length, 0, 'busy intake must not submit')
  assert.equal(event.defaultPrevented, true, 'busy Enter must be swallowed')
}

// 4. No workspace means no submit, matching the disabled start button.
{
  const view = render({ cwd: '' })
  press(view.textarea)
  assert.equal(view.submitted.length, 0, 'intake without a workspace must not submit')
}

// 5. Shift+Enter keeps the newline and does not submit.
{
  const view = render()
  const event = press(view.textarea, { shiftKey: true })
  assert.equal(view.submitted.length, 0, 'Shift+Enter must not submit')
  assert.equal(event.defaultPrevented, false, 'Shift+Enter must keep the native newline')
}

// 6. Enter while the IME is composing is ignored (both native flags and keyCode 229).
for (const overrides of [
  { nativeEvent: { isComposing: true, keyCode: 229 } },
  { isComposing: true },
  { keyCode: 229 },
  { nativeEvent: { isComposing: false, keyCode: 229 } },
]) {
  const view = render()
  const event = press(view.textarea, overrides)
  assert.equal(view.submitted.length, 0, `IME Enter must not submit: ${JSON.stringify(overrides)}`)
  assert.equal(event.defaultPrevented, false, 'IME Enter must reach the IME, not be prevented')
}

// 7. Starting a composition, pressing Enter, then ending it must only commit the
//    candidate; the next Enter submits normally.
{
  const view = render()
  view.textarea.props.onCompositionStart()
  const commit = press(view.textarea, { nativeEvent: { isComposing: false, keyCode: 13 } })
  assert.equal(view.submitted.length, 0, 'Enter during composition must not submit')
  assert.equal(commit.defaultPrevented, false, 'composition Enter must reach the IME')
  view.textarea.props.onCompositionEnd()
  const submit = press(view.textarea)
  assert.equal(view.submitted.length, 1, 'Enter after compositionend must submit')
  assert.equal(submit.defaultPrevented, true)
}

// 8. Non-Enter keys are untouched.
{
  const view = render()
  const event = press(view.textarea, { key: 'a' })
  assert.equal(view.submitted.length, 0)
  assert.equal(event.defaultPrevented, false)
}

// 9. Execute the real submit() closure through the Enter path and the button
//    path, then compare the exact createJob action arguments.
{
  const harness = makeSubmitHarness()
  const view = render({ brief: harness.brief, cwd: harness.cwd, onSubmit: harness.submit })
  const startButton = findAll(view.tree, Btn).find((button) => button.children.includes('start'))
  assert.ok(startButton, 'the 拆解开工 button must render')

  press(view.textarea)
  await tick()
  assert.equal(harness.calls.length, 1, 'Enter must call createJob exactly once')
  const enterCall = harness.calls[0]
  assert.deepEqual(enterCall, {
    action: 'createJob',
    payload: {
      brief: harness.brief,
      cwd: harness.cwd,
      mergeRelated: true,
      preset: 'standard',
      permission: 'workspace-write',
      modelSelection: undefined,
    },
    key: 'create',
  })
  assert.equal(harness.submitting.current, false, 'the in-flight guard must be released')

  harness.submitting.current = false
  startButton.props.onClick()
  await tick()
  assert.equal(harness.calls.length, 2, 'the button must call createJob exactly once')
  const buttonCall = harness.calls[1]
  assert.deepEqual(buttonCall, enterCall, 'Enter and button must send identical createJob arguments')
  assert.deepEqual(harness.errors, [], 'neither path may show a validation error')
  assert.equal(harness.cleared.length, 2, 'both successful paths clear the intake')

  console.log('PARITY Enter createJob :', JSON.stringify(enterCall))
  console.log('PARITY Button createJob:', JSON.stringify(buttonCall))
  console.log('PARITY identical       :', JSON.stringify(enterCall) === JSON.stringify(buttonCall))
}

// 10. The real submit() closure itself refuses empty and busy input.
{
  const empty = makeSubmitHarness({ brief: '   ' })
  empty.submit()
  await tick()
  assert.equal(empty.calls.length, 0, 'empty submit must not call createJob')

  const busy = makeSubmitHarness({ busy: true })
  busy.submit()
  await tick()
  assert.equal(busy.calls.length, 0, 'busy submit must not call createJob')
}

// 11. Duplicate protection lives in the parent submit: it refuses while a create
//    request is in flight and releases the guard when that request settles.
assert.match(
  source,
  /if \(!value \|\| busy \|\| submitting\.current\) return/,
  'submit must refuse while a create request is in flight',
)
assert.match(
  source,
  /submitting\.current = true[\s\S]*?\.finally\(\(\) => \{\s*submitting\.current = false/,
  'submit must release the in-flight guard in finally',
)
assert.match(
  source,
  /void act\('createJob', \{[\s\S]*?brief: value,[\s\S]*?cwd: cwd\.trim\(\),[\s\S]*?mergeRelated: true,[\s\S]*?\}, 'create'\)/,
  'Enter must still go through the exact same createJob action as the button',
)

console.log('PASS intake Enter: plain Enter calls the same onSubmit as 拆解开工')
console.log('PASS intake Enter: empty / whitespace-only brief is not submitted')
console.log('PASS intake Enter: busy (create in flight) is not submitted again')
console.log('PASS intake Enter: missing workspace is not submitted')
console.log('PASS intake Enter: Shift+Enter keeps the newline')
console.log('PASS intake Enter: IME composition only commits, never submits')
console.log('PASS intake Enter: Enter after compositionend submits normally')
console.log('PASS intake Enter: in-flight ref blocks duplicate create requests')
console.log('PASS intake Enter: submits through the same createJob action as the button')
console.log('PASS intake Enter: real submit() sends identical createJob args for Enter and button')
console.log('PASS intake Enter: real submit() refuses empty and busy input')

{
  const danger = render({ permission: 'danger-full-access' })
  assert.ok(findClass(danger.tree, 'butler-permission-warning'), 'full access must render the warning')
  const normal = render({ permission: 'workspace-write' })
  assert.equal(findClass(normal.tree, 'butler-permission-warning'), null, 'lower permission must clear the warning')
  console.log('PASS intake permission: full-access warning appears and clears on downgrade')
}

console.log(
  JSON.stringify(
    {
      scenarios: 11,
      plainEnterSubmitted: true,
      emptyBlocked: true,
      busyBlocked: true,
      missingCwdBlocked: true,
      shiftEnterNewline: true,
      imeCompositionBlocked: true,
      imeAfterCommitSubmitted: true,
      duplicateGuard: 'submitting.current',
      enterButtonParity: true,
    },
    null,
    2,
  ),
)
