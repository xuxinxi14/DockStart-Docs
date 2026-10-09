---
title: "Vina scoring"
sidebar_position: 4
---

import ScoringExplorer from '@site/src/components/interactive/ScoringExplorer';
import {ScoringModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Vina scoring {#vina-scoring}

Vina scoring is the default empirical scoring function in AutoDock Vina. It evaluates candidate poses using modeled interactions and ligand conformational terms.

## What is a scoring function? {#scoring-function-是什么}

It assigns a numerical score to a pose so candidates can be compared. Vina combines two Gaussian steric terms, repulsion, hydrophobic and nondirectional hydrogen-bond terms, plus a torsion-related contribution. See the [scoring-function discussion](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/).

## What does Vina consider? {#vina-主要考虑什么}

Its model includes spatial contacts, steric repulsion, hydrophobic interactions, hydrogen-bond-related interactions and a ligand flexibility cost. These terms form a model prediction rather than separately measured experimental energies.

<ScoringExplorer />

## Why are scores often negative? {#为什么-vina-的分数通常是负值}

Within the same scoring function and comparable task, lower scores favor a pose in that model. The [official example](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst) reports:

```text
mode    affinity
1       -13.23
2       -11.29
3       -11.28
```

A value such as `-10 kcal/mol` does not establish an experimental binding free energy of −10 kcal/mol.

## Can scores be compared directly with experiments? {#vina-score-能不能直接和实验值比较}

Treat them as empirical predictions, not measured binding free energies. Scores from different force fields also have different scales; the [Vina tutorial](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_multiple_ligands.rst) warns against directly comparing AutoDock and Vina scores.

## In DockStart {#在-dockstart-中}

An Affinity value such as −7.4 kcal·mol⁻¹ is the selected pose's modeled score. Confirm the scoring function, then interpret it together with geometry, inputs and validation.

<DocNotes>
  <DocNote number={1} title="Scope of the interactive model"><ScoringModelNote /></DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina manual and Basic Docking documentation.
2. Trott & Olson, *AutoDock Vina*.
3. Vinardo, *A Scoring Function Based on AutoDock Vina*.

</details>
