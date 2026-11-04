import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { normalizeConfig, validateConfigPatch } from '../index.js'

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const client = fs.readFileSync(path.join(root, '..', 'client.js'), 'utf8')
const server = fs.readFileSync(path.join(root, '..', 'lib', 'server.js'), 'utf8')
const index = fs.readFileSync(path.join(root, '..', 'index.js'), 'utf8')

assert.match(client, /label: '最大拆卡数'/)
assert.match(client, /label: '最大并发执行数'/)
assert.match(client, /label: '最大并行核对数'/)
assert.match(client, /label: '卡顿判定时间（毫秒）'/)
assert.match(client, /label: '最高权限'/)
assert.match(client, /configOpen/)
assert.match(client, /butler-config-overlay/)
const configLabels = [...client.matchAll(/label: '([^']+)', type:/g)].map((match) => match[1])
assert.equal(configLabels.length, 15)
for (const field of ['maxCards', 'maxConcurrency', 'llmTimeoutMs', 'provider', 'model', 'fullAccess']) {
  assert.match(client, new RegExp(`key: '${field}'`))
}
assert.match(client, /name: 'plugins.row.config'/)
assert.match(client, /key: 'dsh-card-workbench#dsh-butler'/)
assert.match(client, /fetch\(`\$\{API\}\/config`/)
assert.match(server, /route === '\/api\/config'/)
assert.match(server, /route === '\/api\/plugin'/)
assert.match(client, /pluginEnabled/)
assert.match(client, /togglePlugin/)
assert.match(client, /ignoreCard/)
assert.match(index, /settingsFile = path\.join\(dataDir, 'settings\.json'\)/)

const config = normalizeConfig({
  maxCards: '9',
  maxConcurrency: '6',
  stallMs: '120000',
  fullAccess: true,
  provider: 'demo',
  model: 'demo-model',
})
assert.equal(config.maxCards, 9)
assert.equal(config.maxConcurrency, 6)
assert.equal(config.stallMs, 120000)
assert.equal(config.fullAccess, true)
assert.equal(config.provider, 'demo')
assert.equal(config.model, 'demo-model')

assert.throws(() => validateConfigPatch({ maxCards: 99 }), /最大拆卡数必须在 1 到 20 之间/)
assert.throws(() => validateConfigPatch({ maxConcurrency: 'abc' }), /最大并发执行数必须是数字/)
assert.throws(() => validateConfigPatch({ fullAccess: 'yes' }), /最高权限必须是布尔值/)
assert.equal(validateConfigPatch({ maxCards: 8, schedulerIntervalMs: 1500 }), true)

console.log(new Date().toISOString())
console.log('PASS settings: Chinese labels are present')
console.log('PASS settings: plugins.row.config registration key is present')
console.log('PASS settings: /api/config GET/POST routes and settings.json persistence exist')
console.log('PASS settings: normalizeConfig accepts editable values')
console.log('PASS settings: numeric range and type validation reject invalid input')
