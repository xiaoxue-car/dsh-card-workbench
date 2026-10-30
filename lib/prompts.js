/**
 * Prompt templates for the three butler roles: planner, verifier, auditor,
 * plus the worker brief and its continuation messages.
 *
 * All prompts are Chinese-first because the card surface is Chinese-first;
 * the worker instruction still allows the worker to answer in its own words.
 */

const RESULT_TAG = 'butler-result'

/** The literal marker block the worker must end with. */
export const RESULT_MARKER = `<${RESULT_TAG}>{"status":"done","summary":"一句话说明交付了什么","evidence":["相对路径或验证命令"],"open":[]}</${RESULT_TAG}>`

function listOrDash(value) {
  if (Array.isArray(value) && value.length) return value.map((item) => `- ${item}`).join('\n')
  return '- （未单独列出，按任务描述判断）'
}

/** System prompt for splitting one brief into cards. */
export function planSystem() {
  return [
    '你是一名经验丰富的总管家，负责把用户交办的一项工作拆成可独立执行、可独立验收的卡片。',
    '你的拆解必须满足：',
    '1. 每张卡片是一个明确的交付物，能由一个执行者在一次连续工作中完成；',
    '2. 卡片之间尽量少依赖；有先后依赖时，把前置卡片排在前面；',
    '3. 每张卡片都写出可检验的验收标准，不要写“做好”“优化”这类无法判断的词；',
    '4. 卡片数量控制在 2 到 6 张；工作很小就只拆 1 张，不要为了拆而拆；',
    '5. 使用简体中文命名卡片，标题不超过 24 个字；',
    '6. dependsOn 填前置卡片的 title（没有依赖填空数组）；只有确实存在先后关系时才填，禁止循环依赖；',
    '7. priority 为 1/2/3，1 最高；estimateSteps 为 1 到 30 的整数。',
    '只输出一个 JSON 对象，不要输出 Markdown 代码围栏，不要解释。',
    'JSON 结构：',
    '{"title":"工作总标题","summary":"一句话复述目标","cards":[{"title":"卡片标题","goal":"这张卡要完成的具体工作","acceptance":"验收标准，可逐条核对","deliverables":["预期产物"],"dependsOn":["前置卡片 title"],"priority":2,"estimateSteps":5}]}',
  ].join('\n')
}

/** User prompt for the planner. */
export function planUser(brief, cwd, maxCards) {
  return [
    '【用户交办的工作】',
    brief,
    '',
    `【工作目录】${cwd}`,
    `【最多卡片数】${maxCards}`,
    '',
    '请按系统要求拆解，输出 JSON。',
  ].join('\n')
}

/** System prompt for verifying one finished card. */
export function verifySystem() {
  return [
    '你是总管家，负责核对执行者交回的卡片成果。你只根据证据判断，不替执行者补做工作。',
    '核对规则：',
    '1. 逐条对照卡片的验收标准，只有每一项都有明确证据才算通过；',
    '2. 执行者的自述不等于证据，若证据为空、路径不存在、或只写了“已完成”，应判为不通过；',
    '3. 允许合理的等价证据（测试通过、构建通过、生成的文件存在且内容匹配）；',
    '4. “管家核验过的客观事实”里给出的字节数、sha256 和内容预览由管家直接读取文件得到，优先于执行者自述；已有这些证据时直接据此判断，不要再要求执行者重复执行命令；',
    '5. 不通过时必须给出具体、可执行的补齐项，不要重复任务描述；',
    '6. 只输出 JSON，不要输出代码围栏或解释。',
    'JSON 结构：',
    '{"pass":false,"score":0,"summary":"一句话结论","gaps":["具体缺口1","具体缺口2"]}',
  ].join('\n')
}

/** User prompt for the verifier. */
export function verifyUser({ brief, card, report, evidenceCheck, files }) {
  const result = report && typeof report === 'object' ? report : {}
  return [
    '【工作总目标】',
    brief,
    '',
    '【卡片任务】',
    `标题：${card.title}`,
    `任务：${card.goal}`,
    `验收标准：${card.acceptance || '（未填写）'}`,
    `预期产物：${listOrDash(card.deliverables)}`,
    '',
    '【执行者交回】',
    `状态：${result.status || 'unknown'}`,
    `摘要：${result.summary || '（无）'}`,
    `自述证据：${listOrDash(result.evidence)}`,
    `未完成项：${listOrDash(result.open)}`,
    `执行者最后一段话：${report?.lastText ? String(report.lastText).slice(0, 1600) : '（无）'}`,
    '',
    '【管家核验过的客观事实】',
    evidenceCheck || '（没有可核验的路径或命令）',
    files || '（工作目录中没有检测到本次会话修改的文件）',
    '',
    '请判断这张卡是否通过，输出 JSON。',
  ].join('\n')
}

