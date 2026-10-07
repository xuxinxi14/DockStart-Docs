---
title: "Interpreting Results"
sidebar_position: 9
sidebar_label: "Interpreting results"
---

import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Interpreting Results {#如何正确解读结果}

Poses, affinity scores and RMSD are outputs of a computational model. They help compare candidates under controlled conditions; they are not experimental measurements.

## Reading the result table {#结果表应该怎么看}

Inspect a pose alongside its score and RMSD, keeping the input structure and scoring model in view.

Distinguish score records from saved coordinates. v1.0.4 parses scores from Vina's log, while Vina 1.2.7 filters saved PDBQT models using `energy_range`. A log or CSV can have more rows than `out.pdbqt` has `MODEL` records. Only poses with saved coordinates can be loaded. See [energy range](../part-a/search-and-parameters/energy-range.md).

In a report, include inputs, scoring function, parameters and validation method.

## The numerical fields {#结果里有哪几个数字}

| Field | Meaning | Unit |
| --- | --- | --- |
| Mode | Pose number, ordered by score | — |
| Affinity / docking score | Scoring-model output | kcal/mol |
| RMSD l.b. | Lower-bound RMSD relative to Mode 1 | Å |
| RMSD u.b. | Upper-bound RMSD relative to Mode 1 | Å |

```text
mode |   affinity | dist from best mode
     | (kcal/mol) | rmsd l.b.| rmsd u.b.
-----+------------+----------+----------
1       -13.23          0          0
2       -11.29     0.9857      1.681
```

## What is a pose? {#pose-是什么}

A pose is a candidate spatial arrangement of the ligand in the receptor. Each mode identifies a candidate found by the search, rather than an experimentally observed binding geometry.

## Is Mode 1 the true binding pose? {#mode-1-是真实结合构象吗}

Mode 1 is the lowest-scoring pose found in this run under the selected model. Limited sampling, scoring approximations and inappropriate protonation can all affect that ranking.

## What can affinity be used for? {#affinity-能用来做什么}

Use it to rank candidate poses or compare ligands under the same scoring model and comparable preparation and search conditions. It cannot directly establish experimental Kd or ΔG. Do not compare raw scores across scoring functions or uncontrolled input and box changes.

## Why is a score not experimental affinity? {#为什么不能把分数当实验亲和力}

It comes from an empirical approximation. Ordinary Vina uses a united-atom scoring treatment and ignores supplied partial charges in its scoring function. Hydrogen placement in output is not a physically optimized hydrogen geometry. AD4 uses a different model, and its scores are not directly comparable with Vina or Vinardo.

## Understanding RMSD {#rmsd-要注意什么}

### RMSD l.b. / u.b. refers to Mode 1 {#rmsd-lb--ub-是相对-mode-1-的}

These values describe differences within the current output. Zero for Mode 1 does not establish agreement with a crystal pose.

### The reference belongs to this output {#它只在本次输出里有意义}

Different runs can have different Mode 1 references. Do not compare their RMSD table values as a shared validation measure.

### Local Optimization uses a different comparison {#局部优化里的-rmsd-更特殊}

Its unaligned heavy-atom RMSD measures displacement between the input and optimized pose in the same receptor coordinate frame. No extra rigid-body alignment is performed. This measures relaxation from the input, not accuracy against an experimental structure.

## Reading joint docking results {#多配体共同对接的结果怎么读}

In multiple-ligand docking, each mode is a joint pose with a joint score. Do not split member affinity, infer individual contributions or compare systems of different composition as an ordinary ligand ranking.

## Using visualization {#可视化该怎么用}

Check whether a pose lies in the intended region, crowds a box edge or shows obvious clashes. A plausible appearance can motivate further validation; it does not prove binding.

## Responsible descriptions {#一张速查表}

| Observation | Appropriate wording |
| --- | --- |
| Score of −9.0 kcal/mol | “This pose has a calculated score of −9.0 kcal/mol.” |
| Mode 1 ranks first | “Mode 1 is the best-scoring pose found in this search.” |
| Lower score under comparable conditions | “The model assigns a more favorable score.” |
| AD4 versus Vina scores | “Different scoring models cannot be compared directly.” |
| Small RMSD within the output | “The pose is similar to this run's Mode 1.” |

## Related pages {#相关页面}

- [Pose](../part-a/understanding-results/pose.md)
- [Affinity and docking score](../part-a/understanding-results/affinity-and-docking-score.md)
- [Mode ranking](../part-a/understanding-results/mode-ranking.md)
- [RMSD](../part-a/understanding-results/rmsd.md)
- [Result visualization](../part-a/understanding-results/result-visualization.md)
- [Scientific limits](../part-a/understanding-results/scientific-limits.md)
- [Why results differ](./why-results-differ.md)

<DocNotes>

<DocNote number={1} title="Scientific use of the results">

Scores describe a calculation with specific inputs, a docking box, parameters and a Vina version. Docking scores indicate modeled binding trends and cannot replace experimental validation or establish binding, efficacy, safety or clinical value.

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina basic docking documentation, FAQ and manual.
2. AutoDock4.2 User Guide: scoring-model differences.
3. DockStart `backend/dockstart_core/project.py`: score fields and parsing.
4. DockStart `backend/dockstart_core/multiple_ligands.py`: joint-score semantics.

</details>
