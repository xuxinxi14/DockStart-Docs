---
title: "Hydrated Docking — 1UW6"
sidebar_position: 6
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Hydrated Docking — 1UW6 {#hydrated-docking--1uw6}

Practice hydrated AD4 with 1UW6 and nicotine: prepare candidate waters, generate maps, run docking and inspect retained and displaced waters.

This example requires a **rigid receptor, one ligand, Global Docking** and external AutoGrid4 `4.2.6+`. Use its hydrated scores to compare poses within this run, not to rank different ligands.

## Official 3D structure files {#official-structure-files}

<OfficialExampleFiles example="hydrated"/>

## Example settings {#案例设置}

| Item | Value |
| --- | --- |
| Receptor | Acetylcholine-binding protein, PDB `1UW6`, `1uw6_receptorH.pdb` |
| Ligand | Nicotine, `1uw6_ligand.sdf` |
| Candidate waters | `2` |
| Box center | `83.640, 69.684, -10.124` |
| Box dimensions | **`15 × 15 × 15 Å`** |
| Exhaustiveness | `32` |
| Official AD4 reference | **-8.261 kcal/mol** |
| Historical result | **-7.493 kcal/mol**, 2 seconds |

## Step 1: prepare standard PDBQT inputs {#第-1-步准备受体和配体-pdbqt}

![Prepared 1UW6 receptor and nicotine ligand](/img/cases/hydrated-docking-1uw6/01-preparation-ready.webp)

**Figure 1.** Ready inputs.

Import the PDB and SDF above, complete standard preparation and open the run workbench. Keep the original SDF: the hydrated wizard uses it to prepare a separate hydrated ligand.

## Step 2: set the search region {#第-2-步设置搜索范围}

![1UW6 docking box with 15 Å dimensions](/img/cases/hydrated-docking-1uw6/02-run-workbench-box.webp)

**Figure 2.** Box and preflight checks.

Enter center `83.640, 69.684, -10.124` and dimensions `15 × 15 × 15 Å`. Save and inspect the placement.

## Step 3: save search parameters {#第-3-步设置-vina-参数}

![Search settings before entering the hydrated wizard](/img/cases/hydrated-docking-1uw6/03-vina-parameters.webp)

**Figure 3.** Run settings.

Save exhaustiveness `32`, Num Modes `9`, Energy Range `3` and CPU `0`. Do not start ordinary Vina docking here. The hydrated wizard selects AD4 scoring for its own protocol.

## Step 4: open the hydrated wizard {#第-4-步进入水合向导}

![Hydrated AD4 wizard before ligand and maps preparation](/img/cases/hydrated-docking-1uw6/04-hydrated-wizard-start.webp)

**Figure 4.** Wizard start.

Open Hydrated AutoDock4 Docking (「水合 AutoDock4 对接」). Check Current Bindings (「当前绑定」): the receptor must be prepared and the original ligand SDF/MOL available. Return to receptor preparation if it is not ready.

## Step 5: complete the first three wizard stages {#第-5-步走完向导的-}

![Hydrated ligand, maps and preflight stages ready](/img/cases/hydrated-docking-1uw6/05-hydrated-wizard-steps.webp)

**Figure 5.** Preparation stages.

Complete Prepare Hydrated Ligand → Generate Hydrated AD4 Maps → Preflight Check in order. All three must pass; this example has `2` water sites. Preflight checks conditions and does not yet start docking.

## Step 6: create and execute the run {#第-6-步创建并执行-run}

![Created hydrated run awaiting execution](/img/cases/hydrated-docking-1uw6/06-run-execute-ready.webp)

**Figure 6.** Execution page.

![Completed hydrated run with exit code 0](/img/cases/hydrated-docking-1uw6/07-run-execute-finished.webp)

**Figure 7.** Completion.

Click Create and Execute Run (「创建并执行 run」), start docking on the execution page, and wait for completion. Check exit code `0` before opening results.

## Step 7: inspect water postprocessing {#第-7-步读水分子后处理}

![Per-pose water classification and summary counts](/img/cases/hydrated-docking-1uw6/08-water-postprocessing.webp)

**Figure 8.** Water postprocessing.

Inspect retained, strong, weak and displaced water counts per pose. The screenshot aggregates `18` candidates, `9` retained and `9` displaced. The displayed energies remain raw AD4 scores; classification helps interpret geometry.

## Step 8: inspect poses and scores {#第-8-步看结果}

![Hydrated pose list with raw AD4 affinity](/img/cases/hydrated-docking-1uw6/09-result-poses.webp)

**Figure 9.** Poses.

![Hydrated score table and analysis-generation control](/img/cases/hydrated-docking-1uw6/10-result-scores.webp)

**Figure 10.** Scores.

Inspect ligand and water positions. Historical Mode 1 is **-7.493 kcal/mol**, versus official **-8.261**.<NoteRef number={3}/> If CSV/report outputs are missing, click Generate Result Analysis (「生成结果分析」). Export SDF separately for other viewers.

## Continue reading {#继续阅读}

- [Macrocycle Docking — BACE1](./macrocycle-docking-bace1.md)
- [AutoGrid4 setup](../../part-c/autogrid4-setup.md)
- [Structure preparation FAQ](../../part-c/faq-structure-preparation.md)
- [Why results differ](../../part-c/why-results-differ.md)
- [Advanced protocols](../../part-c/advanced-protocols.md)

<DocNotes example="hydrated">
<DocNote number={2} title="Screenshots and run record">

The Chinese-interface screenshots show historical `run_001` in `case6_hydrated_1uw6`, with 2 seconds runtime and exit code 0. They are not a new v1.0.4 validation. Maps were `hydrated_001`, `40 × 40 × 40` grid intervals at `0.375 Å`. Local paths are masked.

</DocNote>
<DocNote number={3} title="Historical cross-checks">

| Check | Maps | Ligand | Mode 1 |
| --- | --- | --- | --- |
| A | Official | Official | **-8.261** |
| B | Official | DockStart | -7.321 |
| C | Local | DockStart | **-7.493** |
| D | Local, with added `N` map | Official | -7.623 |

Changing ligands under official maps produced `+0.940 kcal/mol`; changing maps with the DockStart ligand produced `-0.172`. These historical comparisons suggest reviewing protonation and receptor typing, but do not exclude all other factors.

</DocNote>
<DocNote number={4} title="Protocol scope">

The protocol is calibrated for AD4 and should not be changed to Vina/Vinardo. The current implementation is not for virtual screening or direct cross-ligand score comparisons. RMSD columns compare with this run's Mode 1. Water classification does not calculate a postprocessed affinity.

Docking scores indicate modeled binding trends and cannot replace experimental validation.

</DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Official [Hydrated docking tutorial](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_hydrated.rst): candidate waters, maps, postprocessing and reference results.
2. Official [hydrated example](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example/hydrated_docking).
3. DockStart hydrated wizard, frozen run records, water processing and results: screenshot sources.

</details>
