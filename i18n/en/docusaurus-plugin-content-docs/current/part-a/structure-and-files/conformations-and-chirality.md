---
title: "Conformations and chirality"
sidebar_position: 5
---

import StereochemistryExplorer from '@site/src/components/interactive/StereochemistryExplorer';
import {StereochemistryModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Conformations and chirality {#构象与手性}

Conformations are different three-dimensional shapes of a molecule. Chirality concerns its stereochemical configuration. Both affect the ligand represented in a docking calculation.

## What is a conformation? {#什么是构象}

A molecule with fixed connectivity can adopt different shapes through rotations about permitted bonds. These arrangements are conformations of the same molecule.

## Why does docking consider conformations? {#为什么-docking-要考虑构象}

Docking searches both where a ligand sits and what shape it adopts. Rotatable bonds generate candidate shapes with different fits in the binding site.

## What is chirality? {#什么是手性}

Some molecular configurations are mirror images that cannot be superimposed by rotation. Such pairs are called enantiomers.

## Why does chirality matter? {#为什么手性对-docking-很重要}

Enantiomers can fit the same receptor differently. Identical formulas and connectivity do not imply identical docking inputs. Preserve the intended stereochemistry of chiral ligands.

## How do conformations and chirality differ? {#构象和手性有什么区别}

| Concept | Main question |
| --- | --- |
| Conformation | What shape does this molecule adopt? |
| Chirality | Which stereochemical configuration is represented? |

<StereochemistryExplorer />

## In DockStart {#在-dockstart-中}

Conformations concern ligand flexibility and search. Chirality concerns whether the input represents the intended molecule. A successful run on an incorrectly prepared stereoisomer still studies the wrong input structure.

<DocNotes>
  <DocNote number={1} title="Scope of the interactive model"><StereochemistryModelNote /></DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. RDKit, *Molecules and stereochemistry*.
2. Meeko, *Basic ligand preparation*.
3. AutoDock Vina manual.

</details>
