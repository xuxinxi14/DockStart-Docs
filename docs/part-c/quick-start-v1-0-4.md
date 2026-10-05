---
title: "v1.0.4 下载与快速开始"
sidebar_position: 0
sidebar_label: "v1.0.4 下载与快速开始"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# v1.0.4 下载与快速开始

DockStart 是基于 AutoDock Vina 的中文本地对接工作台。本文使用 **Windows 10/11 x64 的 v1.0.4 Assisted 试用版**。<NoteRef number={1}/>

## 1. 下载与校验

从 [官方 v1.0.4 Release](https://github.com/xuxinxi14/DockStart/releases/tag/v1.0.4) 下载 `DockStart_1.0.4_Assisted_x64-setup.exe`，安装前核对 SHA256。

安装包未做数字签名，Windows 可能提示未知发布者。核对来源和哈希，不需要关闭安全软件：

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath .\DockStart_1.0.4_Assisted_x64-setup.exe
```

期望 SHA256：

```text
c495a08184817aa1619116957def9d0d3b30dc9e2d469e638e04565b95253ee2
```

安装后打开「工具链」并检测。普通 Vina 对接使用随包工具，无需另装 Python、RDKit 或 AutoGrid4。

## 2. 先用示例熟悉操作

![v1.0.4 实际帮助与入门页](../../static/img/releases/v1.0.4-help.png)

在帮助页点击「打开示例入口」，把示例复制到自己的可写目录。已有结果示例可用于认识构象与报告；小型对接示例可练习设置与运行。

## 3. 创建自己的项目

左侧进入「项目」，指定独立保存目录。已有受体/配体 PDBQT 可直接导入；原始受体接受 PDB/CIF，配体接受 SDF/MOL/单分子 MOL2，具体限制见 [支持格式表](../appendix/supported-formats.md)。

转换后检查质子化、电荷、手性、缺失残基、水、金属与链选择。若准备失败，按中文错误提示修正结构，或在外部准备 PDBQT 后导入。

## 4. 设置对接箱体与参数

第一次练习可按 [1IEP 案例](../part-b/cases/basic-docking-1iep.md) 填写箱体和参数。使用自己的结构时，根据共晶配体或文献定位目标位点，在三维视图中确认箱体覆盖它。选择普通 Vina 全局对接，保存参数并重新检查。

## 5. 运行与保存

解决运行前的阻塞项后，点击开始对接。结束后查看构象与评分，导出 CSV 和 Markdown 实验记录。<NoteRef number={2}/>

## 6. 接着读什么

- [1IEP 完整案例](../part-b/cases/basic-docking-1iep.md)：跟着截图完成一次对接。
- [安装、更新与数据安全](./install-update-data-safety.md)：升级与备份项目。
- [结构准备 FAQ](./faq-structure-preparation.md) 与 [常见错误](./common-errors-and-recovery.md)。

<DocNotes>

<DocNote number={1} title="版本与下载说明">

v1.0.4 本次公开下载仅有 Assisted EXE，大小为 74,017,034 bytes；已有 PDBQT 可直接使用。Basic / MSI 未作为公开下载。完整安装、升级、卸载、GUI 和科学发布验收仍待完成，详见 [发布说明与验证记录](https://github.com/xuxinxi14/DockStart/blob/main/docs/release/v1_0_4_release_notes.md)。

本页帮助截图来自 v1.0.4；案例页的历史截图与运行来源见各页注释。内置示例用于学习操作。

</DocNote>

<DocNote number={2} title="结构与结果说明">

工具检测通过不保证每个输入都能准备成功。自动准备后仍需人工检查结构；「定位到受体」仅调整几何视角，不会预测结合口袋。软件保存输入快照、配置、工具版本、命令与日志，便于复查。

评分表的 RMSD l.b./u.b. 相对本次 Mode 1。与实验共晶结构比较时，需另做姿势验证，详见 [如何解读结果](./interpreting-results.md)。

Docking score 仅供结构结合趋势参考，不能替代实验验证。更低分数不能证明真实结合、药效、安全性或临床价值。

</DocNote>

</DocNotes>
