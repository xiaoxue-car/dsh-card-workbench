# 卡片工坊 (`dsh-card-workbench`)

一个 Harness Web UI 插件：把工作交给卡片工坊，它负责拆卡、盯办、处理卡顿、逐张核对；同时把 Harness 里**已有的工作对话**自动接管成卡片组，统一盯进度。

无第三方运行时依赖，只使用 Harness Host 服务、Node 内置模块和默认模型；同一份目录可以安装到任意 profile、任意工作区、Windows/macOS/Linux。

## 使用

1. 插件启用后左侧原生栏会隐藏；用 `Ctrl/Cmd+Shift+B` 或对话输入框右侧的「卡片工坊」按钮打开面板。
2. 在「交办工作」里粘贴完整需求，确认「工作目录」。
3. 点「拆解开工」（或 `Ctrl+Enter`）。
4. 卡片工坊会：
   - 用默认模型把工作拆成 2–6 张可验收卡片；
   - 每张卡开一个执行会话，把任务和验收标准派给执行者；
   - 监听执行会话；超过 `stallMs` 没有新进展时自动中断并续跑；
   - 卡片结束后自动核对；不通过就把缺口退回继续做；
   - 全部结束后做整体终审；发现缺失自动补卡继续盯办。

卡片上的「打开会话」会跳到该卡对应的执行会话，可以直接看执行过程或人工介入。

## 接管工作对话（默认关闭，需用户开启）

这是第二个工作模式：开启「自动接管对话」后，管家接管 Harness 里的工作对话，不需要另开执行会话。默认关闭，避免插件未经确认接管用户会话。

- **开启后启动扫描并接管已有对话**：内存中的会话和已持久化的冷会话都会检查；有真实用户请求的对话会自动形成一个独立卡片组；
- **开启后新对话创建时自动接管**：新会话一出现就进入看板，第一条工作请求会补上标题并生成第一张卡片；
- **按轮次拆卡**：每个 turn 一张卡片，同一轮里的多个用户消息（steer）会合并，不会拆成碎片；每张卡记录用户请求、工具调用数、最近工具、执行结果和核对结论；
- **进度可见**：每个对话组显示完成/总数、进行中、卡顿；卡片状态覆盖排队、进行中、核对中、完成、失败；
- **自动核对**：一轮结束后用模型核对；有缺口就把「补齐项」作为 `【卡片工坊核对】` 消息发回**原对话**，继续盯到完成；
- **自动处理卡顿**：长时间没有新进展时先 steer 催办一次；仍然没有进展则中断并续跑；连续无进展才停止自动催办；
- **多对话并行**：所有对话组在同一个页面，按「全部 / 交办 / 对话组」筛选，可逐个暂停、继续、催办、核对、移出管家；
- 页面上的「接管最近对话 / 接管本工作区 / 接管全部对话」也可以手动补接管；
- 接管的对话默认**不会**提升权限；只有用户显式把 `fullAccess` 设为 `true` 才会提升到最高权限预设。
- **全视口布局**：卡片工坊页面使用 `position:fixed; inset: var(--dsh-frame-chrome-top) 0 0 0` 覆盖顶部导航以下全部区域。插件激活期间对所有页面始终把 `[class*="_sidebarCol"]` 设为 `visibility:hidden`（保留 grid 占位，避免内容被挤到 0 宽），并通过 `sidebarCol.closest('div[class*="_frame"]')` 找到宿主 frame 后把列宽设为 `0 minmax(0,1fr) 0`；同时插入相同的持久 CSS，路由切换或安装插件刷新时立即生效，每 500ms 再校正一次。任务页、对话页、插件页、插件市场、自动化任务页以及安装插件过程中都不会恢复侧栏；只有卸载插件时才移除覆盖并还原原值。选择器不再依赖构建 hash（如 `BynINW`），宿主升级后只要 `sidebarCol` / `frame` 语义仍存在即可继续工作。
- **顶部管理行**：固定在原生标题栏下方右侧（`top: calc(var(--dsh-frame-chrome-top, 0px) + 6px)`），并设置 `-webkit-app-region:no-drag` 与 `pointer-events:auto`。只响应点击，不响应悬浮；每次打开「管理」都重新枚举当前 `nav[aria-label]` 面板按钮，因此后续新安装插件产生的面板入口会自动进入管理菜单，不再需要左侧栏；同时过滤掉「加载并跳转到第 N 轮」项。
- **账号**：点击「账号」直接在顶部展开当前账号菜单，显示账号标识和「设置 / 意见反馈 / 退出登录 / 更新软件」，不展开左侧栏、不修改列宽。设置通过 SettingsRoot 的 React `actions.open` 直接打开原设置面板；意见反馈与退出登录复用原生账号菜单项；更新软件调用 `window.dshDesktop.updates.open()`，网页端无桌面更新桥时回退到设置。账号按钮额外订阅 `window.dshDesktop.updates.subscribe` / `status`，有非 idle 更新状态时显示品牌色圆点，并在 title / aria-label 中提示可更新。
- **任务时间轴**：`JobCard` 内按 `createdAt` 倒序排列，最新任务节点显示在最上方。

