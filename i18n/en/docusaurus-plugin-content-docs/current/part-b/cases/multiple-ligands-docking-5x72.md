---
title: "Multiple Ligands Docking — 5X72"
sidebar_label: "Multiple Ligands — 5X72"
sidebar_position: 4
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Multiple Ligands Docking — 5X72 {#multiple-ligands-docking--5x72}

Search P59 and P69 together in one docking calculation. Each pose contains both ligands and has one joint score. For independent ligand ranking, use [batch screening](./batch-docking.md).

## Official 3D structure files {#official-structure-files}

<OfficialExampleFiles example="multiple"/>

## Example settings {#案例设置}

| Item | Value |
| --- | --- |
| Receptor | PDE, PDB [5X72](https://www.rcsb.org/structure/5X72) |
| Ligands | P59 and P69, two stereoisomeric inhibitors |
| Box center | `-15, 15, 129` |
| Box dimensions | `30 × 24 × 24 Å`, `17,280 Å³` |
| Official Vina reference | Approximately **-19.04 kcal/mol**, joint score |
| Historical run | **-21.09 kcal/mol**, 37 seconds |

## Step 1: create a project with both ligands {#第-1-步新建项目两个配体要一次导入}

![Project creation with the 5X72 receptor and two SDF inputs](/img/cases/multiple-ligands-docking-5x72/01-create-project.webp)

**Figure 1.** Create project.

Choose Global Docking (「全局对接」), select `5x72_receptorH.pdb` and both ligand SDFs, and confirm the library contains two members.

## Step 2: review the two receptor issues {#第-2-步结构审查两项必须人工确认}

![A:29 incomplete residue and A:133 PHE alternate location selection](/img/cases/multiple-ligands-docking-5x72/02-structure-review.webp)

**Figure 2.** Structure review.

Assess whether the incomplete residue `A:29` can be ignored. Select the alternate location for `A:133 PHE`; this example follows the official choice `A`. Confirm the decisions and click Confirm and Reconvert (「确认并重新转换」).

## Step 3: check prepared PDBQT files {#第-3-步确认-pdbqt-准备结果}

![Ready receptor and two prepared ligands](/img/cases/multiple-ligands-docking-5x72/03-prepare-pdbqt.webp)

**Figure 3.** Preparation.

Confirm the receptor and both ligands are ready. Review ligand protonation, charge and chirality.

## Step 4: select joint docking and set the box {#第-4-步设定-grid-box并切到多配体模式}

![Experimental joint docking tab and 5X72 box](/img/cases/multiple-ligands-docking-5x72/04-set-grid-box.webp)

**Figure 4.** Search region.

Select Multiple Ligands Joint Docking (Experimental) (「多配体共同对接（实验性）」). Enter center `-15, 15, 129` and dimensions `30 × 24 × 24 Å`, then save.

## Step 5: save shared parameters {#第-5-步确认运行参数}

![Joint docking settings with exhaustiveness 32](/img/cases/multiple-ligands-docking-5x72/05-set-vina-parameters.webp)

**Figure 5.** Shared settings.

| Parameter | Value |
| --- | --- |
| Scoring | `Vina` |
| Exhaustiveness | **`32`** |
| Num Modes | `9` |
| Energy Range | `3` |
| CPU | `0` |
| Seed | Blank |

## Step 6: select members and their order {#第-6-步在共同对接面板里选成员定顺序}

![Two selected ligands, P59 then P69, and joint run conditions](/img/cases/multiple-ligands-docking-5x72/06-multi-ligand-panel.webp)

**Figure 6.** Joint docking panel.

Select P59 and P69; the count must be `2 / 2`. Confirm order `P59 → P69`, box `30 × 24 × 24 Å` and exhaustiveness `32`. Click Create and Start Joint Docking (「创建并开始共同对接」).

## Step 7: inspect joint poses {#第-7-步看结果联合构象列表}

![Joint result with member order and Mode 1 score of -21.09](/img/cases/multiple-ligands-docking-5x72/07-joint-results.webp)

**Figure 7.** Joint results.

Confirm the task is a two-ligand joint search and the member order matches. Inspect both ligands in a pose. The historical best score is **-21.09 kcal/mol**, versus the official reference of about **-19.04**. It describes the joint system and cannot be split into individual ligand scores.<NoteRef number={3}/>

## Step 8: inspect the joint score table {#第-8-步看结果联合评分表}

![Nine joint candidate scores and RMSD columns](/img/cases/multiple-ligands-docking-5x72/08-joint-scores.webp)

**Figure 8.** `scores.csv`.

Save the CSV and `multi_ligand_report.md`.

| Mode | Joint score (kcal/mol) | RMSD l.b. (Å) | RMSD u.b. (Å) |
| --- | --- | --- | --- |
| 1 | **-21.09** | 0 | 0 |
| 2 | -20.73 | 1.056 | 3.647 |
| 3 | -20.49 | 1.393 | 3.178 |
| 4 | -19.7 | 1.744 | 4.84 |
| 5 | -19.14 | 1.387 | 3.351 |
| 6 | -18.85 | 1.201 | 9.181 |
| 7 | -18.67 | 1.198 | 3.585 |
| 8 | -18.66 | 1.442 | 3.361 |
| 9 | -18.55 | 1.858 | 9.024 |

## Continue reading {#继续阅读}

- [Batch Docking](./batch-docking.md)
- [Flexible Docking — 1FPU](./flexible-docking-1fpu.md)
- [Basic Docking — 1IEP](./basic-docking-1iep.md)
- [Batch, Multiple and Flexible](../../part-c/batch-multiple-flexible.md)
- [Box and Maps FAQ](../../part-c/faq-box-and-maps.md)
- [Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- [Interpreting results](../../part-c/interpreting-results.md)

<DocNotes example="multiple">
<DocNote number={2} title="Screenshots and run record">

Historical `run_001` belongs to `case4_multiple_5x72`, took 37 seconds and used `P59 → P69`. It is not a new v1.0.4 validation. Screenshots show the Chinese interface with masked paths. Member selections can clear after a run; use the saved run record for their identity.

</DocNote>
<DocNote number={3} title="Reference comparison and score scope">

| Mode | Historical run_001 | Official Vina | Difference |
| --- | --- | --- | --- |
| 1 | **-21.09** | **-19.04** | **-2.05** |
| 2 | -20.73 | -18.33 | -2.40 |
| 3 | -20.49 | -17.27 | -3.22 |
| 4 | -19.70 | -17.22 | -2.48 |
| 5 | -19.14 | -16.45 | -2.69 |
| 6 | -18.85 | -16.35 | -2.50 |
| 7 | -18.67 | -16.24 | -2.43 |
| 8 | -18.66 | -16.00 | -2.66 |
| 9 | -18.55 | -15.29 | -3.26 |

The official numerical result has not been reproduced here. Review preparation, box, parameters and random sampling. CSV `score_scope` is `joint_two_ligand_pose`; do not compare directly with single-ligand, batch or different-member results.

Docking scores indicate modeled binding trends and cannot replace experimental validation.

</DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Official [Multiple ligands docking tutorial](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_multiple_ligands.rst).
2. Official [`example/mulitple_ligands_docking`](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example/mulitple_ligands_docking); the spelling `mulitple` is intentional here.
3. Official `solution/5x72_ligand_vina_out.pdbqt`: reference remark `-19.043`.
4. RCSB PDB [5X72](https://www.rcsb.org/structure/5X72).
5. DockStart structure review, joint docking and results pages, with historical run logs and CSV: screenshot sources.

</details>
