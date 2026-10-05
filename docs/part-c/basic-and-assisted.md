---
title: "Basic 与 Assisted"
sidebar_position: 1
sidebar_label: "Basic 与 Assisted"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Basic 与 Assisted

Basic 用于已有 PDBQT 的对接；Assisted 额外提供结构准备工具，可以从原始结构生成 PDBQT。

## 现在下载哪个

当前公开下载为 **v1.0.4 Assisted 试用包**。已有 PDBQT 也可直接使用，安装步骤见 [下载与快速开始](./quick-start-v1-0-4.md)。<NoteRef number={1}/>

## 两者有什么区别

| 功能 | Basic | Assisted |
| --- | --- | --- |
| 导入 PDBQT 并运行对接 | 支持 | 支持 |
| 准备受体 PDB/CIF | 需外部工具 | 随包提供准备工具 |
| 准备配体 SDF/MOL/单分子 MOL2 | 需外部工具 | 随包提供准备工具 |
| AutoDock Vina | 随包提供 | 随包提供 |
| RDKit / Meeko | 不随包提供 | 随包提供 |
| AutoDock4 maps | 需自行配置 AutoGrid4 | 需自行配置 AutoGrid4 |

## 安装后怎么开始

1. 打开「工具链」并检测。使用已有 PDBQT 时，确认 Vina 可用；从原始结构开始时，还需准备工具链可用。
2. 打开示例熟悉流程，或在「项目」中导入自己的结构。
3. 转换后检查质子化、电荷、手性及受体缺失原子，再设置对接箱体并运行。

若界面显示的可用模式与安装包名称不同，查看工具链检测结果。<NoteRef number={2}/>

## 相关页面

- [工具链](./toolchain.md)：检测工具与修复缺失项。
- [结构准备 FAQ](./faq-structure-preparation.md)：转换失败和结构检查。
- [1IEP 基础案例](../part-b/cases/basic-docking-1iep.md)：完成一次对接。

<DocNotes>

<DocNote number={1} title="发布档位与版本状态">

Basic 与 Assisted 是构建档位，不表示版本成熟度。v1.0.4 本次只公开 Assisted EXE；Basic / MSI 未作为公开下载。完整安装、GUI 与科学发布验收仍待完成，详见 [发布说明](https://github.com/xuxinxi14/DockStart/blob/main/docs/release/v1_0_4_release_notes.md)。两种构建共用应用身份，不能并行安装；换用另一档位前需备份项目并卸载原有版本。

</DocNote>

<DocNote number={2} title="可用模式如何判定">

可用模式由工具链检测决定：Vina 可用时支持 Basic 流程；Vina、Python、RDKit 与 Meeko 均可用时支持 Assisted 流程。即使安装的是 Basic，配置兼容的外部准备工具链后也可能显示 Assisted 可用。

软件保存输入快照、配置、工具版本、日志和结果记录；这些记录用于复现与排错，不代替结构检查。内置示例用于操作教学。

Docking score 仅供结构结合趋势参考，不能替代实验验证。

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart `backend/dockstart_core/capabilities.py`、`toolchain.py`：模式与工具链检测。
2. DockStart `docs/release/release_artifact_profile.md`：发布档位。
3. DockStart `docs/demo_projects.md`：示例项目。

</details>
