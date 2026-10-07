---
title: "v1.0.4 Download and Quick Start"
sidebar_position: 0
sidebar_label: "Download and quick start"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# v1.0.4 Download and Quick Start {#v104-下载与快速开始}

DockStart is a local molecular docking workbench built around AutoDock Vina. This guide uses the **v1.0.4 Assisted trial for Windows 10/11 x64**.<NoteRef number={1}/>

## 1. Download and verify {#1-下载与校验}

Download `DockStart_1.0.4_Assisted_x64-setup.exe` from the [project's v1.0.4 release](https://github.com/xuxinxi14/DockStart/releases/tag/v1.0.4). Verify its SHA256 before installing.

The installer is unsigned, so Windows may show an unknown publisher. Check the source and hash; keep your security software enabled.

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath .\DockStart_1.0.4_Assisted_x64-setup.exe
```

Expected SHA256:

```text
c495a08184817aa1619116957def9d0d3b30dc9e2d469e638e04565b95253ee2
```

After installation, open Toolchain (「工具链」) and run detection. Ordinary Vina docking uses the bundled tools; you do not need to install Python, RDKit or AutoGrid4 separately.

## 2. Explore an example first {#2-先用示例熟悉操作}

![The v1.0.4 Help and getting started page](/img/releases/v1.0.4-help.png)

In Help, open the example entry (「打开示例入口」) and copy an example to a writable folder of your own. Examples with saved results introduce poses and reports; a small docking example lets you practice setup and execution.

## 3. Create your own project {#3-创建自己的项目}

Open Projects (「项目」) and choose a separate project directory. Import prepared receptor and ligand PDBQT files directly, or prepare a receptor from PDB/CIF and a ligand from SDF/MOL/single-molecule MOL2. See [supported formats](../appendix/supported-formats.md) for restrictions.

After preparation, review protonation, charges, chirality, missing residues, waters, metals and chain selection. If preparation fails, follow the error message or prepare PDBQT externally and import it.

## 4. Set the docking box and parameters {#4-设置对接箱体与参数}

For your first exercise, use the [1IEP example](../part-b/cases/basic-docking-1iep.md). With your own structure, locate the site using a co-crystal ligand or literature, then check in 3D that the box covers it. Select ordinary Vina Global Docking, save the settings and run the checks again.

## 5. Run and save {#5-运行与保存}

Resolve the preflight blockers, then start docking. Inspect the poses and scores when the run finishes, and export CSV and a Markdown record.<NoteRef number={2}/>

## 6. Read next {#6-接着读什么}

- [Complete 1IEP example](../part-b/cases/basic-docking-1iep.md): follow the screenshots through a run.
- [Installation, updates and data safety](./install-update-data-safety.md): back up and upgrade projects.
- [Structure preparation FAQ](./faq-structure-preparation.md) and [common errors](./common-errors-and-recovery.md).

<DocNotes>

<DocNote number={1} title="Release and download details">

The public v1.0.4 download is the Assisted EXE, **74,017,034 bytes**. It also accepts existing PDBQT files. Basic and MSI builds are not public downloads for this release. Full installation, upgrade, uninstall, GUI and scientific release acceptance remain pending; see the [release notes and validation record](https://github.com/xuxinxi14/DockStart/blob/main/docs/release/v1_0_4_release_notes.md).

This page shows the v1.0.4 Help screen. Historical screenshots and run sources are documented in the notes of each example. Bundled examples teach the workflow.

</DocNote>

<DocNote number={2} title="Structures and results">

Passing tool detection does not guarantee preparation of every input. Review prepared structures manually. Locate receptor (「定位到受体」) adjusts the geometric view and does not predict a binding pocket. DockStart saves input snapshots, configuration, tool versions, commands and logs for review.

RMSD l.b./u.b. in the score table refers to Mode 1 of the current run. Comparison with an experimental co-crystal pose needs a separate validation; see [interpreting results](./interpreting-results.md).

Docking scores indicate modeled binding trends and cannot replace experimental validation. A lower score does not establish binding, efficacy, safety or clinical value.

</DocNote>

</DocNotes>