相关开关在面板的「管家设置」里：

| 开关 | 默认 | 说明 |
| --- | --- | --- |
| 自动接管对话 | 关 | 用户开启后才扫描并接管已有/新工作对话 |
| 新对话自动跳转 | 开 | 新对话被接管并收到第一条工作请求时，界面跳到卡片页 |
| 对话完成自动核对 | 开 | 每轮结束自动核对，有问题回原对话补齐 |
| 卡顿自动催办 | 开 | 长时间无进展时自动催办/续跑 |

这些开关保存在看板数据里，重启后保留。

## 卡片界面

- **时间轴**：每个对话组的任务节点按时间顺序排成一条纵向时间轴；节点默认收起，只显示时间、摘要、状态；点单个节点展开任务内容、交付、缺口和操作。
- **默认折叠到摘要以下**：每个对话组默认只显示任务摘要和进度，任务时间轴整体收起；**点击「任务时间轴」名称**才渲染任务节点，再次点击收起。
- **时间轴整体折叠**：每个对话组的「任务时间轴」名称本身就是开关，点击展开/收起，和对话组名称的交互一致。
- **按工作区折叠**：所有对话组按 `cwd` 归入工作区块；每个工作区块显示组数、节点数、执行中/完成/失败/待操作统计，整块可收起。当前工作区默认展开以显示对话组名称，其他工作区默认收起；所有对话组本身默认折叠。
- **历史工作区**：某个工作区下所有对话组的最近真实卡片活动（卡片创建时间或最后活动时间）都超过 1 天时，整块自动移入「历史工作区」；内部催办/核对不会刷新这个时间。历史区默认收起，不占用主列表；该工作区一旦再次产生活动，会自动移回普通工作区单独展示。
- **刷新与清理**：刷新按钮显示「刷新中…」并在完成后提示「已刷新」；清理按钮会移除已完成/失败的工作，以及所有卡片都已结束的对话组，并提示实际清理数量。
- **依赖与看板**：拆卡可带 `dependsOn`、优先级和预估步数；宿主校验依赖 DAG，前置完成才解锁下游，失败则阻塞下游。工坊内可在「时间轴 / 看板」之间切换，看板只展示状态，不允许拖拽绕过验收。
- **Agent 工具**：注册 `card_workshop_split`、`card_workshop_get_list`、`card_workshop_update_status`、`card_workshop_block`、`card_workshop_summary`。Agent 不能直接写 `done/failed`，只能提交 `verifying/blocked`；最终完成由宿主核对写入。
- **全部展开 / 收起全部**：每个组右上角一键切换节点详情；工作区标题栏切换整个工作区的时间轴。
- **交办工作目录必选**：交办区默认不预填目录；为空时显示「请选择工作区文件夹」提示，未选择前无法开始。右侧「选择文件夹」选定目录会作为该任务的文件夹；Host 用 `workspaceRegistry.create(path)` 复用或新建 Workspace，目录不在现有工作区时会自动注册成新的工作区。
- **卡片内直接对话**：展开任务节点后，底部有「卡片对话」输入框和消息记录；直接发送即可在该节点对应的原会话里继续对话，不需要打开会话窗口。卡片会轮询显示用户与助手的往返消息。
- **对话组单独折叠**：每个工作区里的每个对话组，**点击对话组名称**即可展开/收起该组的对话框、摘要、时间轴和日志；打开卡片工坊时所有对话组默认收起，工作区折叠与组折叠互不影响。
- **对话组直接对话**：每个工作区里的每个对话组，在「任务摘要」上方也有一个直接对话框；输入的问题会作为一个新任务卡片进入该组任务时间轴，在后台执行并把结果回填到卡片，不跳转对话页。输入框使用品牌蓝边框，聚焦时加蓝色外环；按 Enter 直接发送，Shift+Enter 换行；输入法组词中的 Enter 不会误发送。
- **按需跳转**：分析或执行结束不会自动打开发起会话；只有卡片出现 `needsUser`（需要用户选择或填写）时才打开对应会话，处理完成后自动回到卡片工坊。
- **草稿保护**：对话组和任务卡片的未发送文字按 job/card 写入 `localStorage`，页面关闭、异常退出或重载后自动恢复；发送成功后清除对应草稿。
- **对话级模型/推理选择**：对话组和任务节点的所有输入框下方都带模型与推理等级选择器，数据来自 Harness 的 `modelCatalog`，选择通过 `sessionController.selectModel({provider, model, reasoningEffort})` 写回该对话会话。
- **对话级模式选择**：每个对话组的输入框同时带「模式」选择器，选项来自 `agentPresets.list()`，由 `agentPresets.select(agent, preset)` 应用到该会话；切换只影响当前对话，不改变其它对话组。
- **对话级权限选择**：同一排还有权限预设选择器，数据来自 `permissionPresets.catalog()`，选择通过 `permissionPresets.set(session, preset)` 写回，并同步 `approval.setPolicy`；选项显示为「只读 / 工作区可写 / 最高权限 / 自定义」。
- **卡片对话高亮**：任务节点里的「卡片对话」有品牌色边框、左侧强调线、浅色底和标签底色，和普通对话组输入框明显区分。
- **结构化操作显式豁免**：权限确认、`ask_user_question` 选择、返工表单、管家设置和交办区属于结构化操作，不是对话输入框，因此不显示模型/推理选择器；它们分别返回审批结果、结构化答案、返工指令、开关值和任务描述，不会改变会话模型。
- **插件内确认与提问**：权限确认和 `ask_user_question` 不再只提示「去原对话点」，而是在任务卡里直接出现「允许一次 / 拒绝」或选项表单；用户在插件内点击后，答案直接返回 Harness 的审批/提问监听器。只有不属于管家管理的会话才交回 Harness 原界面。
- **组完成状态**：组标题和摘要条直接显示「执行中 x/y」「全部完成 x/y」「x 项失败」「已暂停」，全部完成时有绿色完成条，失败有红色标识。
- **可接管对话折叠**：页面上的「可接管的工作对话」默认折叠，标题栏显示已接管/执行中/已完成/未接管数量；右侧有明显的「展开列表 / 收起列表」按钮，展开后才显示完整列表。
- **状态区分**：会话列表和组卡片区分「已接管」「未接管」「执行中」「已完成」「有失败」「已暂停」，并有对应颜色徽标。
- **自动移除失效对话组**：管家每 60 秒对照 Harness 的会话清单；某个对话组绑定的会话既不在清单里、也不在内存中时，自动从看板移除该对话组。
- **需要你操作**：对话里出现 `ask_user_question` 或权限确认时，对应任务节点显示黄色「需要你操作」，展开可看问题/选项，点「打开对话处理」直接回到原对话完成点击。
- **单节点返工**：任一任务节点都可以点「重新对话」，填写不满意的地方和修改要求；管家会把要求发回该节点原来的对话继续修改，仍然归在这张卡上，不会新开一张卡。

