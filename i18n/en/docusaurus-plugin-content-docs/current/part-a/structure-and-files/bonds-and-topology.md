---
title: "Bond orders and topology"
sidebar_position: 3
---

# Bond orders and topology {#键级与拓扑}

Coordinates describe where atoms are. Topology describes which atoms connect, and bond orders describe the types of those connections.

## What is topology? {#什么是拓扑}

For a chain `A—B—C—D`, topology records the A–B, B–C and C–D connections. These relationships are part of the molecular structure independently of its current coordinates.

## What is bond order? {#什么是键级}

Single, double, triple and aromatic bonds represent different chemical connections. `C—C`, `C=C` and `C≡C` are chemically different. RDKit records corresponding bond types such as SINGLE, DOUBLE, TRIPLE and AROMATIC. See the [RDKit bond reference](https://www.rdkit.org/docs/cppapi/classRDKit_1_1Bond.html).

## Why does docking need this information? {#为什么-docking-要知道这些}

The program must recognize rings, functional groups and connected molecular fragments to build a model and identify permitted motion. Atom names and positions alone may not provide enough chemical information.

## How does topology differ from coordinates? {#拓扑和三维坐标有什么区别}

Molecules can have the same connectivity while adopting different three-dimensional conformations. Their topology stays the same while coordinates change.

## Why review topology during preparation? {#为什么结构准备时要特别注意拓扑}

PDB/CIF parsing must correctly interpret residues, bonds, valences and formal charges. Preparation goes beyond converting a file format. See [Meeko's receptor template guidance](https://meeko.readthedocs.io/en/develop/py_build_temp.html).

## How does it relate to rotatable bonds? {#它和可旋转键有什么关系}

Knowing connections and bond types lets preparation tools determine which parts can rotate. Those torsions become part of the conformational search.

## A simple analogy {#一个简单的理解}

Think of a bicycle: coordinates tell you where its parts are, topology tells you which parts connect, and bond types describe the kinds of connections. A computational model needs all of these kinds of information.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. RDKit, *RDKit::Bond Class Reference*.
2. Meeko, *Advanced information about templates* and *Basic ligand preparation*.
3. AutoDock Vina manual.

</details>
