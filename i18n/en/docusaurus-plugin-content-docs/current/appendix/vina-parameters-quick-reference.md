---
title: "Vina Parameter Reference"
sidebar_position: 2
sidebar_label: "Vina parameters"
---

# Vina Parameter Reference {#vina-参数速查表}

DockStart writes most settings into a configuration file read by `vina --config`. Task and protocol switches such as `--maps`, `--scoring`, `--score_only`, `--local_only`, `--out`, `--autobox` and `--flex` are also passed on the command line.

## How to use this page {#怎么用这一页}

Check defaults, scope and limits below. Inspect a run's `config_snapshot.txt` when diagnosing the actual configuration. Concept explanations are in [search and parameters](../part-a/search-and-parameters/vina-search-process.md).

## Docking box {#box-类}

| Parameter | Default | Requirements |
| --- | --- | --- |
| `center_x`, `center_y`, `center_z` | `0` | Finite numbers, in Å |
| `size_x`, `size_y`, `size_z` | `20` | Positive; above 60 Å warns; batch maximum 126 Å per axis |

The box applies to Global Docking or tasks without autobox. Autobox omits center and size from the configuration. Batch queues freeze their box settings; later edits do not change an existing queue.

## Search settings {#搜索类}

| Parameter | Default | Range and scope |
| --- | --- | --- |
| `scoring` | `vina` | Direct single-project settings: `vina`, `vinardo`; batch: also `ad4` with required maps |
| `exhaustiveness` | `8` | Positive; documented boundary 1–128, above 64 warns; Global Docking |
| `num_modes` | `9` | Positive; documented boundary 1–50; Global Docking |
| `max_evals` | `0` (automatic) | 0–2147483647; above 1,000,000 warns; Global Docking |
| `min_rmsd` | `1` | 0–100 Å; Global Docking |
| `energy_range` | `4`; batch `3` | Positive, documented boundary up to 20; above 10 warns; Global Docking |
| `spacing` | `0.375` | 0.1–2.0 Å; below 0.25 or above 0.75 warns; not AD4 or precomputed maps |
| `seed` | Blank (automatic) | Single-project range 0–2147483647; batch also accepts negative values; Global Docking when specified |
| `cpu` | `0` (automatic); batch `1` | Single-project range 0–64; batch 1–64; all tasks |

Check the separate batch defaults before comparing a single run with a screen.

## Output settings {#输出类}

`verbosity` defaults to `1` and accepts only `1` or `2`; `0` is rejected. It is written for all paths, including AD4. Higher verbosity produces more detailed logs.

## Advanced settings {#高级类}

| Parameter | Default | Scope / minimum stable Vina version |
| --- | --- | --- |
| `no_refine` | `false` | Non-AD4, non-precomputed-map path; 1.2.4+ |
| `force_even_voxels` | `false` | Non-AD4, non-precomputed-map path; 1.2.0+ |
| `unbound_energy` | Blank | Rigid, single-ligand Score Only when specified; 1.2.4+ |
| `autobox` | `false` | Score Only / Local Optimization; not AD4 maps; 1.2.3+ |

Boolean configuration switches are emitted when true. Unbound energy is emitted only when specified.

## Version gates {#版本门槛全表}

| Capability | Option | Minimum stable Vina |
| --- | --- | --- |
| Multiple ligands | `--ligand` | 1.2.0 |
| Read maps | `--maps` | 1.2.0 |
| Write maps | `--write_maps` | 1.2.0 |
| Autobox | `--autobox` | 1.2.3 |
| Disable receptor refinement | `--no_refine` | 1.2.4 |
| Unbound energy reference | `--unbound_energy` | 1.2.4 |
| Even voxel counts | `--force_even_voxels` | 1.2.0 |

DockStart checks both the semantic version and advertised options in `vina --help_advanced`. A prerelease such as `1.2.4-rc1` does not satisfy stable 1.2.4. Unsupported features are blocked rather than silently downgraded.

## Scoring-function validation {#评分函数的白名单差异}

Direct single-project Vina settings accept `vina` and `vinardo`. AD4 needs its dedicated maps workflow; entering `ad4` into the ordinary settings can produce `VINA_SCORING_INVALID`. Batch accepts AD4 only with the required map protocol and compatible inputs.

## Grid memory estimate {#网格内存是怎么算的}

```text
Intervals per axis = max(1, ceil(size / spacing))
If even voxels are enabled, round odd intervals up to even
Points per axis = intervals + 1
Total points = X × Y × Z
Map count = unique movable atom types (fallback: 4)
Estimated bytes = total points × map count × 8
```

The warning threshold is **512 MiB**; the hard limit is **2 GiB**, producing `VINA_GRID_RESOURCE_LIMIT_EXCEEDED`. Finer spacing affects all three axes and increases memory rapidly. Batch uses the largest per-ligand estimate for the queue's gate.

## Where to find the settings {#界面在哪一页}

| Group | Interface |
| --- | --- |
| Global defaults | Settings |
| Six box values | Box Setup |
| Basic Vina settings | Vina Parameters |
| Full applicable form and advanced switches | Run Preparation |

The interface hides or disables options that do not apply to the task or protocol. Check [advanced protocols](../part-c/advanced-protocols.md) when an option is unavailable.

## Related pages {#相关页面}

- [Search process](../part-a/search-and-parameters/vina-search-process.md)
- [Advanced parameters](../part-a/search-and-parameters/advanced-parameters.md)
- [Docking box](../part-a/search-space-and-scoring/search-box.md)
- [Vina](../part-a/search-space-and-scoring/vina-scoring.md), [Vinardo](../part-a/search-space-and-scoring/vinardo.md) and [AD4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- [Common errors](../part-c/common-errors-and-recovery.md)
- [Projects and reproducibility](../part-c/projects-versions-reproducibility.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart project and settings models, validation and grid resource gates.
2. DockStart screening models and resource limits.
3. DockStart Vina adapter and feature gates.
4. DockStart parameter, box, run preparation and settings forms.
5. AutoDock Vina manual and advanced command-line help.

</details>
