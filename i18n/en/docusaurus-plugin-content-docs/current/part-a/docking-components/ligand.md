---
title: "Ligand"
sidebar_position: 2
---

# Ligand {#ligand}

The ligand is the molecule whose possible binding arrangements are explored in the receptor's search space. In a typical protein–small-molecule workflow, it is the small molecule under study.

## What does the ligand do? {#ligand-在-docking-中做什么}

Vina searches its position, orientation and permitted conformations within the defined region. See the [Vina manual](https://vina.scripps.edu/manual/).

## Why prepare the ligand? {#为什么配体需要准备}

Preparation translates atoms, bonds, coordinates, hydrogens and stereochemistry into a docking model. Meeko's `mk_prepare_ligand.py` produces PDBQT from suitable input such as SDF; its input must have three-dimensional coordinates and explicit hydrogens. See [Meeko](https://meeko.readthedocs.io/en/develop/lig_prep_basic.html).

## Why is a ligand often flexible? {#配体为什么经常具有柔性}

Rotatable bonds let the same molecule adopt different shapes. Docking searches both where the molecule sits and which permitted shape it adopts.

## How do receptor and ligand fit together? {#配体和受体是什么关系}

The receptor supplies the environment and the ligand supplies the candidate molecule. Basic Vina commands specify them separately through `--receptor` and `--ligand`.

## In DockStart {#在-dockstart-中}

Make sure the input represents the intended molecule. Incorrect protonation, chirality or conformation can produce a successful calculation on an unintended chemical structure.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina manual.
2. Meeko, *Basic ligand preparation* and *Basic Docking*.

</details>
