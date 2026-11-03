# 参与 dsh-card-workbench

感谢你愿意参与卡片工坊。项目采用“工作分支集成，主分支发布”的流程。

## 分支

| 分支 | 用途 |
| --- | --- |
| `main` | 稳定发布分支；只接受已验证的合并 |
| `work` | 日常开发与集成分支；创作者优先提交到这里 |
| `feature/<name>` | 单个功能或修复分支，从 `work` 拉出 |

## 提交流程

1. Fork 或克隆仓库，切换到 `work`：

   ```bash
   git clone https://gitee.com/fglry/dsh-card-workbench.git
   cd dsh-card-workbench
   git checkout work
   ```

2. 从 `work` 创建功能分支：

   ```bash
   git checkout -b feature/my-change
   ```

3. 修改代码并运行测试：

   ```bash
   node scripts/audit.mjs
   Get-ChildItem scripts/test-*.mjs | ForEach-Object { node $_.FullName }
   node --check client.js
   node --check index.js
   ```

4. 提交并推送到自己的仓库：

   ```bash
   git add .
   git commit -m "Describe the change"
   git push origin feature/my-change
   ```

5. 向 `work` 分支发起 Pull Request，不要直接向 `main` 提交未验证改动。

6. 维护者审查并运行测试后，将 `work` 合并到 `main`，再打版本标签。

## 版本与发布

- `package.json` 的 `version` 与 `site/index.json` 必须保持一致；
- 发布前更新 README、配置说明和相关测试；
- 发布提交后再打 `v<version>` 标签并推送。

## 问题与建议

- 邮箱：**2075638176@qq.com**
- 标题建议：`[dsh-card-workbench] 简短说明`
- 请附上 DSH 版本、插件版本、操作系统、复现步骤和必要截图。
