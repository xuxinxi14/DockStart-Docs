---
title: "Projects, Versions and Reproducibility"
sidebar_position: 12
sidebar_label: "Projects and reproducibility"
---

# Projects, Versions and Reproducibility {#项目版本与可复现性}

A result is tied to the exact inputs, preparation, settings and software used. Preserve the complete project and its frozen run records.

## What run records help you check {#运行记录能帮你查什么}

They let you compare actual inputs and commands, investigate failures and describe the calculation in a report. Filenames and a best score alone are insufficient.

## Information to record {#需要记录的信息清单}

- DockStart and external tool versions: Vina, Python, RDKit, Meeko and AutoGrid4 where used.
- Exact receptor, ligand and flexible-receptor inputs and hashes.
- All six box values, scoring model and applicable parameters.
- Exhaustiveness, output modes, energy range, CPU and actual seed.
- Applicable advanced settings: `max_evals`, `min_rmsd`, spacing, verbosity, `no_refine`, even voxels and unbound energy.
- Task, protocol, output hashes, operating system and deployment environment.

## What DockStart records {#dockstart-已经帮你记了什么}

Each `runs/run_00N/` directory includes the relevant artifacts:

| File | Purpose |
| --- | --- |
| `metadata.json` | Command, parameters, input hashes, protocol and output metadata |
| `command_preview.txt` | Readable command |
| `config_snapshot.txt` | Configuration actually used |
| `inputs/` | Frozen receptor, ligand and flexible input where applicable |
| `stdout.txt`, `stderr.txt`, `log.txt` | Execution details |
| `out.pdbqt`, `scores.csv`, `docking_report.md` | Global docking results and report |

Use the frozen run inputs when reviewing an old result; current files in `prepared/` may have changed. Other task types have their own outputs.

## Project structure {#项目结构}

```text
project/
  project.json
  raw/
  prepared/
  preparation/
  configs/
  runs/
  results/
  reports/
  maps/
```

Keep the whole directory together. Project-managed relative paths support moving the project, but records can also contain local paths that require review before sharing.

## Schema versions and save protection {#项目文件的版本与保护}

The documented project schema is version **1**. Valid older schemas can be migrated after creating `project.json.schema-v<old>.bak`; a newer unsupported schema is rejected without being overwritten.

Revision checks prevent stale saves. For example, saving revision 5 after another writer has reached revision 7 produces `PROJECT_SAVE_CONFLICT`. Reload the current project instead of manually changing revision fields.

## Archives and exports {#归档与导出是什么定位}

A batch ZIP is a read-only experimental record with file and tree hashes. It is not a runnable project backup, a digital signature or restoration of the execution environment. It excludes the Vina executable, active queue state and staging files.

Exports may contain absolute paths and research inputs. They are not automatically anonymized.

## Why the records matter {#为什么这些记录真的有用}

They make differences traceable and let others assess the calculation. Reproducing the recorded computation still does not validate the scientific assumptions.

## A practical check before comparing runs {#一个实用建议}

Compare input hashes, box, scoring model, applicable settings, actual seed, DockStart version and Vina version. Then review preparation and environment differences.

## Related pages {#相关页面}

- [Why results differ](./why-results-differ.md)
- [Installation, updates and data safety](./install-update-data-safety.md)
- [Common errors and recovery](./common-errors-and-recovery.md)
- [Vina parameter reference](../appendix/vina-parameters-quick-reference.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart project, persistence, screening and diagnostics modules.
2. AutoDock Vina documentation and reproducibility guidance.

</details>
