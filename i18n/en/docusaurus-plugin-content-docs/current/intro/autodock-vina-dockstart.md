---
title: "AutoDock Suite, AutoDock Vina and DockStart"
sidebar_position: 6
---

# AutoDock Suite, AutoDock Vina and DockStart {#autodock-suiteautodock-vina-与-dockstart}

AutoDock Suite is a family of docking-related tools. AutoDock Vina is a docking engine in that family; DockStart is a third-party desktop application that organizes the workflow around these tools.

## What is AutoDock Suite? {#autodock-suite-是什么}

It includes docking engines and tools for structure preparation and grid computation. AutoDock 4 and AutoDock Vina are two familiar engines with different search, scoring and workflow designs.

## How do AutoDock 4 and Vina differ? {#autodock-4-和-autodock-vina-有什么区别}

A traditional AutoDock 4 workflow first runs AutoGrid4 to calculate grid maps. Ordinary Vina scoring handles the required grids internally, so users normally supply receptor and ligand PDBQT files plus the search box without preparing AutoDock 4 GPF/maps files.

## What is AutoDock Vina? {#autodock-vina-是什么}

Vina searches for possible receptor–ligand poses and scores them. The 1.2.x series also supports additional docking methods and scoring choices.

## What is DockStart? {#那-dockstart-是什么}

DockStart provides a desktop environment for project management, structure preparation, search-space setup, docking runs and result inspection. It invokes the underlying engines rather than providing a new docking algorithm.

```text
AutoDock Suite
├── AutoDock 4 → AutoGrid4 / grid maps
└── AutoDock Vina
          ↓
       DockStart workflow
```

## How do the preparation tools fit in? {#dockstart-和其他辅助工具是什么关系}

Meeko parameterizes receptors and ligands and generates PDBQT. RDKit helps represent and process small molecules used in ligand preparation.

```text
Input structure → preparation / parameterization → PDBQT → Vina → results
```

## Why start with Vina? {#为什么-dockstart-主要围绕-vina}

Vina provides the main docking engine and reduces the manual setup needed in a traditional AutoDock 4 workflow. Learn the ordinary Vina workflow first; consult AutoGrid4 and maps guidance when your chosen protocol requires them.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina website and documentation.
2. Eberhardt J, Santos-Martins D, Tillack AF, Forli S. *AutoDock Vina 1.2.0: New Docking Methods, Expanded Force Field, and Python Bindings*. Journal of Chemical Information and Modeling. 2021.
3. Morris GM, et al. *AutoDock4 and AutoDockTools4: Automated Docking with Selective Receptor Flexibility*. Journal of Computational Chemistry. 2009;30(16):2785–2791.
4. AutoDock4.2 User Guide.
5. Meeko documentation.

</details>
