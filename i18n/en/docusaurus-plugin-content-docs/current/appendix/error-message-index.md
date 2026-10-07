---
title: "Error-Message Index"
sidebar_position: 5
sidebar_label: "Error messages"
---

# Error-Message Index {#常见错误信息索引}

Error-code prefixes help identify the affected stage. Use this index to find the meaning, then read [common errors and recovery](../part-c/common-errors-and-recovery.md) for actions.

## Index or recovery guide? {#这两页怎么分工}

This page explains codes and stages. The recovery guide explains how to respond and when to stop. Keep the exact code when reporting a problem.

## Error structure {#先认识错误的统一结构}

```text
error
 ├─ code        Stable identifier
 ├─ message     User-facing explanation
 ├─ raw_error   Underlying detail
 └─ suggestion  Recommended action, where available
```

Read the message, follow the suggestion and inspect raw details for the cause.

## What this index covers {#关于错误码的数量}

The codebase contains many internal integrity and protocol checks. This is a selected user-facing index, not a complete list. Always interpret a code together with the message and application version.

## A. Preflight and execution {#a-运行前检查与运行}

| Code | Meaning |
| --- | --- |
| `VINA_RUN_FAILED` | Docking failed or did not publish the expected output |
| `VINA_RUN_MODE_INVALID` | Unsupported run-mode value |
| `VINA_SCORING_INVALID` | Scoring value rejected in this settings path |
| `VINA_GRID_RESOURCE_LIMIT_EXCEEDED` | Estimated grid memory exceeds 2 GiB |
| `BOX_SIZE_NOT_POSITIVE` | At least one dimension is zero or negative |
| `BOX_PARAM_INVALID` | Missing, invalid or nonfinite box value |
| `AUTOGRID_RUN_FAILED` | Map generation failed |
| `MAPS_NOT_PREPARED` | Required maps are missing or invalid |
| `MAPS_ATOM_TYPES_MISSING` | Missing maps for required ligand types |
| `MAPS_ATOM_TYPE_UNSUPPORTED` | Unsupported or unvalidated type |
| `MAPS_ATOM_TYPES_INCOMPLETE` | Declared and detected types differ |
| `MAPS_FLEXIBLE_RECEPTOR_UNSUPPORTED` | Incompatible precomputed-map / flexible-receptor combination |
| `VINA_MAPS_RUN_MODE_UNSUPPORTED` | Precomputed Vina maps require Global Docking |

## B. Structure preparation {#b-结构准备}

| Code | Meaning |
| --- | --- |
| `PREPARATION_ALREADY_RUNNING` | Preparation is already active for this target |
| `PREPARATION_OUTPUT_CONFLICT` | Outputs changed externally during preparation |
| `PREPARATION_OWNERSHIP_LOST` | A newer operation superseded this one |
| `PREPARATION_INTERRUPTED` | Process disappeared and did not recover within the grace period |
| `RECEPTOR_RAW_FORMAT_UNSUPPORTED` | Unsupported raw receptor format |
| `LIGAND_RAW_FORMAT_UNSUPPORTED` | Unsupported raw ligand format |
| `RECEPTOR_CONTROLS_PDB_REQUIRED` | Residue controls require an accepted PDB representation; check the format and version |
| `STRUCTURE_REVIEW_FORMAT_INVALID` | Format unsuitable for structure review |
| `STRUCTURE_REVIEW_READ_ERROR` | Review information could not be read |
| `MEEKO_PYTHON_UNAVAILABLE` | No usable Python environment for Meeko |

## C. AD4Zn, hydrated, macrocycle and flexible protocols {#c-高级协议ad4zn--水合--大环--柔性}

