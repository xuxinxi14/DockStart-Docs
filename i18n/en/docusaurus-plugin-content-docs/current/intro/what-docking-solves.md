---
title: "What problem does docking solve?"
sidebar_position: 2
---

# What problem does docking solve? {#分子对接试图解决什么问题}

Molecular docking predicts the position, orientation and conformation a ligand might adopt when binding to a receptor.

## Why is this a problem? {#为什么会有这个问题}

Proteins and small molecules are three-dimensional. A ligand can approach a protein in many arrangements, each with different atom contacts and interactions. Docking explores arrangements that appear plausible under the chosen computational model.

## What does docking search for? {#docking-实际上在找什么}

The program tries different ligand positions, orientations and conformations. It then scores these candidates. **Search** finds possible poses; **scoring** evaluates and ranks them. A run therefore often produces several candidate poses.

## What information can it provide? {#它想得到的是什么}

### Possible binding modes {#可能的结合方式}

The results can suggest a binding region, a ligand orientation, and atoms or residues that may interact.

### Comparisons between candidate poses {#不同候选构象之间的比较}

Compare pose locations, contacts and scores. These are computational hypotheses that need further validation.

## A simple workflow {#一个简单的理解}

```text
Protein + ligand
      ↓
Search possible binding arrangements
      ↓
Evaluate and rank candidates
      ↓
Inspect several predicted poses
```

The central question is: **given these receptor and ligand structures, how might they bind?**

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Kitchen DB, Decornez H, Furr JR, Bajorath J. *Docking and Scoring in Virtual Screening for Drug Discovery: Methods and Applications*. Nature Reviews Drug Discovery. 2004;3:935–949.
2. Ferreira LG, dos Santos RN, Oliva G, Andricopulo AD. *Molecular Docking and Structure-Based Drug Design Strategies*. Molecules. 2015;20(7):13384–13421.
3. Morris GM, et al. *Receptor-ligand molecular docking*.
4. AutoDock Vina documentation.

</details>
