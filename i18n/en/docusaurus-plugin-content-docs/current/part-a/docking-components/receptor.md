---
title: "Receptor"
sidebar_position: 1
---

# Receptor {#receptor}

The receptor supplies the binding environment for the ligand. In protein–small-molecule docking, it is usually the protein.

## What does the receptor do? {#receptor-在-docking-中做什么}

Its coordinates, connectivity and local chemistry define the environment used to evaluate ligand poses. Vina's `--receptor` input specifies the rigid receptor portion in PDBQT format. See the [Vina manual](https://vina.scripps.edu/manual/).

## Why prepare the receptor? {#为什么受体需要进行结构准备}

Preparation identifies residues and atoms, handles hydrogens and chemical states, assigns atom types and charges, and reviews waters, metals and cofactors. A downloaded PDB/mmCIF is not automatically a docking-ready model. See [Meeko's basic docking tutorial](https://meeko.readthedocs.io/en/develop/tutorial1.html).

## Is the receptor always rigid? {#受体一定是完全刚性的吗}

Basic Vina docking generally uses a rigid receptor. Selected side chains can be flexible, with separate rigid and flex PDBQT inputs.

## In DockStart {#在-dockstart-中}

The prepared protein becomes the receptor input. A successful run does not establish that the receptor model suits the scientific question; its selection and preparation determine how results should be interpreted.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina manual.
2. Meeko, *Basic Docking* and *Parameterizing receptor*.

</details>
