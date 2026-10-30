# 卡片工坊：任务卡方案可行性与落地设计

## 1. 结论

方案可行，但应实现为“现有卡片工坊的增强”，不是新建独立侧边栏任务工具。

- 现有拆卡、卡片状态、watchdog、核对、时间轴和持久化可复用约 **55%–65%**。
- 新增工作量集中在依赖 DAG、宿主调度、5 个 Agent 工具、看板视图、数据迁移和测试。
- 完整标准版约 **3–5 周单人工作量**；只做“依赖 + 看板 + 工具”约 **8–12 人日**。
- 保留当前全屏卡片工坊样式；看板作为工坊内的第二个视图，不新增左侧栏。

## 2. 现有能力证据

| 能力 | 代码证据 |
|---|---|
| 拆卡 Prompt | `lib/prompts.js:20` `planSystem()`，要求 2–6 张卡、每张有验收标准 |
| 拆卡执行 | `lib/engine.js:892` `runPlan(jobId)` |
| 卡片生成 | `lib/engine.js:1180` `makeSessionCard()`；`lib/engine.js:753` 批量 `job.cards.push(...cards)` |
| 细状态枚举 | `lib/engine.js:33` `ACTIVE_CARD = starting/running/stalled/fixing/verifying` |
| 核对 | `lib/engine.js:1688` `verifyGroupCard()`；失败后回原会话修复 |
| watchdog | `lib/engine.js:2386` `tick()` |
| 原子存储 | `lib/store.js:17` `BoardStore`；`lib/store.js:66–68` temp + rename |
| 全屏工坊 | `client.js:1444` `JobCard`；`client.js:2018` `WorkspaceList` |
| 时间轴 | `client.js:1450` `timelineOpen`；`client.js:1851` `.butler-timeline` |
| Agent 工具 | `index.js:76` 只有 `apply()`，当前**没有** `ctx.tools.register`；5 个工具全部新增 |
| 依赖字段 | 当前卡片没有 `dependsOn`；`planSystem()` 也没有输出依赖 |

## 3. 与现有架构的冲突与处理

### 3.1 Project 与 job

不新增 Project 实体：

```text
job（工作区对话组）= Project
card = 子任务
```

理由：现有看板、工作区、历史区、会话绑定都围绕 job，新增 Project 会造成双轨。

### 3.2 四态与现有细状态

保留内部细状态，UI 做列映射：

| 看板列 | 内部状态 |
|---|---|
| 待处理 | `queued` |
| 进行中 | `starting` / `running` / `fixing` |
| 待核对 | `verifying` |
| 已完成 | `done` / `skipped` |
| 阻塞 | `stalled` / `needsUser` / `failed` |

`failed` 仍保留终态语义；`stalled` 是可恢复的阻塞。  
新增 `blockedReason`、`dependsOn`、`priority`、`estimateSteps`、`history`。

### 3.3 Agent 自报 done

不采用“Agent 调用 update_status 直接 done”。

规则：

```text
Agent 只能提交到 verifying / blocked
宿主独立核对通过后，才写 done
```

拖拽到“已完成”同样触发核对；核对不通过回到 `fixing`，不能直接解锁下游。

### 3.4 左侧边栏

不实现。当前插件已经全屏并隐藏左侧栏。  
看板作为现有工坊内的视图切换：

```text
时间轴 / 看板
```

默认时间轴，保持现有页面样式。

### 3.5 存储

继续使用现有 `BoardStore` 与 `$DSH_HOME/.dsh-butler/board.json`；不假设 `ctx.storage.profile` 一定存在。

迁移要求：

- `schemaVersion`
- 启动时迁移
- 写前备份
- 事务失败回滚

## 4. 人道主义设计底线

1. **用户同意**：自动接管、最高权限、自动执行默认关闭。
2. **可逆**：删除/归档/清空二次确认；状态变更可撤销。
3. **透明**：每张卡显示依赖、操作者、证据、阻塞原因。
4. **不伪造完成**：Agent 不能自报 done；核对失败必须显式回到修复。
5. **不无限重试**：超时/连续失败后停止，转为 blocked 等用户。
6. **可访问**：拖拽必须有键盘替代；状态不能只靠颜色。
7. **不打扰**：只有 `needsUser` 才打开详细对话；完成自动回工坊。
8. **数据安全**：仅本地存储，不上传会话内容；迁移前备份。
9. **控制认知负担**：默认最多 6 张卡；嵌套卡片后置。

## 5. 建议架构

### 5.1 数据模型

