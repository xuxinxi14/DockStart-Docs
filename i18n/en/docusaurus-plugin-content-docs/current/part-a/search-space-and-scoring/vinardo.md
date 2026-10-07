---
title: "Vinardo"
sidebar_position: 5
---

# Vinardo {#vinardo}

Vinardo is an alternative scoring function derived from Vina, with simplified and reparameterized interaction terms. Its name stands for Vina RaDii Optimized. See the [original study](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/).

## How does it relate to Vina? {#vinardo-和-vina-是什么关系}

Both models include steric, hydrophobic and nondirectional hydrogen-bond interactions. Vinardo changes some functional forms, radii and weights and uses fewer parameters.

## What changes in Vinardo? {#vinardo-主要改了什么}

It removes Vina's second Gaussian attraction term and changes radii and weights. This simplifies and reparameterizes the steric contribution.

## Why was it developed? {#为什么要有-vinardo}

The study evaluated an alternative model using redocking, scoring and virtual-screening datasets. Results on those datasets do not establish that Vinardo is better for every target.

## Can its scores be compared directly with Vina scores? {#vinardo-的分数能不能和-vina-的分数直接比较}

No. A Vinardo result of `-8.5` cannot be declared stronger than a Vina result of `-8.0` solely from those values. They come from different parameterizations and scales.

## How is Vinardo selected? {#在-vina-中怎么使用-vinardo}

```text
--scoring vinardo
```

Vina supports `vina`, `vinardo` and `ad4` scoring choices. See the [Vina API source](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/build/python/vina/vina.py).

## In DockStart {#在-dockstart-中}

Changing the scoring function changes the standard used to evaluate poses. Check the selected model before comparing results.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Trott & Olson, *AutoDock Vina*.
2. *Vinardo: A Scoring Function Based on AutoDock Vina Improves Scoring, Docking, and Virtual Screening*.
3. AutoDock Vina documentation and source code.

</details>
