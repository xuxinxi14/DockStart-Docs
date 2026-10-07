---
title: "What can docking do?"
sidebar_position: 3
---

# What can docking do? {#分子对接能做什么}

Docking helps explore possible binding modes, compare candidate molecules and develop structural hypotheses for experiments.

## 1. Explore possible binding modes {#1-帮助理解可能的结合方式}

Given a protein structure, docking can suggest how a ligand enters a binding region, which residues it approaches, and how alternative poses differ. This provides a possible binding model.

## 2. Compare candidate molecules {#2-帮助比较多个候选分子}

Dock candidates individually and examine their predicted poses, scores and positions relative to the target site. This is part of structure-based virtual screening. A docking score is one source of evidence for prioritization and does not count as an experimental result.

## 3. Develop experimental hypotheses {#3-帮助提出实验假设}

For example, a pose may suggest a residue worth testing by mutation or a binding mode worth investigating. Follow the prediction with appropriate binding or other experiments, then revise the model using the evidence.

```text
Docking → structural hypothesis → experimental validation → revised understanding
```

## 4. Support early computational screening {#4-帮助进行早期计算筛选}

When there are too many candidates to test immediately, docking can help narrow the set for further study as one component of an early screening workflow.

## What remains outside these predictions? {#但-docking-不是什么都能做}

All predictions depend on the input structures and scoring model. A plausible, low-scoring pose can justify further investigation; real binding, measured affinity and efficacy need their own experimental support. See [what docking cannot prove](./what-docking-cannot-prove.md).

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Kitchen DB, et al. *Docking and Scoring in Virtual Screening for Drug Discovery: Methods and Applications*. Nature Reviews Drug Discovery. 2004;3:935–949.
2. Ferreira LG, et al. *Molecular Docking and Structure-Based Drug Design Strategies*. Molecules. 2015;20(7):13384–13421.
3. Pagadala NS, Syed K, Tuszynski J. *Software for molecular docking: a review*. Biophysical Reviews. 2017;9:91–102.
4. *A Comprehensive Survey of Prospective Structure-Based Virtual Screening for Early Drug Discovery in the Past Fifteen Years*.

</details>