| Code | Meaning |
| --- | --- |
| `AD4ZN_RUN_MODE_UNSUPPORTED` | AD4Zn does not support Score Only / Local Optimization |
| `AD4ZN_AUTOGRID_VERSION_UNSUPPORTED` | AutoGrid4 does not meet the 4.2.7 minimum |
| `AD4ZN_RECEPTOR_TYPE_UNSUPPORTED` | Unsupported receptor type for AD4Zn |
| `AD4ZN_PARAMETER_SNAPSHOT_ATOM_TYPES_UNCOVERED` | Parameter snapshot does not cover required types |
| `HYDRATED_AUTOGRID_NOT_AVAILABLE` | AutoGrid4 is unavailable |
| `HYDRATED_AUTOGRID_VERSION_UNSUPPORTED` | AutoGrid4 version fails the hydrated gate |
| `HYDRATED_LIGAND_FORMAT_UNSUPPORTED` | Unsupported hydrated ligand format |
| `HYDRATED_LIGAND_NOT_READY` | Hydrated preparation is incomplete |
| `HYDRATED_ACTIVE_RUN_BLOCKED` | An active hydrated run blocks this operation |
| `MACROCYCLE_3D_COORDINATES_REQUIRED` | Input needs existing 3D coordinates |
| `MACROCYCLE_MULTIPLE_MOLECULES_UNSUPPORTED` | Macrocycle review rejects multi-molecule input |
| `FLEX_BAD_RESIDUES_REVIEW_REQUIRED` | Selected residues require manual review |
| `FLEX_BAD_RESIDUE_ACKNOWLEDGEMENT_REQUIRED` | Explicit confirmation is needed |
| `FLEX_MMCIF_VERIFIED_BRIDGE_REQUIRED` | Missing verified mmCIF-to-PDB bridge |

## D. Project files {#d-项目文件}

| Code | Meaning |
| --- | --- |
| `PROJECT_SAVE_CONFLICT` | Stale revision; reload before saving |
| `PROJECT_SCHEMA_VERSION_UNSUPPORTED` | Unsupported newer schema; file is not rewritten |
| `PROJECT_JSON_NOT_FOUND` | Project file not found |

## E. Batch screening {#e-批量筛选}

| Code | Meaning |
| --- | --- |
| `SCREENING_GLOBAL_SEARCH_REQUIRED` | Global Docking required |
| `SCREENING_RIGID_RECEPTOR_REQUIRED` | Rigid receptor required |
| `SCREENING_AD4_PROTOCOL_REQUIRED` | Standard AD4 map protocol required |
| `SCREENING_AD4_MAPS_NOT_READY` | Maps fail readiness or integrity checks |
| `SCREENING_AD4_MAP_TYPES_MISSING` | Maps do not cover the library's types |
| `SCREENING_AD4_SUBPROTOCOL_UNSUPPORTED` | AD4Zn / hydrated screening unsupported |
| `SCREENING_ALREADY_EXISTS` | A screening task already exists |
| `SCREENING_ALREADY_FINISHED` | Terminal queue cannot be resumed |
| `SCREENING_RESUME_ERROR` | Frozen inputs or tools fail recovery checks |
| `SCREENING_PROCESS_ACTIVE` | Vina process still active |
| `SCREENING_EXECUTION_ACTIVE` | Another process is executing the screen |
| `SCREENING_STAGE_ERROR` | Ligand import failed |
| `SCREENING_ORPHANED_DATA` | Unarchived leftover data would be overwritten |
| `SCREENING_REPORT_NOT_TERMINAL` | Finish the queue before exporting a report |
| `SCREENING_RESULT_SDF_NOT_TERMINAL` | Finish the queue before exporting result SDF |
| `SCREENING_ARCHIVE_EXPORT_EXISTS` | Destination exists; explicit overwrite confirmation needed |
| `SCREENING_ARCHIVE_EXPORT_DESTINATION_INVALID` | Destination must end in `.zip` |
| `SCREENING_ARCHIVE_COMPARE_IDS_INVALID` | Select two distinct valid archives |

## F. Multiple-ligand docking {#f-多配体共同对接}

