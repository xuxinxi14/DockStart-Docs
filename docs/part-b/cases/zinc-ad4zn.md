---
title: "Zinc / AD4Zn"
sidebar_position: 7
sidebar_label: "Zinc / AD4Zn"
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Zinc / AD4Zn

AD4Zn 用于特定锌配位位点。本页提供官方 1S63 输入与准备条件，DockStart 实测案例尚待补充。<NoteRef number={2}/>

## 官方三维结构文件 {#official-structure-files}

<OfficialExampleFiles example="zinc"/>

## 开始前准备什么

- [高级协议的适用范围](../../part-c/advanced-protocols.md)：核对 Zn 位点是否适用。
- [配置 AutoGrid4](../../part-c/autogrid4-setup.md)：AutoGrid4 4.2.7+ 的版本门槛。
- [AutoDock 原子类型](../../appendix/autodock-atom-types.md)：TZ 等专用类型。
- [错误信息索引](../../appendix/error-message-index.md)：`AD4ZN_*` 的排查入口。

<DocNotes example="zinc">

<DocNote number={2} title="案例状态">

本页尚未提供经过验证的 DockStart 逐步截图与运行分数。官方输入链接用于学习和后续验证，不表示 DockStart 已完成该体系的实测。使用前需核对专用受体准备、AD4Zn 参数与 AutoGrid4 兼容性。

Docking score 仅供结构结合趋势参考，不能替代实验验证。

</DocNote>

</DocNotes>
