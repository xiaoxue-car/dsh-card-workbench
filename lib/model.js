/**
 * One small model gateway for the butler's own reasoning.
 *
 * The butler does not need a full Agent for planning or reviewing: it needs a
 * provider/model pair and a stream of text. This module resolves the deployment
 * default and exposes a single `complete()` call that returns accumulated text.
 */

import { errorText } from './util.js'

export function createModelRunner(ctx, config) {
  let cachedSelection = null
  let cachedAt = 0

  async function resolveSelection() {
    if (config.provider && config.model) {
      return { provider: config.provider, model: config.model }
    }
    if (cachedSelection && Date.now() - cachedAt < 15_000) return cachedSelection

    const sessionController = ctx.get('sessionController')
    if (sessionController?.modelCatalog) {
      try {
        const catalog = await sessionController.modelCatalog()
        const selected = catalog?.default
        if (selected?.provider && selected?.model) {
          cachedSelection = { provider: selected.provider, model: selected.model }
          cachedAt = Date.now()
          return cachedSelection
        }
      } catch {
        /* fall through to the settings service */
      }
    }

    const defaults = ctx.get('agentDefaultModel')
    if (defaults?.currentSelection) {
      try {
        const selected = defaults.currentSelection()
        if (selected?.provider && selected?.model) {
          cachedSelection = { provider: selected.provider, model: selected.model }
          cachedAt = Date.now()
          return cachedSelection
        }
      } catch {
        /* unavailable */
      }
    }

    return null
  }

  async function complete({ system, prompt, maxTokens = 2200, timeoutMs = config.llmTimeoutMs, label = 'llm' }) {
    const selection = await resolveSelection()
    if (!selection) {
      throw new Error('没有可用的模型路由：请先在设置里选择一个默认模型')
    }
    if (!ctx.llm?.stream) throw new Error('llm 服务不可用')

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), Math.max(5_000, timeoutMs))
    let text = ''
    let failure = null
    try {
      const stream = ctx.llm.stream({
        provider: selection.provider,
        model: selection.model,
        system,
        messages: [{ role: 'user', content: [{ type: 'text', text: prompt }] }],
        maxTokens,
        signal: controller.signal,
      })
      for await (const chunk of stream) {
        if (!chunk || typeof chunk !== 'object') continue
        if (chunk.type === 'text-delta' && typeof chunk.text === 'string') {
          text += chunk.text
        } else if (chunk.type === 'finish') {
          const reason = chunk.reason
          if (reason?.kind === 'error' || reason?.kind === 'aborted') {
            failure = reason.failure || { message: reason.kind, code: reason.kind }
          }
        }
      }
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error(`${label} 超时（${Math.round(timeoutMs / 1000)}s）`)
      }
      throw new Error(`${label} 调用失败：${errorText(error)}`)
    } finally {
      clearTimeout(timer)
    }

    const trimmed = text.trim()
    if (!trimmed) {
      throw new Error(`${label} 返回为空${failure?.message ? `（${failure.message}）` : ''}`)
    }
    if (failure && trimmed.length < 8) {
      throw new Error(`${label} 失败：${failure.message || failure.code}`)
    }
    return { text: trimmed, provider: selection.provider, model: selection.model }
  }

  return {
    complete,
    resolveSelection,
    invalidate() {
      cachedSelection = null
      cachedAt = 0
    },
  }
}
