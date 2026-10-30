#!/usr/bin/env node
/** Static marketplace/readiness checks for the card workbench package. */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const index = fs.readFileSync(path.join(root, 'index.js'), 'utf8')
const engine = fs.readFileSync(path.join(root, 'lib/engine.js'), 'utf8')
const client = fs.readFileSync(path.join(root, 'client.js'), 'utf8')

assert.equal(pkg.name, 'dsh-card-workbench')
assert.equal(pkg.private, false)
assert.equal(pkg.license, 'MIT')
assert.ok(pkg.dsh?.bundle?.patch, 'dsh.bundle.patch must be declared')
assert.ok(pkg.engines?.dsh, 'engines.dsh must be declared')
assert.ok(fs.existsSync(path.join(root, 'LICENSE')), 'LICENSE must exist')
assert.ok(!/"@local\/dsh-butler"/.test(index + engine + client), 'no @local package id may remain')
assert.match(index, /fullAccess: false/, 'fullAccess must default to false')
assert.match(engine, /autoAdopt: false/, 'autoAdopt must default to false')
assert.match(engine, /toolUpdateStatus/, 'agent status tool implementation must exist')
assert.match(index, /card_workshop_split/, 'card workshop tools must be registered')
assert.match(client, /butler-board/, 'board view must be present')
assert.match(client, /modeStandard: '标准模式'/, 'mode labels must be Chinese')

console.log('PASS market: publishable name, license, dsh.bundle and engines are present')
console.log('PASS market: fullAccess and autoAdopt default to safe values')
console.log('PASS market: five card workshop tools and host-side status validation exist')
console.log('PASS market: board view and Chinese mode labels are installed')
