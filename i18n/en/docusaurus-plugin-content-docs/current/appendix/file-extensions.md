---
title: "Common File Extensions"
sidebar_position: 4
sidebar_label: "File extensions"
---

# Common File Extensions {#常见文件扩展名}

Extensions suggest a file's role, while its location gives the full context. To check what can be imported, see [supported formats](./supported-formats.md).

## A quick guide {#一眼判断法}

```text
.pdb .cif .mmcif       → Raw structure formats
.pdbqt                → Prepared docking inputs or pose outputs
.sdf .mol .mol2       → Ligand structures
.fld .map .gpf .glg   → Grid and map files
.json                 → Structured records and manifests
.csv                  → Result tables
.md .txt              → Reports, logs and snapshots
.zip                  → Batch archive export
```

## Structure files {#结构文件}

| Extension | Role in DockStart |
| --- | --- |
| `.pdb` | Raw receptor or supported reference ligand |
| `.cif` | Raw mmCIF receptor; Gemmi converts it before preparation |
| `.mmcif` | Structure-review discovery only; not automatic preparation |
| `.pdbqt` | Prepared receptor/ligand input and pose output |
| `.sdf` | Ligand structures, potentially with hydrogens and 3D coordinates |
| `.mol` | Single MDL molecular structure block |
| `.mol2` | Single-molecule Tripos input in supported preparation workflows |
| `.smi` | SMILES text; unsupported input |

PDB and PDBQT are different. PDBQT includes docking atom types, charges and torsion information. Raw ligand PDB is not accepted by built-in ligand preparation.

## Maps and grid files {#maps-与网格文件}

| Extension | Meaning | Example |
| --- | --- | --- |
| `.fld` | AutoGrid field index | `receptor.maps.fld` |
| `.map` | One grid map | `receptor.OA.map`, `receptor.C_H.map` |
| `.gpf` | AutoGrid parameters | `receptor.gpf` |
| `.glg` | AutoGrid log | `autogrid.glg` |
| `.xyz` | Optional grid coordinates | `receptor.maps.xyz` |
| `.dat` | Parameter file | `AD4Zn.dat` |

AD4 names such as `OA` and Vina XS names such as `C_H` refer to separate atom-type schemes; see [AutoDock atom types](./autodock-atom-types.md).

## Records and results {#dockstart-的记录与结果}

| Extension | Examples |
| --- | --- |
| `.json` | `project.json`, `metadata.json`, `manifest.json` |
| `.csv` | `scores.csv`, `screening_summary.csv` |
| `.md` | `docking_report.md` |
| `.txt` | `log.txt`, `stdout.txt`, `config_snapshot.txt` |

Use the interface to modify project state. Do not edit hash-protected run artifacts. `config_snapshot.txt` records the actual settings of an old run and is useful when results differ.

## Archives and temporary files {#打包与临时文件}

| Extension | Meaning | Handling |
| --- | --- | --- |
| `.zip` | Batch archive export | Read-only record, not a runnable project backup |
| `.lock` | Concurrency lock | Do not delete during active work |
| `.tmp` | Atomic-write temporary file | Normally replaced and cleaned after a write |

After an abnormal exit, inspect process and recovery state before removing leftover files.

## One extension can have several roles {#一个常见困惑同一个扩展名不同角色}

`project.json` is shared by multiple workflows. A parsing error may belong to project state rather than the protocol that reported it. PDBQT can be a preparation output, a run result or a frozen map input. Check the path as well as the extension.

## Related pages {#相关页面}

- [Supported formats](./supported-formats.md)
- [Structure file formats](../part-a/structure-and-files/structure-file-formats.md)
- [Projects and reproducibility](../part-c/projects-versions-reproducibility.md)
- [Installation and data safety](../part-c/install-update-data-safety.md)
- [Grid and maps](../part-a/search-space-and-scoring/grid-and-maps.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart project, preparation, AutoGrid, Vina maps and screening modules.
2. DockStart persistence and atomic writes.
3. AutoDock4.2 User Guide and AutoDock Vina configuration documentation.

</details>
