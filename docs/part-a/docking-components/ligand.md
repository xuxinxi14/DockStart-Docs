---
title: "Ligand"
sidebar_label: "Ligand（配体）"
sidebar_position: 2
---

import PoseExplorer from '@site/src/components/interactive/PoseExplorer';
import {LigandModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Ligand

Ligand（配体）是 docking 中被放入受体结合空间、并寻找合适三维结合方式的小分子或其他待研究分子。

在常见的蛋白质-小分子 docking 中，Ligand 通常就是待研究的小分子。

---

## Ligand 在 docking 中做什么？

可以简单理解为：

```text
Receptor
   ↓
提供结合环境

Ligand
   ↓
尝试进入这个环境

        ↓

搜索不同的
位置、方向和构象
```

Vina 将配体作为 docking 的一个核心输入，并在搜索空间中寻找可能的结合构象。([AutoDock Vina](https://vina.scripps.edu/manual/))

---

## 为什么配体需要准备？

小分子文件通常包含：

- 原子；
- 化学键；
- 三维坐标；
- 氢原子；
- 立体化学等信息。

这些信息需要转换成 docking 程序能够使用的形式。

Meeko 的配体准备工具 `mk_prepare_ligand.py` 可以从 SDF 等输入生成用于 AutoDock-Vina 的 PDBQT。官方文档特别指出，输入分子需要具有真实的氢原子和三维坐标。([Meeko](https://meeko.readthedocs.io/en/develop/lig_prep_basic.html))

因此，Ligand preparation 的目的并不只是“换文件格式”，还包括建立适合 docking 的配体计算模型。

---

## 配体为什么经常具有柔性？

小分子中的某些键可以旋转。

当这些键发生旋转时，配体的三维形状会发生变化。

因此 docking 时，程序往往不只是寻找：

> 配体放在哪里？

还要寻找：

> **配体以什么形状放在那里？**

这就是为什么配体柔性是 docking 中的重要问题。

---

<PoseExplorer initialMode="torsion" />

## 配体和受体是什么关系？

可以把一次最基本的 docking 理解为：

```text
Receptor
提供环境
      +
Ligand
尝试结合
      ↓
Docking
      ↓
得到若干可能的 Pose
```

所以 Receptor 和 Ligand 是相互对应的两个核心输入。

后面学习 Vina 时会看到，基本命令中也是分别指定：

```text
--receptor
--ligand
```

([AutoDock Vina](https://vina.scripps.edu/manual/))

---

## 在 DockStart 中

在 DockStart 中，用户提供的小分子经过配体准备后，会进入 docking 工作流。

因此需要特别注意：

> **输入的配体结构必须代表你真正想研究的分子。**

如果分子的质子化状态、构象、手性等信息处理错误，那么即使 docking 程序运行正常，计算的也可能不是目标分子。

---

<DocNotes>

<DocNote number={1} title="配体示意模型">

<LigandModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual.
2. Meeko Documentation, *Basic ligand preparation*.
3. Meeko Documentation, *Basic Docking*.

</details>
