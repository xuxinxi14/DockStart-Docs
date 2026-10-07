---
title: "Scientific limits"
sidebar_position: 6
---

# Scientific limits {#科学边界}

Docking poses and scores are model predictions. Use them for comparison and hypothesis generation, with appropriate experimental validation.

## Scores are not measured binding free energies {#分数不是实验结合自由能}

Values in kcal·mol⁻¹ come from an empirical model. Ordinary Vina scoring uses a united-atom model and does not directly use the supplied partial charges. Scores from AutoDock and Vina are not directly comparable. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

## Poses are not experimental structures {#pose-不是实验结构}

A predicted pose does not establish binding or activity. Input protonation, search space, induced fit, experimental structure quality, sampling and model limitations can all affect correctness.

## Search involves randomness {#搜索本身带有随机性}

Record the exact inputs, box, exhaustiveness, actual seed and scoring function. A fixed seed is meaningful for reproducibility only when the other conditions and relevant versions also match.

## The model includes simplifications {#模型本身的简化}

Basic docking holds the receptor fixed. Ordinary ring treatment is rigid, while dedicated macrocycle workflows require additional preparation. Hydrogen positions are approximate, and both search and scoring remain approximate. Vina is intended for receptor–ligand docking, not general protein–protein docking.

## Accuracy depends on the system {#准确度取决于体系}

Evaluate performance for your target with available known ligands or reference structures. There is no universal score threshold that proves a molecule binds.

## What remains useful? {#那-docking-还能用来做什么}

Docking can explore binding models, compare candidates under consistent conditions, prioritize experiments and propose structural hypotheses. Follow predictions with validation and refine your understanding from that evidence.

## In DockStart {#在-dockstart-中}

Distinguish three questions: did the program run successfully, is the result plausible within the model, and does it describe the real system? The last requires evidence beyond a completed calculation.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina FAQ, *How accurate is AutoDock Vina?*, *Why do I not get the correct bound conformation?*, and *I changed something, and now the docking results are different. Why?*
2. AutoDock Vina Basic Docking documentation and manual.

</details>
