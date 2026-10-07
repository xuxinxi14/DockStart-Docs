---
title: "Docking Box and Maps FAQ"
sidebar_position: 5
sidebar_label: "Box and maps"
---

# Docking Box and Maps FAQ {#box-与-maps-faq}

Set the docking box to cover the intended site. Maps represent the scoring grid used within a defined search region.

## Check these six values {#先确认这六个数}

Review `center_x`, `center_y`, `center_z` and `size_x`, `size_y`, `size_z`, all in Å. The default center is zero and the default side lengths are 20 Å; these are starting values, not a predicted binding site.

## What is the docking box? {#box-到底是什么}

It defines the region available for the search. Use a co-crystal ligand, site residues or other evidence, and check the box in 3D against the prepared receptor and ligand.

## What does Locate receptor do? {#点定位到受体之后它做了什么}

Locate receptor (「定位到受体」) uses `(minimum + maximum) / 2` along each receptor coordinate axis. It does not identify a pocket or change the box dimensions.

## What if the box is too small? {#box-太小会怎样}

It may exclude relevant regions or prevent adequate sampling. Inspect poses near the boundary and enlarge the box when needed to cover the intended site.

## What if the box is too large? {#box-太大会怎样}

Search costs increase and poses may appear on unrelated surfaces. Prefer a box that covers the target region with enough room for the ligand rather than the whole protein by default.

## What limits does DockStart apply? {#dockstart-对-box-有哪些限制}

| Condition | Handling |
| --- | --- |
| Any side length is zero or negative | Blocked |
| Any side exceeds 60 Å | Warning |
| Estimated grid memory above 512 MiB | Warning |
| Estimated grid memory above 2 GiB | Blocked |
| Batch box side above 126 Å | Blocked |

Grid dimensions scale approximately as `ceil(size / spacing) + 1`. Finer spacing increases memory use rapidly.

## Common box problems {#常见-box-设置问题}

| Symptom | Action |
| --- | --- |
| Box misses the site | Check the center and coordinate frame |
| Poses crowd the edge | Inspect coverage and enlarge if needed |
| Run is slow | Review box size and spacing |
| Grid resource limit | Reduce the box or use suitable coarser spacing |
| Changed box gives different results | Treat the runs as different search conditions |

## Are box and maps the same thing? {#grid--maps-和-box-是一回事吗}

The box defines where to search. Maps encode scoring information on a grid. Changing the receptor, box or relevant map settings can require regeneration.

## Ordinary Vina versus AutoDock4 maps {#普通-vina-和-autodock4-maps-有什么区别}

Ordinary Vina / Vinardo calculates its own grid. For AutoDock4 maps, external AutoGrid4 generates maps and Vina runs with `--maps` and `--scoring ad4`. This is distinct from running the native AutoDock4 executable.

## What are precomputed Vina / Vinardo maps? {#vina--vinardo-预计算-maps-又是什么}

They are generated with Vina's `--write_maps`, or imported with a valid manifest. AutoGrid4 is not needed. DockStart supports a **rigid receptor, one ligand and Global Docking** for this grid-only, `no-refine` workflow.

When maps are enabled, the docking command uses the frozen map set and does not pass receptor, box or spacing again. Compare map manifests and protocols before comparing scores.

## How to diagnose a search-region problem {#怀疑搜索空间设错了怎么排查}

1. Inspect the intended site and confirm that structures share a coordinate frame.
2. Check box coverage and poses near its edges.
3. Fix the seed and compare controlled changes to the box.
4. Review structure preparation if the problem remains.

## Related pages {#相关页面}

- [Docking box](../part-a/search-space-and-scoring/search-box.md)
- [Grid and maps](../part-a/search-space-and-scoring/grid-and-maps.md)
- [Set up AutoGrid4](./autogrid4-setup.md)
- [Advanced protocols](./advanced-protocols.md) and [Vina parameter reference](../appendix/vina-parameters-quick-reference.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. [AutoDock Vina documentation](https://autodock-vina.readthedocs.io/en/latest/).
2. DockStart `backend/dockstart_core/project.py`, `vina_maps.py` and `autogrid.py`.

</details>
