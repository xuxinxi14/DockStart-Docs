---
title: "Energy Range"
sidebar_position: 4
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Energy Range {#energy-range}

Energy Range limits how much worse than the best mode a pose can score and still be written to the output file. Its default is `3 kcal/mol`. It filters output rather than controlling search effort.

## What does it filter? {#energy-range-过滤什么}

Vina ranks candidate modes, then saves those within the allowed energy difference. See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

```text
Best score     = -13.23
energy_range   = 3
Save poses with score ≤ -13.23 + 3 = -10.23
```

## Default and meaning {#默认值和取值范围}

The default `3 kcal/mol` is an energy tolerance relative to the best mode. Higher-energy candidates can appear in the terminal score table without being written to PDBQT.

## How does it relate to Num Modes? {#它和-num-modes-的关系}

`num_modes` caps the pose count; `energy_range` filters by energy difference. Together they limit saved `MODEL` records. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

## What happens when it increases? {#调大它会怎样}

It permits higher-energy alternatives to be saved, subject to the search results and `num_modes`. For a fixed set of candidates, widening the range does not improve the best pose. Adjust inputs, box or search effort to address those issues.

## In DockStart {#在-dockstart-中}

The score table can contain more rows than `out.pdbqt` contains models.<NoteRef number={1}/>

For example, a particular 1IEP demonstration used `num_modes=9`, `energy_range=4` and a best score around −13.2: the log had nine score rows, but the file saved five poses. This is a fact about that run, not a fixed outcome for every run.

Start with the default range. Increase it when you need more alternatives, and assess geometry and validation rather than interpreting higher energy alone as a reliability measure.

<DocNotes>
<DocNote number={1} title="Score rows and saved coordinates">

DockStart v1.0.4 can parse `scores.csv` from the log. Vina 1.2.7 filters structures by `energy_range` when writing poses after printing candidate scores. A listed mode may therefore lack saved coordinates. See [global_search and get_poses](https://github.com/ccsb-scripps/AutoDock-Vina/blob/v1.2.7/src/lib/vina.cpp).

</DocNote>
</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation and manual.
2. AutoDock Vina FAQ, *Why don't I get as many binding modes as I specify with "--num_modes"?*

</details>
