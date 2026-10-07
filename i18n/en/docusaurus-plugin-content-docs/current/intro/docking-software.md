---
title: "Common docking software"
sidebar_position: 5
---

# Common docking software {#主流-docking-软件}

Docking tools differ in search methods, scoring functions and supported workflows. DockStart organizes workflows around AutoDock Vina and related AutoDock Suite tools.

## Why are there different tools? {#为什么有这么多-docking-软件}

Searching for poses and evaluating them are separate problems. Different algorithms and scoring models can yield different results for the same system.

## AutoDock 4 {#autodock-4}

AutoDock 4 is a classic AutoDock docking engine. Its workflow uses precomputed grid maps and can support selected receptor flexibility. In DockStart, related operations appear in advanced AutoGrid4/maps workflows.

## AutoDock Vina {#autodock-vina}

Vina uses a different search algorithm and scoring function from AutoDock 4, while retaining formats such as PDBQT. It is the main docking engine used by DockStart and the best starting point for learning this workflow.

## DOCK 6 {#dock-6}

DOCK 6, developed by UCSF and collaborators, includes multiple search, scoring and molecular-design workflows. Its algorithms and procedures differ from Vina's.

## GOLD {#gold}

CCDC's GOLD (Genetic Optimisation for Ligand Docking) uses a genetic algorithm for flexible-ligand docking, with scoring functions, constraints and water handling. It belongs to the commercial CSD Portfolio.

## Glide {#glide}

Schrödinger's Glide supports pose prediction, virtual screening and structure-based drug design within a commercial software workflow.

## How do they differ? {#它们之间有什么区别}

| Tool | Developer / organization | Main workflow characteristics |
| --- | --- | --- |
| AutoDock 4 | Scripps / AutoDock Suite | Precomputed grid maps; classic AutoDock workflow |
| AutoDock Vina | Scripps | Main docking engine used by DockStart |
| DOCK 6 | UCSF | Multiple search and scoring components |
| GOLD | CCDC | Genetic algorithm; flexible ligands; constraints |
| Glide | Schrödinger | Commercial docking and structure-based design |

Before comparing their results, check whether inputs, search conditions and scoring models are equivalent.

## Why does DockStart use Vina? {#为什么-dockstart-选择-autodock-vina}

DockStart turns the Vina workflow into desktop operations for project management, preparation, search-space setup, runs and results. It also exposes selected AutoDock4/AutoGrid4 workflows. Learn basic Vina concepts first, then the advanced workflows when needed.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. Trott O, Olson AJ. *AutoDock Vina*. Journal of Computational Chemistry. 2010;31(2):455–461.
2. AutoDock Vina documentation.
3. UCSF DOCK 6 website and documentation.
4. CCDC GOLD documentation.
5. Schrödinger Glide product information.

</details>
