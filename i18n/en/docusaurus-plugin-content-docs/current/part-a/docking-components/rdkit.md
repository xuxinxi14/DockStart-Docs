---
title: "RDKit"
sidebar_position: 4
---

# RDKit {#rdkit}

RDKit is an open-source cheminformatics toolkit for reading, representing, checking and processing molecules. In DockStart, it supports small-molecule preparation. It provides Python and C++ interfaces. See [RDKit documentation](https://www.rdkit.org/docs/).

## What does RDKit process? {#rdkit-主要处理什么}

RDKit molecule objects store atoms, connectivity, bond types, formal charges, stereochemistry and coordinates. Chemical checks can help identify invalid valences or other structural problems.

## Why does Meeko use RDKit? {#rdkit-为什么会出现在-meeko-里}

Meeko ligand preparation accepts an RDKit molecule with 3D coordinates and explicit hydrogens, then creates its docking parameterization. RDKit represents and checks the molecule; Meeko prepares it for AutoDock/Vina. See [Meeko's overview](https://meeko.readthedocs.io/en/develop/lig_overview.html).

## Is RDKit a docking engine? {#rdkit-是-docking-软件吗}

RDKit handles chemical structures. Vina performs the docking search. These tools have different roles in the workflow.

## In DockStart {#在-dockstart-中}

RDKit works beneath the preparation interface. You do not need to learn RDKit programming to use DockStart; recognize it as the tool that helps understand and process the ligand.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. RDKit documentation.
2. Meeko, *Overview of ligand preparation* and *Basic ligand preparation*.

</details>