/** System prompt for the final whole-job audit. */
export function auditSystem() {
  return [
    '你是总管家，正在对一项已经跑完的工作做最终核对。',
    '你要判断：把所有卡片的成果合起来，是否已经完整满足用户最初交办的工作。',
    '规则：',
    '1. 只看实际交付，不要因为“卡片都显示完成”就判定整体完成；',
    '2. 缺少用户明确要求的内容时，必须列出缺失项，并给出能独立开工的标题、任务和验收标准；',
    '3. 缺失项要具体，不要重复“继续完善”这类空话；',
    '4. 只输出 JSON，不要输出代码围栏或解释。',
    'JSON 结构：',
    '{"complete":false,"summary":"一句话结论","missing":[{"title":"缺失项标题","goal":"要补做的具体工作","acceptance":"验收标准"}]}',
  ].join('\n')
}

/** User prompt for the final audit. */
export function auditUser({ brief, cards, files }) {
  const lines = cards.map((card, index) => {
    const result = card.result || {}
    return [
      `${index + 1}. ${card.title} [${card.status}]`,
      `   任务：${card.goal}`,
      `   验收：${card.acceptance || '（未填写）'}`,
      `   执行者摘要：${result.summary || '（无）'}`,
      `   证据：${Array.isArray(result.evidence) && result.evidence.length ? result.evidence.join('；') : '（无）'}`,
      `   管家核对：${card.verify?.summary || card.verifyNote || '（无）'}`,
    ].join('\n')
  })
  return [
    '【用户最初交办的工作】',
    brief,
    '',
    '【已拆出的卡片及结果】',
    lines.join('\n\n') || '（无卡片）',
    '',
    '【工作目录中本次会话修改过的文件】',
    files || '（未检测到）',
    '',
    '请判断整体是否完成。若完成，missing 为空数组；若未完成，给出需要补做的卡片。',
  ].join('\n')
}

/** The first brief handed to a card's worker session. */
export function workerPrompt({ job, card, fullAccess, resumed }) {
  const lines = [
    `【总管家派单】卡片“${card.title}”`,
    '',
    '你是一名获得充分授权的执行者，请独立完成下面这张卡片。',
    `【工作总目标】${job.brief}`,
    '',
    `【本卡任务】${card.goal}`,
    `【验收标准】${card.acceptance || '按任务描述交付，并给出可核验证据'}`,
    '【预期产物】',
    listOrDash(card.deliverables),
    '',
    `【工作目录】${job.cwd}`,
    fullAccess
      ? '【权限】已为本会话开启最高权限：文件读写不受工作区限制，工具调用免审批。请直接动手，不要等待确认。'
      : '【权限】按当前会话权限执行。',
    '',
    '【工作方式】',
    '- 先快速检查现状和相关文件，再开始修改；不要只给建议，要真正落地。',
    '- 不要向用户提问，不要使用 ask_user_question 等待回答；遇到不确定处按最合理的方案推进并在结果里说明。',
    '- 只改与这张卡片相关的文件，不要顺手重构无关内容。',
    '- 做完后自测（运行测试、构建、或检查生成物），并记录可核验的证据。',
    '',
    '【收尾格式】',
    '完成或受阻后，最后一条消息必须以如下格式结束（JSON 单行，不要放进代码围栏）：',
    RESULT_MARKER,
    '其中 status 只能是 done 或 blocked；blocked 时在 open 里写明卡住的原因和需要什么。',
  ]
  if (resumed) lines.push('', '【续跑提示】这是续跑：先读取你上次的进度和已完成部分，不要从头重做。')
  return lines.join('\n')
}

/** A continuation message after a stall or an interrupted turn. */
export function stallPrompt({ card, attempt, lastTool }) {
  return [
    `【总管家续跑】卡片“${card.title}”刚才长时间没有产生新的进展，已为你中断上一轮。`,
    `这是第 ${attempt} 次续跑。请先检查当前工作目录里已经完成的部分，从中断处继续，不要推倒重来。`,
    lastTool
      ? `上次停在工具「${lastTool}」上。不要原样重跑同一个长时间命令；改成更短、可中断的步骤，或先检查它留下的结果。`
      : '如果被某个命令或工具卡住，换一种更直接、更短的做法。',
    '完成后按约定输出 <butler-result> 结果块。不要向用户提问。',
  ].join('\n')
}

