#!/usr/bin/env node
/**
 * Reproducible audit for the butler plugin.
 *
 * Prints:
 *  - the board file and one line per conversation group (cards/done/running/failed);
 *  - the code locations that enumerate and adopt sessions, build turn cards and
 *    compute group progress;
 *  - a scan of runtime code for hardcoded workspace paths, session ids, profile
 *    directories and the current user name;
 *  - package runtime dependencies and the README sections that document
 *    auto-adoption and installation.
 *
 * Run from the plugin directory:  node scripts/audit.mjs
 * Exit code 1 means the hardcoded-value scan found something in runtime code.
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataRoot = process.env.DSH_HOME || path.join(os.homedir(), '.dsh')
const boardFile = path.join(dataRoot, '.dsh-butler', 'board.json')

function read(file) {
  return fs.readFileSync(file, 'utf8')
}

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'scripts') continue
      // Verification evidence intentionally records real absolute paths, session
      // ids and the machine username; it is evidence, not runtime code.
      if (full === path.join(root, 'docs', 'evidence')) continue
      if (full === path.join(root, 'docs', 'verification')) continue
      if (full === path.join(root, 'docs', 'bench')) continue
      walk(full, files)
    } else if (/\.(js|mjs|json|yml|yaml)$/.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

function lineOf(file, needle) {
  const lines = read(file).split(/\r?\n/)
  const index = lines.findIndex((line) => line.includes(needle))
  return index < 0 ? null : { line: index + 1, text: lines[index].trim() }
}

console.log('== DATA ROOT ==')
console.log(`DSH_HOME=${process.env.DSH_HOME || '(unset)'}`)
console.log(`resolved=${dataRoot}`)
console.log(`board=${boardFile}`)

console.log('\n== BOARD ==')
if (!fs.existsSync(boardFile)) {
  console.log('board file not found (plugin has not created a job yet)')
} else {
  const board = JSON.parse(read(boardFile))
  const jobs = Array.isArray(board.jobs) ? board.jobs : []
  let totalCards = 0
  let totalDone = 0
  let totalRunning = 0
  let totalFailed = 0
  for (const job of jobs) {
    const cards = Array.isArray(job.cards) ? job.cards : []
    const done = cards.filter((card) => card.status === 'done').length
    const running = cards.filter((card) => card.status === 'running').length
    const failed = cards.filter((card) => card.status === 'failed').length
    totalCards += cards.length
    totalDone += done
    totalRunning += running
    totalFailed += failed
    console.log(
      `[${job.kind || 'brief'}] ${JSON.stringify(job.title)} cards=${cards.length} done=${done} running=${running} failed=${failed} cwd=${job.cwd}`,
    )
  }
  const workspaces = new Set(jobs.map((job) => job.cwd || '')).size
  console.log(
    `TOTAL groups=${jobs.length} workspaces=${workspaces} cards=${totalCards} done=${totalDone} running=${totalRunning} failed=${totalFailed} hidden=${(board.hiddenSessions || []).length}`,
  )
}

console.log('\n== CODE EVIDENCE ==')
const evidence = [
  ['session enumeration + adoption loop', 'lib/engine.js', 'async adoptAllSessions'],
  ['new-session adoption', 'lib/engine.js', 'handleSessionCreated'],
  ['cold/live session loading', 'lib/engine.js', 'async loadSessionData'],
  ['subagent/worker filters', 'lib/engine.js', 'header?.parentSession || header?.origin'],
  ['turn -> one card mapping', 'lib/engine.js', 'const cards = usable.map'],
  ['steer merge within a turn', 'lib/engine.js', 'if (current) current.users.push(item)'],
  ['card structure', 'lib/engine.js', 'makeSessionCard(text, userSeq)'],
  ['group progress stats', 'lib/engine.js', 'progress: cards.length'],
  ['status enums', 'lib/engine.js', 'const ACTIVE_CARD'],
  ['session/created listener', 'index.js', "ctx.on('session/created'"],
  ['data root resolution', 'index.js', 'process.env.DSH_HOME'],
]
for (const [label, file, needle] of evidence) {
  const found = lineOf(path.join(root, file), needle)
  console.log(`${label}: ${file}${found ? `:${found.line}` : ' (not found)'}${found ? `  ${found.text}` : ''}`)
}

console.log('\n== HARDCODED-VALUE SCAN (runtime code) ==')
const files = walk(root)
const username = os.userInfo().username
const patterns = [
  ['windows drive path', /\b[A-Za-z]:\\/],
  ['session id literal', /session-[0-9a-f]{8}/i],
  ['profile directory', /profiles[\\/]/i],
  ['workspace example', /virtualPet/],
  ['test workspace', /whale-work|linshi/],
  ['current username', new RegExp(username.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')],
  ['unix home literal', /\/home\//],
  ['DSH_PROFILE_DIR', /DSH_PROFILE_DIR/],
]
let dirty = false
for (const [label, pattern] of patterns) {
  const hits = []
  for (const file of files) {
    if (file.endsWith(path.join('scripts', 'audit.mjs'))) continue
    const lines = read(file).split(/\r?\n/)
    lines.forEach((line, index) => {
      if (pattern.test(line)) hits.push(`${path.relative(root, file)}:${index + 1}: ${line.trim()}`)
    })
  }
  console.log(`${label}: ${hits.length ? 'FOUND' : 'none'}`)
  for (const hit of hits.slice(0, 8)) console.log(`  ${hit}`)
  if (hits.length) dirty = true
}

console.log('\n== PACKAGE ==')
const pkg = JSON.parse(read(path.join(root, 'package.json')))
console.log(`name=${pkg.name} version=${pkg.version} license=${pkg.license || '(none)'}`)
console.log(`dependencies=${Object.keys(pkg.dependencies || {}).length} peerDependencies=${Object.keys(pkg.peerDependencies || {}).length}`)

console.log('\n== README ==')
const readme = read(path.join(root, 'README.md'))
for (const heading of ['自动接管所有工作对话', '安装到任意 profile', '数据与恢复']) {
  console.log(`${heading}: ${readme.includes(heading) ? 'present' : 'MISSING'}`)
}

process.exitCode = dirty ? 1 : 0
