---
title: "Supported Formats"
sidebar_position: 1
sidebar_label: "Supported formats"
---

# Supported Formats {#dockstart-支持格式表}

Import prepared PDBQT directly, or prepare a receptor from PDB/CIF and a ligand from SDF/MOL/single-molecule MOL2. Built-in preparation does not accept SMILES.

## How to use this page {#怎么用这一页}

Find the input's role, then check its supported extensions and restrictions. Format support does not establish that a structure is chemically suitable. For format concepts, see [structure file formats](../part-a/structure-and-files/structure-file-formats.md).

## Receptor structures {#受体结构}

| Format | Extension | Use and restrictions |
| --- | --- | --- |
| AutoDock PDBQT | `.pdbqt` | Direct import as `prepared/receptor.pdbqt` |
| PDB | `.pdb` | Raw input for Assisted preparation |
| mmCIF | `.cif` | Gemmi conversion to intermediate PDB, then Meeko preparation |

Only these extensions enter receptor preparation/import. Structure review can discover `.mmcif`, but automatic preparation does not accept that extension. PDB and CIF support explicit residue controls in v1.0.4; for CIF, verify that chain and residue identities survive conversion before applying them.

## Ligand structures {#配体结构}

| Format | Extension | Use and restrictions |
| --- | --- | --- |
| AutoDock PDBQT | `.pdbqt` | Direct import as `prepared/ligand.pdbqt` |
| SDF | `.sdf` | Raw ligand input; can contain hydrogens and 3D coordinates |
| MOL | `.mol` | Single molecular structure block |
| MOL2 | `.mol2` | Single-molecule preparation only; not a batch library format |
| SMILES | — | Not accepted by built-in preparation |

Ordinary single-ligand SDF preparation reads the first record. Batch import has a separate record-by-record workflow; macrocycle preparation rejects multi-record SDF. Multi-record MOL2 is unsupported. Ligand PDB and SMILES need suitable external preparation before PDBQT import.

## Other inputs {#各类辅助输入}

| Role | Accepted formats | Restrictions |
| --- | --- | --- |
| Co-crystal reference ligand for RMSD | `.sdf`, `.mol`, `.pdb`, `.pdbqt` | These four formats only |
| Batch ligand library | `.pdbqt`, `.sdf`, `.mol` | No MOL2 |
| Macrocycle ligand | Single-molecule `.sdf`, `.mol`, `.mol2` | Multi-record SDF rejected |
| Hydrated ligand | `.sdf`, `.mol` | No MOL2 or already prepared PDBQT |
| RCSB receptor retrieval | `.pdb`, `.cif` | Network retrieval |
| PubChem ligand retrieval | `.sdf` | SMILES queries unsupported |

## AD4 maps files {#ad4-maps-相关文件}

| File | Purpose / requirement |
| --- | --- |
| `{prefix}.maps.fld` | Required, nonempty field index |
| `{prefix}.{type}.map` | Affinity map for each required ligand atom type |
| `{prefix}.e.map` | Required electrostatic map |
| `{prefix}.d.map` | Required desolvation map |
| `{prefix}.gpf` | Required for external map import |
| `{prefix}.maps.xyz` | Optional grid coordinates |
| `autogrid.glg` | Generation log |
| `AD4Zn.dat` | Dedicated protocol requires the pinned upstream file, license declaration and validated coefficients |

DockStart-generated sets use prefix `receptor`. External imports derive the prefix from `*.maps.fld` and validate the naming and complete set.

## Precomputed Vina / Vinardo maps {#vina--vinardo-预计算-maps}

Required artifacts include `manifest.json`, maps using Vina's recognized XS types and input snapshots. Published sets live under `maps/vina_{NNN}/`.

Each map needs these six header fields:

```text
GRID_PARAMETER_FILE
GRID_DATA_FILE
MACROMOLECULE
SPACING
NELEMENTS
CENTER
```

The manifest requires schema 1, protocol `vina_maps`, state `ready` and declared grid-only, equivalent-no-refine and rigid-receptor semantics. See [box and maps](../part-c/faq-box-and-maps.md).

Limits: 32 map files, 512 MiB per file, 4 GiB total and 20 million points per map.

## Files generated inside a project {#项目内部产生的文件}

| Extension | Examples |
| --- | --- |
| `.pdbqt` | Prepared structures, run output and map input snapshots |
| `.json` | `project.json`, `metadata.json`, `manifest.json` |
| `.csv` | Scores and screening result tables |
| `.md` | `docking_report.md` and exported reports |
| `.txt` | Logs, stdout, stderr and configuration snapshots |
| `.zip` | Batch archive export |
| `.lock` | Concurrency protection |
| `.tmp` | Temporary files used for atomic writes |

## Unsupported formats {#明确不支持的格式}

| Input | Status |
| --- | --- |
| SMILES / `.smi` | Unsupported |
| Raw ligand PDB | Unsupported by built-in ligand preparation |
| Multi-record MOL2 or batch MOL2 | Unsupported |
| `.mae` / `.maegz` | No implemented input workflow |
| `.gz` / `.tar` / `.tgz` | No implemented input workflow; ZIP here is a batch export |

## Related pages {#相关页面}

- [Structure file formats](../part-a/structure-and-files/structure-file-formats.md)
- [File extensions](./file-extensions.md)
- [Structure preparation FAQ](../part-c/faq-structure-preparation.md)
- [Box and maps FAQ](../part-c/faq-box-and-maps.md)
- [AutoDock atom types](./autodock-atom-types.md)
- [Advanced protocols](../part-c/advanced-protocols.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart preparation, project, structure retrieval and screening modules.
2. DockStart AutoGrid, Vina maps and AD4Zn validation.
3. DockStart project creation and batch import file filters.
4. Meeko and RDKit documentation; AutoDock4.2 User Guide.

</details>
