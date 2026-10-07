---
title: "Installation, Updates and Data Safety"
sidebar_position: 13
sidebar_label: "Installation and data safety"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Installation, Updates and Data Safety {#安装更新和数据安全}

Verify the installer source, keep projects in a directory you control and back up the complete project before updating.

## Installation {#安装}

The public v1.0.4 package is the Assisted trial for Windows 10/11 x64. It is unsigned; verify the source and SHA256 using [download and quick start](./quick-start-v1-0-4.md). Ordinary Vina and preparation tools are bundled.<NoteRef number={1}/>

## Updating {#更新}

1. Finish or safely stop active work and close DockStart.
2. Record the current version and back up the **entire project folder**.
3. Download and verify the new package.
4. Install, detect tools and test with a project copy.

Before switching build profiles, back up projects and uninstall the previous profile. Do not use an older application to overwrite a project with a newer unsupported schema.

## Where project files live {#项目文件在哪里}

You choose the project directory:

```text
<directory>/<project>/
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

Back up all of it. A batch archive ZIP is a read-only result export, not a complete runnable project backup. Application settings and diagnostics have separate locations.<NoteRef number={2}/>

## When network access is used {#你的数据会不会联网}

Preparation, docking and local diagnostics run locally. Explicit RCSB or PubChem retrieval uses the network. Diagnostics are not automatically uploaded.

## What to check before sharing {#分享前检查什么}

Review project JSON, diagnostics and archives for usernames, paths, tool locations and research structures. Work on a copy if redaction is needed; do not modify original hash-protected run records.

For an issue report, include DockStart and Windows versions, reproduction steps, the exact error code and reviewed diagnostics or a minimal example. Exports are not automatically anonymous.

## Avoid accidental damage {#避免误操作}

Use the interface for project edits. Create a new run after changing inputs or settings, and regenerate maps when their receptor or defining settings change. Keep old records. Do not manually remove active lock or staging files.<NoteRef number={3}/>

## Related pages {#相关页面}

- [Download and quick start](./quick-start-v1-0-4.md)
- [Projects and reproducibility](./projects-versions-reproducibility.md)
- [Common errors and recovery](./common-errors-and-recovery.md)
- [File extensions](../appendix/file-extensions.md)

<DocNotes>

<DocNote number={1} title="Release and update details">

Only the Assisted EXE is public for v1.0.4; Basic / MSI are not public downloads. Full installation, GUI and scientific release acceptance remain pending. Profiles share an application identity and cannot be installed side by side. Updates are manual; check project compatibility and keep backups.

</DocNote>

<DocNote number={2} title="Settings and diagnostics locations">

The packaged application normally stores `dockstart_settings.json` in its configuration directory for `org.dockstart.desktop`. Source runs can use another fallback, and `DOCKSTART_SETTINGS_PATH` can override it.

Diagnostics are written locally under DockStart's diagnostics directory in application data, using UTC-based filenames. They can contain private local paths; inspect them before sharing.

</DocNote>

<DocNote number={3} title="File protection and temporary files">

Atomic writes, snapshots, hashes, revision conflicts and schema backups protect records. Malformed settings are not silently overwritten. Editing old artifacts can trigger integrity failures. Write probes and staging files are normal during active work; after an abnormal exit, inspect recovery state before removing them.

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart settings, persistence and diagnostics modules.
2. DockStart Tauri desktop configuration.
3. DockStart release notes and validation records.

</details>
