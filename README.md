# DockStart 帮助文档

中英双语 Docusaurus 文档站，包含分子对接入门、DockStart 实战案例、排错与附录。

站点已部署：[在线文档](https://xuxinxi14.github.io/DockStart-Docs/)。当前下载与使用基准为 [v1.0.4 Assisted 试用包](https://github.com/xuxinxi14/DockStart/releases/tag/v1.0.4)；软件代码、版本与安装包由主仓库维护。

## 首次部署配置（维护参考）

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

## 中英切换与翻译维护

导航栏提供「中文 / English」切换；手机端位于菜单中的语言选项。中文地址保持不变，英文首页为 [English documentation](https://xuxinxi14.github.io/DockStart-Docs/en/)。切换保留当前文章、章节锚点和搜索词。

中文正文在 `docs/`，英文正文在 `i18n/en/docusaurus-plugin-content-docs/current/`，两者使用相同文件名与文档 ID。英文标题使用与中文对应的显式锚点，保证切换后仍能定位当前章节。新增或修改章节时需同步两种语言的标题顺序和锚点。

确认两种语言的章节已一一对应后，可运行 `node scripts/check-i18n.mjs --sync-heading-ids` 同步英文显式锚点；它只修改英文标题，并检查图片、注释与路由的一致性。

目录、导航和 Docusaurus 控件的翻译在 `i18n/en/` 的 JSON 文件中；自定义首页、搜索和共享组件使用 `src/components/useGuideLocale.ts`。程序截图共用原图，英文说明标注必要的中文界面名称。官方结构下载与来源清单共用，避免两种语言指向不同文件。

```sh
npm start -- --locale en
```

生产环境使用 `npm run build` 同时构建两种语言，随后 `npm run serve` 验证切换；单语言开发服务器仅用于查看对应语言。`prebuild` 自动生成中英两份搜索索引。`npm run check` 检查两种文档结构、页面覆盖、排序、图片与注释的一致性。

## UI 与官方示例文件

网站默认使用暖白背景、墨色正文、衬线标题和克制的深绿强调。右上角可切换浅色或深色主题；左侧目录仍支持拖动、键盘调整宽度。

八个案例主题提供 AutoDock Vina 官方 GitHub 文件的查看与下载链接，区分原始结构、准备后的 PDBQT 和参考结果。批量主题明确说明复用 5X72 输入；AD4Zn 主题保持未完成 DockStart 实测验证的状态。文件链接固定到官方提交，复现时应同时记录版本与输入校验值，详见文末维护说明。

标题字体随网站自托管，无需访问外部字体 CDN。新增标题后运行 `python scripts/update-heading-font.py` 更新字符子集；字体来源、许可、SHA256 与大小记录在 `static/fonts/`，第三方资源说明见 `docs/license_notes.md`。

## 入门交互演示

入门和基础原理的 17 篇文章提供十种交互演示：配体平移/朝向/内部扭转、箱体中心与完整边长、独立搜索与随机种子、Num Modes 与 Energy Range 的输出筛选，以及局部接触几何、构象与手性、局部柔性、Grid / Maps、距离与评分曲线、固定参考下的 RMSD。组件和纯数值模型在 `src/components/interactive/`，中英界面使用同一模型，不增加外部依赖。

演示默认静止，由滑块或播放控件驱动。搜索支持暂停、单步与重置，离开可见区域或后台标签页时暂停；开启系统“减少动态效果”后保留单步查看。所有控件支持键盘，示意方式与实现限制放在文章底部的编号注释中。

图形与操作区按演示的实际宽度自适应：宽屏并排，窄屏上下排列。调整排版时连同正文、侧栏一起截图，检查中英标题换行、滑块对齐和 320 像素窄屏下的表格；不能只检查单独的组件截图。

`npm run check` 包含 `scripts/interactive.test.mjs` 的数值验证与中英组件配置一致性检查。修改模型时确认几何不变量、箱体单位、能量窗口边界、随机种子的可复现性、手性保持与镜像反转、网格采样和固定对应的 RMSD。搜索、Map 与评分曲线采用教学模型，不能将其路径或数值解释为实际 Vina 计算结果。

## 图片加载与网络波动

正文图片在接近阅读位置时开始加载，并显示加载状态。请求失败或超过 25 秒仍未完成时，最多自动重试两次；继续失败会提供“重新加载图片”和“打开原图”入口。

如果网络恢复后仍无法显示，可先点击“重新加载图片”；若连原图也打不开，请检查当前网络或浏览器的图片访问设置。更新发布后可用 `Ctrl + F5` 刷新页面以获取新版本。重试机制无法消除托管服务与当前网络之间的连接问题。

## 在 DockStart 中添加入口

网站发布成功后，把“在线帮助”按钮的目标地址设为：

`https://xuxinxi14.github.io/DockStart-Docs/`

通过 DockStart 现有的外部链接打开方式在系统浏览器中打开。具体文章也可以直接链接，例如：

`https://xuxinxi14.github.io/DockStart-Docs/docs/intro/what-docking-can-do/`

网站更新不要求重新打包 DockStart，链接地址保持不变即可。

## v1.0.4 文档维护

下载入口与快速开始对应实际公开 Assisted EXE；历史案例截图明确标注 v1.0.3，不追认为当前包的验收。官方示例下载固定到 `src/data/officialExamples.ts` 的提交，`static/example-inputs-manifest.json` 保存文件大小和 SHA256。更新来源时需同时核对链接和清单。

## 正文与页底注释

正文优先写操作、参数和成功状态。输入角色、结构审查、协议选择、备份等直接影响下一步的提醒，放在对应步骤旁；版本差异、截图来源、详细结果对照和实现细节，放到页底 `DocNotes` 编号注释，默认折叠。需要关联正文时使用 `NoteRef`；点击或直接访问注释链接会展开对应区域。

概念页保留主题所需的科学限制，避免重复首段与页末总结。维护示例文件时，`instruction` 是正文操作提示，`note` 是页底来源说明，两者分别编辑。不要把未验证案例写成已验证，也不要以分数接近代替构象验证。
