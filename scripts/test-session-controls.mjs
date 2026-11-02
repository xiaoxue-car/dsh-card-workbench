import assert from 'node:assert/strict'
import { Butler } from '../lib/engine.js'

const butler = Object.create(Butler.prototype)
const session = { id: 'session-demo' }
const selectedPresets = []
const selectedPermissions = []
const approvalPolicies = []
const job = {
  id: 'job_session_demo',
  sessionId: 'session-demo',
  kind: 'session',
  preset: null,
  permissionPreset: null,
  cards: [],
}
butler.board = { jobs: [job] }
butler.save = () => {}
butler.jobView = (item) => ({
  id: item.id,
  preset: item.preset,
  permission: item.permissionPreset,
})
butler.ctx = {
  agents: { get: () => ({ id: 'agent-demo' }) },
  sessions: { get: () => session },
  agentPresets: {
    select: async (_agent, preset) => {
      selectedPresets.push(preset)
    },
  },
  get(name) {
    if (name === 'permissionPresets') {
      return {
        resolve: (preset) => ({ approval: { preset } }),
        set: (_session, preset) => selectedPermissions.push(preset),
      }
    }
    if (name === 'approval') {
      return {
        setPolicy: (_agent, policy) => approvalPolicies.push(policy),
      }
    }
    return null
  },
}

const presetResult = await butler.selectPreset(job.id, 'ptc')
assert.equal(job.preset, 'ptc')
assert.deepEqual(selectedPresets, ['ptc'])
assert.equal(presetResult.preset, 'ptc')

const permissionResult = await butler.setSessionPermission(job.id, 'read-only')
assert.equal(job.permissionPreset, 'read-only')
assert.deepEqual(selectedPermissions, ['read-only'])
assert.equal(approvalPolicies.length, 1)
assert.equal(permissionResult.permission, 'read-only')

console.log(new Date().toISOString())
console.log('PASS session mode: preset persisted =', job.preset)
console.log('PASS session mode: agentPresets.select called =', selectedPresets)
console.log('PASS session permission: persisted =', job.permissionPreset)
console.log('PASS session permission: permission service and approval policy called')
