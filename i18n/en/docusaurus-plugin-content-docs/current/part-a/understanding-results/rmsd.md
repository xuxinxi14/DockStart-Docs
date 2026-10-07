---
title: "RMSD and RMSD l.b. / u.b."
sidebar_position: 3
---

# RMSD and RMSD l.b. / u.b. {#rmsd含-rmsd-lb--ub}

RMSD measures geometric differences between poses. Vina's `rmsd l.b.` and `rmsd u.b.` compare each mode with the best mode in that run, Mode 1.

## What is RMSD? {#rmsd-是什么}

Root-mean-square deviation is calculated from differences between atom coordinates and is expressed in Å. Larger values indicate greater positional differences for the chosen matching method.

## The two Vina output columns {#vina-输出的两个-rmsd}

```text
mode |   affinity | dist from best mode
     | (kcal/mol) | rmsd l.b.| rmsd u.b.
-----+------------+----------+----------
1       -13.23          0          0
2       -11.29     0.9857      1.681
3       -11.28      3.044      12.41
```

Mode 1 is the reference and has `0 / 0`. The other rows describe distances from that mode. See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## How do the columns differ? {#两者有什么区别}

| Column | Matching method |
| --- | --- |
| `rmsd u.b.` | Compare atoms in the same order; chemical symmetry is ignored |
| `rmsd l.b.` | Match each heavy atom to its nearest heavy atom of the same element in the other pose |

For l.b., Vina calculates the nearest-element measure in both directions and takes the larger value to make it symmetric. Thus `rmsd l.b. ≤ rmsd u.b.`. The upper-bound measure does not perform symmetry correction. See the [output definitions](https://vina.scripps.edu/manual/#output).

## Details that matter {#几个容易被忽略的细节}

The comparison does **not** align the poses first: it uses their coordinates in the shared receptor frame. It uses movable heavy atoms, including flexible receptor side chains when present. Output hydrogen orientations should not be treated as physically precise. See the [FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

## How should the values be read? {#怎么用它}

Consider scores and RMSD together. Small distances can indicate similar arrangements; large ones indicate another position, orientation or conformation. In the example, Mode 2 is close to Mode 1, whereas Mode 3 has an upper-bound distance of `12.41 Å`.

## Distinguish reference-structure RMSD {#和其他-rmsd-用法要区分开}

Redocking validation compares a prediction with a known experimental ligand. That reference differs from the Vina table's Mode 1. A `0 / 0` for Mode 1 is not proof that the crystal pose was reproduced.

## In DockStart {#在-dockstart-中}

Use the table to compare modes within the run. To evaluate a predicted pose against a crystal ligand, supply the appropriate reference and perform a separate pose comparison.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation, manual and FAQ.
2. Vina source, `src/lib/model.cpp`: `rmsd_lower_bound` and `rmsd_upper_bound`.

</details>
