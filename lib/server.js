/**
 * HTTP bridge between the card panel and the Host engine.
 *
 * The panel is a root-scoped Web slot with no Session binding, so a tiny
 * same-origin JSON endpoint is used instead of a Session Remote. The endpoint
 * requires a custom header: a cross-site page cannot send it without a CORS
 * preflight, which this route never grants.
 */

import { browseDirectory } from './dirs.js'
import { errorText } from './util.js'

const PREFIX = '/dsh-butler'
const HEADER = 'x-dsh-butler'

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload)
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.setHeader('cache-control', 'no-store, max-age=0')
  res.setHeader('x-content-type-options', 'nosniff')
  res.end(body)
}

function readBody(req, limit = 1_000_000) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) {
        reject(new Error('请求体过大'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (!chunks.length) return resolve(null)
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch (error) {
        reject(new Error(`请求体不是合法 JSON：${errorText(error)}`))
      }
    })
    req.on('error', reject)
  })
}

function sameOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return true
  try {
    return new URL(origin).host === req.headers.host
  } catch {
    return false
  }
}

/**
 * Register the bridge route.
 * @param ctx Host plugin context (needs `webServer`).
 * @param butler The engine instance.
 * @returns Route disposer.
 */
export function registerRoutes(ctx, butler, settingsApi = null) {
  return ctx.webServer.register({
    kind: 'prefix',
    path: PREFIX,
    async handler(req, res) {
      try {
        if (!sameOrigin(req)) {
          sendJson(res, 403, { ok: false, error: '跨站请求被拒绝' })
          return
        }
        if (req.headers[HEADER] !== '1') {
          sendJson(res, 403, { ok: false, error: `缺少 ${HEADER}: 1 请求头` })
          return
        }
        const url = new URL(req.url || '/', 'http://butler.local')
        const route = url.pathname.slice(PREFIX.length) || '/'

        if (req.method === 'GET' && route === '/api/config') {
          if (!settingsApi) {
            sendJson(res, 404, { ok: false, error: '配置接口不可用' })
            return
          }
          sendJson(res, 200, { ok: true, data: settingsApi.getConfig() })
          return
        }
        if (req.method === 'POST' && route === '/api/config') {
          if (!settingsApi) {
            sendJson(res, 404, { ok: false, error: '配置接口不可用' })
            return
          }
          const body = (await readBody(req)) || {}
          sendJson(res, 200, { ok: true, data: settingsApi.updateConfig(body) })
          return
        }
        if (req.method === 'POST' && route === '/api/plugin') {
          if (!settingsApi?.setPluginEnabled) {
            sendJson(res, 404, { ok: false, error: '插件管理接口不可用' })
            return
          }
          const body = (await readBody(req)) || {}
          sendJson(res, 200, { ok: true, data: { accepted: true } })
          setTimeout(() => {
            Promise.resolve(settingsApi.setPluginEnabled(body.enabled !== false)).catch((error) => {
              console.error('[butler] plugin enable toggle failed:', error)
            })
          }, 80)
          return
        }
        if (req.method === 'GET' && route === '/api/pulse') {
          sendJson(res, 200, { ok: true, data: butler.pulse() })
          return
        }
        if (req.method === 'GET' && route === '/api/state') {
          // The workbench loads its full snapshot with ?light=1: that skips the
          // cold Session inventory, which is fetched separately from
          // /api/sessions. The 1 s hot path is /api/pulse instead.
          const light = url.searchParams.get('light') === '1'
          sendJson(res, 200, { ok: true, data: butler.state({ includeSessions: !light }) })
          return
        }
        if (req.method === 'GET' && route === '/api/sessions') {
          const force = url.searchParams.get('force') === '1'
          const items = butler.sessionCandidates({ force })
          sendJson(res, 200, { ok: true, data: { at: Date.now(), items } })
          return
        }
        if (req.method === 'GET' && route === '/api/dirs') {
          const target = url.searchParams.get('path') || ''
          sendJson(res, 200, { ok: true, data: await browseDirectory(target) })
          return
        }
        if (req.method === 'GET' && route === '/api/selftest') {
          const data = await butler.selftest()
          sendJson(res, 200, { ok: true, data })
          return
        }
        if (req.method === 'GET' && route === '/api/health') {
          sendJson(res, 200, { ok: true, data: { ready: butler.ready, jobs: butler.board.jobs.length } })
          return
        }
        if (req.method === 'POST' && route === '/api/action') {
          const body = (await readBody(req)) || {}
          const action = typeof body.action === 'string' ? body.action : ''
          const value = await dispatch(butler, action, body)
          sendJson(res, 200, { ok: true, data: value })
          return
        }

        sendJson(res, 404, { ok: false, error: `未知接口：${req.method} ${route}` })
      } catch (error) {
        sendJson(res, 400, { ok: false, error: errorText(error) })
      }
    },
  })
}

async function dispatch(butler, action, body) {
  switch (action) {
    case 'createJob':
      return butler.createJob({
        brief: body.brief,
        cwd: body.cwd,
        title: body.title,
        mergeRelated: body.mergeRelated === true,
        preset: body.preset,
        permission: body.permission,
        modelSelection: body.modelSelection,
      })
    case 'adoptSession':
      return butler.adoptSession(body.sessionId, { auto: false })
    case 'adoptRecent':
      return butler.adoptRecent()
    case 'adoptWorkspace':
      return butler.adoptWorkspace()
    case 'adoptAll':
      return butler.adoptAllSessions({ auto: false, jump: false })
    case 'updateSettings':
      return butler.updateSettings(body.settings)
    case 'hideSession':
      return butler.hideSession(body.sessionId)
    case 'nudgeCard':
      return butler.nudgeGroupCard(body.jobId, body.cardId)
    case 'reviseCard':
      return butler.reviseCard(body.jobId, body.cardId, body.instruction)
    case 'sendCardMessage':
      return butler.sendCardMessage(body.jobId, body.cardId, body.message)
    case 'sendGroupMessage':
      return butler.sendGroupMessage(body.jobId, body.message)
    case 'selectModel':
      return butler.selectSessionModel(body.jobId, body)
    case 'setPermission':
      return butler.setSessionPermission(body.jobId, body.preset)
    case 'selectPreset':
      return butler.selectPreset(body.jobId, body.preset)
    case 'resolveInteraction':
      return butler.resolveInteraction(body.jobId, body.cardId, body.requestId, {
        decision: body.decision,
        answers: body.answers,
      })
    case 'probeWorkspace':
      return butler.probeWorkspace()
    case 'probeQuestion':
      return butler.probeQuestion()
    case 'probePermission':
      return butler.probePermission()
    case 'sessionAudit':
      return butler.sessionAudit()
    case 'listenerDebug':
      return butler.listenerDebug()
    case 'pauseJob':
      return butler.pauseJob(body.jobId)
    case 'resumeJob':
      return butler.resumeJob(body.jobId)
    case 'retryCard':
      return butler.retryCard(body.jobId, body.cardId)
    case 'skipCard':
      return butler.skipCard(body.jobId, body.cardId)
    case 'ignoreCard':
      return butler.ignoreCard(body.jobId, body.cardId)
    case 'verifyCard':
      return butler.verifyNow(body.jobId, body.cardId)
    case 'deleteJob':
      return butler.deleteJob(body.jobId)
    case 'archiveSession':
      return butler.archiveSession(body.sessionId)
    case 'clearFinished':
      return butler.clearFinished()
    case 'state':
      return butler.state()
    default:
      throw new Error(`未知操作：${action || '(空)'}`)
  }
}
