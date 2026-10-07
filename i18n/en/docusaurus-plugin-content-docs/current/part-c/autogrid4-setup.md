---
title: "Set Up AutoGrid4"
sidebar_position: 3
sidebar_label: "Set up AutoGrid4"
---

# Set Up AutoGrid4 {#配置-autogrid4}

AutoGrid4 is an external tool, not part of the DockStart installer. Standard and hydrated AD4 require 4.2.6+; AD4Zn requires 4.2.7+.

## When you need it {#什么时候需要它}

| Workflow | AutoGrid4 required? |
| --- | --- |
| Ordinary Vina docking, including batch, multiple ligands and macrocycles | No |
| Precomputed Vina / Vinardo maps | No; generated with Vina's `--write_maps` |
| Standard AutoDock4 maps | Yes |
| Hydrated AD4 | Yes |
| AD4Zn beta | Yes, version 4.2.7+ |

A missing AutoGrid4 does not prevent ordinary Vina docking.

## Version requirements {#版本门禁426-与-427-的分界}

| Protocol | Minimum AutoGrid4 version |
| --- | --- |
| Standard AutoDock4 maps | 4.2.6 |
| Hydrated AD4 | 4.2.6 |
| AD4Zn beta | 4.2.7 |

DockStart must identify an `x.y.z` version from the executable's output. It blocks incompatible or unidentified versions and does not silently downgrade AD4Zn to standard AD4.

## Step 1: check whether you already have it {#第-1-步先判断你有没有}

### Use the Toolchain page {#方法一看工具链页推荐}

Open Toolchain and inspect AutoGrid4's source, version, resolved executable path and status. If detection passes with a compatible version, proceed to Step 5.

### Check the executable manually {#方法二手动问它一句}

In PowerShell, open its directory and run:

```powershell
.\autogrid4.exe --version
```

Look for output identifying AutoGrid and its version, such as `AutoGrid 4.2.6`. Resolve missing DLLs, a wrong path or an execution failure before configuring it.

### A common misunderstanding {#一个常见误解}

AutoDockTools / MGLTools and the AutoGrid executable are separate components. Having MGLTools installed does not establish that `autogrid4.exe` is available.

## Step 2: obtain autogrid4.exe {#第-2-步拿到-autogrid4exe}

### Official sources {#官方渠道的情况}

