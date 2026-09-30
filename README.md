# DockStart 帮助文档

中文 Docusaurus 文档站，包含分子对接入门、DockStart 实战案例、排错与附录。

## 首次发布到 GitHub Pages

1. 在 GitHub 账号 `xuxinxi14` 下创建公开仓库 `DockStart-Docs`，默认分支为 `main`。
2. 将本目录的全部源码提交到仓库根目录。必须包含 `.github/workflows/deploy-pages.yml` 和 `.gitignore`。
3. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
4. 在 **Actions** 中打开 **Deploy documentation to GitHub Pages**，点击 **Run workflow**，选择 `main` 并运行。
5. 工作流成功后，打开 `https://xuxinxi14.github.io/DockStart-Docs/`。该地址在首次部署成功之前不会有此站点。

发布流程使用仓库自带的 GITHUB_TOKEN，不需要填写个人访问令牌。
每次向 main 提交更新，工作流会重新检查、构建并发布。

如果仓库名不是 `DockStart-Docs`，请同步修改 `docusaurus.config.ts` 中的 `baseUrl` 和 `projectName`。
如果 GitHub 用户名变了，请同步修改 `url` 和 `organizationName`。

## 用 Git 提交源码

在包含本 README 的目录内执行（仓库尚为空）：

```sh
git init -b main
git add .
git commit -m "Add DockStart documentation website"
git remote add origin https://github.com/xuxinxi14/DockStart-Docs.git
git push -u origin main
```

Git push 使用你本机已登录的 GitHub 凭据。也可以通过 GitHub Desktop 导入并发布这个目录。
不要只上传 ZIP 文件本身；GitHub 需要解压后的源码。

## 本地编辑

需要 Node.js 22 和 npm。

```sh
npm ci
npm start
```

验证生产构建：

```sh
npm run check
npm run typecheck
npm run build
npm run serve
```

文档在 `docs/`，页面在 `src/pages/`，图片在 `static/img/`。
源码包不包含依赖、构建输出或原托管平台配置。

## 图片加载与网络波动

正文图片在接近阅读位置时开始加载，并显示加载状态。请求失败或超过 25 秒仍未完成时，最多自动重试两次；继续失败会提供“重新加载图片”和“打开原图”入口。

如果网络恢复后仍无法显示，可先点击“重新加载图片”；若连原图也打不开，请检查当前网络或浏览器的图片访问设置。更新发布后可用 `Ctrl + F5` 刷新页面以获取新版本。重试机制无法消除托管服务与当前网络之间的连接问题。

## 在 DockStart 中添加入口

网站发布成功后，把“在线帮助”按钮的目标地址设为：

`https://xuxinxi14.github.io/DockStart-Docs/`

通过 DockStart 现有的外部链接打开方式在系统浏览器中打开。具体文章也可以直接链接，例如：

`https://xuxinxi14.github.io/DockStart-Docs/docs/intro/what-docking-can-do/`

网站更新不要求重新打包 DockStart，链接地址保持不变即可。
