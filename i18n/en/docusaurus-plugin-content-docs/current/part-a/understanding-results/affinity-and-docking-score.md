---
title: "Affinity / Docking Score"
sidebar_position: 2
---

# Affinity / Docking Score {#affinity--docking-score}

Affinity is Vina's predicted score in kcal·mol⁻¹. It comes from a computational model, not a measurement of binding free energy.

## Where does the value come from? {#affinity-从哪来}

Vina evaluates each pose with its scoring function. Lower, more negative values favor a pose within the same model and comparable task. See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## What contributes to the reported energy? {#它由哪些部分构成}

Detailed output and `--score_only` can report:

```text
Estimated Free Energy of Binding   : ... (kcal/mol) [=(1)+(2)+(3)-(4)]
(1) Final Intermolecular Energy    : ...
    Ligand - Receptor
    Ligand - Flex side chains
(2) Final Total Internal Energy    : ...
(3) Torsional Free Energy          : ...
(4) Unbound System's Energy        : ...
```

These are modeled intermolecular, internal, torsional and unbound contributions.

## Why is this not an experimental free energy? {#为什么不能当成实验测得的结合自由能}

Ordinary Vina scoring uses a united-atom model, ignores user-supplied partial charges in that scoring function, and does not give physically meaningful output hydrogen positions. AutoDock and Vina scores are also not directly comparable. These statements concern Vina scoring, not every AD4 protocol. See the [FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

## What can the score be used for? {#它能用来做什么}

Use it to rank poses and compare candidates under consistent, appropriate conditions. Do not convert it directly to experimental `Kd` or `ΔG`, compare across scoring functions, or ignore changes in preparation and search conditions.

## In DockStart {#在-dockstart-中}

`Affinity = -7.4 kcal·mol⁻¹` identifies the pose's result under the chosen model. Interpret it with geometry and validation rather than as a measured binding energy.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation and manual.
2. AutoDock Vina FAQ, *Why don't the results change when I change the partial charges?* and *The bound conformation looks reasonable, except for the hydrogens. Why?*

</details>
