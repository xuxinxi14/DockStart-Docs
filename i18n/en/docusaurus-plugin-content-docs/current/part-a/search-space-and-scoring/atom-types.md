---
title: "Atom types"
sidebar_position: 3
---

# Atom types {#atom-types}

Atom types classify how atoms participate in docking calculations. They describe more than the chemical element alone.

## Why use atom types? {#为什么需要-atom-types}

Atoms of the same element can have different interaction properties in different chemical environments. For example, oxygen in a carbonyl and oxygen in a hydroxyl group need appropriate chemical classification.

## How do atom types differ from elements? {#atom-type-和元素有什么区别}

The element identifies the atom chemically. Its docking atom type specifies how the computational model treats it. AutoDock types such as `C`, `A`, `N`, `OA` and `HD` are computational categories. See the [AutoDock4.2.6 User Guide](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf).

## Why do they affect docking? {#atom-types-为什么会影响-docking}

Scoring distinguishes interaction types, including hydrogen-bond donors/acceptors and different carbon environments. Preparation tools assign types together with charges and torsions. See [Meeko](https://meeko.readthedocs.io/en/develop/).

## Why can one element have multiple types? {#为什么同一个元素可能出现不同-atom-types}

Its bonding and chemical environment may differ. Do not interpret the final PDBQT atom-type field as merely an element symbol.

## How do atom types relate to maps? {#atom-types-和-grid--maps-有什么关系}

AutoDock4 needs affinity maps for the relevant atom types. The type tells the engine which spatial interaction data to query.

## In DockStart {#在-dockstart-中}

Preparation normally assigns the types for you. For AD4 maps, ensure every ligand type has a matching map and that specialized types belong to the chosen protocol.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Meeko, *Interface for AutoDock* and *Ligand Preparation*.
2. AutoDock4.2.6 User Guide.
3. AutoDock Vina manual.

</details>
