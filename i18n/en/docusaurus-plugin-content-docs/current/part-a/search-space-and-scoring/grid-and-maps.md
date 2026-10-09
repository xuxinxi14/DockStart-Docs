---
title: "Grid / Maps"
sidebar_position: 2
---

import GridMapExplorer from '@site/src/components/interactive/GridMapExplorer';
import {GridMapModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Grid / Maps {#grid--maps}

Grids and maps represent spatial interaction information around the receptor. Their use differs between docking workflows.

## What is a grid? {#什么是-grid}

A grid divides three-dimensional space into sampled positions where interaction values can be represented or queried.

## What are maps? {#什么是-maps}

Maps store interaction information at grid positions. AutoDock4 maps include atom-type-specific affinity maps, such as `A`, `C`, `HD`, `N`, `OA` and `SA`, plus electrostatic and desolvation maps. See the [AutoDock4.2.6 User Guide](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf).

## How do Vina and AutoDock4 use maps? {#vina-和-autodock4-的-maps-有什么区别}

### Ordinary Vina docking {#普通-vina-docking}

Vina scoring handles the grids internally. Supply the receptor, ligand and box without preparing external AutoGrid4 maps. See the [Vina manual](https://vina.scripps.edu/manual/).

### AutoDock4 workflows {#autodock4-工作流}

AutoGrid4 first generates affinity maps. The docking engine then reads them to evaluate poses with AD4 scoring.

## Is a box the same as a grid? {#box-和-grid-是不是一个东西}

The box defines where to search. Grids/maps describe how space and interactions are represented for computation.

<GridMapExplorer />

## In DockStart {#在-dockstart-中}

For basic Vina docking, focus on correct box placement. For the AutoDock4 maps workflow, prepare and validate maps that match the receptor, box, protocol and ligand atom types.

<DocNotes>
  <DocNote number={1} title="Scope of the interactive model"><GridMapModelNote /></DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina manual.
2. AutoDock4.2.6 User Guide and AutoDock documentation.
3. Meeko, `mk_prepare_receptor.py`.

</details>
