---
title: "Visualizing results"
sidebar_position: 5
---

# Visualizing results {#结果可视化}

Visualization lets you inspect saved poses in the binding site and compare their geometry with the scores.

## What is in the result file? {#结果文件里有什么}

Output PDBQT holds saved poses as `MODEL` records, with score remarks:

```text
MODEL 1
REMARK VINA RESULT:   -13.23  0.000  0.000
...
MODEL 2
REMARK VINA RESULT:   -11.29  0.986  1.681
...
```

See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## What should be checked when opening it? {#打开它时需要注意什么}

PDBQT is a docking format. General molecule viewers may not interpret it fully, and support can differ between viewer versions. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

## Export to SDF for other tools {#想在其他软件里用建议先转成-sdf}

The official workflow recommends Meeko export to preserve bond orders and formal charges. PDBQT does not fully encode bond orders; simply inferring them from coordinates can be wrong. Meeko can use the stored SMILES and mapping information to reconstruct the molecule.

## What should be inspected? {#看结果时重点看什么}

Check the binding region, ligand orientation, plausible contacts, atom clashes and similarity between leading poses. Compare these observations with affinity and RMSD rather than relying on the image alone.

## Hydrogen positions {#关于氢原子}

Ordinary Vina scoring uses a united-atom model. Its output hydrogen orientations are not physically meaningful and should not be overinterpreted.

## In DockStart {#在-dockstart-中}

Use the result viewer to inspect poses, and export SDF through the provided workflow when taking results to other analysis or visualization tools.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation, *Exporting results to SDF*.
2. AutoDock Vina FAQ, *Why do my results look weird in PyMOL?* and *The bound conformation looks reasonable, except for the hydrogens. Why?*
3. Meeko documentation.

</details>