## 权限

默认 `fullAccess: false`：

- 默认保留会话原有权限，不自动切换到 `danger-full-access`；
- 只有用户显式把 `config.fullAccess` 设为 `true`，执行会话才会切到最高权限预设；
- 插件本身运行在 Host 进程内，拥有 Host 能力；
- 被接管的既有对话也只有在 `fullAccess: true` 时才提升权限；即使策略仍是 `ask`，权限确认也会直接在卡片工坊卡片里弹出「允许一次 / 拒绝」；
- `fullAccess: true` 意味着执行者可以修改工作目录之外的任何文件，必须由用户明确开启。

## 数据与恢复

- 看板数据：`$DSH_HOME/.dsh-butler/board.json`（未设置 `DSH_HOME` 时用 `~/.dsh/.dsh-butler/board.json`，Windows 即 `%USERPROFILE%\.dsh\.dsh-butler`）
- 执行者的真实工作记录在各自的 Harness 会话里，看板只保存任务编排状态。
- 宿主重启后，运行中的工作会暂停；点「继续」即可从现有会话续跑；所有对话组会在启动后自动重新扫描并接管。

## 安装到任意 profile

这个目录是自包含的：

- Host 半只用 Node 内置模块和 Harness 服务（`sessionController`、`sessions`、`agents`、`llm`、`webServer`、可选的 `permissionPresets` / `approval` / `workspaceRegistry`）；
- Client 半只从 Harness 的 React 模块表取 `react`，通过 `slots` / `locale` / `layout` / `uiWorkspace` 注册；
- 没有 pnpm 依赖、没有构建步骤、没有写死的工作区路径或会话 ID；
- 权限、模型、查看器都走 Harness 当前 profile 的配置。

