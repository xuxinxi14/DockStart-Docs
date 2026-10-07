---
title: "Macrocycle Docking — BACE1"
sidebar_position: 5
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Macrocycle Docking — BACE1 {#macrocycle-docking--bace1}

Practice macrocycle preparation: analyze ring-breaking candidates, review the selected bond in 3D, prepare PDBQT and run docking.

## Official 3D structure files {#official-structure-files}

<OfficialExampleFiles example="macrocycle"/>

## Example settings {#案例设置}

| Item | Value |
| --- | --- |
| Receptor | BACE1, `BACE_1_receptorH.pdb` |
| Macrocyclic ligand | `BACE_1_ligand.mol2` |
| Box center | `30.103, 6.152, 15.584` |
| Box dimensions | `20 × 20 × 20 Å` |
| Official Vina reference | **-11.170 kcal/mol** |
| Historical result | **-7.924 kcal/mol**, 102 seconds |

## Step 1: create a project {#第-1-步新建项目}

![BACE1 project with receptor PDB and macrocyclic ligand MOL2](/img/cases/macrocycle-docking-bace1/01-create-project.webp)

**Figure 1.** Create project.

Select Global Docking (「全局对接」), the two files above, a name and a writable directory.

## Step 2: prepare the inputs and handle macrocycle detection {#第-2-步准备受体一次成功配体第一次会失败}

![Receptor and ligand conversion controls](/img/cases/macrocycle-docking-bace1/02-before-convert.webp)

**Figure 2.** Before preparation.

![Receptor ready while ligand conversion waits for macrocycle review](/img/cases/macrocycle-docking-bace1/03-ligand-failed.webp)

**Figure 3.** Ligand preparation stopped for review.

Prepare the receptor. If ligand preparation stops after detecting a macrocycle, scroll to the Macrocycle Preparation (「大环配体准备」) panel and continue the review.

## Step 3: select reviewed macrocycle preparation {#第-3-步切到受审查的大环准备}

![Reviewed macrocycle preparation and candidate analysis settings](/img/cases/macrocycle-docking-bace1/04-review-mode.webp)

**Figure 4.** Macrocycle preparation.

Choose Reviewed Macrocycle Preparation (「受审查的大环准备」), keep minimum ring size `7` and maximum breaks `4`, and click Analyze Macrocycle Candidates (「分析大环候选」). If the expected ring is absent, check the file and ring-size threshold.

## Step 4: choose a ring-breaking combination {#第-4-步选断环组合}

![Seven reviewed combinations with Meeko default combination 3 selected](/img/cases/macrocycle-docking-bace1/05-break-combinations.webp)

**Figure 5.** Candidate combinations.

Choose a combination covering all target rings. The screenshot selects combination 3, the Meeko default, corresponding to `#3 C8 – #4 C10`.

## Step 5: inspect the bond in 3D {#第-5-步看断环键在-3d-里的位置}

![Selected C8–C10 bond highlighted in 3D](/img/cases/macrocycle-docking-bace1/06-break-3d.webp)

**Figure 6.** Bond review.

Inspect the highlighted atoms and connection, then Confirm Selected Break (「确认所选断环」). Choose a rigid macrocycle if your study requires it. Changing the ligand or preparation settings requires a new confirmation.

## Step 6: confirm preparation evidence {#第-6-步确认并转换}

![Prepared ligand with matching expected and actual break 3-4 and two pseudoatoms](/img/cases/macrocycle-docking-bace1/07-preparation-evidence.webp)

**Figure 7.** Preparation evidence.

After conversion, confirm PDBQT completion and matching expected/actual break bonds. Both are `3-4` here, with `2` `G*` pseudoatoms. Review protonation, charge and conformation, then continue to search-region setup.

## Step 7: set the box {#第-7-步设定-grid-box}

![BACE1 docking box and CG0/G0 atom-type checks](/img/cases/macrocycle-docking-bace1/08-set-grid-box.webp)

**Figure 8.** Search region.

Enter center `30.103, 6.152, 15.584` and dimensions `20 × 20 × 20 Å`. Check the position in 3D.

## Step 8: confirm parameters {#第-8-步确认参数}

![Macrocycle Vina settings with exhaustiveness 32](/img/cases/macrocycle-docking-bace1/09-set-vina-parameters.webp)

**Figure 9.** Run settings.

Use `Vina`, exhaustiveness **`32`**, Num Modes `9`, Energy Range `3`, CPU `0`, and a blank seed. Save, recheck and start docking.

## Step 9: inspect results {#第-9-步看结果}

![Historical BACE1 result with best score -7.924](/img/cases/macrocycle-docking-bace1/10-result-poses.webp)

**Figure 10.** `run_001` poses.

![Historical BACE1 score table](/img/cases/macrocycle-docking-bace1/11-result-scores.webp)

**Figure 11.** Score table.

The historical best score is **-7.924 kcal/mol**, compared with **-11.170** in the official reference. The official numerical result has not been reproduced. Check the ring-breaking strategy and input preparation before further comparison.<NoteRef number={3}/>

## Continue reading {#继续阅读}

- [Multiple Ligands — 5X72](./multiple-ligands-docking-5x72.md)
- [Structure preparation FAQ](../../part-c/faq-structure-preparation.md)
- [Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- [Box and Maps FAQ](../../part-c/faq-box-and-maps.md)
- [Interpreting results](../../part-c/interpreting-results.md)

<DocNotes example="macrocycle">
<DocNote number={2} title="Screenshots and parameter sources">

These Chinese-interface screenshots show historical `run_001` in `case5_macrocycle_bace1`, taking 102 seconds, with review `review_001`. They are not a new v1.0.4 validation. Paths are masked; SDF was not yet exported. The box comes from official `BACE_1_receptor_vina_box.txt`, and the reference score from official output PDBQT.

</DocNote>
<DocNote number={3} title="Ring-breaking and result comparison">

Official output records `Glue-bond [7] :: [8]`, two `G0` pseudoatoms and `TORSDOF 12`; the historical DockStart input had `11` active torsions. Atom numbers across files require explicit correspondence; these numbers alone cannot establish whether the same bond was broken.

A historical run with greater search effort changed the score by only about `0.35 kcal/mol`, but does not exclude sampling effects. A confirmed bond means preparation matches the selected strategy, not necessarily the official strategy.

Docking scores indicate modeled binding trends and cannot replace experimental validation.

</DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Official [Docking with macrocycles](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_macrocycle.rst).
2. Official [macrocycle example](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example/docking_with_macrocycles).
3. Official solution box and output PDBQT files.
4. Holcomb et al. (2022), *Performance evaluation of flexible macrocycle docking in AutoDock*, QRB Discovery 3, E18; Forli & Botta (2007), JCIM 47(4), 1481–1492; Santos-Martins et al. (2019), J Comput Aided Mol Des 33(12), 1071–1081.
5. DockStart preparation review, run checks and results, including `preparation/macrocycle_reviews/review_001/confirmation_001.json`.

</details>
