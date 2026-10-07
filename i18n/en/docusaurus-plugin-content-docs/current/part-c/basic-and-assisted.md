---
title: "Basic and Assisted"
sidebar_position: 1
sidebar_label: "Basic and Assisted"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Basic and Assisted {#basic-与-assisted}

Basic runs docking with existing PDBQT files. Assisted adds tools for preparing PDBQT from raw structures.

## Which download to use {#现在下载哪个}

The current public download is the **v1.0.4 Assisted trial**. You can also import existing PDBQT files. See [download and quick start](./quick-start-v1-0-4.md).<NoteRef number={1}/>

## What differs {#两者有什么区别}

| Feature | Basic | Assisted |
| --- | --- | --- |
| Import PDBQT and run docking | Supported | Supported |
| Prepare a PDB/CIF receptor | External tools required | Preparation tools bundled |
| Prepare an SDF/MOL/single-molecule MOL2 ligand | External tools required | Preparation tools bundled |
| AutoDock Vina | Bundled | Bundled |
| RDKit / Meeko | Not bundled | Bundled |
| AutoDock4 maps | Configure external AutoGrid4 | Configure external AutoGrid4 |

## After installation {#安装后怎么开始}

1. Run detection in Toolchain. Vina is needed for existing PDBQT; preparation tools are also needed when starting from raw structures.
2. Explore an example or import your structures in Projects.
3. Review protonation, charges, chirality and missing receptor atoms after conversion. Then set the docking box and run.

If available modes differ from the installer profile name, check the tool detection results.<NoteRef number={2}/>

## Related pages {#相关页面}

- [Toolchain](./toolchain.md): detect tools and resolve missing components.
- [Structure preparation FAQ](./faq-structure-preparation.md): conversion failures and structure review.
- [Basic 1IEP example](../part-b/cases/basic-docking-1iep.md): complete a docking run.

<DocNotes>

<DocNote number={1} title="Build profiles and release status">

Basic and Assisted are build profiles, not maturity levels. Only the Assisted EXE is public for v1.0.4. Basic and MSI are not public downloads. Full installation, GUI and scientific acceptance remain pending; see the [release notes](https://github.com/xuxinxi14/DockStart/blob/main/docs/release/v1_0_4_release_notes.md). Both profiles share the application identity and cannot be installed side by side. Back up projects and uninstall the current profile before switching.

</DocNote>

<DocNote number={2} title="How available modes are determined">

Detected tools determine available modes. Vina enables the Basic workflow; Vina, Python, RDKit and Meeko together enable Assisted preparation. A Basic installation may show Assisted as available after you configure compatible external preparation tools.

Input snapshots, settings, tool versions, logs and results help reproduce and troubleshoot a run. They do not replace structure review. Bundled examples teach operation.

Docking scores indicate modeled binding trends and cannot replace experimental validation.

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">References</summary>

1. DockStart `backend/dockstart_core/capabilities.py` and `toolchain.py`: capabilities and detection.
2. DockStart `docs/release/release_artifact_profile.md`: build profiles.
3. DockStart `docs/demo_projects.md`: example projects.

</details>
