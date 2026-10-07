---
title: "Toolchain"
sidebar_position: 2
sidebar_label: "Toolchain"
---

# Toolchain {#工具链}

RDKit and Meeko prepare structures, AutoDock Vina searches and scores poses, and external AutoGrid4 generates maps for AD4 protocols.

## Check availability first {#先检查工具是否可用}

When a tool is unavailable, open Toolchain. Check its detection status, path, version and the affected features. Basic and Assisted bundle different tools; AutoGrid4 must be provided separately.

## What each tool does {#各工具在流水线里的位置}

```text
Receptor PDB / CIF ─┐
                   ├─→ Meeko (+ RDKit) ─→ PDBQT ─→ AutoDock Vina ─→ Results
Ligand SDF / MOL ───┘                                     ↑
                                            Maps from external AutoGrid4
                                            (AutoDock4 maps protocols only)
```

| Tool | Role | Docking engine? |
| --- | --- | --- |
| AutoDock Vina | Search and score poses | Yes |
| RDKit | Read, represent and check molecules | No |
| Meeko | Parameterize receptor and ligand PDBQT | No |
| Gemmi | Convert CIF to an intermediate PDB | No |
| AutoGrid4 | Precompute affinity maps for AD4 scoring | No |

## AD4 still uses Vina for search {#ad4-协议仍由-vina-执行搜索}

DockStart generates maps with external AutoGrid4, then runs:

```text
AutoDock Vina --maps <prefix> --scoring ad4
```

It does not call the `autodock4` executable. These are Vina results with AD4 scoring; do not assume they match the native AutoDock4 program.

## Versions and sources {#各工具的版本与来源}

| Tool | Version | Bundled in | Role |
| --- | --- | --- | --- |
| AutoDock Vina | 1.2.7 | Basic and Assisted | Docking engine |
| Python runtime | CPython 3.11.15 | Both, with different roles | Backend runtime |
| RDKit | 2026.3.3 | Assisted | Molecular representation and checks |
| Meeko | 0.7.1 | Assisted | Preparation and parameterization |
| Gemmi | 0.7.5 | Assisted | CIF to intermediate PDB |
| AutoGrid4 | 4.2.6+ | External | Standard AD4 maps; AD4Zn needs 4.2.7+ |

Basic's Python runtime serves the backend and does not contain RDKit, Meeko or their site-packages.

## Tool lookup order {#dockstart-去哪里找工具解析优先级}

| Context | Priority |
| --- | --- |
| Backend host Python | Bundled → configured → current environment |
| Preparation Python | **Configured → bundled → current environment** |
| AutoDock Vina | Bundled → configured → system PATH |
| AutoGrid4 | Configured → system PATH |

Preparation prefers your configured Python, allowing a compatible conda environment with RDKit and Meeko to take priority. Check the resolved path when diagnosing version differences.

## Reading detection status {#工具状态怎么看}

The toolchain reports both status and source:

```text
Status: ok / missing / error / unknown
Source: bundled / configured / auto / current_environment /
        frontend_dependency / missing / unknown
```

- `ok`: detection passed.
- `missing`: no tool found.
- `error`: a tool was found, but detection or execution failed.
- `bundled`: installation resources.
- `configured`: a path from your settings.
- `auto`: automatic discovery, such as system PATH.

Check the source as well as the status. An `ok` tool from `current_environment` may differ on another computer.

## When a tool is missing {#工具缺失时会怎样}

DockStart provides repair suggestions with the affected mode, steps, commands and documentation links. Apply them yourself, then select Detect again (「重新检测」).

| Missing or unsuitable component | Effect |
| --- | --- |
| Vina | Prevents docking in Basic and Assisted |
| Python / RDKit / Meeko | Prevents Assisted preparation from raw structures |
| Microsoft Store Python | May be unsuitable for an RDKit / Meeko preparation environment |

DockStart does not automatically install tools, change system PATH or download a large runtime. For Store Python paths containing `WindowsApps` or `PythonSoftwareFoundation`, the repair guidance recommends a separate conda or mamba environment.

## A common Basic scenario {#一个高频场景}

Missing RDKit and Meeko in Basic is expected. Existing PDBQT files can still be docked when Vina works. To prepare PDB/SDF inputs, configure a compatible external preparation environment.

## Related pages {#相关页面}

- [Basic and Assisted](./basic-and-assisted.md)
- [AutoDock Vina](../part-a/docking-components/autodock-vina.md), [Meeko](../part-a/docking-components/meeko.md), [RDKit](../part-a/docking-components/rdkit.md) and [AutoGrid4](../part-a/docking-components/autogrid4.md)
- [Grid and maps](../part-a/search-space-and-scoring/grid-and-maps.md) and [AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- [Set up AutoGrid4](./autogrid4-setup.md)
- [Common errors and recovery](./common-errors-and-recovery.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart `backend/dockstart_core/toolchain.py`, `tool_check.py` and `toolchain_paths.py`.
2. DockStart `backend/dockstart_core/toolchain_repair.py`: repair guidance.
3. DockStart `backend/dockstart_core/project.py`: command assembly, `--maps` and `--scoring ad4`.
4. DockStart `docs/toolchain_repair_guide.md`.
5. [AutoDock Vina manual](https://vina.scripps.edu/manual/).
6. Meeko documentation.
7. RDKit documentation.
8. AutoDock4.2 User Guide.

</details>
