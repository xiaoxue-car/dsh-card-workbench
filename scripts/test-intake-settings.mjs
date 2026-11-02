import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { Butler } from '../lib/engine.js'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const source = fs.readFileSync(path.join(root, '..', 'lib', 'engine.js'), 'utf8')
assert.match(source, /async applyJobSessionDefaults\(job, sessionId\)/)
assert.match(source, /await this\.applyJobSessionDefaults\(job, card\.sessionId\)/)

const butler = Object.create(Butler.prototype)
butler.board = { jobs: [] }
butler.defaultCwd = root
butler.lastSessionCwd = root
butler.save = () => {}
butler.log = () => {}
butler.jobView = (job) => job
butler.ensureWorkspace = async () => ({ id: 'workspace_demo' })
butler.runPlan = () => {}

const job = await butler.createJob({
  brief: '验证交办模式和权限',
  cwd: root,
  preset: 'ptc',
  permission: 'read-only',
})
assert.equal(job.preset, 'ptc')
assert.equal(job.permissionPreset, 'read-only')

console.log(new Date().toISOString())
console.log('PASS intake settings: new job preset =', job.preset)
console.log('PASS intake settings: new job permission =', job.permissionPreset)
console.log('PASS intake settings: worker sessions apply job defaults')
