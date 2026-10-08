---
title: "How Vina searches"
sidebar_position: 1
---

import SearchExplorer from '@site/src/components/interactive/SearchExplorer';
import {SearchModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# How Vina searches {#vina-搜索过程}

Vina runs independent searches that repeatedly perturb a pose, locally optimize it and decide whether to accept the change. It then combines, refines, deduplicates and ranks candidates.

## Before search: compute the grids {#搜索开始前先把网格算出来}

With Vina scoring, the engine computes the required grids internally from the receptor and box before docking. AD4 workflows instead use external AutoGrid4 maps. See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## A docking calculation contains multiple searches {#一次-docking-不等于跑一次}

Each independent search starts from a random conformation. Its successive steps involve random perturbation, BFGS local optimization and an acceptance decision. BFGS evaluates the score and its derivatives over position, orientation and torsions. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

<SearchExplorer />

## What determines search steps and search count? {#步数和运行次数分别由谁决定}

| Setting | Determines |
| --- | --- |
| Heuristic rules based on size and flexibility | Steps within an independent search |
| `exhaustiveness` | Number of independent searches |

## Promising intermediate results are retained {#中间结果不会被浪费}

The independent searches can retain multiple promising candidates. Vina combines, refines, clusters and ranks them to form the final mode list.

## Search results can vary {#搜索结果不是唯一的}

Random starting points affect what the search finds. Even if the scoring minimum corresponds to the desired pose, a run may miss it. A run reports the best candidates it found, not a unique answer for the system.

## In DockStart {#在-dockstart-中}

Review the inputs and box first. `exhaustiveness` changes search effort, the box changes the region, and `seed` controls the random starting sequence. These settings are explained in the following articles.

<DocNotes>

<DocNote number={1} title="About the search model">

<SearchModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina FAQ, *What does "exhaustiveness" really control, under the hood?*
2. AutoDock Vina FAQ, *Why is my docked conformation different from what you get in the video tutorial?*
3. AutoDock Vina Basic Docking documentation and manual.

</details>
