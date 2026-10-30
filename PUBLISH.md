# 发布 dsh-card-workbench

## 0. 前置

- Node.js 20+
- npm 账号，已 `npm login`
- GitHub 仓库（后续提供账号后创建）
- 当前目录：`plugins/dsh-butler`

## 1. 补仓库地址

拿到 GitHub 地址后执行：

```powershell
npm pkg set repository.type=git
npm pkg set repository.url=https://github.com/<owner>/dsh-card-workbench
npm pkg set homepage=https://github.com/<owner>/dsh-card-workbench#readme
npm pkg set bugs.url=https://github.com/<owner>/dsh-card-workbench/issues
```

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

## 4. 创建 GitHub 仓库

拿到账号后：

```powershell
git init -b main
git add .
git commit -m "Release dsh-card-workbench 1.1.1"
git remote add origin https://github.com/<owner>/dsh-card-workbench.git
git push -u origin main
gh repo edit <owner>/dsh-card-workbench --add-topic dsh-plugin
```

仓库需至少存在一天后再提交市场条目。

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
      "homepage": "https://github.com/<owner>/dsh-card-workbench#readme",
      "repository": { "url": "https://github.com/<owner>/dsh-card-workbench" },
      "metadata": { "category": "workflow" },
      "versions": [
        {
          "version": "1.1.1",
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

## 6. 提交 awesome-dsh-plugin

新增：

```text
data/plugins/<owner>__dsh-card-workbench.yml
```

```yaml
url: https://github.com/<owner>/dsh-card-workbench
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
