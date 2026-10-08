---
title: "Num Modes"
sidebar_position: 3
---

import PoseFilterExplorer from '@site/src/components/interactive/PoseFilterExplorer';
import {PoseFilterModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Num Modes {#num-modes}

`num_modes` sets the maximum number of output binding modes. The default is `9`; a run can save fewer poses.

## What is a mode? {#一个-mode-是什么}

Each mode is a candidate binding pose with a score and RMSD relative to Mode 1. Count saved PDBQT models separately from scoring rows in the log; output also depends on `energy_range`.

## Default and meaning {#默认值和含义}

The setting is an upper limit, not a promised count. See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## Why might fewer poses be saved? {#为什么实际输出可能少于设定值}

The search may find fewer distinct modes, or `energy_range` may filter higher-energy candidates. Candidate scoring rows in the log can exceed the number of saved coordinates. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

<PoseFilterExplorer focus="count" />

## The related min_rmsd setting {#还有一个相关的参数min_rmsd}

`min_rmsd`, default `1.0 Å`, helps remove near-duplicate poses. Together, `min_rmsd`, `num_modes` and `energy_range` determine the distinct modes retained and saved.

## What value should be used? {#应该设成多少}

Start with `9`. Lower it when fewer alternatives are needed; to inspect more poses, consider both `num_modes` and `energy_range`. More modes do not by themselves establish greater reliability.

## In DockStart {#在-dockstart-中}

In v1.0.4, the score list can be parsed from the log while loaded coordinates come from output PDBQT. Count `MODEL` records to determine the saved poses. Check the mode limit, energy range and available distinct candidates when the counts differ. See [Energy Range](./energy-range.md).

<DocNotes>

<DocNote number={1} title="Filtering a fixed candidate set">

<PoseFilterModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation and manual.
2. AutoDock Vina FAQ, *Why don't I get as many binding modes as I specify with "--num_modes"?*

</details>
