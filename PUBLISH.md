# 发布 dsh-card-workbench

## 0. 前置

- Node.js 20+
- npm 账号，已 `npm login`（npm-only 方案必需）
- 公开 Git 仓库（GitHub / Gitee / GitLab / Codeberg 任一；没有 GitHub 可用 Gitee）
- 当前目录：`plugins/dsh-butler`

## 0.1 没有 GitHub 也能上架

Git 是本地版本控制，GitHub 只是托管服务。当前本地仓库已经可以工作；缺的是“公开可访问的远程地址”。

### 方案 A：Gitee 公开仓库（推荐，替代 GitHub）

1. 在 [Gitee](https://gitee.com) 注册账号，创建公开仓库 `dsh-card-workbench`。
2. 推送：

```powershell
git remote add origin https://gitee.com/<owner>/dsh-card-workbench.git
git push -u origin main
git rev-parse HEAD
```

3. 包元数据改为 Gitee 地址：

```powershell
npm pkg set repository.type=git
npm pkg set repository.url=https://gitee.com/<owner>/dsh-card-workbench
npm pkg set homepage=https://gitee.com/<owner>/dsh-card-workbench#readme
npm pkg set bugs.url=https://gitee.com/<owner>/dsh-card-workbench/issues
```

4. 市场索引用 Git 源：

```json
{
  "version": "1.1.48",
  "publishTimestamp": 1793325000,
  "source": {
    "type": "git",
    "url": "https://gitee.com/<owner>/dsh-card-workbench",
    "commit": "<git rev-parse HEAD 的 40 位 SHA>"
  }
}
```

Gitee 仓库必须是公开的，且支持 HTTPS clone。

### 方案 B：只发布 npm（不需要 GitHub）

npm 包本身可以没有 `repository` 字段；市场索引直接用 npm 源。

```powershell
npm publish --access public --registry=https://registry.npmjs.org
```

索引版本：

```json
{
  "version": "1.1.48",
  "publishTimestamp": 1793325000,
  "source": { "type": "npm" }
}
```

缺点：市场卡片没有“源代码”链接，审核资料也少；但安装可用。

### 方案 C：仅本机使用

```powershell
npm pack
dsh plugin --profile web add ./dsh-card-workbench-1.1.48.tgz
```

不需要 GitHub/npm。这是本地安装，不算“上架市场”。

### 关于 awesome-dsh-plugin

官方列表条目一般需要公开仓库 URL；没有 GitHub 可以尝试 Gitee，但维护者可能偏好 GitHub。  
没有 GitHub 且不想注册 Gitee 时，直接使用“自建市场索引 + npm 源”即可，不必提交 awesome 列表。

## 1. 补仓库地址

检查：

```powershell
npm pkg get name version engines repository homepage
```

## 2. 发布前检查

```powershell
node --check client.js
node --check lib/engine.js
node --check lib/server.js
node --check index.js

Get-ChildItem scripts\test-*.mjs | ForEach-Object { node $_.FullName; if ($LASTEXITCODE -ne 0) { throw $_.Name } }
node scripts/audit.mjs
```

`npm pack --dry-run` 至少包含：

```text
LICENSE
README.md
client.js
cordis.patch.yml
icon.svg
index.js
lib/*.js
locale/*.json
docs/*.md
docs/screenshots/*.png
screenshots.json
```

## 3. 发布 npm

```powershell
npm pack --dry-run
npm publish --access public --registry=https://registry.npmjs.org
```

当前机器默认 registry 是 `https://registry.npmmirror.com/`，不加 `--registry` 会发布到镜像；上架必须显式使用 npmjs。

发布后验证：

```powershell
npm view dsh-card-workbench version --registry=https://registry.npmjs.org
npm view dsh-card-workbench dist.tarball --registry=https://registry.npmjs.org
```

## 4. 创建公开 Git 仓库（GitHub 或 Gitee）

本地仓库已初始化，不需要再次 `git init`。二选一：

GitHub：

```powershell
git remote add origin https://github.com/<owner>/dsh-card-workbench.git
git push -u origin main
gh repo edit <owner>/dsh-card-workbench --add-topic dsh-plugin
```

Gitee：

```powershell
git remote add origin https://gitee.com/<owner>/dsh-card-workbench.git
git push -u origin main
```

仓库需公开，且至少存在一天后再提交 awesome 列表。自建市场索引不要求等待一天。

## 5. 自建市场索引

创建：

```text
site/index.json
site/icons/dsh-card-workbench.svg
```

索引：

```json
{
  "format": 1,
  "title": { "en": "Card Workbench", "zh": "卡片工坊" },
  "plugins": [
    {
      "name": "dsh-card-workbench",
      "title": { "en": "Card Workbench", "zh": "卡片工坊" },
      "description": {
        "en": "Turns workspace conversations into tracked cards and runs them in the background.",
        "zh": "把工作区对话接管为卡片工坊，后台执行、盯办和核对。"
      },
      "icon": "icons/dsh-card-workbench.svg",
      "author": "<owner>",
      "metadata": { "category": "workflow" },
      "versions": [
        {
          "version": "1.1.48",
          "publishTimestamp": 1793325000,
          "source": { "type": "npm" },
          "engines": { "dsh": ">=0.2.1-rc.2 <0.3.0-0" }
        }
      ]
    }
  ]
}
```

发布到任意 HTTPS 静态主机后，在 DSH：

```text
插件 → 发现 → 添加索引源
```

填入索引 URL。

npm-only 索引可以不填 `homepage` / `repository`；如果有 Gitee，可以补：

```json
"homepage": "https://gitee.com/<owner>/dsh-card-workbench#readme",
"repository": { "url": "https://gitee.com/<owner>/dsh-card-workbench" }
```

如果想完全不用 npm、只用 Gitee，把 `source` 改为：

```json
"source": {
  "type": "git",
  "url": "https://gitee.com/<owner>/dsh-card-workbench",
  "commit": "<40 位 SHA>"
}
```

## 6. 提交 awesome-dsh-plugin（可选，有公开仓库再做）

`awesome-dsh-plugin` 通常要求公开仓库 URL；没有 GitHub 时可尝试 Gitee，但维护者可能偏好 GitHub。没有公开仓库时跳过本节，使用上面的自建索引即可。

新增：

```text
data/plugins/<owner>__dsh-card-workbench.yml
```

```yaml
url: https://gitee.com/<owner>/dsh-card-workbench
name: <owner>/dsh-card-workbench
category: workflow
description:
  en: A card workbench that turns workspace conversations into tracked cards, runs them in the background, watches for stalls, verifies results, and returns to the workbench after user input.
  zh: 将工作区对话接管为卡片工坊：拆卡、后台执行、盯办催办、逐项核对，用户填写或选择后自动回到工坊。
```

然后：

```powershell
git checkout -b add-dsh-card-workbench
git add data/plugins/<owner>__dsh-card-workbench.yml
git commit -m "Add <owner>/dsh-card-workbench"
git push
```

## 7. 发布后回归

```text
[ ] 干净 profile 安装成功
[ ] 工具列表出现 5 个 card_workshop_*
[ ] 新建任务能拆卡
[ ] 卡片执行到 done
[ ] 依赖门禁生效
[ ] 看板/时间轴切换可见
[ ] 模式中文显示
[ ] 清理有确认
[ ] 真实升级后插件仍加载
```

## 8. 当前已知待办

- Client bundle 需要重新构建/重载，当前运行页面尚未显示看板切换；
- 需要用你的 GitHub 地址替换所有 `<owner>`；
- npm 首次发布需要登录凭据。

