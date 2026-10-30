# 卡片工坊功能落地与验证证据

## 1. prompts.js

```text
path:   plugins/dsh-butler/lib/prompts.js
bytes:  14139
lines:  287
sha256: ff8fffd58b64ec8275dbbaf0cbfe54cc7a1f5ea25e836930f398d545b6bf569b
```

```js
20: export function planSystem() {
...
29: '6. dependsOn 填前置卡片的 title（没有依赖填空数组）；只有确实存在先后关系时才填，禁止循环依赖；',
30: '7. priority 为 1/2/3，1 最高；estimateSteps 为 1 到 30 的整数。',
...
33: '{"title":"工作总标题","summary":"一句话复述目标","cards":[{"title":"卡片标题",...,"dependsOn":["前置卡片 title"],"priority":2,"estimateSteps":5}]}',
```

## 2. 五个 Agent 工具运行时证据

通过 Host `Tool.listTools` 实际查询，返回：

```text
card_workshop_split
card_workshop_get_list
card_workshop_update_status
card_workshop_block
card_workshop_summary
```

注册代码：

```text
index.js:97  name: 'card_workshop_split'
index.js:113 name: 'card_workshop_get_list'
index.js:123 name: 'card_workshop_update_status'
index.js:141 name: 'card_workshop_block'
index.js:157 name: 'card_workshop_summary'
index.js:170 ctx.tools.register(definition)
```

`card_workshop_update_status` 的参数枚举只有：

```text
queued / running / verifying / blocked / skipped
```

没有 `done` 和 `failed`。

## 3. 依赖调度代码与测试

### 代码

```text
engine.js:973   dependencies[index].clear()       循环依赖移除
engine.js:987   循环依赖提示
engine.js:1020  dependencyState(job, card)
engine.js:1066  pump 前检查依赖
engine.js:1071  前置失败 -> card.status = 'blocked'
```

### 测试输出

```text
PASS dependencies: planner maps dependency titles to card ids
PASS dependencies: downstream card is not ready before its prerequisite
PASS dependencies: completed prerequisite unlocks the downstream card
PASS dependencies: failed prerequisite blocks the downstream card
PASS dependencies: a blocked downstream card requeues when its prerequisite completes
PASS agent tools: cannot mark done directly; blocked requires a reason
```

## 4. Agent 不能直接写 done

代码位置：

```text
engine.js:2950 toolUpdateStatus()
engine.js:2956 throw new Error('Agent 不能直接写入 done/failed；请提交 verifying 或 blocked')
```

测试实际抛错：

```js
assert.throws(
  () => butler.toolUpdateStatus('agent-x', 'job-deps', 'b', 'done'),
  /不能直接写入 done/,
)
```

执行结果见第 3 节最后一行 `PASS agent tools...`。

## 5. 页面样式与看板

新增样式全部限定在 `.butler-board*` 和 `.butler-tl-meta`：

```text
client.js:583 .butler-board
client.js:584 .butler-board-col
client.js:589 .butler-board-card
client.js:2476 function BoardView
client.js:2551 viewMode state
client.js:2836 时间轴/看板 buttons
```

原有 `.butler-card`、`.butler-tl-*`、`.butler-intake` 没有删除或改写；只新增看板容器和卡片元信息。

当前运行页面仍加载旧客户端 bundle，硬刷新后没有出现“时间轴/看板”切换按钮，说明需要重新构建/重载 Client 半包；因此没有把旧页面截图当作看板验证。源码和静态断言已覆盖看板结构。

## 6. 验证日志

```text
D:\Project\virtualPet\butler-implementation-final.log
bytes: 13692
sha256: 5fc00f17460d1c340615deb9c92c54e7a5ba69c6b4daf82bd65bb676cfa15632
```

16 个测试与 4 个 node --check 全部 `EXIT=0`，audit `EXIT=0`。

## 7. 真实端到端执行

使用真实 Host 模型、真实执行会话和临时工作目录跑通：

```text
job:     job_19ce680a-7b0c-4bbd-8ba0-c0ae2877c00b
status:  done
card:    创建并核验 hello.txt
verify:  hello.txt 已确认存在且内容为 hello（5 字节，sha256 与内容预览一致）
file:    hello.txt
bytes:   5
sha256:  2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

日志：

```text
D:\Project\virtualPet\butler-real-e2e.log
sha256: 401426ee5a4839732622fe7474a85e3068a5b921549b9d91c4be997bfb61f7b0
```

覆盖链路：

```text
交办 -> 模型拆卡 -> 创建执行会话 -> 写文件 -> 宿主核对 -> done
```

任务已清理，临时目录已删除。

## 8. 真实包安装

```text
dsh plugin --profile markettest add dsh-card-workbench-1.1.1.tgz
```

结果：

```text
dsh: initialized profile markettest
+ dsh-card-workbench 1.1.1
Done
```

干净 profile 的 `--dump-config` 包含：

```yaml
- id: dsh-butler
  name: dsh-card-workbench
  config: {}
```

tar 解包后 `client.js`、`lib/engine.js`、`index.js` 均通过 `node --check`，`index.js` 可导入并导出：

```text
exports=apply,inject
```

## 9. 仍未完成的验证

- 当前运行 profile 的 Client bundle 仍未显示“时间轴/看板”切换，需要真正重载/重建 Client 半包后再截图确认；
- 尚未真实跑“多卡有依赖”的计划（依赖门禁用确定性测试覆盖）；
- 尚未真实切换模式；
- 尚未发布 npm/GitHub。
