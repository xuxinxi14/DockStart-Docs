---
title: "Flexible Docking — 1FPU"
sidebar_position: 2
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Flexible Docking — 1FPU {#flexible-docking--1fpu}

Dock imatinib into 1FPU while allowing the Thr315 receptor side chain to move. This extends the basic workflow with flexible-residue selection, review and activation.

## Official 3D structure files {#official-structure-files}

<OfficialExampleFiles example="flexible"/>

## Example settings {#案例设置}

| Item | Value |
| --- | --- |
| Receptor | c-Abl kinase domain, PDB [1FPU](https://www.rcsb.org/structure/1FPU) |
| Ligand | Imatinib; reuse `1iep_ligand.pdbqt` from the basic example |
| Flexible residue | `A:315` (Thr315), only this residue |
| Box center | `15.190, 53.903, 16.917` |
| Box dimensions | `20 × 20 × 20 Å` |
| Official Vina reference | Approximately **-11.63 kcal/mol** |

## Step 1: prepare structures {#第-1-步准备结构}

![1FPU receptor preparation and prepared imatinib ligand](/img/cases/flexible-docking-1fpu/01-prepare-structure.webp)

**Figure 1.** Structure preparation.

Import `1fpu_receptorH.pdb` and `1iep_ligand.pdbqt`. Prepare the receptor and confirm both PDBQT checks pass.

## Step 2: select limited receptor flexibility {#第-2-步把受体切成有限柔性}

![Limited Flexibility selected while the active protocol still shows a rigid receptor](/img/cases/flexible-docking-1fpu/02-flexibility-setting.webp)

**Figure 2.** Receptor flexibility settings.

Select Limited Flexibility (「有限柔性」). Selecting the tab alone does not activate the protocol; prepare and enable it in the next steps.

## Step 3: specify A:315 and review unmatched residues {#第-3-步指定柔性残基-a315并处理坏残基}

![A:315 entry and warning about 27 unmatched residues](/img/cases/flexible-docking-1fpu/03-flexible-residue-warning.webp)

**Figure 3.** Strict preparation requires review.

Enter `A:315` and click Prepare and Enable (「准备并启用」). If residues cannot match templates, open the full list and assess whether deleting them affects the site. Confirm only when appropriate, then retry. If uncertain, repair the receptor first.

## Step 4: confirm flexibility is active {#第-4-步确认柔性已经生效}

![Flexible Mode badge and enabled flexible receptor](/img/cases/flexible-docking-1fpu/04-flexibility-activated.webp)

**Figure 4.** Activated flexible receptor.

Confirm the badge shows Flexible Mode (「柔性模式」), the residue remains `A:315`, and Use Flexibility (「使用柔性」) is enabled. Preparation IDs may differ from the screenshots.<NoteRef number={2}/>

## Step 5: check the docking box {#第-5-步检查-grid-box}

![20 Å box centered at 15.190, 53.903, 16.917](/img/cases/flexible-docking-1fpu/05-set-grid-box.webp)

**Figure 5.** Search region and preflight checks.

Enter center `15.190, 53.903, 16.917` and dimensions `20 × 20 × 20 Å`. Check the placement in 3D.

## Step 6: confirm parameters {#第-6-步确认运行参数}

![Vina parameters with exhaustiveness 32](/img/cases/flexible-docking-1fpu/06-set-vina-parameters.webp)

**Figure 6.** Run settings.

| Parameter | Value |
| --- | --- |
| Scoring | `Vina` |
| Exhaustiveness | **`32`**, as recommended by the official example |
| Num Modes | `9` |
| Energy Range | `3` |
| CPU | `0` |
| Seed | Blank; use a fixed integer for repeat comparisons |

Save, recheck and start docking. A command-line rerun must include the `--flex` file; the exported configuration alone can omit it.<NoteRef number={4}/>

## Step 7: wait for completion {#第-7-步运行完成}

![Completed flexible Vina run_003](/img/cases/flexible-docking-1fpu/07-run-completed.webp)

**Figure 7.** Completion status.

After Complete Workflow Finished (「完整流程已完成」), record the run ID and open that result. The historical example is `run_003`.

## Step 8: inspect poses {#第-8-步看结果构象列表}

![Flexible Vina results with Mode 1 at -11.62 kcal/mol](/img/cases/flexible-docking-1fpu/08-result-poses.webp)

**Figure 8.** Flexible Vina `run_003`.

Inspect the ligand and flexible side chain. The historical best score is **-11.62 kcal/mol**; the official reference is about **-11.63 kcal/mol**.<NoteRef number={3}/> Export SDF if needed for a separate viewer.

## Step 9: inspect scores {#第-9-步看结果评分表}

![Flexible Vina scores.csv and RMSD values](/img/cases/flexible-docking-1fpu/09-result-scores.webp)

**Figure 9.** Scores tab.

Use Scores (「评分」) for the table and Run Logs and Files (「运行日志与文件」) for original output.

| Mode | Score (kcal/mol) | RMSD l.b. (Å) | RMSD u.b. (Å) |
| --- | --- | --- | --- |
| 1 | -11.62 | 0 | 0 |
| 2 | -10.56 | 3.197 | 12.1 |
| 3 | -10.4 | 3.95 | 11.86 |
| 4 | -10.13 | 1.447 | 2.123 |
| 5 | -9.926 | 2.609 | 12.26 |
| 6 | -9.872 | 3.832 | 12.01 |
| 7 | -9.838 | 3.749 | 11.87 |
| 8 | -9.291 | 2.572 | 12.78 |
| 9 | -8.852 | 1.571 | 2.385 |

These RMSD columns compare with this run's Mode 1. Crystal-pose validation is a separate comparison.

## Continue reading {#继续阅读}

- [Basic Docking — 1IEP](./basic-docking-1iep.md)
- [Rigid and flexible structures](../../part-a/docking-components/rigid-and-flexible.md)
- [Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- [Box and Maps FAQ](../../part-c/faq-box-and-maps.md)
- [Interpreting results](../../part-c/interpreting-results.md)
- [AutoDock4 Maps](./autodock4-maps-workflow.md)

<DocNotes example="flexible">
<DocNote number={2} title="Screenshots and preparation records">

The screenshots are historical records from `test2_Flexible_Docking`, not a new v1.0.4 validation. They show `flex_002` and `flex_006`; historical `run_003` used `flex_004`. All selected `A:315` and had 27 ignored residues. Use your run's bound preparation record. Screenshots use the Chinese interface; local paths need not match.

</DocNote>
<DocNote number={3} title="Historical score comparison">

| Mode | Historical run_003 | Official Vina | Difference |
| --- | --- | --- | --- |
| 1 | **-11.62** | **-11.63** | **+0.01** |
| 2 | -10.56 | -10.57 | +0.01 |
| 3 | -10.4 | -10.3 | -0.10 |
| 4 | -10.13 | -9.906 | -0.224 |
| 5 | -9.926 | -9.895 | -0.031 |
| 6 | -9.872 | -9.854 | -0.018 |
| 7 | -9.838 | -8.849 | -0.989 |
| 8 | -9.291 | -8.758 | -0.533 |
| 9 | -8.852 | -8.543 | -0.309 |

Earlier `run_001` scored `-11.66`; `run_003` scored `-11.62`. Close scores do not establish pose reproduction. Historical `run_002` logged `-11.64` but did not generate the score CSV or report.

</DocNote>
<DocNote number={4} title="Protocol and command-line reproduction">

The historical run supplied flexible side chains through `--flex`, while `configs/vina_config.txt` omitted that argument. Check the complete command and the log's `Flex receptor:` entry, or rerun through DockStart. Keep rigid receptor, flexible side chains and ligand inputs together.

Up to eight flexible residues can be selected. This example uses only Thr315. Additional flexibility needs structural justification and may increase search time. AD4 and Vina/Vinardo scores are not directly comparable.

</DocNote>
<DocNote number={5} title="Using the results">

Docking scores indicate modeled binding trends and cannot replace experimental validation.

</DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Flexible Docking tutorial: 1FPU, Thr315, `-f A:315`, `-a`, box and reference results.
2. RCSB PDB [1FPU](https://www.rcsb.org/structure/1FPU).
3. Official tutorial, *1. Preparing the flexible receptor* and *5. Results*.
4. DockStart flexibility, structure-review, preflight and results pages: screenshot sources.

</details>
