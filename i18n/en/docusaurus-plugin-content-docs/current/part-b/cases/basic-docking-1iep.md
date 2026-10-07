---
title: "Basic Docking — 1IEP"
sidebar_position: 1
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Basic Docking — 1IEP {#basic-docking--1iep}

Practice a basic workflow with imatinib and the c-Abl kinase structure 1IEP: create a project, prepare structures, set the docking box, run and inspect results. For installation, start with [download and quick start](../../part-c/quick-start-v1-0-4.md).

## Official 3D structure files {#official-structure-files}

<OfficialExampleFiles example="basic"/>

## Example settings {#案例设置}

| Item | Value |
| --- | --- |
| Receptor | c-Abl kinase domain, PDB [1IEP](https://www.rcsb.org/structure/1IEP) |
| Ligand | Imatinib / Gleevec, extracted from the 1IEP crystal structure |
| Box center | `15.190, 53.903, 16.917` |
| Box dimensions | Official tutorial: `20 × 20 × 20 Å` |
| Official Vina reference | Best pose approximately **-13.23 kcal/mol** |

## Step 1: open Projects from Help {#第-1-步从帮助页进入项目}

![v1.0.4 Help page with suggested next actions and offline help](/img/releases/v1.0.4-help.png)

**Figure 1.** Help page.

Click Projects (「项目」) in the sidebar. You can also open the example entry (「打开示例入口」) to explore the interface.<NoteRef number={2}/>

## Step 2: create a project {#第-2-步新建项目选好三个东西}

![Project creation with Global Docking, project directory and receptor and ligand inputs](/img/cases/basic-docking-1iep/02-create-project.webp)

**Figure 2.** Create project.

Choose Global Docking (「全局对接」), a project name and a writable directory. Select `1iep_receptorH.pdb` and `1iep_ligand.sdf`, or import the two prepared PDBQT files. Use Assisted preparation when starting from PDB/SDF.

## Step 3: check prepared PDBQT files {#第-3-步确认-pdbqt-准备结果}

![PDBQT preparation with both inputs ready and a ligand review warning](/img/cases/basic-docking-1iep/03-prepare-pdbqt.webp)

**Figure 3.** Structure preparation.

Convert both inputs and confirm the two file checks pass. Skip conversion for prepared PDBQT. For warnings, open the complete ligand review (「查看配体完整结构审查」) and check protonation, charge and chirality. Repair missing receptor atoms near the binding site before continuing.

## Step 4: use standard preparation and continue {#第-4-步大环准备策略--设置搜索范围}

![Standard ligand preparation and the button to set the search region](/img/cases/basic-docking-1iep/04-macrocycle-search-range.webp)

**Figure 4.** Lower part of the preparation page.

For imatinib, select Standard Preparation (「标准准备」). When both inputs are ready, click Set Search Region (「设置搜索范围」).

## Step 5: set the docking box {#第-5-步设定-grid-box搜索范围}

![3D docking box with center and dimensions and preflight checks](/img/cases/basic-docking-1iep/05-set-grid-box.webp)

**Figure 5.** Run workbench.

Enter the values and confirm the box covers the intended site in 3D.

| Axis | Center (Å) | Dimension (Å) |
| --- | --- | --- |
| X | `15.190` | `20` |
| Y | `53.903` | `20` |
| Z | `16.917` | `20` |

The screenshot uses `20.25`; enter `20` when following the official example.<NoteRef number={2}/>

## Step 6: enter Vina parameters {#第-6-步填写-vina-参数}

![Vina run settings and the Start Docking button](/img/cases/basic-docking-1iep/06-set-vina-parameters.webp)

**Figure 6.** Inputs, parameters and output.

Save these settings and click Recheck (「重新检查」). The official example recommends `32` for imatinib's more demanding search.

| Parameter | Suggested value |
| --- | --- |
| Scoring | `Vina` |
| Exhaustiveness | `32` |
| Num Modes | `9` |
| Energy Range | `3 kcal/mol` |
| CPU | `0` (automatic) |
| Seed | Blank; use the same integer for repeated comparisons |

Resolve blocking checks, then click Start Docking (「开始对接」).

## Step 7: keep the receptor rigid {#第-7-步选择对接方式受体柔性}

![Rigid receptor with flexible ligand and the run history](/img/cases/basic-docking-1iep/07-flexibility-and-history.webp)

**Figure 7.** Receptor flexibility and history.

Keep Rigid Receptor + Flexible Ligand (「刚性受体 + 配体柔性」). After completion, select this Vina run in the history and open View Results (「查看结果」).

## Step 8: inspect Vina poses in run_001 {#第-8-步看结果vina-的构象列表run_001}

![Vina run_001 poses with a Mode 1 score of -12.58 kcal/mol](/img/cases/basic-docking-1iep/08-result-vina-poses.webp)

**Figure 8.** `run_001`, Vina results.

Confirm the run ID and scoring function before inspecting poses. This historical Mode 1 scored **-12.58 kcal/mol**, compared with the official reference of about **-13.23 kcal/mol**.<NoteRef number={3}/>

Export SDF for other viewers. To compare with the crystal ligand, use Select Reference Ligand and Calculate (「选择参考配体并计算」).

## Step 9: inspect the score table {#第-9-步看结果vina-的评分表run_001}

![scores.csv with nine candidate scores and RMSD columns](/img/cases/basic-docking-1iep/09-result-vina-scores.webp)

**Figure 9.** Scores (「评分」) tab.

Use the score tab for values and Run Logs and Files (「运行日志与文件」) for original records.

| Mode | Score (kcal/mol) | RMSD l.b. (Å) | RMSD u.b. (Å) |
| --- | --- | --- | --- |
| 1 | -12.58 | 0 | 0 |
| 2 | -10.89 | 3.036 | 12.39 |
| 3 | -10.56 | 3.791 | 12.15 |
| 4 | -9.659 | 2.477 | 12.41 |
| 5 | -9.322 | 2.929 | 12.48 |
| 6 | -8.199 | 1.742 | 13.35 |
| 7 | -8.022 | 3.949 | 6.605 |
| 8 | -6.772 | 2.832 | 13.19 |
| 9 | -5.283 | 6.395 | 7.85 |

RMSD columns compare each mode with Mode 1, hence its zero values. Loadable pose counts come from the output file. See [RMSD](../../part-a/understanding-results/rmsd.md) and [Energy Range](../../part-a/search-and-parameters/energy-range.md).

## Continue reading {#继续阅读}

- [Box and Maps FAQ](../../part-c/faq-box-and-maps.md)
- [Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- [Interpreting results](../../part-c/interpreting-results.md)
- [Why results differ](../../part-c/why-results-differ.md)
- [The AD4 maps branch](./autodock4-maps-workflow.md)

<DocNotes example="basic">
<DocNote number={2} title="Versions and screenshots">

Figure 1 is from v1.0.4. Figures 2 onward and their scores are historical v1.0.3 records, not a new v1.0.4 validation. Screenshots show the Chinese interface; use the current interface for button placement. Figure 2 uses `demo_project`; later figures use `box1`. Local paths are masked.

The historical Vina run used a `20.25 × 20.25 × 20.25 Å` box, exhaustiveness `8` and a seed. This guide recommends the official box `20` and exhaustiveness `32`. Help suggestions depend on project/toolchain state; question-mark help is offline, while online docs need a connection.

</DocNote>
<DocNote number={3} title="Historical results and official references">

| Run | Scoring | Historical best | Official reference | Exhaustiveness |
| --- | --- | --- | --- | --- |
| `run_001` | Vina | **-12.58** | About **-13.23** | 8; official recommendation 32 |
| `run_002` | AutoDock4 maps | **-14.7133** | About **-14.72** | 8 |
| `run_003` | AutoDock4 maps | **-14.7279** | About **-14.72** | 32; AD4 worked example |

Search effort, box, preparation and seed can affect results. Score differences alone do not identify the cause or guarantee exact reproduction after changing settings. Check score rows and saved `out.pdbqt` models separately.

</DocNote>
<DocNote number={4} title="AD4 runs in the same project">

Figures 10–11 belong to the separate AD4 `run_002`. Follow [AutoDock4 Maps](./autodock4-maps-workflow.md) for that workflow. AD4 and Vina/Vinardo scores are not directly comparable.

![AD4 run_002 pose list and scoring-protocol banner](/img/cases/basic-docking-1iep/10-result-ad4-poses.webp)

**Figure 10.** AD4 poses.

![AD4 run_002 score table](/img/cases/basic-docking-1iep/11-result-ad4-scores.webp)

**Figure 11.** The header identifies AutoDock4 scoring.

| Mode | AD4 score (kcal/mol) | RMSD l.b. (Å) | RMSD u.b. (Å) |
| --- | --- | --- | --- |
| 1 | -14.7133 | 0 | 0 |
| 2 | -11.8242 | 1.1474 | 1.5922 |
| 3 | -11.7852 | 4.9399 | 11.4034 |
| 4 | -11.2658 | 3.9539 | 11.9977 |
| 5 | -10.7951 | 1.723 | 2.6179 |
| 6 | -9.972 | 1.9672 | 13.4634 |
| 7 | -9.7896 | 2.9273 | 12.1557 |
| 8 | -9.6593 | 2.5074 | 12.3973 |
| 9 | -8.7951 | 2.73 | 12.8242 |

</DocNote>
<DocNote number={5} title="Using the results">

Docking scores indicate modeled binding trends and cannot replace experimental validation. Review prepared structures manually; a score close to the reference does not by itself validate the pose.

</DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina, Basic Docking tutorial: 1IEP/imatinib, box settings, AD4/Vina results and exhaustiveness.
2. RCSB PDB [1IEP](https://www.rcsb.org/structure/1IEP).
3. Official tutorial sections *4.a Using AutoDock4 forcefield*, *4.b Using Vina forcefield*, and *5. Expected results*.
4. DockStart workbench, preflight checks and result pages: screenshot sources.

</details>
