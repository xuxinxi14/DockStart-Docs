---
title: "Coordinates, reference frames and units"
sidebar_position: 2
---

import BoxExplorer from '@site/src/components/interactive/BoxExplorer';
import {BoxModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Coordinates, reference frames and units {#坐标坐标系与常用单位}

Each atom has a position in three-dimensional space, usually expressed as X, Y and Z coordinates. Docking lengths are commonly measured in ångströms (Å).

## What are coordinates? {#什么是坐标}

Three numbers locate an atom, for example `X = 10.2`, `Y = 5.7`, `Z = -3.1`. PDB structure data includes these coordinates; legacy PDB coordinates use Å. See [PDB-101](https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/dealing-with-coordinates).

## What is a reference frame? {#什么是坐标系}

A shared origin and axes let the program calculate atom distances and the position of one molecule relative to another. A receptor, reference ligand and docking box must refer to the same frame for their positions to be meaningful together.

<BoxExplorer focus="coordinates" />

## Why do coordinates matter for docking? {#为什么坐标对-docking-很重要}

Moving or rotating a ligand changes atom distances, relative orientations and possible interactions. Docking searches these arrangements by changing coordinates and permitted torsions.

## What is Å? {#å-是什么}

An ångström is a molecular-scale length unit: **1 Å = 10⁻¹⁰ m**. Vina's `size_x`, `size_y` and `size_z` are lengths in Å. See the [Vina manual](https://vina.scripps.edu/manual/).

## What is kcal·mol⁻¹? {#kcalmol-又是什么}

`kcal/mol` is an energy unit. Vina reports its predicted affinity in this unit. The value is produced by a computational model and is not a directly measured experimental binding energy.

## The two units you will see most often {#在-dockstart-中最常见的两个单位}

| Unit | Used for |
| --- | --- |
| Å | Coordinates, distances and docking-box dimensions |
| kcal·mol⁻¹ | Predicted docking energy / affinity scores |

<DocNotes>

<DocNote number={1} title="About the box model">

<BoxModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. RCSB PDB-101, *Dealing with Coordinates*.
2. RCSB PDB, *PDB Format*.
3. AutoDock Vina manual and Basic Docking documentation.

</details>
