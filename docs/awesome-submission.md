# 收录到 awesome-dsh-plugin

目标列表：

https://github.com/awesome-dsh-plugin/awesome-dsh-plugin

## 先决条件

该列表只接受 **GitHub 仓库 URL**；当前插件主仓库在 Gitee，必须先建立 GitHub 镜像仓库。

1. 在 GitHub 创建公开仓库，例如：

   ```text
   https://github.com/<github-owner>/dsh-card-workbench
   ```

2. 从当前 Gitee 仓库推送：

   ```bash
   git remote add github https://github.com/<github-owner>/dsh-card-workbench.git
   git push -u github main
   git push github work
   ```

3. 在 GitHub 仓库的 About 中确认：

   ```text
   Description: Card-based task orchestration for DeepSeek Harness.
   Topic: dsh-plugin
   ```

4. 仓库必须创建满 **1 天**，CI 会自动检查。

## 提交文件

Fork `awesome-dsh-plugin/awesome-dsh-plugin`，新建一个文件：

```text
data/plugins/<github-owner>__dsh-card-workbench.yml
```

内容：

```yaml
url: https://github.com/<github-owner>/dsh-card-workbench
name: <github-owner>/dsh-card-workbench
category: workflow
description:
  en: 'Card-based task orchestration for DeepSeek Harness: split work into cards, dispatch and watch tasks, handle stalls, verify results, and adopt work conversations.'
  zh: '为 DeepSeek Harness 提供卡片任务编排：拆分任务、派单盯办、处理卡顿、核对结果，并接管工作对话。'
```

说明：

- 只提交这一个文件，不要手工编辑两个 README；
- `description.en` 必须与仓库实际能力一致；
- `category` 选 `workflow`；
- 确认 GitHub 仓库的 `package.json` 中有：

  ```json
  "dsh": {
    "bundle": { "patch": "./cordis.patch.yml" },
    "client": { "platform": "web" }
  }
  ```

  并且仓库根目录有 `cordis.patch.yml`。

## 提交 PR

1. 提交这个 YAML 文件；
2. 向 `awesome-dsh-plugin/awesome-dsh-plugin` 的 `main` 分支发起 Pull Request；
3. 等待 CI 检查 manifest、仓库年龄、格式和 README 生成；
4. 维护者会阅读仓库源码，确认描述与实际功能一致；
5. 如果收到 `held: author` 标签，只修改对应条目，再推送到同一分支并留一条说明。

## 当前阻塞

当前 Gitee 插件已具备：

```text
dsh.bundle manifest
cordis.patch.yml
真实可用代码
dsh-plugin 相关关键词
```

但还没有 GitHub 仓库，且本机没有 GitHub 登录凭据，无法代为创建仓库或发起 PR。完成上面的 GitHub 镜像后即可提交。
