---
title: "Mode ranking"
sidebar_position: 4
---

# Mode ranking {#mode-排序}

Vina ranks candidate poses by their calculated score. Mode 1 is the lowest-scoring candidate found in that run.

## How are modes ranked? {#排序是按照什么排的}

Lower, more negative affinity values appear first within the same scoring model. See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## What happens before ranking? {#排序之前的几步处理}

Candidates are combined, refined and deduplicated before ranking and output filtering. `min_rmsd` removes near-duplicates; `num_modes` and `energy_range` limit saved results.

## Why does the count vary? {#为什么-mode-数量会变化}

The count depends on distinct candidates, the default `min_rmsd=1.0 Å`, the mode cap and energy filtering. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

## Is the first-ranked pose necessarily correct? {#排序第一就一定是正确结合方式吗}

It is the best found under the current model. Approximate search and scoring cannot establish the real binding mode or experimental affinity.

## A practical way to inspect the ranking {#更实用的读法}

Inspect a group of leading modes and compare their RMSD and locations. Similar leading candidates may support a shared binding hypothesis. Widely separated candidates merit review of the search region and possible alternative sites.

## In DockStart {#在-dockstart-中}

Begin with Mode 1, then inspect alternatives. If rankings vary substantially between repeated runs, review inputs and box placement and consider greater search effort.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation and manual.
2. AutoDock Vina FAQ, *Why don't I get as many binding modes as I specify with "--num_modes"?* and *Why do I not get the correct bound conformation?*

</details>
