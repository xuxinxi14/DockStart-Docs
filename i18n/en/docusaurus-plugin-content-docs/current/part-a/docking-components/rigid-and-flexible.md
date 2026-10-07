---
title: "Rigid and flexible structures"
sidebar_position: 3
---

# Rigid and flexible structures {#刚性与柔性}

Rigidity and flexibility define which parts can change during docking. Basic Vina docking normally uses a rigid receptor and a ligand with permitted torsions.

## What does rigid mean? {#什么叫刚性}

A rigid structure remains unchanged during the search. The search moves the ligand while keeping the rigid protein coordinates fixed.

## What does flexible mean? {#什么叫柔性}

A flexible part can change conformation. For ligands, this commonly means rotating permitted bonds to explore different shapes.

## How does Vina handle flexibility? {#vina-中通常怎样处理}

`--receptor` supplies the rigid portion; `--flex` supplies selected flexible side chains when used. Meeko can prepare corresponding rigid/flex files. See [Vina](https://vina.scripps.edu/manual/) and [Meeko](https://meeko.readthedocs.io/en/develop/py_rec_prep.html).

## Why keep most of the protein fixed? {#为什么不能让整个蛋白质都自由运动}

Allowing all protein atoms to move greatly expands the conformational search. Basic docking simplifies the problem by holding the receptor fixed while searching the ligand.

## Is more flexibility always better? {#柔性也不是越多越好}

Choose flexible side chains based on the structure and research question. Flexible-receptor preparation targets selected residues; it does not make the entire protein freely mobile.

## Why does this choice matter? {#刚性与柔性为什么重要}

More permitted motion creates more states to search and increases computational complexity. Appropriate flexibility matters more than the number of flexible parts.

## In DockStart {#在-dockstart-中}

Basic Docking usually keeps the receptor rigid. Flexible Docking lets selected receptor side chains move. For any mode, first identify which structures the task allows to change.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina manual.
2. Meeko, *Basic Docking*, *Parameterizing receptor*, and *PDBQT Format for Flexible Sidechains*.

</details>
