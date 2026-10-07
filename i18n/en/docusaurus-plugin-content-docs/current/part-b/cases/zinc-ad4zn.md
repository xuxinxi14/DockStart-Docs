---
title: "Zinc / AD4Zn"
sidebar_position: 7
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Zinc / AD4Zn {#zinc--ad4zn}

AD4Zn addresses specific zinc-coordination sites. This page supplies official 1S63 inputs and preparation requirements. A validated DockStart walkthrough is still pending.<NoteRef number={2}/>

## Official 3D structure files {#official-structure-files}

<OfficialExampleFiles example="zinc"/>

## What to prepare first {#开始前准备什么}

- [Advanced protocols](../../part-c/advanced-protocols.md): check whether the zinc site is eligible.
- [AutoGrid4 setup](../../part-c/autogrid4-setup.md): AutoGrid4 `4.2.7+` is required.
- [AutoDock atom types](../../appendix/autodock-atom-types.md): dedicated types including `TZ`.
- [Error-message index](../../appendix/error-message-index.md): `AD4ZN_*` troubleshooting.

<DocNotes example="zinc">
<DocNote number={2} title="Example status">

This page does not yet provide verified DockStart screenshots or run scores. The official inputs are supplied for learning and subsequent validation. Check specialized receptor preparation, AD4Zn parameters and AutoGrid4 compatibility before use.

Docking scores indicate modeled binding trends and cannot replace experimental validation.

</DocNote>
</DocNotes>
