---
title: "Batch, Multiple and Flexible"
sidebar_position: 7
sidebar_label: "Batch / Multiple / Flexible"
---

# Batch, Multiple and Flexible {#batch--multiple--flexible-的区别}

These features solve different tasks. Batch docks ligands independently; Multiple docks two ligands together; Flexible lets selected receptor side chains move.

## Where to start {#三个功能的入口}

Choose batch screening or multiple-ligand docking from the project workflow. Flexible receptor preparation is configured for a single-ligand project. Confirm the intended task before preparing inputs.

## Three different workflows {#三种方式的对照}

```text
Batch:     one receptor + many ligands → independent runs
Multiple:  one receptor + two ligands  → one joint run
Flexible:  rigid receptor + selected flexible side chains + one ligand
```

## Comparison {#对照表}

| Property | Batch | Multiple | Flexible |
| --- | --- | --- | --- |
| Ligands | 1–500 | Exactly 2 | 1 |
| Receptor | Rigid | Rigid | Selected side chains flexible |
| Task | Global Docking | Global Docking | Compatible single-ligand tasks |
| Score | Independent per ligand | Joint system score | Single-ligand result with a flexible receptor |

## Serial batch screening {#串行批量筛选batch}

DockStart runs one ligand at a time with frozen receptor, box and protocol settings. Limits include 500 ligands, 64 CPUs, exhaustiveness 128, 50 output modes, 126 Å per box axis and 16 MB per ligand input.

Each attempt saves its inputs, configuration, output, stdout, stderr, log and `attempt.json` under:

```text
screening/attempts/<ligand>/attempt_001/
```

Exports include a full CSV, Top N best scores per ligand, Markdown and a read-only archive. Retries and recovery are bounded. Standard AD4 is supported; AD4Zn and hydrated subprotocols are not. Autobox is unavailable. A failed calculation is not evidence that the ligand cannot bind.

## Multiple-ligand docking {#多配体共同对接multiple}

This experimental workflow docks **exactly two ligands together** with a rigid receptor using Global Docking. Vina, Vinardo and standard AD4 are supported.

The score belongs to the joint system. Do not split it into individual ligand scores or compare systems with different compositions as a simple ligand ranking. Precomputed Vina / Vinardo maps, flexible receptors, autobox, Score Only and Local Optimization are unsupported here.

## Flexible receptor {#柔性受体flexible}

Prepare and review the rigid PDBQT, flexible PDBQT and receptor manifest. Preparation records and published files live under `preparation/flexible_receptor/` and `prepared/flexible_receptor/`.

Vina receives the flexible file through `--flex`. Ensure that the rigid and flexible parts are complete and consistent. Returning to a rigid receptor clears incompatible maps and protocol settings. Precomputed Vina / Vinardo maps are incompatible with this flexible workflow; `unbound_energy` is unavailable for flexible Score Only. Extra degrees of freedom increase search cost.

## Which one to use {#什么时候用哪个}

- Compare many ligands independently: Batch.
- Explore a specific two-ligand joint model: Multiple.
- Model selected side-chain movement with one ligand: Flexible.

## Shared requirements {#一条共同的铁律}

Review structure preparation, coordinate frames, the docking box and protocol compatibility. More advanced settings do not remove these requirements.

## Related pages {#相关页面}

- [Batch example](../part-b/cases/batch-docking.md)
- [Multiple-ligand example](../part-b/cases/multiple-ligands-docking-5x72.md)
- [Flexible receptor example](../part-b/cases/flexible-docking-1fpu.md)
- [Task types](./faq-task-types.md), [advanced protocols](./advanced-protocols.md) and [common errors](./common-errors-and-recovery.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart screening and multiple-ligand modules.
2. DockStart flexible receptor preparation and project validation.
3. [AutoDock Vina documentation](https://autodock-vina.readthedocs.io/en/latest/).

</details>
