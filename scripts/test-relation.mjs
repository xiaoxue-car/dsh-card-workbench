import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { Butler, relationScore } from '../lib/engine.js'

const engine = fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', 'lib', 'engine.js'), 'utf8')
assert.match(engine, /findRelatedJob\(cwd, text\)/)
assert.match(engine, /mergeRelatedTask\(job, text\)/)
assert.match(engine, /this\.cards\.push|job\.cards\.push/)

const related = relationScore('修复登录页面样式', '继续修复登录页面按钮')
const unrelated = relationScore('修复登录页面样式', '写一个数据库迁移脚本')
const search = relationScore('给首页增加搜索功能', '首页搜索框样式调整')

assert.ok(related >= 0.25, `related score too low: ${related}`)
assert.ok(unrelated < 0.25, `unrelated score too high: ${unrelated}`)
assert.ok(search >= 0.25, `search follow-up score too low: ${search}`)
console.log(new Date().toISOString())
console.log('PASS relation: related =', related.toFixed(3))
console.log('PASS relation: unrelated =', unrelated.toFixed(3))
console.log('PASS relation: search follow-up =', search.toFixed(3))
console.log('PASS relation: related jobs can merge or create a new group')

const butler = Object.create(Butler.prototype)
const cwd = 'D:\\Project\\Demo'
const existing = {
  id: 'job_existing',
  kind: 'brief',
  cwd,
  status: 'running',
  title: '修复登录页面样式',
  brief: '修复登录页面样式',
  cards: [{ id: 'card_running', status: 'running', title: '修复登录' }],
}
butler.board = { jobs: [existing] }
butler.save = () => {}
butler.log = () => {}
butler.jobView = (job) => job
let pumped = 0
butler.pump = () => { pumped += 1 }

const found = butler.findRelatedJob(cwd, '继续修复登录页面按钮')
assert.equal(found?.id, 'job_existing')
const merged = butler.mergeRelatedTask(found, '继续修复登录页面按钮')
assert.equal(merged.id, 'job_existing')
assert.equal(merged.cards.length, 2)
assert.equal(pumped, 1)
assert.equal(butler.findRelatedJob(cwd, '写一个数据库迁移脚本'), null)
console.log('PASS relation: findRelatedJob + mergeRelatedTask append one card')
console.log('PASS relation: unrelated brief remains a new group')