安装方式（第三方机器同样适用）：

1. 把整个 `dsh-butler` 目录复制到目标机器（不需要 `node_modules`，不需要构建）。
2. 在 Harness 的「设置 → 插件」选择安装本地目录，或让 Harness 执行：
   ```
   plugin_manager install_bundle  target = <这个目录的绝对路径>
   ```
3. 确认 `dsh-card-workbench` 这一行是启用状态；安装结果应为 `application: applied`。
4. 需要改默认行为时，在 profile 的插件行 `config` 里设置（见下表），然后重载插件；自动接管/跳转/核对/催办四个开关也可以直接在面板里切换。
5. 刷新一次 Web 页面；左侧栏隐藏后，用 `Ctrl/Cmd+Shift+B` 或对话输入框右侧「卡片工坊」按钮打开面板。
6. 用 `node scripts/audit.mjs` 自检数据目录、接管结果和硬编码扫描。

数据按当前用户的 `DSH_HOME` 存放，不跟随仓库；不同机器、不同 profile 互不覆盖。

## 可调参数（插件行 config）

| 参数 | 默认 | 说明 |
| --- | --- | --- |
| `maxCards` | 6 | 拆卡上限 |
| `maxConcurrency` | 3 | 同时盯几张卡 |
| `stallMs` | 240000 | 多久没有新进展判定卡顿 |
| `maxStalls` | 3 | 同一张卡最多自动续跑几次 |
| `maxAttempts` | 5 | 派单/续跑总次数上限 |
| `maxFixRounds` | 2 | 核对不通过后最多退回几轮 |
| `maxGapRounds` | 2 | 终审后最多自动补卡几轮 |
| `fullAccess` | false | 是否给执行会话最高权限；必须显式开启 |
| `provider` / `model` | 默认模型 | 卡片工坊自己的拆卡/核对模型 |
| `dataDir` | `$DSH_HOME/.dsh-butler` | 看板数据目录 |

## 自检 / 可复现证据

安装后可以直接运行仓库内的审计脚本（Node 内置模块，无依赖）：

```bash
node scripts/audit.mjs
```

单节点返工另有一个不触碰真实会话的确定性测试：