AutoGrid and AutoDock4 are released under the GNU GPL. Start with the [AutoDock download page](https://autodock.scripps.edu/download-autodock4/), [AutoGrid repository](https://github.com/ccsb-scripps/AutoGrid) and [AutoDock4 repository](https://github.com/ccsb-scripps/AutoDock4).

A source archive or repository tag is not a Windows executable. Check the available release assets before downloading.

### Windows options {#于是-windows-上实际有三条路}

| Option | Considerations |
| --- | --- |
| A trusted precompiled Windows executable | Verify its origin and, where available, hash |
| Compile the official source | Requires a suitable C build environment |
| A WSL / Linux build | Cross-environment invocation requires additional setup for the Windows application |

DockStart checks the file and command-line identity; it does not authenticate who built a third-party binary.

### Which executable is needed {#你只需要一个文件}

DockStart calls `autogrid4.exe`. You do not need `autodock4.exe`, AutoDockTools or a full MGLTools installation for this workflow. Resolve any runtime dependencies required by your chosen build.

## Step 3: choose a location {#第-3-步放到哪里}

Use a stable, readable directory that you will keep. A short path without spaces or non-ASCII characters can simplify troubleshooting. Configure the actual location of your executable.

## Step 4: configure DockStart {#第-4-步在-dockstart-里配置}

### In the interface {#操作路径}

In Toolchain, select Configure AutoGrid4 path (「配置 AutoGrid4 路径」), enter the path, save and run detection again (「重新检测」).

### Two accepted path forms {#路径可以填两种写法}

You can select the executable itself or its containing directory. For a directory, DockStart looks for `autogrid4.exe` or `autogrid4`. Surrounding quotes and whitespace are trimmed.

### Expected detection results {#配置成功后应该看到什么}

| Field | Expected value |
| --- | --- |
| Status | `ok` |
| Version | The actual compatible version |
| Path | The resolved executable |
| Source | `configured` for your selected path |

Source `auto` means automatic discovery through PATH; `missing` means no executable was found. Configured paths take priority.

### Editing the settings file {#兜底直接改配置文件}

The desktop settings file normally lives at:

```text
%APPDATA%\org.dockstart.desktop\dockstart_settings.json
```

Prefer the interface. If you edit the file, exit DockStart first and preserve its other settings. Update the `autogrid4` value in `tool_paths` to your actual path. JSON backslashes must be escaped as `\\`.

`DOCKSTART_SETTINGS_PATH` can override the location; use the path reported by the application when an override is active.

## Step 5: generate and validate maps {#第-5-步确认它真的能算}

Prepare receptor and ligand PDBQT, save a docking box and select AutoDock4 maps. Check spacing, even X/Y/Z grid point counts and atom types, then select Generate and validate maps (「生成并校验 maps」).

Inspect:

```text
maps/<map_set_id>/autogrid.glg
```

A successful log ends with `Successful Completion.` and timing statistics. On failure, inspect this log and `stderr.txt`, and check the map validation result.

### Reusing generated maps {#生成一次之后就不用再配了}

Published maps are frozen in the project with hashes. Removing AutoGrid4 later does not automatically invalidate an existing map set that still passes integrity checks.

## Three additional steps you usually do not need {#三件不需要做的事}

### An external AD4_parameters.dat {#-不需要额外准备-ad4_parametersdat}

The standard and hydrated AD4 GPFs generated by DockStart do not specify `parameter_file`; they use AutoGrid's default parameters. The documented AutoGrid4 4.2.6 check successfully generated maps without an external `.dat` file. Hydrated AD4 rejects custom parameter files. **AD4Zn is separate and requires `AD4Zn.dat`.**

### Changing system PATH {#-不需要配系统-path}

A configured executable path is sufficient and takes priority over PATH.

### Installing the full AutoDock suite {#-不需要装完整的-autodock-套件}

Only AutoGrid and any dependencies of your executable are needed for map generation.

## Troubleshooting {#排查表}

| Symptom | Check or action |
| --- | --- |
| Status and source are `missing` | Configure the path and confirm that the file exists |
| Path is not a readable file | Check the executable path, or that the selected directory contains it |
| Command-line identity cannot be confirmed | Run `--version` manually; check DLLs, corruption and whether it is the correct program |
| Version is empty | Use a build that reports an identifiable `x.y.z` version |
| AD4Zn rejects 4.2.6 | Use 4.2.7+; standard AD4 has a different minimum |
| `Too many "map" keywords` | Inspect GPF map lines versus `ligand_types`; report a generated GPF error to DockStart |
| Unknown atom type | Compare the PDBQT types with the generated maps |
| Grid too large | Reduce the box or, if scientifically appropriate, increase spacing |

AutoGrid uses even point counts per axis. DockStart reports limits rather than silently truncating the grid.

## Related pages {#相关页面}

- [Toolchain](./toolchain.md)
- [AutoGrid4](../part-a/docking-components/autogrid4.md)
- [Grid and maps](../part-a/search-space-and-scoring/grid-and-maps.md) and [AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- [Advanced protocol scope](./advanced-protocols.md)
- [Common errors and recovery](./common-errors-and-recovery.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart `backend/adapters/autogrid_adapter.py`: detection, versions and path resolution.
2. DockStart `backend/dockstart_core/autogrid.py`: version gates, GPF generation and map validation.
3. DockStart `backend/dockstart_core/settings.py`: tool paths and settings locations.
4. DockStart `docs/user_guide.md` and `docs/license_notes.md`.
5. DockStart `apps/desktop/src-tauri/src/main.rs`: desktop configuration directory.
6. [AutoDock download page](https://autodock.scripps.edu/download-autodock4/).
7. [AutoGrid source](https://github.com/ccsb-scripps/AutoGrid).
8. [AutoDock4 source](https://github.com/ccsb-scripps/AutoDock4).
9. AutoDock4.2.6 User Guide.

</details>
