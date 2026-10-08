---
title: "Exhaustiveness"
sidebar_position: 2
---

import SearchExplorer from '@site/src/components/interactive/SearchExplorer';
import {SearchModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Exhaustiveness {#exhaustiveness}

Exhaustiveness controls the number of independent Vina searches. It is the main setting for search effort; the default is `8`.

## What does it control? {#exhaustiveness-控制什么}

Each independent search starts from a random pose. `exhaustiveness` sets their count; heuristic rules determine the steps inside each search. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

<SearchExplorer focus="exhaustiveness" />

## Default and range {#默认值和取值范围}

| Property | Value |
| --- | --- |
| Default | `8` |
| Allowed values | Integers `1+` |
| Runtime | Approximately proportional to search effort |

## What happens when it increases? {#调大它会怎样}

More independent searches can improve sampling and stability at the cost of time. The [imatinib/c-Abl tutorial](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst) recommends increasing it from `8` to `32` for that example. More effort does not guarantee a correct pose.

## When should it be increased? {#什么时候需要考虑调大}

Consider it for large boxes, flexible ligands or unstable results after checking the inputs. The official FAQ advises increasing effort for search spaces larger than about `30 × 30 × 30 Å`.

## How does it relate to CPU use? {#它和-cpu-数量有关系}

Independent searches can run in parallel. If their count is below the available CPU count, Vina may not use every CPU fully.

## In DockStart {#在-dockstart-中}

Complete a first workflow using appropriate defaults or the example's stated parameters. If sampling is insufficient, increase exhaustiveness and rerun. This cannot correct a chemically unsuitable input structure.

<DocNotes>

<DocNote number={1} title="About the search model">

<SearchModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina FAQ, *What does "exhaustiveness" really control, under the hood?* and *How big should the search space be?*
2. AutoDock Vina Basic Docking documentation.

</details>
