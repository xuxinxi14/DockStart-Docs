# DockStart 帮助网站设计验收

日期：2026-10-02。范围：已批准的第二版 UI，以及本次新增的官方结构下载区。

## 视觉依据与环境

- 首页参考：`output/playwright/ui-proposal-2026-10-01-v2/01-home.png`。
- 文章页参考：`output/playwright/ui-proposal-2026-10-01-v2/02-article-desktop.png`。
- 两张参考都是 1488 × 1056 像素；设计画布没有浏览器外框。
- 实现：Microsoft Edge，桌面 1440 × 1024 CSS px，截图密度 1；移动端 390 × 844，另检查 320 和 768 宽度。
- 对比板将参考等比缩放到 1440 像素宽，与同尺寸的浏览器截图并排。约 2 px 的高度差保留空白，不拉伸图像。
- 首页状态：浅色主题、首页顶端、真实案例缩略图已加载。
- 文章顶端新增下载区，保留原文完整介绍。效果图示意的“文章标题与第 4 步同屏”不对应原文实际顺序，不能为了匹配图而删除中间内容。因此另捕获第 4 步并对齐标题与截图区域。

## 完整与局部对比证据

- `output/playwright/compare-home-v2.png`：首页完整并排对比。
- `output/playwright/compare-home-v2-focus.png`：首页标题、字体、搜索和入口的局部对比。
- `output/playwright/compare-article-v2.png`：文章页三栏结构与新增下载区。
- `output/playwright/compare-article-v2-focus.png`：第 4 步标题、真实程序截图与图注的局部对比。
- 最终浏览器截图：`implemented-v2-home-final.png`、`implemented-v2-article-top-final.png`、`implemented-v2-article-step4-final.png`、`implemented-v2-mobile-home-final.png`、`implemented-v2-mobile-article-final.png`、`implemented-v2-mobile-menu-final.png`，均位于 `output/playwright/`。

## 五项验收

1. 字体：自托管 Noto Serif SC 700 字重用于标题，正文和控件使用系统无衬线。Edge 的平台字体检查确认正文实际使用 Microsoft YaHei。标题字体成功加载，有系统衬线回退；品牌名使用 Georgia。
2. 留白和比例：首页为文档索引与案例侧栏，文章为导航、正文、页内目录。去掉卡片、重阴影和大圆角；非当前章节收起。四种宽度均无页面横向溢出。
3. 配色：暖白、墨色、灰色分隔线与少量深绿。深色模式沿用相同层级与低饱和色，不恢复旧霓彩主题。正文代码块与当前主题一致。
4. 图像：使用原有 WebP 程序截图；文章保持原始宽高比例和标注。首页只裁切缩略图。生成效果图的重绘截图与文字不能作为科研内容来源，未被加入生产网站。截取图片状态时等待图片解码与两次绘制帧，避免将截图时序造成的空白误判为用户页面状态。
5. 内容：正文参数、分数和科学限制保留；仅简化导航标签、将案例摘要作为导语，新增官方文件获取区和字体许可说明。官方文件用途区分原始结构、准备后结构及参考结果，批量与 AD4Zn 的状态说明保留。

## 比较历史

初次比较发现的 P2：
- 首页部分目录项换行，右侧案例栏比例不符：调整列宽、采用按内容分配的行内链接布局，保持桌面项目单行。
- 标题视觉字重偏薄：将字体子集与标题字重统一为 700。
- 左侧目录展开过多、字母前缀增加噪声：收起非当前章节，简化 sidebar_label，保留正文中的原有章节说明。
- 浅色正文仍显示旧深色代码块：配置亮暗两套 Prism 主题并统一代码块背景。
- 缺少“本页目录”标题：增加页内目录标题与克制的当前项标记。

以上修正后重新构建、重拍并检查完整和局部对比板。没有剩余的 P0/P1/P2 项。

P3 / 有意保留的差异：
- 搜索栏使用明确的“搜索”按钮；导航保留全站搜索入口。
- 页面高度与系统字体度量略有差异；实际正文和目录更长，保留真实内容。
- 使用已有 Docusaurus 标准菜单、主题、返回顶部图标。
- 移动端效果来自同一套响应式规则，第二版没有单独批准的移动端效果图。

## 功能与验证

- `npm run typecheck`、`node scripts/check-docs.mjs --quiet`、`npm run build` 通过。
- 28 项浏览器检查通过：搜索提交与筛选、八个主题的下载表与路径、页内下载目录、侧栏键盘调整、主题切换与保存、移动端菜单、四种宽度、图片自动与手动重试。
- 浏览器没有意外控制台错误或 pageerror；四次 ERR_FAILED 为主动模拟图片请求失败。
- 官方仓库目录树及 27 个不同下载链接均验证通过；记录见 `output/playwright/official-files-validation.json`。目录树 SHA：`3c65c0b3e6c2c1d183f6a175ecb65e3c5ba91645`。
- 浏览器功能证据见 `output/playwright/browser-validation-v2.json`。
- 最后调整的两个首页入口分别打开正确的“分子对接能做什么”和“AutoDock Suite、AutoDock Vina 与 DockStart”文章，已在浏览器点击确认。
- 对照修改前提交核对了 35 篇已有文章，除导航标签、摘要展示方式与新增下载区外，原有科学正文完整保留。

## 后续维护

新增标题后运行 `python scripts/update-heading-font.py` 更新字体字符子集。官方下载链接跟随 develop 分支，复现时记录下载日期和输入校验值。

final result: passed
