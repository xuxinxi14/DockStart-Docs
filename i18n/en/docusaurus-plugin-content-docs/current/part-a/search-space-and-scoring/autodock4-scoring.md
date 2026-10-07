---
title: "AutoDock4 scoring"
sidebar_position: 6
---

# AutoDock4 scoring {#autodock4-scoring}

AutoDock4 uses a semiempirical free-energy scoring model with van der Waals, hydrogen-bond, electrostatic, desolvation and torsional-entropy terms. It is distinct from Vina scoring. See the [AutoDock4 study](https://pmc.ncbi.nlm.nih.gov/articles/PMC4639406/).

## What does AutoDock4 consider? {#autodock4-主要考虑什么}

| Term | What it models |
| --- | --- |
| van der Waals | Dispersion and repulsion between atoms |
| Hydrogen bonds | Hydrogen-bond-related interactions |
| Electrostatics | Charge interactions |
| Desolvation | Approximate change from solvent to a binding environment |
| Torsional entropy | Conformational entropy cost associated with binding |

## Why use grid maps? {#为什么-autodock4-需要-grid-maps}

AutoGrid4 precomputes the rigid receptor's spatial interaction information in affinity maps, which can be queried during docking. See [Vina 1.2 methods](https://pmc.ncbi.nlm.nih.gov/articles/PMC8063785/).

## How does AD4 differ from Vina scoring? {#autodock4-和-vina-scoring-有什么区别}

| Feature | Vina | AutoDock4 |
| --- | --- | --- |
| Model | Vina scoring | AD4 scoring |
| Typical terms | Steric, hydrophobic, hydrogen-bond terms | van der Waals, hydrogen bonds, electrostatics, desolvation, torsion |
| External AD4 maps | Not needed for ordinary Vina | Required in the maps workflow |
| Vina option | Default `vina` | `ad4` |

Vina can read AutoGrid4 maps with `ad4` scoring. See the [Vina API source](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/build/python/vina/vina.py).

## Can AD4 and Vina scores be compared? {#autodock4-分数能不能和-vina-分数比较}

They are not directly comparable. `Vina -8.0 kcal/mol` and `AutoDock4 -9.0 kcal/mol` come from different models. See the [official warning](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_multiple_ligands.rst).

## In DockStart {#在-dockstart-中}

AD4 scoring appears in the maps workflow and dedicated AD4 protocols. Follow the corresponding worked example and keep comparisons separate from ordinary Vina scoring.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock4.2.6 User Guide and AutoDock4 documentation.
2. AutoDock Vina Basic Docking documentation and manual.
3. AutoDock4 scoring-function literature.

</details>