```ts
interface TaskCard {
  id: string
  title: string
  description: string
  acceptance: string
  deliverables: string[]
  dependsOn: string[]
  status: 'queued' | 'starting' | 'running' | 'stalled' | 'fixing' | 'verifying' | 'done' | 'failed' | 'skipped'
  priority: 1 | 2 | 3
  estimateSteps: number
  blockedReason?: string
  evidence?: string[]
  history: Array<{ at: number; actor: 'agent' | 'user' | 'host'; from: string; to: string; note: string }>
}
```

### 5.2 五个工具

```text
card_workshop_split
card_workshop_list
card_workshop_update
card_workshop_block
card_workshop_summary
```

约束：

- `split` 幂等，带 requestId，最多 6 张，拒绝环；
- `list` 只读，按 job/session 权限过滤；
- `update` 只允许合法迁移，`verifying` 由 Agent 提交，`done` 只能由宿主核对写；
- `block` 必须填写 reason；
- `summary` 由宿主确定性计算，不让模型编造。

### 5.3 宿主调度器

```text
split -> 校验 DAG / 环 / 数量
依赖全部 done -> 解锁 queued
running 超时 -> stalled -> 有限重试 -> blocked
verifying 失败 -> fixing -> 回原会话
```

### 5.4 UI

在现有工坊顶部增加：

```text
[时间轴] [看板]
```

看板五列；卡片复用现有 `.butler-card` 视觉；不新增侧栏。  
拖拽仅允许合法迁移；提供键盘菜单“移到…”。

## 6. 分期与里程碑

### 阶段 0：设计与数据迁移（0.5–1 天）

交付：

- `dependsOn/priority/estimateSteps/blockedReason/history` 字段设计；
- `schemaVersion` 与迁移函数；
- 状态映射表。

验收：

- 用旧 `board.json` 启动成功；
- 迁移可重复执行且不丢数据。

### 阶段 1：MVP（4–6 天）

改动文件：

- `lib/prompts.js`：拆卡输出 `dependsOn`；
- `lib/engine.js`：DAG 校验、依赖解锁、blocked 原因；
- `lib/server.js`：只读 `list` 与 `summary`；
- `client.js`：时间轴显示依赖和阻塞原因；
- `scripts/`：DAG/迁移测试。

验收：

```text
前置未完成不能启动
前置完成自动解锁
依赖环被拒绝
Agent 不能直接 done
```

### 阶段 2：标准版（8–12 天）

改动文件：

- `index.js`：注册 5 个工具；
- `lib/engine.js`：宿主状态机、超时、审计历史；
- `client.js`：看板视图、拖拽、键盘菜单、进度条；
- `lib/store.js`：备份/迁移；
- `scripts/`：状态迁移、工具权限、UI 静态测试。

验收：

```text
看板与时间轴切换
拖拽 done 触发核对
阻塞必须填原因
超时不会无限重试
键盘可完成所有状态操作
```

### 阶段 3：高级版（后续）

- 多项目切换；
- 模板库；
- 子卡片嵌套；
- 日志回溯。

验收前两项放在后续版本，避免首版复杂度过高。

## 7. 风险清单

| 风险 | 影响 | 缓解 |
|---|---|---|
| Agent 绕过宿主直接改状态 | 数据不可信 | 工具只提交 verifying，done 由宿主写 |
| DAG 环 | 永久卡住 | split 时 DFS 检测 |
| 迁移丢数据 | 任务丢失 | 备份 + schemaVersion + 回滚 |
| 状态竞争 | 重复执行 | 原子写 + 单卡锁 |
| 拖拽误操作 | 任务状态错乱 | 确认 + 撤销 + 合法迁移 |
| 卡片爆炸 | 认知负担 | 最多 6 张，嵌套后置 |
| 无限重试 | 成本/打扰 | 重试上限，转 blocked |
| 左侧栏方案 | 破坏现有 UI | 不采用，工坊内视图切换 |
| 自报完成 | 假交付 | 独立核对与证据 |
| 权限过大 | 文件风险 | 默认 fullAccess false，显式开启 |

## 8. 最终建议

优先做：

```text
1. 依赖 + 状态校验
2. 看板作为时间轴替代视图
3. 工具只做提交入口，宿主做最终状态
4. 数据迁移与备份
5. 键盘/确认/撤销
```

不要首版做：

```text
左侧边栏 Tab
多级嵌套卡片
多项目复杂切换
Agent 直接标记 done
```

当前页面样式可以保留；改造范围集中在卡片字段、宿主调度、5 个工具和工坊内看板视图。
