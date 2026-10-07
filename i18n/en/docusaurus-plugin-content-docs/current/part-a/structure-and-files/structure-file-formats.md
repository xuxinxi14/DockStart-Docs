---
title: "Common structure file formats"
sidebar_position: 1
---

# Common structure file formats {#常见结构文件格式}

Structure formats store different kinds of information. Learn what each file represents and how it enters the docking workflow.

## What are PDB and CIF? {#pdb-和-cif-是什么}

PDB is a structure database; `.pdb` is a legacy structure format. The archive's main format is PDBx/mmCIF, which can represent larger and more complex structures. Files commonly have a `.cif` extension. See [RCSB's format guidance](https://www.rcsb.org/docs/general-help/structures-without-legacy-pdb-format-files).

## What are SDF, MOL and MOL2? {#sdfmol-和-mol2-是什么}

These formats commonly describe small molecules, including atoms and bonds. SDF can contain one or more molecules and associated properties. Meeko accepts SDF and MOL2 and recommends SDF for ligand input. See [ligand preparation](https://meeko.readthedocs.io/en/develop/lig_prep_basic.html).

## What is PDBQT? {#pdbqt-又是什么}

PDBQT is an AutoDock input format. Along with coordinates, it records atom types, partial charges and ligand torsion information. Vina uses it for receptor and ligand inputs. See the [PDBQT specification](https://meeko.readthedocs.io/en/develop/pdbqt_spec.html) and [Vina manual](https://vina.scripps.edu/manual/).

## Why does the format matter? {#为什么不能把这些文件看成只是不同后缀}

Formats differ in whether they preserve coordinates, connectivity, bond orders, charges, names and docking-specific information. Preparation establishes a usable computational model; changing an extension does not perform that work.

## Formats in DockStart {#dockstart-使用哪些格式}

```text
Protein: PDB / CIF → receptor preparation → receptor PDBQT
Ligand: SDF / MOL / MOL2 → ligand preparation → ligand PDBQT
Receptor PDBQT + ligand PDBQT → Vina → docking results
```

Meeko supplies preparation tools for these inputs. See its [basic docking tutorial](https://meeko.readthedocs.io/en/develop/tutorial1.html).

<details className="guide-references">
<summary id="参考资料">References</summary>

1. RCSB PDB, *Structures Without Legacy PDB Format Files*.
2. RCSB PDB-101, *Beginner’s Guide to PDBx/mmCIF*.
3. Meeko, *Basic ligand preparation*, *Basic Docking*, and *PDBQT Format for Coordinate Files*.
4. AutoDock Vina manual.

</details>
