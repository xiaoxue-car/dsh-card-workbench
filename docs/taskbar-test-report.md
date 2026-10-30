# 卡片工坊任务栏测试报告

版本：`dsh-card-workbench 1.1.8`
时间：2026-10-30
环境：DSH 桌面 Web UI，Windows，1536×864 屏幕

## 1. 测试结论

| 测试项 | 方法 | 预期 | 结果 |
|---|---|---|---|
| 任务栏位于交办工作上方 | 实际 DSH 页面截图 | 任务卡在 Intake 之前 | PASS |
| 任务栏显示当前任务 | 实际页面 + `/api/state` | 标题、状态、进度可见 | PASS |
| 点击任务进入对话 | 代码路径 + 静态断言 | `onOpen: openSession` | PASS（代码） / 实际点击未执行 |
| 任务完成提示 | 状态迁移代码 + 静态断言 | 完成后切到已完成卡片 | PASS（代码） / 实际完成未执行 |
| 默认宽度行不换行 | 布局校验页 | 选择文件夹与拆解开工同 top | PASS |
| 窄窗口行不换行 | 布局校验页 594px | start.top == picker.top | PASS |
| 选择文件夹按钮缩小 | CSS 行检查 | 28px 高，3px 7px 内边距 | PASS |
| 行内容不溢出 | DOM 尺寸调试 + grid 布局 | row <= intake 宽度 | PASS（CSS/尺寸） |
| 多任务全局并发 | `test-dependencies.mjs` | 多 job 合计不超过 maxConcurrency | PASS |
| 多任务任务栏标记 | 静态断言 | `N 个任务并行` | PASS（代码） / 实际多任务未构造 |
| Renderer 控制台无报错 | 无 DevTools 访问 | 无未捕获异常 | UNVERIFIED |

## 2. 截图标注

### `dsh-reloaded.png`

场景：实际 DSH 卡片工坊，1 个任务执行中。  
预期：任务栏显示在「交办工作」上方，标题、执行中状态、进度光带可见。  
结果：PASS。  
sha256：`5532819c38dc0a0c795a69065cbd8b244e657d09e4ba7b42945589f0a5583a0e`

### `menu-debug.png`

场景：临时 DOM 尺寸探针，已从最终代码移除。  
预期：`inner`、`intake`、`row` 宽度用于判断是否溢出。  
结果：`win=1536 inner=1120 intake=1120 row=1082`，行宽小于容器宽。  
sha256：`eeb4c2ed2f41ba86a3cc6679217e8360e6adffea5a57b136943b41a21a5a423a`

### `intake-layout-grid-final.png`

场景：独立布局校验页，不是 DSH 实际页面。  
预期：BEFORE 换行，AFTER 同一行。  
结果：PASS。  
实测：

```text
BEFORE: picker.top=97, start.top=136, sameTopLine=false
AFTER:  picker.top=318, start.top=318, sameTopLine=true
```

sha256：`7fc8b21b20fd804235a67ca060aabcb1d626827864182fe830a278086c07a957`

## 3. 多任务结论

- 全局并发上限在 `engine.js:1050 activeCardCount()` 与 `engine.js:1077` 使用；
- `test-dependencies.mjs` 断言多个 job 合计只启动 1 张卡（maxConcurrency=1）；
- 任务栏显示最近活动任务，并用 `N 个任务并行` 标记并行数量；
- 完成检测用 `previousTasks` Map 跟踪所有活动卡；
- 多张同时完成只展示最近完成的一张，其余保留在工作列表；
- 多个 `needsUser` 同时出现只自动打开第一个。

## 4. 未完成验证

- 实际点击任务栏跳转：未在 UI 自动点击；
- 实际等待任务完成提示：未构造完成态；
- 实际多任务并行下的任务栏切换：未构造；
- Renderer 控制台：当前无 DevTools 访问，不能声称无前端报错；
- 实际 DSH 页面在 grid 改动后的最终截图：本轮只取得局部/调试截图，需再刷新页面补一张最终对照。

## 5. 回归

```text
D:\Project\virtualPet\butler-intake-multitask-1.1.8.log
sha256: 23194d0cce1fd2207f4612724708e99ca7ad28b24e559ed79b2d09fb6e656134
```

```text
16 个 test-*.mjs       全部 EXIT=0
4 个 node --check      全部 EXIT=0
audit.mjs              EXIT=0
```
