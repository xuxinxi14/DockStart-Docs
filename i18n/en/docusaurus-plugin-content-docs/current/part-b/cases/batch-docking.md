---
title: "Batch Docking"
sidebar_position: 3
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Batch Docking {#batch-docking}

Dock P59 and P69 separately into the same 5X72 receptor, then inspect each ligand's best score. Start with two ligands to learn the queue workflow.

## Official 3D structure files {#official-structure-files}

<OfficialExampleFiles example="batch"/>

## Example settings {#案例设置}

| Item | Value |
| --- | --- |
| Receptor | Phosphodiesterase, PDB [5X72](https://www.rcsb.org/structure/5X72) |
| Ligands | P59 and P69 from the crystal structure |
| Box center | `-15, 15, 129` |
| Box dimensions | `30 × 24 × 24 Å`, volume `17,280 Å³` |
| Historical results | P69 **-11.280**, P59 **-10.720 kcal/mol** |
| Historical runtime | 27 seconds total; 13 seconds per ligand |

## Step 1: import the receptor and ligand library {#第-1-步导入受体与配体库}

![Receptor import and single-ligand status](/img/cases/batch-docking/01-import-structure.webp)

**Figure 1.** Structure import.

![Ligand library with P59 and P69](/img/cases/batch-docking/02-ligand-library.webp)

**Figure 2.** Two batch ligands.

Create a Global Docking project, select `5x72_receptorH.pdb`, and add both SDF ligands to the library. Confirm Batch Ligands (2) (「批量配体 (2)」). Batch inputs come from the library; review its members even if the single-ligand card has no raw-file record.

## Step 2: prepare PDBQT inputs {#第-2-步确认-pdbqt-准备结果}

![Prepared 5X72 receptor and ligand with structure warnings](/img/cases/batch-docking/03-prepare-pdbqt.webp)

**Figure 3.** Preparation checks.

Prepare the receptor and each ligand. Review incomplete residues and alternate locations, especially `A:29` and `A:133`. See [5X72 structure review](./multiple-ligands-docking-5x72.md).

## Step 3: set the box {#第-3-步设定-grid-box}

![5X72 docking box and preflight checks](/img/cases/batch-docking/04-set-grid-box.webp)

**Figure 4.** Structure and search-region review.

Enter center `-15, 15, 129` and dimensions `30 × 24 × 24 Å`. Confirm coverage in 3D.

## Step 4: save shared parameters {#第-4-步确认运行参数}

![Shared batch parameters with exhaustiveness 8](/img/cases/batch-docking/05-set-vina-parameters.webp)

**Figure 5.** Shared run settings.

Select Serial Batch Screening (「串行批量筛选」).

| Parameter | Value |
| --- | --- |
| Scoring | `Vina` |
| Exhaustiveness | `8` |
| Num Modes | `9` per ligand |
| Energy Range | `3 kcal/mol` |
| CPU | `0` in the general settings; check the frozen queue record |
| Seed | Blank |

## Step 5: check the queue and frozen protocol {#第-5-步检查配体队列与冻结协议}

![Completed two-ligand queue and frozen protocol](/img/cases/batch-docking/06-ligand-queue.webp)

**Figure 6.** Ligand queue.

Check both members, box and execution parameters, then create and start the queue. **Create a new queue after changing parameters**: an existing queue keeps its saved settings. The example completed two members with two successes and zero failures.

## Step 6: read the results {#第-6-步看结果}

![Batch statistics and result files](/img/cases/batch-docking/07-batch-results.webp)

**Figure 7.** Batch results.

![P69 and P59 ranking with independent scores](/img/cases/batch-docking/08-ligand-ranking.webp)

**Figure 8.** Ligand ranking.

| Ligand | Status | Best score (kcal/mol) |
| --- | --- | --- |
| P69 | Success | `-11.280` |
| P59 | Success | `-10.720` |

Save `screening/results/screening_summary.csv` and `screening_report.md`. Include failed items when sharing a ranking. Use it to choose structures for further inspection.<NoteRef number={3}/>

## Continue reading {#继续阅读}

- [Flexible Docking — 1FPU](./flexible-docking-1fpu.md)
- [Joint docking with the same 5X72 inputs](./multiple-ligands-docking-5x72.md)
- [Batch, Multiple and Flexible](../../part-c/batch-multiple-flexible.md)
- [Box and Maps FAQ](../../part-c/faq-box-and-maps.md)
- [Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- [Interpreting results](../../part-c/interpreting-results.md)

<DocNotes example="batch">
<DocNote number={2} title="Screenshots and historical run">

These Chinese-interface screenshots show historical `screening_001` from `text3_Batch_docking`, taking 27 seconds. This page did not rerun it or validate v1.0.4. Local paths are masked. The actual queue used CPU `1`; the general settings page showed `0`. Use the frozen execution record.

</DocNote>
<DocNote number={3} title="Batch and joint scores">

This batch runs P59 and P69 independently at exhaustiveness `8`. The [joint example](./multiple-ligands-docking-5x72.md) searches both together at `32` and produces a joint score. Their scores cannot be directly compared or added to replace the joint score. A failed run does not establish that its ligand cannot bind.

Docking scores indicate modeled binding trends and cannot replace experimental validation.

</DocNote>
<DocNote number={4} title="Preparation and queue details">

`A:29` has an incomplete side chain and `A:133` has A/B alternate locations. Review their treatment. The historical first receptor preparation failed at `A:29`, then succeeded after confirmation.

The queue freezes receptor, box, protocol, parameters and inputs. Historical limits were 500 ligands, 16 MB per ligand, box side 126 Å, exhaustiveness 128, Num Modes 50 and CPU 64. Follow the actual version's validation messages.

</DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina, [Docking in batch mode](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_in_batch.rst).
2. Official [example directory](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example); it supplies no separate batch dataset.
3. RCSB PDB [5X72](https://www.rcsb.org/structure/5X72).
4. Official [Multiple ligands docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_multiple_ligands.rst).
5. DockStart library, queue and results pages: screenshot sources.

</details>
