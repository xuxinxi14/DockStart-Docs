---
title: "网站字体与第三方资源"
sidebar_position: 6
---

# 网站字体与第三方资源

本页记录帮助网站新增的视觉资源。DockStart 桌面程序的工具许可与分发说明请参阅[项目许可证说明](https://github.com/xuxinxi14/DockStart/blob/main/docs/license_notes.md)。

| 资源 | 用途 | 许可证 | 集成方式 | 是否内置 | 是否需要用户自行安装 |
| --- | --- | --- | --- | --- | --- |
| Noto Serif SC，700 字重 | 网站中文与英文标题 | SIL Open Font License 1.1 | 依据当前标题字符生成 WOFF2 子集，并随网站托管 | 帮助网站包含字体子集，不进入桌面程序安装包 | 否 |
| Docusaurus 主题图标 | 菜单、主题切换等标准控件 | MIT | 使用已安装的 Docusaurus 主题组件 | 随现有网站依赖提供 | 否 |
| AutoDock Vina 官方示例文件 | 各案例结构输入、准备结果与参考配置的来源 | 按官方仓库及文件自身声明 | 提供指向官方仓库的外部文件链接 | 否，不复制或随网站分发结构文件 | 用户按需下载 |

字体来源：[Google Fonts / Noto Serif SC](https://github.com/google/fonts/tree/main/ofl/notoserifsc)。完整版权声明与许可见[字体 OFL 文件](../static/fonts/OFL-NotoSerifSC.txt)。

字体子集覆盖本次网站标题使用的字符；没有覆盖的新字符会回退到本机宋体或衬线字体。维护者新增标题后，可执行 `python scripts/update-heading-font.py` 刷新子集。字体生成时需要网络，访问网站时无需连接 Google Fonts。

网站没有新增 npm 运行依赖；正文、程序截图与科研工具的许可证边界维持原有来源。