| Code | Meaning |
| --- | --- |
| `MULTIPLE_LIGAND_EXACTLY_TWO_REQUIRED` | Exactly two ligands required |
| `MULTIPLE_LIGAND_DUPLICATE_INPUT` | Identical ligand input contents |
| `MULTIPLE_LIGAND_RECEPTOR_NOT_SET` | Rigid receptor missing |
| `MULTIPLE_LIGAND_RIGID_RECEPTOR_REQUIRED` | Rigid receptor required |
| `MULTIPLE_LIGAND_GLOBAL_SEARCH_REQUIRED` | Global Docking required |
| `MULTIPLE_LIGAND_PRECOMPUTED_MAPS_UNSUPPORTED` | Precomputed Vina / Vinardo maps unsupported |
| `MULTIPLE_LIGAND_AUTOBOX_UNSUPPORTED` | Saved box required |
| `MULTIPLE_LIGAND_AD4_SUBPROTOCOL_UNSUPPORTED` | AD4Zn / hydrated joint workflow unsupported |
| `MULTIPLE_LIGAND_SCORING_PROTOCOL_UNSUPPORTED` | Unsupported scoring protocol |
| `MULTIPLE_LIGAND_VINA_NOT_AVAILABLE` | Usable Vina not found |
| `MULTIPLE_LIGAND_VINA_VERSION_UNSUPPORTED` | Vina version lacks supported multiple input |
| `MULTIPLE_LIGAND_VINA_FAILED` | Joint run failed |
| `MULTIPLE_LIGAND_UNSUPPORTED_ATOM_TYPE` | Unvalidated ligand atom type |
| `MULTIPLE_LIGAND_MEMBER_ATOM_LIMIT_EXCEEDED` | Member atom limit exceeded |
| `MULTIPLE_LIGAND_FLEXIBILITY_RISK_LIMIT_EXCEEDED` | Combined torsion risk limit exceeded |
| `MULTIPLE_LIGAND_BOX_DIAGONAL_TOO_SMALL_FOR_INPUT_GEOMETRY` | Input geometry exceeds effective grid extent |
| `MULTIPLE_LIGAND_POSE_NOT_READY` | Completed task required to load poses |
| `MULTIPLE_LIGAND_REPORT_NOT_READY` | Completed task required for report |

## G. Structure retrieval and import {#g-结构获取与导入}

| Code | Meaning |
| --- | --- |
| `PDB_ID_REQUIRED` | Empty PDB ID |
| `PDB_ID_INVALID` | Expected four letters or digits |
| `PDB_FORMAT_UNSUPPORTED` | Download format must be PDB or CIF |
| `PUBCHEM_CID_REQUIRED` | Empty CID |
| `PUBCHEM_CID_INVALID` | CID must be a positive integer |
| `PUBCHEM_FORMAT_UNSUPPORTED` | Download format must be SDF |
| `PUBCHEM_SMILES_UNSUPPORTED` | SMILES query unsupported |
| `PUBCHEM_QUERY_TYPE_UNSUPPORTED` | Unsupported query type |
| `RCSB_METADATA_NOT_RETURNED` | Candidate metadata not returned |
| `STRUCTURE_SEARCH_QUERY_REQUIRED` | Empty query |
| `STRUCTURE_SEARCH_QUERY_TOO_LONG` | Query too long |
| `STRUCTURE_SEARCH_EMPTY_RESPONSE` | Empty response |
| `STRUCTURE_SEARCH_RESPONSE_TOO_LARGE` | Response exceeds 4 MiB |
| `STRUCTURE_SEARCH_TIMEOUT` | Search timed out |
| `STRUCTURE_DOWNLOAD_HTTP_ERROR` | Remote HTTP error |
| `STRUCTURE_DOWNLOAD_NETWORK_ERROR` | Network failure |
| `STRUCTURE_DOWNLOAD_TIMEOUT` | Download timed out |
| `STRUCTURE_DOWNLOAD_TOO_LARGE` | Download exceeds 256 MiB |
| `STRUCTURE_DOWNLOAD_EMPTY` | Empty download |
| `STRUCTURE_DOWNLOAD_FORMAT_INVALID` | Unrecognized text structure |
| `STRUCTURE_PREVIEW_SELECTION_REQUIRED` | Select a candidate first |
| `STRUCTURE_PREVIEW_FORMAT_UNSUPPORTED` | Preview requires PDB or mmCIF |
| `STRUCTURE_PREVIEW_TOO_LARGE` | Candidate exceeds preview limit |
| `STRUCTURE_PREVIEW_TIMEOUT` | Preview timed out |
| `RAW_FILE_WRITE_ERROR` | Could not write the project's raw input |
| `PDBQT_FILE_NOT_FOUND` | PDBQT file missing |
| `PDBQT_PATH_NOT_FILE` | Path is not a file |
| `PDBQT_EXTENSION_INVALID` | Expected `.pdbqt` extension |
| `PDBQT_FILE_EMPTY` | Empty file |
| `PDBQT_ROLE_INVALID` | Invalid receptor / ligand role |
| `PDBQT_SOURCE_UNSAFE` | Source is not a stable regular file |
| `PDBQT_IMPORT_ERROR` | Import failed |