```bash
node scripts/test-revise.mjs
node scripts/test-chat.mjs
node scripts/test-group-chat.mjs
node scripts/test-drafts.mjs
node scripts/test-navigation.mjs
node scripts/test-preset.mjs
node scripts/test-dependencies.mjs
node scripts/test-market.mjs
node scripts/test-clear.mjs
node scripts/test-prune.mjs
node scripts/test-workspace.mjs
node scripts/test-timeline.mjs
node scripts/test-model.mjs
node scripts/test-interactions.mjs
node scripts/test-permission.mjs
node scripts/test-ui.mjs
```

`test-permission.mjs` 验证权限预设和 approval 策略会写回会话。
`test-ui.mjs` 验证全视口面板、未修改宿主侧栏/grid 的白屏防护、顶部「管理/账号」行、管理菜单、快捷键和对话输入框入口、两类对话输入框的权限控件、中文权限标签和卡片对话高亮。

`test-timeline.mjs` 静态校验时间轴初始 `timelineOpen=false`、展开分支才渲染 `.butler-timeline`、收起分支只渲染占位，以及每个对话组的 `groupOpen` 折叠。
`test-model.mjs` 验证模型、推理等级通过 `selectModel` 传给 Harness 并持久化。
`test-interactions.mjs` 验证审批和结构化提问能被插件领取、在插件内解析并把结果返回给 Agent。
`test-chat.mjs` 构造一张已完成卡片，调用 `sendCardMessage`，断言卡片被重新打开、聊天消息写入卡片、提示词以 `【总管家对话】` 发回同一会话。
`test-group-chat.mjs` 验证对话组问题写入 `job.chat`、由 user/message 事件生成一张时间轴卡片，助手结果回填卡片而不是独立聊天框。
`test-drafts.mjs` 用真实 `readDraft`/`writeDraft` 代码和假 `localStorage` 模拟页面关闭再打开，验证对话组与任务卡片草稿分别恢复，发送成功后只清除对应草稿。
`test-navigation.mjs` 验证手动「打开对话」只有在对话进入运行/needsUser 状态并结束后才回卡片工坊；已完成的卡片只查看不会立即跳回，无操作 5 分钟后过期；同时验证 `__TEST_` 过滤不会误伤正常菜单项。
`test-preset.mjs` 验证每个对话的模式目录来自 `agentPresets.list()`，选择后通过 `agentPresets.select(agent, preset)` 应用并持久化到该对话。
`test-dependencies.mjs` 验证前置未完成不能启动、完成后自动解锁、失败会阻塞下游，以及 Agent 工具不能直接写 done。
`test-market.mjs` 验证包名、许可证、`dsh.bundle`、`engines.dsh`、安全默认值、5 个工具、看板视图和中文模式标签。
`test-clear.mjs` 验证清理已结束会删除 done/failed 工作及所有卡片已结束的对话组，同时保留运行中会话和无卡片会话。
`test-prune.mjs` 构造一个已消失的对话组，验证它会从看板移除，而仍在会话清单里的组保留。
`test-workspace.mjs` 验证交办文件夹会调用 `workspaceRegistry.create(path)`，从而复用或新建工作区。

它会输出：

- 当前 `DSH_HOME` 解析出的看板文件位置；
- 每个对话组的标题、卡片数、完成/进行中/失败数，以及总计；
- 全量接管、新会话接管、turn 拆卡、steer 合并、状态枚举、进度统计的代码位置（文件:行号）；
- 对运行时代码的全量扫描结果：Windows 盘符路径、会话 ID 字面量、profile 目录、当前用户名、示例工作区名；
- 包运行时依赖数（应为 0），以及 README 中自动接管/安装/数据说明是否存在。

扫描到硬编码值时脚本以退出码 1 结束，可以直接放进 CI。

## 结构

- `index.js`：Host 入口，注册 HTTP 桥、事件监听和 5 秒看门狗。
- `lib/engine.js`：拆卡、派单、事件跟踪、卡顿续跑、核对、终审、补卡。
- `lib/model.js`：通过共享 `llm` 服务调用默认模型。
- `lib/server.js`：面板与 Host 之间的同源 JSON 接口。
- `client.js`：Web 端的卡片工坊页面与侧栏图标。


