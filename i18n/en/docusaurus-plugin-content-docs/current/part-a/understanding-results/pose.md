---
title: "Pose"
sidebar_position: 1
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

import PoseExplorer from '@site/src/components/interactive/PoseExplorer';
import {LigandModelNote} from '@site/src/components/interactive/TeachingNotes';

# Pose {#pose}

A pose is a candidate binding arrangement: the ligand's position, orientation and conformation, together with its score.

## What information defines a pose? {#一个-pose-包含哪些信息}

Position locates the ligand in the site; orientation determines its direction; torsions determine its permitted shape. Together these define the arrangement.

<PoseExplorer initialMode="orientation" />

## What does a pose look like in the output? {#pose-在输出里长什么样}

Saved poses appear as `MODEL` records in PDBQT, with score remarks such as:

```text
REMARK VINA RESULT:   -13.23  0.000  0.000
```

The terminal also prints a mode score table. Loadable poses must have coordinates in the output file; the table can contain additional candidates.<NoteRef number={1}/>

## Is a pose an answer or a candidate? {#pose-是答案还是候选}

It is a candidate favored by the computational model after merging, refinement, deduplication and ranking. It is not an experimentally observed structure.

## Why are there multiple poses? {#为什么会有多个-pose}

Candidates may occupy different subpockets, or differ in orientation and conformation within one region. `num_modes` and `energy_range` control the saved alternatives.

## In DockStart {#在-dockstart-中}

Select the correct run, inspect the first saved pose, then compare alternatives with similar energies. Examine whether their locations and contacts support the intended binding hypothesis.

<DocNotes>
<DocNote number={1} title="Saved pose count">

Vina 1.2.7 also applies `energy_range` when writing coordinates. Check scores and saved structures separately. See [Energy Range](../search-and-parameters/energy-range.md).

</DocNote>
<DocNote number={2} title="About the ligand model">

<LigandModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation, manual and FAQ.

</details>
