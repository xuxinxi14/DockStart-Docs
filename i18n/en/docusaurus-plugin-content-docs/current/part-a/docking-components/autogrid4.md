---
title: "AutoGrid4"
sidebar_position: 7
---

# AutoGrid4 {#autogrid4}

AutoGrid4 precomputes spatial interaction grids for an AutoDock4 workflow using the receptor structure. See [AutoDock4](https://ccsb.scripps.edu/autodocksuite/autodock4/).

## What is a grid? {#什么是网格}

A grid samples three-dimensional space at discrete positions. AutoGrid4 evaluates interactions for different atom types at those positions and stores affinity maps. See the [AutoDock4.2.6 User Guide](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf).

## Why precompute these values? {#autogrid4-为什么存在}

Precomputation lets docking query interaction values instead of recalculating the full rigid receptor environment for every candidate position.

## How does AutoGrid4 relate to AutoDock4? {#autogrid4-和-autodock4-是什么关系}

AutoGrid4 produces maps, and AutoDock4 uses them during docking. These are complementary stages of the traditional [AutoDock workflow](https://autodock.scripps.edu/).

## Why does ordinary Vina not require AutoGrid4? {#那-vina-为什么通常不用-autogrid4}

Vina scoring calculates its grids internally. Vina using AutoDock4 scoring can read external AutoGrid4 affinity maps. See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## In DockStart {#在-dockstart-中}

AutoGrid4 is used for AutoDock4 maps and dedicated AD4 protocols. You can complete ordinary Vina docking without running it. The worked examples and setup guide explain the maps workflow when needed.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock and AutoDock4 websites.
2. AutoDock4.2.6 User Guide.
3. AutoDock Vina Basic Docking documentation.
4. AutoGrid GitHub repository.

</details>