## H. Toolchain and diagnostics {#h-工具链与自检}

| Code | Meaning |
| --- | --- |
| `BUNDLED_VINA_PACKAGE_INCOMPLETE` | Bundled Vina package check failed |
| `BUNDLED_PYTHON_PACKAGE_INCOMPLETE` | Bundled Python file check failed |
| `TOOLCHAIN_REPAIR_SUGGESTION_ERROR` | Repair suggestions unavailable |
| `FRONTEND_TOOLCHAIN_STATUS_ERROR` | Frontend could not read tool status |
| `FRONTEND_TOOLCHAIN_REPAIR_ERROR` | Frontend could not read repair suggestions |
| `FRONTEND_DIAGNOSTIC_ERROR` | Post-install diagnostics failed |
| `CAPABILITY_PROFILE_ERROR` | Capability profile could not be read |
| `DIAGNOSTIC_ERROR` | Diagnostic report failed |
| `PYTHON_BACKEND_ERROR` | Unstructured backend error; inspect startup and logs |
| `BACKGROUND_TASK_ERROR` | Background task failed |

For the historical workbench-loading case involving `PYTHON_BACKEND_ERROR`, see [recovery guidance](../part-c/common-errors-and-recovery.md).

## I. Results and reports {#i-结果导出与报告}

| Code | Meaning |
| --- | --- |
| `RESULT_PATH_UNSAFE` | Project-relative result path required |
| `RESULT_PDBQT_MISSING` | Nonempty result PDBQT missing |
| `RESULT_SDF_EXPORT_FAILED` | Export failed; original result is preserved |
| `RESULT_SDF_TOOLCHAIN_UNAVAILABLE` | Required export/validation tools unavailable |
| `SDF_EXPORT_OUTPUT_MISSING` | Meeko did not publish nonempty `poses.sdf` |
| `FLEXIBLE_RESULT_SDF_UNSUPPORTED` | Flexible-result topology cannot be safely restored for SDF |
| `MARKDOWN_PREVIEW_TOO_LARGE` | Report exceeds preview limit |

## J. Example projects {#j-示例项目}

| Code | Meaning |
| --- | --- |
| `DEMO_TYPE_INVALID` | Unknown example type |
| `DEMO_DESTINATION_REQUIRED` | Empty save directory |
| `DEMO_TEMPLATE_MISSING` | Missing example resources |
| `DEMO_PROJECT_INCOMPLETE` | Incomplete example project |

Missing bundled resources can require repairing or reinstalling the package.

## Finding an unlisted code {#怎么自己查一个没列在这里的错误码}

Search the backend source for the exact string. Inspect the condition that raises it, its message and related tests. Use the source corresponding to your application version.

## Related pages {#相关页面}

- [Common errors and recovery](../part-c/common-errors-and-recovery.md)
- [Toolchain](../part-c/toolchain.md)
- [Structure preparation](../part-c/faq-structure-preparation.md)
- [Box and maps](../part-c/faq-box-and-maps.md)
- [Advanced protocols](../part-c/advanced-protocols.md)
- [Why results differ](../part-c/why-results-differ.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart project, preparation, screening and multiple-ligand modules.
2. DockStart structure retrieval and candidate preview.
3. DockStart toolchain, repair and diagnostics modules.
4. DockStart desktop backend integration and `backend/tests/`.

</details>
