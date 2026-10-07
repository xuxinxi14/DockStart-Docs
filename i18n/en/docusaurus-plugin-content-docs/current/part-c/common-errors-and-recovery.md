---
title: "Common Errors and Recovery"
sidebar_position: 10
sidebar_label: "Errors and recovery"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Common Errors and Recovery {#常见错误与恢复}

Read the error code, message and suggested action. Fix the cause and create a new run rather than editing an old result record.

## Preflight shows blockers {#运行前右侧栏出现-n-个阻塞项}

Resolve each blocker and run the checks again. If a blocker remains, keep its exact code and message for troubleshooting.<NoteRef number={1}/>

## The run workbench fails to load {#运行工作台加载失败}

Restart the application, check backend and tool diagnostics, and follow repair guidance. A historical renderer failure is described in the notes; do not assume every loading failure has that cause.<NoteRef number={2}/>

## Run-stage errors {#运行阶段}

| Code | Action |
| --- | --- |
| `VINA_RUN_FAILED` | Inspect stderr and the log, review inputs and rerun after fixing the cause |
| `AUTOGRID_RUN_FAILED` | Inspect the GPF, AutoGrid log and tool setup, then regenerate maps |
| `AD4ZN_AUTOGRID_VERSION_UNSUPPORTED` | Configure AutoGrid4 4.2.7+; there is no fallback |
| `MAPS_NOT_PREPARED` | Prepare valid maps and check whether the receptor changed |
| `MAPS_FLEXIBLE_RECEPTOR_UNSUPPORTED` | Choose a compatible protocol; precomputed Vina / Vinardo maps do not support flexible receptors |
| `VINA_MAPS_RUN_MODE_UNSUPPORTED` | Use Global Docking for precomputed Vina maps |

## Preparation-stage errors {#准备阶段}

| Code | Action |
| --- | --- |
| `PREPARATION_ALREADY_RUNNING` | Wait for the active preparation |
| `PREPARATION_OUTPUT_CONFLICT` | Review externally changed outputs; keep them and prepare again if appropriate |
| `PREPARATION_OWNERSHIP_LOST` | Use the latest preparation; a superseded operation cannot publish |
| `PREPARATION_INTERRUPTED` | Review the interrupted record and prepare again; unpublished outputs do not replace working files |

## Reopening after an interruption {#中断后重新打开应用}

Recovery checks process identity and allows a startup grace period before marking work interrupted. Batch recovery can requeue work within its limits. For a single run, inspect details and use the supported cancellation or recovery action. If hydrated postprocessing fails, preserve the raw outputs for diagnosis.

## Result files were modified {#结果文件被改动}

Integrity checks can reject edited logs, scores, coordinates or reports. Preserve the old record and start a new run from trusted inputs. Do not hand-edit hashes or metadata to make an altered run appear valid.

## Project-file errors {#项目文件相关}

| Code | Action |
| --- | --- |
| `PROJECT_SAVE_CONFLICT` | Reload the current project revision before saving |
| `PROJECT_SCHEMA_VERSION_UNSUPPORTED` | Use the compatible application version that created the project |
| `PROJECT_JSON_NOT_FOUND` | Select the correct project folder or recover from a backup |

## Parameters and docking box {#参数与-box}

| Code | Action |
| --- | --- |
| `BOX_SIZE_NOT_POSITIVE` | Set every dimension above zero |
| `BOX_PARAM_INVALID` | Enter finite numbers for all six box values |
| `VINA_GRID_RESOURCE_LIMIT_EXCEEDED` | Reduce the box or choose suitable coarser spacing |
| `VINA_SCORING_INVALID` | Select a supported scoring workflow; AD4 requires its maps protocol |
| `VINA_RUN_MODE_INVALID` | Choose Global Docking, Score Only or Local Optimization |

## Batch and multiple-ligand workflows {#批量与多配体}

| Code | Action |
| --- | --- |
| `SCREENING_GLOBAL_SEARCH_REQUIRED` | Use Global Docking |
| `SCREENING_RIGID_RECEPTOR_REQUIRED` | Prepare a rigid receptor; there is no silent fallback |
| `SCREENING_AD4_SUBPROTOCOL_UNSUPPORTED` | Use standard AD4 rather than AD4Zn / hydrated AD4 |
| `SCREENING_ALREADY_FINISHED` | Create a new queue |
| `SCREENING_RESUME_ERROR` | Review frozen inputs and tool changes; resolve them or create a new queue |
| `MULTIPLE_LIGAND_RIGID_RECEPTOR_REQUIRED` | Use a rigid receptor |
| `MULTIPLE_LIGAND_PRECOMPUTED_MAPS_UNSUPPORTED` | Use a compatible scoring workflow |

## Toolchain and structures {#工具链与结构}

`STRUCTURE_REVIEW_FORMAT_INVALID` means the review input format is unsupported or invalid. Check [supported formats](../appendix/supported-formats.md).

Missing Vina prevents docking. Missing RDKit / Meeko in Basic is expected; configure an external preparation environment if needed. Tool repair is manual; DockStart does not automatically install tools or change PATH.

## When to stop and investigate {#什么时候该停下来}

Pause when tools fail repeatedly, records are unexpectedly modified, schema versions are incompatible, a backend error persists or a structural decision is uncertain. Save the error and relevant diagnostics. Parameter tuning cannot repair those causes.

## Related pages {#相关页面}

- [Error-message index](../appendix/error-message-index.md)
- [Toolchain](./toolchain.md)
- [Structure preparation FAQ](./faq-structure-preparation.md)
- [Box and maps FAQ](./faq-box-and-maps.md)
- [Projects and reproducibility](./projects-versions-reproducibility.md)

<DocNotes>

<DocNote number={1} title="What preflight checks cover">

Errors include a code, message, raw detail and suggestion. Preflight checks project files, review state, box, parameters, maps, directories and resources. Passing them does not establish scientific validity. Keep failed records for diagnosis.

</DocNote>

<DocNote number={2} title="Historical workbench failure">

The historical v0.14.3 case involved a `PYTHON_BACKEND_ERROR` fallback missing `blockers`, followed by a renderer access to `blockers.length`. This is a troubleshooting example, not a verified current v1.0.4 defect.

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart project, persistence, screening and preparation modules.
2. DockStart desktop backend integration and tests.
3. DockStart toolchain repair guidance.

</details>
