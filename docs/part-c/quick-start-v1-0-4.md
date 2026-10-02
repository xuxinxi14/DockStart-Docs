---
title: "v1.0.4 下载与快速开始"
sidebar_position: 0
sidebar_label: "v1.0.4 下载与快速开始"
---

# v1.0.4 下载与快速开始

DockStart 是基于 AutoDock Vina 的中文本地对接工作台。当前公开包为 **Windows 10/11 x64、Assisted EXE 试用版**，完整安装/升级/卸载、桌面 GUI 和全部科学发布门禁仍待完成。

## 1. 下载与校验

从 [官方 v1.0.4 Release](https://github.com/xuxinxi14/DockStart/releases/tag/v1.0.4) 下载 `DockStart_1.0.4_Assisted_x64-setup.exe`（74,017,034 bytes）。当前没有公开的 Basic / MSI 下载；已有 PDBQT 可直接使用 Assisted。

安装包未做数字签名，Windows 可能提示未知发布者。核对来源和哈希，不需要关闭安全软件：

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath .\DockStart_1.0.4_Assisted_x64-setup.exe
```

期望 SHA256：

```text
c495a08184817aa1619116957def9d0d3b30dc9e2d469e638e04565b95253ee2
```

安装后先打开工具链检测。普通 Vina 对接使用随包工具，不需要自己安装系统 Python、RDKit 或 AutoGrid4。Assisted 随附准备工具，可尝试从原始结构生成 PDBQT；工具检测通过不代表每个结构都能自动准备成功。

## 2. 先用示例熟悉操作

![v1.0.4 实际帮助与入门页](../../static/img/releases/v1.0.4-help.png)

在帮助页点击「打开示例入口」，进入「示例项目（快速体验）」，把示例复制到自己的可写目录。已有结果示例用于认识构象和报告；小型对接示例用于体验设置与运行，不是科研准确率证据。

## 3. 创建自己的项目

左侧进入「项目」，指定独立保存目录。已有受体/配体 PDBQT 可直接导入；原始受体接受 PDB/CIF，配体接受 SDF/MOL/单分子 MOL2，具体限制见 [支持格式表](../appendix/supported-formats.md)。

转换后检查质子化、电荷、手性、缺失残基、水、金属及链选择。若准备失败，阅读中文错误和原始日志，修正结构或在外部准备 PDBQT 后再导入。

## 4. 设置对接箱体与参数

依据共晶配体、实验或文献确定搜索范围；「定位到受体」只是几何定位，不会预测结合口袋。检查中心、尺寸、评分方式、搜索彻底程度和随机种子。第一次运行使用普通 Vina 全局对接；AutoGrid4 缺失不会阻塞这一流程。

## 5. 运行与保存

查看运行前检查，解决阻塞项后运行。软件保存输入快照、配置、工具版本、命令与日志；结束后查看构象和评分，导出 CSV 与 Markdown 实验记录。

评分表中的 RMSD l.b./u.b. 相对本次 Mode 1，不是与实验结构的验证 RMSD。

## 6. 接着读什么

- [1IEP 完整案例](../part-b/cases/basic-docking-1iep.md)：历史 v1.0.3 操作与结果明确标注，第一张入口截图已更新为 v1.0.4。
- [安装、更新与数据安全](./install-update-data-safety.md)：备份整个项目目录；当前没有自动更新。
- [结构准备 FAQ](./faq-structure-preparation.md) 与 [常见错误](./common-errors-and-recovery.md)。
- [完整发布说明和验证记录](https://github.com/xuxinxi14/DockStart/blob/main/docs/release/v1_0_4_release_notes.md)：保留历史候选构建事实和未完成项。

**Docking score 仅供结构结合趋势参考，不能替代实验验证。** 更低分数不能证明真实结合、药效、安全性或临床价值。
