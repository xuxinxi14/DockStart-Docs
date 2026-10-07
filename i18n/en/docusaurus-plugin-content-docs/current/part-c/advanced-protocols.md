---
title: "Advanced Protocol Scope"
sidebar_position: 11
sidebar_label: "Advanced protocols"
---

# Advanced Protocol Scope {#高级协议的适用范围}

Choose a protocol for its assumptions and your scientific question. An advanced feature does not automatically produce a more accurate result.

## Check the requirements first {#使用前先核对适用条件}

Review the supported system, extra inputs and required tool versions. Flexible receptors, precomputed maps, AD4Zn and hydrated AD4 solve different modeling problems.

## Combining protocols {#哪些协议不能组合}

Only supported combinations can run. For example, flexible side chains expand the search space and require a suitable receptor model; they are not a general improvement for every screen.

## Maturity labels {#成熟度标记}

| Registered protocol | Label |
| --- | --- |
| Standard rigid, single-ligand workflow | `stable` |
| AD4Zn | `beta` |
| Hydrated AD4 | `experimental` |
| Multiple-ligand docking | `experimental` |

These labels describe protocols, not acceptance of the application release. AutoDock4 maps, Vina / Vinardo maps, flexible receptors and serial batch screening are not covered by this registry's maturity contract. Do not assign them a `stable` label from that table.

## Overview {#各协议一览}

| Protocol | Additional assumption or input | Requirement / main scope |
| --- | --- | --- |
| Flexible receptor | Selected side chains may move | Reviewed rigid/flexible receptor files and manifest; incompatible with precomputed Vina / Vinardo maps |
| Multiple ligands | Two ligands present together | Exactly two prepared ligands; rigid receptor and Global Docking |
| AD4Zn | Mononuclear, three-coordinate zinc site | External AutoGrid4 4.2.7+ and user-provided `AD4Zn.dat`; single-ligand Global Docking |
| Hydrated AD4 | Explicit water participates | Meeko and external AutoGrid4; experimental single-ligand subprotocol |
| AutoDock4 maps | AD4 grid scoring | External AutoGrid4 4.2.6+; check workflow compatibility below |
| Precomputed Vina / Vinardo maps | Grid-only, no-refine calculation | Rigid receptor, one ligand, Global Docking |
| Macrocycle | Explicit treatment of ring flexibility | Preparation workflow; Meeko 0.7.1 and 3D coordinates |

## Flexible receptor {#柔性受体flexible}

Use selected flexible side chains when their movement is relevant and the structure supports the choice. Prepare and review all three receptor artifacts before changing mode. Returning to a rigid receptor clears incompatible map settings. Precomputed Vina / Vinardo maps cannot be combined with this workflow.

## Multiple-ligand docking {#多配体共同对接multiple}

Use it for a model in which two ligands are present simultaneously. The score describes the joint system and cannot be split into member scores. Use batch screening for independent ligand rankings; see [Batch / Multiple / Flexible](./batch-multiple-flexible.md).

## AD4Zn {#ad4znzinc}

AD4Zn beta targets **mononuclear, three-coordinate zinc** sites. It does not automatically support other metals or multinuclear sites.

The geometry, usable TZ pseudoatom, `AD4Zn.dat` and AutoGrid4 4.2.7+ must all meet the requirements. A failure blocks the run without falling back to standard AD4.

Provide the parameter file yourself; it is not bundled or downloaded automatically. After explicit selection, DockStart copies it into the project and records its source path, SHA256, license ID and pinned upstream reference. Sharing a project containing that copy requires observing the applicable GPL redistribution terms.

## Hydrated AD4 {#水合-ad4hydrated}

Use this experimental protocol when water has an explicit, supported role in the model. It has a dedicated preparation, map-generation and postprocessing chain, producing water-retaining and dry ligand files and a water manifest.

Its scores are not intended for virtual screening or direct comparison across ligands, scoring functions or protocols.

## AutoDock4 maps {#autodock4-maps}

External AutoGrid4 4.2.6+ generates maps; **Vina performs the search with `--scoring ad4`**. Do not assume equivalence with the native AutoDock4 program or compare AD4 scores directly with Vina / Vinardo scores. Standard AD4 rejects zinc and directs the user to the dedicated protocol.

## Precomputed Vina / Vinardo maps {#vina--vinardo-预计算-maps}

This workflow reuses a frozen map set for rigid, single-ligand Global Docking. It is grid-only and equivalent to `no-refine`; the run does not pass the receptor, box or spacing again. Regenerate maps when their defining inputs change.

These maps and manifests are separate from AD4 maps. Flexible receptors, Score Only and Local Optimization are unsupported.

## Macrocycles {#大环macrocycle}

Macrocycle support belongs to preparation, not a separate run task. Review the structure, confirm the candidate ring break and prepare with supported Meeko 0.7.1. The ligand must already have 3D coordinates.

## Compatibility limits {#组合限制总表}

All combinations below are blocked:

| Combination | Error code |
| --- | --- |
| Multiple + flexible receptor | `MULTIPLE_LIGAND_RIGID_RECEPTOR_REQUIRED` |
| Multiple + Score Only / Local Optimization | `MULTIPLE_LIGAND_GLOBAL_SEARCH_REQUIRED` |
| Multiple + precomputed Vina maps | `MULTIPLE_LIGAND_PRECOMPUTED_MAPS_UNSUPPORTED` |
| Multiple + AD4Zn / hydrated | `MULTIPLE_LIGAND_AD4_SUBPROTOCOL_UNSUPPORTED` |
| Multiple + autobox | `MULTIPLE_LIGAND_AUTOBOX_UNSUPPORTED` |
| Batch + flexible receptor | `SCREENING_RIGID_RECEPTOR_REQUIRED` |
| Batch + Score Only / Local Optimization | `SCREENING_GLOBAL_SEARCH_REQUIRED` |
| Batch + AD4Zn / hydrated | `SCREENING_AD4_SUBPROTOCOL_UNSUPPORTED` |
| Precomputed Vina maps + flexible receptor | `MAPS_FLEXIBLE_RECEPTOR_UNSUPPORTED` |
| Precomputed Vina maps + Score Only / Local Optimization | `VINA_MAPS_RUN_MODE_UNSUPPORTED` |
| AD4Zn + Score Only / Local Optimization | `AD4ZN_RUN_MODE_UNSUPPORTED` |

## Related pages {#相关页面}

- [Batch / Multiple / Flexible](./batch-multiple-flexible.md)
- [Grid and maps](../part-a/search-space-and-scoring/grid-and-maps.md)
- [Vina scoring](../part-a/search-space-and-scoring/vina-scoring.md), [Vinardo](../part-a/search-space-and-scoring/vinardo.md) and [AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- [Interpreting results](./interpreting-results.md)
- [Common errors and recovery](./common-errors-and-recovery.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart `backend/dockstart_core/capabilities.py`: protocol maturity registry.
2. DockStart `ad4zn.py` and `autogrid.py`: zinc requirements and version gates.
3. DockStart `hydrated.py` and `hydrated_run.py`: hydrated protocol.
4. DockStart `vina_maps.py`, `flexible_receptor.py` and `macrocycle.py`.
5. AutoDock Vina manual, AutoDock4.2 User Guide and Meeko documentation.

</details>