/** A continuation message after verification found gaps. */
export function fixPrompt({ card, gaps, round }) {
  return [
    `【总管家核对】卡片“${card.title}”的交付还没有通过核对（第 ${round} 轮）。`,
    '【必须补齐的缺口】',
    gaps.map((gap, index) => `${index + 1}. ${gap}`).join('\n') || '1. 按验收标准重新检查并补齐。',
    '',
    '请针对上面的缺口继续完成，不要重做已经通过的部分。改完后重新自测，并按约定输出 <butler-result> 结果块。',
    '不要向用户提问。',
  ].join('\n')
}

/** A gentle nudge when the worker ended without the result block. */
export function reportPrompt() {
  return [
    '【总管家提醒】你上一轮已经结束，但没有按约定输出结果块，管家无法核对。',
    '请用一两句话总结当前实际完成情况，然后严格按下面的格式补上结果块：',
    RESULT_MARKER,
    '如果还没有完成，把 status 写成 blocked，并在 open 中写明还差什么。',
  ].join('\n')
}

/** A follow-up into a real work conversation after its turn failed verification. */
export function sessionFixPrompt({ card, gaps, round }) {
  return [
    '【总管家核对】你在这段工作对话里的上一轮交付还有缺口：',
    gaps.map((gap, index) => `${index + 1}. ${gap}`).join('\n') ||
      '1. 请按用户这次请求重新检查，补齐没有落地的部分。',
    '',
    `这是第 ${round} 轮补齐。请在原对话里继续完成，不要重做已经通过的部分；完成后简要说明改了什么、怎么验证的。`,
    '不要向用户提问。',
  ].join('\n')
}

/** A steering message for a conversation that has gone quiet mid-turn. */
export function sessionStallPrompt({ card, attempt, lastTool }) {
  return [
    '【总管家续跑】这段工作对话已经有一段时间没有产生新的进展。',
    `这是第 ${attempt} 次续跑。先检查当前已经完成的部分，从中断处继续，不要推倒重来。`,
    lastTool
      ? `上次停在工具「${lastTool}」上。不要原样重跑同一个长时间命令；改成更短、可中断的步骤，或先检查它留下的结果。`
      : '如果被某个命令或工具卡住，换一种更直接、更短的做法。',
    '完成后简要说明结果。不要向用户提问。',
  ].join('\n')
}

/** A light nudge that asks the conversation to keep going without interrupting it. */
export function sessionNudgePrompt({ card, lastTool }) {
  return [
    '【总管家催办】这张卡片在本轮对话里还没有收尾。',
    card.goal ? `用户请求：${String(card.goal).slice(0, 800)}` : '',
    lastTool ? `最近使用的工具：${lastTool}` : '',
    '请接着当前进度继续完成，收尾时说明结果和验证方式；如果确实被阻塞，说明卡在哪里。',
    '不要向用户提问。',
  ]
    .filter(Boolean)
    .join('\n')
}

/** User prompt for verifying one completed turn of a real conversation. */
export function sessionVerifyUser({ card, report, evidenceCheck, files }) {
  const result = report && typeof report === 'object' ? report : {}
  return [
    '【用户在这段工作对话里提出】',
    String(card.goal || '').slice(0, 4000),
    '',
    '【助手最后的回答】',
    String(result.summary || '（没有留下回答）').slice(0, 3000),
    '',
    '【本轮工具活动】',
    `工具调用 ${card.toolCalls || 0} 次；最近工具：${card.lastTool || '无'}`,
    '',
    '【管家核验过的客观事实】',
    evidenceCheck || '（执行者没有提供路径型证据）',
    files || '（工作目录中没有检测到本轮修改的文件）',
    '',
    '请判断用户的这次请求是否被完整、正确地处理。',
    '如果只是聊天式回答、没有需要落地的内容，可以通过；如果涉及文件或代码改动，必须有实际证据。',
    '只输出 JSON，不要输出代码围栏或解释。',
  ].join('\n')
}

/** A follow-up that reworks one finished task node in the same conversation. */
export function revisionPrompt({ card, instruction }) {
  return [
    `【总管家返工】用户对任务「${card.title}」的当前结果不满意，要求：`,
    String(instruction).slice(0, 4000),
    '',
    '请在这段原对话里继续修改，不要重做已经通过的部分；完成后简要说明改了什么、怎么验证的。',
    '不要向用户提问。',
  ].join('\n')
}

/** The same rework, addressed to a brief worker that must return a result block. */
export function revisionWorkerPrompt({ card, instruction }) {
  return [
    `【总管家返工】用户对卡片「${card.title}」的当前结果不满意，要求：`,
    String(instruction).slice(0, 4000),
    '',
    '请继续修改，完成后重新自测，并按约定输出结果块：',
    RESULT_MARKER,
    '不要向用户提问。',
  ].join('\n')
}

/** A short description of the role shown in the job header. */
export const BUTLER_ROLE = '总管家'
