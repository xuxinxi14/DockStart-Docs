---
title: "Molecular interactions"
sidebar_position: 1
---

import InteractionExplorer from '@site/src/components/interactive/InteractionExplorer';
import {InteractionModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Molecular interactions {#分子与分子相互作用}

Molecules interact in ways that affect their arrangement and binding stability. Docking uses an approximate model of these interactions to explore possible receptor–ligand binding poses.

## Why do molecules interact? {#分子为什么会相互作用}

When molecules approach each other, their atoms can participate in hydrogen bonding, electrostatic and van der Waals interactions, hydrophobic effects, and interactions involving aromatic rings. Binding usually reflects their combined effects.

## Why can one molecule bind in different ways? {#为什么同一个分子有不同的结合方式}

A ligand can change its position, orientation and conformation. Each arrangement creates different contacts with nearby residues. For example, an OH group may form a hydrogen bond, while an aromatic ring may interact with an aromatic residue.

<InteractionExplorer />

## What does docking do? {#分子对接在这里做什么}

Docking tries candidate poses, evaluates them and ranks those favored by the current model. The result is a predicted binding model, rather than a directly observed experimental structure.

## Why are interactions important? {#为什么相互作用很重要}

Interactions help explain why a receptor may bind a ligand, why poses differ, and how a scoring function compares them. A scoring function approximates these interactions along with other relevant factors.

## A limitation to remember {#需要注意的一点}

Suitable atom distances alone do not establish real binding. Solvent, conformational changes, protonation and entropy also matter, and docking does not fully reproduce all of them.

<DocNotes>
  <DocNote number={1} title="Scope of the interactive model"><InteractionModelNote /></DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Leach AR. *Molecular Modelling: Principles and Applications*. 2nd ed. Pearson Education.
2. Kitchen DB, Decornez H, Furr JR, Bajorath J. *Docking and Scoring in Virtual Screening for Drug Discovery: Methods and Applications*. Nature Reviews Drug Discovery. 2004;3:935–949.
3. Ferreira LG, dos Santos RN, Oliva G, Andricopulo AD. *Molecular Docking and Structure-Based Drug Design Strategies*. Molecules. 2015;20(7):13384–13421.
4. Trott O, Olson AJ. *AutoDock Vina: Improving the Speed and Accuracy of Docking with a New Scoring Function, Efficient Optimization, and Multithreading*. Journal of Computational Chemistry. 2010;31(2):455–461.

</details>
