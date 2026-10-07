---
title: "Why Results Differ"
sidebar_position: 8
sidebar_label: "Why results differ"
---

# Why Results Differ {#为什么结果不一致}

Compare the actual inputs and recorded run conditions before attributing a difference to randomness or a software defect.

## Start with the run records {#从运行记录开始排查}

Inspect `metadata.json`, `config_snapshot.txt`, input snapshots, tool versions and the recorded command. Matching filenames do not establish matching file contents; compare hashes.

## Set realistic expectations {#先建立正确的期待}

Docking is a stochastic search under a specific molecular model. Reproducibility requires controlled inputs, settings and software. A reproducible result can still use an inappropriate scientific model.

## Factors that can change results {#可能影响结果的因素}

### 1. Input structures {#1-输入结构}

Chains, waters, metals, cofactors, alternate locations and missing atoms can change the modeled system. Compare the frozen structures rather than their names.

### 2. Structure preparation {#2-结构准备}

Hydrogens, protonation, charges, atom typing and stereochemistry affect the input. Record preparation tools and versions.

### 3. Docking box {#3-box搜索空间}

Different centers or dimensions define a different search region. Compare all six values.

### 4. Scoring function {#4-评分函数}

Vina, Vinardo and AD4 use different models. Their numerical scores are not interchangeable.

### 5. Exhaustiveness {#5-搜索彻底程度}

More search effort can find a different minimum. Keep it fixed for controlled comparisons.

### 6. Random seed {#6-随机种子seed}

A default or automatically chosen seed may vary. Record the seed actually printed by Vina, not just a UI default. The documented example configured zero and reported `-1622165383` as the actual seed.

### 7. CPU and parallel execution {#7-cpu-与并行方式}

Thread and execution settings are part of the run conditions. Record them when assessing reproducibility.

### 8. DockStart version {#8-dockstart-版本}

Changes in defaults, validation and command assembly can change the workflow. Save the application version.

### 9. External tool versions {#9-第三方工具版本}

Record Vina and the preparation and map-generation tools used. A changed preparer can change the PDBQT even with the same raw input.

### 10. Runtime environment {#10-运行环境}

Operating systems and builds can differ even when a displayed tool version matches. Record the environment and actual executable used.

## A practical diagnostic order {#排查顺序从最确定的地方开始}

1. Compare exact frozen input hashes.
2. Compare the box, scoring model and complete settings.
3. Use a fixed seed and compare the actual seed in the logs.
4. Compare tool versions, executable sources and commands.
5. Review the environment if differences remain.

## Is changing the seed useful? {#换种子有用吗}

Multiple controlled seeds can help assess search variability. They cannot fix an incorrect structure or box. If fixed-seed runs still differ, investigate the other conditions rather than assuming the seed is the only cause.

## Common misconceptions {#一个常见误区}

Different results do not automatically imply a bug. A fixed seed alone does not establish reproducibility, and reproducing a score does not establish a correct binding pose.

## Related pages {#相关页面}

- [Random seed](../part-a/search-and-parameters/seed.md)
- [Exhaustiveness](../part-a/search-and-parameters/exhaustiveness.md)
- [Interpreting results](./interpreting-results.md)
- [Projects, versions and reproducibility](./projects-versions-reproducibility.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. [AutoDock Vina FAQ](https://autodock-vina.readthedocs.io/en/latest/faq.html).
2. AutoDock Vina basic docking tutorial.
3. DockStart project records and Vina adapter.

</details>
