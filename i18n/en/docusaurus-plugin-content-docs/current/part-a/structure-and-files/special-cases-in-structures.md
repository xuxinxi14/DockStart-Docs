---
title: "Special cases in structures"
sidebar_position: 6
---

# Special cases in structures {#结构中的特殊情况}

Database structures may contain missing residues, alternate locations, waters, metals and cofactors. These features can affect preparation and docking.

## Missing residues {#缺失残基}

A residue may be present in the sequence but absent from the coordinate model because the experiment did not resolve it. Whether to rebuild a missing region depends on its relevance to the docking problem.

## Alternate locations {#alternate-location}

An atom may have multiple reported positions, often with different occupancies. Choose an appropriate structural model during preparation rather than treating all alternate positions as a unique structure.

## Waters {#水分子}

Some waters participate in hydrogen-bond networks or stabilize a binding site. Deciding which waters to keep depends on the research question and docking protocol; deleting or retaining all waters is not a universal rule.

## Metals {#金属}

A metal may be essential to the active site. Removing it can change the receptor model. Metal-coordination docking may require dedicated parameters and workflows.

## Cofactors {#辅因子}

A cofactor may support the protein's conformation or contribute to its active site. Decide whether it belongs in the receptor model before removing it.

## Why are these decisions specific to the system? {#为什么这些情况不能一刀切}

Ask whether each component belongs to the receptor you want to study. Unrelated crystal waters or additives may be removable, while active-site waters, metals and cofactors require careful review.

## In DockStart {#在-dockstart-中}

Review these features during receptor preparation. A completed calculation does not establish that the input model is scientifically appropriate. Choose the model based on the structure and study objective before docking.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. RCSB PDB-101, *Understanding PDB Data*.
2. wwPDB, *PDBx/mmCIF Documentation*.
3. Meeko, *Receptor preparation*.
4. AutoDock Vina manual.

</details>
