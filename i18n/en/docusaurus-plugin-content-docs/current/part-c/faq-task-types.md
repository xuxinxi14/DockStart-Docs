---
title: "Global / Score / Local FAQ"
sidebar_position: 6
sidebar_label: "Global / Score / Local"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Global / Score / Local FAQ {#global--score--local-faq}

Choose the task according to whether you want to search for poses, score an existing pose or optimize one locally.

## Choose the run mode first {#先选运行模式}

Global Docking is the usual starting point. Score Only and Local Optimization require a ligand pose already placed in the receptor's coordinate frame. Batch screening supports rigid-receptor Global Docking only.

## The three tasks {#三种任务分别是什么}

| Task | What it does | Main result |
| --- | --- | --- |
| Global Docking (`dock`) | Search the box for candidate poses | Ranked poses and scores |
| Score Only (`score_only`) | Evaluate the supplied pose without searching | Energy evaluation |
| Local Optimization (`local_only`) | Optimize near the supplied pose | Optimized pose and comparison with the input |

## Score Only {#姿势评分score-only}

Use it to evaluate a reviewed input pose. It does not search for a better binding location, and a favorable score does not validate the pose. The result is recorded in `evaluation.json`; the command does not request a docking `--out` file.

## Local Optimization {#局部优化local-optimization}

DockStart first scores the frozen input pose, then optimizes locally. Inspect `optimized.pdbqt`, `baseline_stdout.txt` and `evaluation.json`, including the optimized-minus-input energy difference.

Displacement measures include heavy-atom RMSD, mean and maximum displacement, and centroid movement without alignment. The 3D comparison shows the frozen input in thin cyan and the optimized pose in thick orange. These measure change from your input, not agreement with a crystal structure.

## Why the tasks cannot be treated as equivalent {#为什么三者不能混为一谈}

Global Docking explores a search region; Score Only evaluates your pose; Local Optimization starts near it. Different starting conditions and tasks make their scores unsuitable for an uncontrolled ranking.

## Confirm the input pose {#用评分或局部优化时必须先确认输入姿势}

Before scoring or local optimization, review placement relative to the receptor and explicitly confirm the input pose. Reconfirm after a relevant input changes.<NoteRef number={1}/>

## Advanced option scope {#高级选项的适用范围}

| Option | Supported scope |
| --- | --- |
| `autobox` | Non-global tasks; unavailable with AD4 maps |
| `unbound_energy` | Rigid receptor, one ligand, Score Only |
| `max_evals` / `min_rmsd` | Not exposed for Local Optimization in this interface |

Autobox requires stable Vina 1.2.3+ and `unbound_energy` requires stable Vina 1.2.4+.<NoteRef number={2}/>

## Which task to use {#什么时候该用哪个}

- Search for candidate binding poses: Global Docking.
- Evaluate a pose whose placement you have already reviewed: Score Only.
- Relax a reviewed pose locally: Local Optimization.

## Related pages {#相关页面}

- [Three calculation tasks](../part-b/task-types.md)
- [Advanced parameters](../part-a/search-and-parameters/advanced-parameters.md)
- [Interpreting results](./interpreting-results.md)
- [Advanced protocols](./advanced-protocols.md)

<DocNotes>

<DocNote number={1} title="What pose confirmation records">

Confirmation is associated with frozen SHA256 snapshots of the receptor, flexible part when present, and ligand. It records your review; it does not prove geometric or scientific correctness automatically.

</DocNote>

<DocNote number={2} title="Stable-version checks">

Version gates distinguish prereleases from stable versions. For example, `1.2.4-rc1` does not satisfy a stable 1.2.4 minimum.

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart project run-mode definitions and Vina adapter.
2. DockStart Vina feature gates.
3. [AutoDock Vina documentation](https://autodock-vina.readthedocs.io/en/latest/).

</details>
