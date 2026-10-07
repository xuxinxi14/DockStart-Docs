---
title: "Hydrogens, protonation and charges"
sidebar_position: 4
---

# Hydrogens, protonation and charges {#氢质子化与电荷}

Hydrogens, protonation states and charges affect molecular chemistry and interactions. Before docking, prepare a model appropriate for the system you intend to study.

## Why check hydrogens? {#为什么要关注氢}

Experimental PDB/mmCIF structures may omit hydrogens. Hydrogens affect valence, hydrogen bonding, geometry, charges and atom typing. Add them in a way that fits the molecule's chemical environment.

## What is protonation? {#什么是质子化}

Protonation describes whether and where a molecule carries a proton, usually H⁺. A group may have different states at different pH values. These states can change charge, hydrogen-bond donor/acceptor properties and electrostatic interactions.

## What are charges? {#什么是电荷}

Atomic partial charges describe the distribution of electrons in a model. They are different from integer formal charges. Preparation tools assign partial charges according to the selected parameterization scheme.

## How do these affect docking? {#它们为什么会影响-docking}

Changing a protonation state changes the chemical model and may change its docking result. Review the intended state rather than treating preparation as a purely mechanical format conversion.

## In DockStart and Vina {#在-dockstart--vina-中}

PDBQT includes AutoDock atom types and partial charges. Meeko prepares this information. Ordinary Vina scoring and AutoDock4 handle charge information differently; do not assume Vina scoring recalculates its score directly from user-supplied PDBQT partial charges.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Meeko, *Ligand Preparation* and *PDBQT Format*.
2. AutoDock Vina manual.

</details>
