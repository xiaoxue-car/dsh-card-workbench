# README 与截图交付证据

生成时间：2026-11-03T10:02:07.7566017+08:00

## README

- 路径：`D:\Project\virtualPet\plugins\dsh-butler\README.md`
- 字节数：8532
- 行数：204
- sha256：55FD66FE1698EDA6E90E506AC4A8341DE456D5CFC98D89C676D191EB37E79A50
- Gitee 页面显示：README.md 8.33 KB

## 截图

- `docs/screenshots/workbench-enabled.png`
  - bytes：199451
  - sha256：182286CF1825A2266A12A22ED90D1E7828260D34CD08219CB701FEFAC9EC71A2
  - 尺寸：1938 x 1048
  - 状态：插件启用，全宽卡片工坊，侧边栏隐藏
- `docs/screenshots/workbench-disabled.png`
  - bytes：108304
  - sha256：A3FBE67896180F92174AF51CCB92388E73BF49198B200E48E86776119709C8C0
  - 尺寸：1938 x 1048
  - 状态：插件禁用，原生侧边栏与对话页恢复

采集方式：对真实 `DeepSeek Harness` 窗口调用 Windows `PrintWindow`；插件通过
`plugin_manager set_plugin include:dsh-butler enabled=false/true` 实际切换后截图。

## screenshots.json

```json
[
  "docs/screenshots/workbench-enabled.png",
  "docs/screenshots/workbench-disabled.png",
  "docs/screenshots/intake.png",
  "docs/screenshots/history.png"
]
```

## TODO/FIXME 扫描

命令：`Select-String -Pattern 'TODO|FIXME|XXX|HACK'`，扫描 `*.js`、`lib/*.js`、`scripts/*.mjs`。

结果：

```text
no matches
```

## 硬编码扫描

命令：`node scripts/audit.mjs`

结果：

```text
== HARDCODED-VALUE SCAN (runtime code) ==
windows drive path: none
session id literal: none
profile directory: none
workspace example: none
test workspace: none
current username: none
unix home literal: none
DSH_PROFILE_DIR: none
```

## 测试结果

test-ui.mjs EXIT=0
test-navigation.mjs EXIT=0
test-archive-pagination.mjs EXIT=0
test-market.mjs EXIT=0

## README 布局段落

~~~~markdown
## 布局说明

插件激活期间使用持久 CSS：

```css
[class*="_sidebarCol"]{
  visibility:hidden !important;
  pointer-events:none !important;
}

div[class*="_frame"]{
  grid-template-columns:0 minmax(0,1fr) 0 !important;
}
```

- 规则在插件启用期间持续存在，页面路由切换不会重新显示侧边栏；
- 不通过 JS 逐节点写 `style`，也不做 500ms 全量扫描；
- 只有卸载插件时才移除样式，原生侧边栏和列宽恢复；
- 工坊页额外使用 `body[data-butler-page]` 控制 shell overlay，离开工坊页时自动恢复。
~~~~