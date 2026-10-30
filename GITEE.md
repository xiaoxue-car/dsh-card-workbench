# 只用 Gitee 发布卡片工坊

不需要 GitHub，也不需要 npm。

## 1. 创建公开仓库

1. 登录 [Gitee](https://gitee.com)。
2. 右上角「+」→「新建仓库」。
3. 仓库名：`dsh-card-workbench`
4. 路径：`dsh-card-workbench`
5. 选择「公开」。
6. **不要**勾选“使用 README 初始化”，保持空仓库。
7. 创建。

得到地址：

```text
https://gitee.com/<你的用户名>/dsh-card-workbench.git
```

## 2. 推送本地仓库

本地已经提交过，不需要重新 `git init`：

```powershell
cd D:\Project\virtualPet\plugins\dsh-butler

git remote add origin https://gitee.com/<你的用户名>/dsh-card-workbench.git
git branch -M main
git push -u origin main
git rev-parse HEAD
```

如果 Gitee 默认分支是 `master`：

```powershell
git push -u origin main
```

然后到仓库「设置 → 仓库设置 → 默认分支」把默认分支改为 `main`。

### 认证失败时

Gitee 的 HTTPS 推送使用：

```text
用户名：Gitee 用户名
密码：Gitee 登录密码或私人令牌
```

推荐使用私人令牌：

```text
Gitee → 设置 → 安全设置 → 私人令牌 → 生成新令牌
```

不要把令牌发到对话里；在 Git 凭据窗口输入即可。

## 3. 修改 package.json 的仓库地址

```powershell
npm pkg set repository.type=git
npm pkg set repository.url=https://gitee.com/<你的用户名>/dsh-card-workbench
npm pkg set homepage=https://gitee.com/<你的用户名>/dsh-card-workbench#readme
npm pkg set bugs.url=https://gitee.com/<你的用户名>/dsh-card-workbench/issues
```

检查：

```powershell
npm pkg get name version repository homepage engines
```

应该看到：

```text
name: dsh-card-workbench
version: 1.1.16
repository.url: https://gitee.com/<你的用户名>/dsh-card-workbench
```

提交并推送：

```powershell
git add package.json
git commit -m "Set Gitee repository metadata"
git push
```

打标签：

```powershell
git tag v1.1.16
git push origin v1.1.16
```

## 4. 创建市场索引

在仓库根目录创建：

```text
site/index.json
site/icons/dsh-card-workbench.svg
```

图标直接复制：

```powershell
New-Item -ItemType Directory -Force site\icons
Copy-Item icon.svg site\icons\dsh-card-workbench.svg
```

`site/index.json`：

```json
{
  "format": 1,
  "title": {
    "en": "Card Workbench",
    "zh": "卡片工坊"
  },
  "plugins": [
    {
      "name": "dsh-card-workbench",
      "title": {
        "en": "Card Workbench",
        "zh": "卡片工坊"
      },
      "description": {
        "en": "A card workbench that turns workspace conversations into tracked cards and runs them in the background.",
        "zh": "把工作区对话接管为卡片工坊，后台执行、盯办和核对。"
      },
      "icon": "icons/dsh-card-workbench.svg",
      "author": "<你的用户名>",
      "homepage": "https://gitee.com/<你的用户名>/dsh-card-workbench#readme",
      "repository": {
        "url": "https://gitee.com/<你的用户名>/dsh-card-workbench"
      },
      "metadata": {
        "category": "workflow"
      },
      "versions": [
        {
          "version": "1.1.16",
          "publishTimestamp": 1793325000,
          "source": {
            "type": "git",
            "url": "https://gitee.com/<你的用户名>/dsh-card-workbench",
            "commit": "<第 2 步 git rev-parse HEAD 的 40 位 SHA>"
          },
          "engines": {
            "dsh": ">=0.2.1-rc.2 <0.3.0-0"
          }
        }
      ]
    }
  ]
}
```

`publishTimestamp` 用当前 Unix 秒：

```powershell
[DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
```

提交：

```powershell
git add site
git commit -m "Add plugin market index"
git push
```

## 5. 开启 Gitee Pages

1. 打开 Gitee 仓库。
2. 「服务」→「Gitee Pages」。
3. 部署分支：`main`
4. 部署目录：`/site`
5. 勾选强制 HTTPS。
6. 启动/更新。

索引地址：

```text
https://<你的用户名>.gitee.io/dsh-card-workbench/index.json
```

如果是部署到仓库根目录，则索引地址可能是：

```text
https://<你的用户名>.gitee.io/dsh-card-workbench/site/index.json
```

以 Gitee Pages 页面显示的实际地址为准。

### 验证

```powershell
curl.exe -I https://<你的用户名>.gitee.io/dsh-card-workbench/index.json
```

必须：

```text
HTTP/1.1 200
Content-Type: application/json
```

且不能是 301/302 重定向。

Gitee Pages 可能需要实名认证；如果无法开启，改用任意 HTTPS 静态主机托管 `site/index.json` 和 `site/icons/` 即可。

## 6. 在 DSH 里添加索引

1. 打开「插件」。
2. 点击「发现」。
3. 「添加索引源」。
4. 输入索引 URL。
5. 搜索「卡片工坊」。
6. 安装。

安装时 DSH 会使用索引里的：

```json
"source": {
  "type": "git",
  "url": "https://gitee.com/<你的用户名>/dsh-card-workbench",
  "commit": "<40 位 SHA>"
}
```

因此 Gitee 仓库必须公开，且该 commit 必须存在。

## 7. 更新版本

以后发新版：

```powershell
# 修改 package.json version，例如 1.1.16
git add .
git commit -m "Release 1.1.16"
git tag v1.1.16
git push
git push origin v1.1.16
```

然后：

```powershell
git rev-parse HEAD
```

把 `site/index.json` 的版本、时间戳、commit 改为新值，推送并更新 Gitee Pages。

## 8. 常见问题

### Gitee 仓库是私有的

市场无法匿名拉取。仓库必须公开。

### Gitee Pages 无法开启

不必强求 Gitee Pages；把 `site/index.json` 和 `site/icons/` 放到任意 HTTPS 静态主机即可。

### 安装时提示找不到 commit

检查索引里的 `commit` 是否已推送到 Gitee：

```powershell
git ls-remote https://gitee.com/<你的用户名>/dsh-card-workbench.git
```

### 不想发布 npm

不需要。Gitee 的 Git 源已经足够安装。

### 没有 GitHub 是否影响

不影响自建市场索引。只有提交 `awesome-dsh-plugin` 时才可能受维护者偏好影响。

