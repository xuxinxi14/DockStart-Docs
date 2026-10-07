---
title: "AutoDock4 Maps Workflow"
sidebar_label: "AutoDock4 Maps"
sidebar_position: 8
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# AutoDock4 Maps Workflow {#autodock4-maps-workflow}

Use AD4 scoring for 1IEP: generate maps with AutoGrid4, then search with Vina. Configure [AutoGrid4 4.2.6+](../../part-c/autogrid4-setup.md) before starting.

## Official 3D structure files {#official-structure-files}

<OfficialExampleFiles example="ad4"/>

## Step 1: prepare receptor and ligand PDBQT {#第-1-步准备受体和配体-pdbqt}

![Both 1IEP PDBQT inputs ready](/img/cases/autodock4-maps-workflow/01-preparation-ready.webp)

**Figure 1.** Prepared inputs.

Import and prepare both structures, or continue an existing 1IEP project. Confirm both inputs are ready.

## Step 2: set the search region {#第-2-步设置搜索范围}

![1IEP box and receptor/ligand atom types](/img/cases/autodock4-maps-workflow/02-run-workbench-box.webp)

**Figure 2.** Box and checks.

Save center `15.190, 53.903, 16.917` and dimensions `20 × 20 × 20 Å`.

## Step 3: review preflight checks {#第-3-步看运行前检查}

![Input identities, structural reviews and parameter checks](/img/cases/autodock4-maps-workflow/03-preflight-checks.webp)

**Figure 3.** Preflight list.

Review the input identities and structure warnings. Save parameters, click Recheck (「重新检查」) and resolve blocking items.

## Step 4: select AutoDock4 maps {#第-4-步把评分协议切成-autodock4maps}

![AD4 maps panel marked invalid after a box change](/img/cases/autodock4-maps-workflow/04-ad4-maps-not-ready.webp)

**Figure 4.** Maps need regeneration.

In Vina / AutoDock4 Maps, select AutoDock4 (maps) (「AutoDock4（maps）」) and Standard AD4 (「标准 AD4」). Set spacing `0.375 Å`, grid counts `54` on all axes, and leave the custom parameter file blank. Regenerate maps after changing the receptor or box.

## Step 5: generate and validate maps {#第-5-步生成并校验-maps}

![Validated ad4_002 maps with 54 × 54 × 54 grid counts](/img/cases/autodock4-maps-workflow/05-ad4-maps-ready.webp)

**Figure 5.** Ready maps.

Click Generate and Validate Maps (「生成并校验 maps」). Confirm the ready state and `Successful Completion.` near the end of `maps/<map_set_id>/autogrid.glg`. Maps must cover all atom types of any replacement ligand.

## Step 6: set parameters {#第-6-步设置参数}

![AD4 run settings with exhaustiveness 32](/img/cases/autodock4-maps-workflow/06-ad4-parameters.webp)

**Figure 6.** Run settings.

Use **AutoDock4 (maps)**, exhaustiveness **`32`**, Num Modes `9`, Energy Range `3`, CPU `0` and a blank seed. Save and recheck.

## Step 7: run {#第-7-步运行}

![Vina searching with AD4 maps](/img/cases/autodock4-maps-workflow/07-run-in-progress.webp)

**Figure 7.** Running.

Start the run, wait for completion and open its results. The screenshot is `run_003`; your ID may differ.<NoteRef number={2}/>

## Step 8: inspect the results {#第-8-步看结果}

![AD4 result banner and Mode 1 score -14.7279](/img/cases/autodock4-maps-workflow/08-result-poses.webp)

**Figure 8.** Poses.

![AD4 score table with RMSD columns](/img/cases/autodock4-maps-workflow/09-result-scores.webp)

**Figure 9.** Scores.

Confirm the AutoDock4 maps scoring banner. Historical Mode 1 scored **-14.7279 kcal/mol**, compared with official approximately **-14.72**.<NoteRef number={3}/> Save CSV/report and export SDF if needed. Do not compare AD4 scores directly with Vina/Vinardo scores.

## Continue reading {#继续阅读}

- [Hydrated Docking — 1UW6](./hydrated-docking-1uw6.md)
- [AutoGrid4 setup](../../part-c/autogrid4-setup.md)
- [Advanced protocols](../../part-c/advanced-protocols.md)
- [Why results differ](../../part-c/why-results-differ.md)
- [Interpreting results](../../part-c/interpreting-results.md)

<DocNotes example="ad4">
<DocNote number={2} title="Screenshots and run record">

Chinese-interface screenshots show historical AD4 `run_003` in `box1`, taking 2 seconds for search and 8.78 seconds for maps. This is not a new v1.0.4 validation. `run_001` was Vina and `run_002` an earlier AD4 run. Paths are masked.

</DocNote>
<DocNote number={3} title="Historical score comparison">

| Mode | Historical result | Official | Absolute difference |
| --- | --- | --- | --- |
| 1 | **-14.7279** | **-14.72** | **0.008** |
| 2 | -13.3167 | -14.63 | 1.31 |
| 3 | -13.2168 | -13.12 | 0.10 |
| 4 | -12.3938 | -11.70 | 0.69 |
| 5 | -11.6772 | -11.44 | 0.24 |
| 6 | -11.3986 | -11.39 | 0.01 |
| 7 | -11.2254 | -11.21 | 0.02 |
| 8 | -11.1312 | -10.71 | 0.42 |
| 9 | -10.6617 | -10.41 | 0.25 |

A close best score does not establish a correct structure. Inspect the pose and preparation. Docking scores indicate modeled binding trends and cannot replace experimental validation.

</DocNote>
<DocNote number={4} title="Maps and protocol details">

Vina reads receptor interaction information through `--maps`; it remains the search engine. Its AD4 result is not automatically equivalent to a native AutoDock4 run. At `0.375 Å`, an even grid count of `54` spans `20.25 Å`. Maps bind receptor, box, grid and atom types and record versions and hashes.

This example uses standard AD4 with a rigid receptor and one ligand. See [advanced protocols](../../part-c/advanced-protocols.md) for flexible, batch, two-ligand and AD4Zn conditions.

</DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Official [Basic docking tutorial](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst), sections 4.a and 5.a.
2. Official [basic_docking example](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example/basic_docking).
3. DockStart user guide, `backend/dockstart_core/autogrid.py`, `backend/adapters/autogrid_adapter.py`, and `apps/desktop/src/components/AutoGridMapsPanel.tsx`.
4. Historical `maps/ad4_002/` and `runs/run_003/` artifacts and screenshot script `DockStart-Docs-ShootScript-08-ad4-maps-1iep.md`.
5. [Basic Docking — 1IEP](./basic-docking-1iep.md) and [Hydrated Docking — 1UW6](./hydrated-docking-1uw6.md).

</details>
