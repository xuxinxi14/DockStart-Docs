---
title: "Advanced parameters"
sidebar_position: 7
---

# Advanced parameters {#高级参数}

Vina has options for task type, scoring functions, grid details and scoring weights in addition to the common search and output parameters.

## The main option groups {#先建立一个总体印象}

Options cover inputs, scoring, search space, output, task type, grids and execution settings. See the [official command-line help in Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## Change the task type {#改变任务的类型}

| Option | Purpose |
| --- | --- |
| `--score_only` | Score the current pose; no user-defined search box is needed |
| `--local_only` | Perform local optimization without global search |
| `--randomize_only` | Randomize input coordinates while seeking to avoid clashes |

`--score_only` can also use `--unbound_energy` to specify the unbound-system energy.

## Select the scoring function {#切换评分函数}

Use `--scoring vina`, `--scoring vinardo` or `--scoring ad4`. AD4 requires AutoGrid4 affinity maps, so its setup differs from ordinary Vina docking.

## Control grid details {#控制网格细节}

| Option | Purpose |
| --- | --- |
| `--maps` | Read existing affinity maps |
| `--write_maps` | Write calculated grids |
| `--spacing` | Grid spacing; default `0.375 Å` |
| `--force_even_voxels` | Use an even number of voxels in each direction |
| `--no_refine` | Use grids instead of explicit receptor atoms for refinement/scoring when a receptor is supplied |

These settings normally remain unchanged for a first workflow.

## Other search and scoring options {#与打分和搜索相关的其他选项}

| Option | Purpose |
| --- | --- |
| `--min_rmsd` | Pose deduplication threshold; default `1.0 Å` |
| `--max_evals` | Evaluation limit per search; `0` selects heuristic behavior |
| `--verbosity` | `0` silent, `1` normal, `2` detailed |
| `--autobox` | Set bounds from the input ligand for score/local tasks |

## Change scoring weights {#人工调整评分权重}

The [FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst) illustrates `--weight_hydrogen -1.2`, which doubles the hydrogen-bond contribution in its example. Changing weights changes the model, so these scores cannot be compared directly with default-weight results. Keep defaults unless there is a clear study-specific reason.

## Batch runs {#批量运行}

Vina supports `--batch` with ligand inputs and `--dir` for the required output directory. Consult the exact command-line syntax for your platform and input list.

## In DockStart {#在-dockstart-中}

Some options appear as task types or settings. First complete an ordinary workflow and understand the box, exhaustiveness and output controls; use advanced options when the task requires them.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation and manual.
2. AutoDock Vina FAQ, *How can I tweak the scoring function?*
3. `vina --help_advanced`.

</details>
