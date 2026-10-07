---
title: "What cannot docking prove?"
sidebar_position: 4
---

# What cannot docking prove? {#分子对接不能证明什么}

A docking run predicts possible binding arrangements. By itself, it cannot establish real binding, experimental affinity or therapeutic efficacy.

## It cannot establish that a molecule will bind {#不能证明这个分子一定会结合}

A plausible calculated pose does not guarantee binding in an experiment. Protein changes, solvent and protonation may affect real binding and may be incompletely represented in the model.

## It cannot establish that the lowest-scoring pose is correct {#不能证明分数最低的-pose-就是真实构象}

Scoring functions approximate complex interactions. A high-ranked pose is a candidate favored by the model, rather than an experimentally confirmed binding mode. Predicting poses and ranking affinities remain distinct challenges.

## Affinity is not a measured binding affinity {#不能把-affinity-直接当成实验结合亲和力}

Vina's Affinity value comes from its scoring model. Do not treat it as experimentally measured binding free energy or derive an experimental \(K_d\) directly from a docking score.

## It cannot establish efficacy {#不能证明这个分子一定有效}

Even possible target binding does not establish biological or therapeutic activity. Selectivity, cellular access, pharmacokinetics, safety and experimental conditions also matter.

```text
Docking → computational prediction → structural hypothesis → experimental validation
```

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Kitchen DB, et al. *Docking and Scoring in Virtual Screening for Drug Discovery: Methods and Applications*. Nature Reviews Drug Discovery. 2004;3:935–949.
2. Warren GL, et al. *A Critical Assessment of Docking Programs and Scoring Functions*. Journal of Medicinal Chemistry. 2006;49(20):5912–5922.
3. Trott O, Olson AJ. *AutoDock Vina*. Journal of Computational Chemistry. 2010;31(2):455–461.
4. AutoDock Vina documentation.

</details>
