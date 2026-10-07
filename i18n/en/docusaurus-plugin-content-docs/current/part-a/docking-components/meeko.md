---
title: "Meeko"
sidebar_position: 5
---

# Meeko {#meeko}

Meeko prepares receptor and ligand structures for AutoDock/Vina workflows through command-line tools and Python APIs. See its [documentation](https://meeko.readthedocs.io/en/develop/lig_overview.html).

## What does Meeko do? {#meeko-主要做什么}

`mk_prepare_ligand.py` prepares ligands, for example from SDF. `mk_prepare_receptor.py` prepares receptors from PDB/CIF. The outputs include PDBQT files suitable for docking. See [basic ligand preparation](https://meeko.readthedocs.io/en/develop/lig_prep_basic.html).

## How does it relate to RDKit? {#meeko-和-rdkit-是什么关系}

RDKit represents and checks the ligand. Meeko parameterizes atom types, partial charges and torsions, then writes the docking input.

## Is Meeko a docking engine? {#meeko-是-docking-engine-吗}

Meeko prepares inputs. AutoDock Vina, AutoDock-GPU or another engine performs the docking search.

## What else can Meeko prepare? {#meeko-还能处理什么}

Its workflows include selected flexible side chains, residue handling and search-space helper files. For example, receptor preparation can generate rigid/flex inputs and box information. See the [basic docking tutorial](https://meeko.readthedocs.io/en/develop/tutorial1.html).

## In DockStart {#在-dockstart-中}

DockStart invokes preparation tools behind the receptor and ligand preparation controls. Their job is to create inputs the chosen docking protocol can use.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Meeko, *Basic Docking*, *Basic ligand preparation*, `mk_prepare_receptor.py`, and *Overview of ligand preparation*.

</details>
