---
title: "Pose"
sidebar_position: 1
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

import PoseExplorer from '@site/src/components/interactive/PoseExplorer';
import {LigandModelNote} from '@site/src/components/interactive/TeachingNotes';

# Pose

Pose（结合模式）是 Vina 给出的一种候选结合方式，它描述配体在受体中的位置、朝向和构象，并带有自己的评分。

---

## 一个 Pose 包含哪些信息？

配体要放进受体，需要同时确定三件事：

```text
位置   配体在结合位点的哪里
朝向   配体以什么方向摆放
构象   配体的可旋转键采取什么角度
```

这三者合起来，就确定了一个 pose。

对具有柔性的配体来说，第三项尤其重要——因为同一个分子可以有不同的三维形状。

---

<PoseExplorer initialMode="orientation" />

## Pose 在输出里长什么样？

Vina 把找到的 pose 写进输出文件（PDBQT），每个 pose 是一个 `MODEL`，并带有自己的 REMARK，其中包含评分：

```text
REMARK VINA RESULT:   -13.23  0.000  0.000
```

同时，终端会打印一张 mode 表格：([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

```text
mode |   affinity | dist from best mode
     | (kcal/mol) | rmsd l.b.| rmsd u.b.
-----+------------+----------+----------
1       -13.23          0          0
2       -11.29     0.9857      1.681
```

也就是说：

> **每一个 mode，就是一个 pose。**

可打开的构象以输出 PDBQT 中的 `MODEL` 为准；评分表行数可能更多。<NoteRef number={1}/>

---

## Pose 是“答案”还是“候选”？

Pose 是**候选**。

Vina 在搜索过程中会找到很多可能的摆放方式，经过合并、去重、聚类和排序之后，把其中比较有代表性的一些作为结果输出。

所以要这样理解：

```text
一次 docking
    ↓
一堆候选 pose
    ↓
按评分排序后输出的若干个
```

它是**计算模型给出的可能性**，而不是实验观测到的结构。

---

## 为什么会有多个 Pose？

因为搜索空间里可能同时存在若干个“看起来都不错”的摆放方式：

- 它们可能落在不同的子口袋；
- 也可能落在同一区域，但方向或构象略有不同。

Vina 会把它们一起给出，让你自己判断哪一个更符合研究问题。这也正是 `num_modes` 和 `energy_range` 存在的原因。

---

## 在 DockStart 中

在 DockStart 中，先确认选择的是哪次运行，再区分评分列表与实际保存的 pose。查看三维构象需要输出文件里确实存在该 mode 的坐标。

对初学者来说，可以先这样使用：

```text
先看排序第一的 pose
    ↓
再看能量接近的其他 pose
    ↓
比较它们是否落在同一个结合区域
```

如果多个高分 pose 落在同一个区域、构象也相似，通常说明这个区域是比较稳定的候选。

<DocNotes>

<DocNote number={1} title="构象输出说明">

Vina 1.2.7 写入结构时还会按 `energy_range` 过滤；候选评分与保存坐标需要分别检查。详见 [Energy Range](../search-and-parameters/energy-range.md)。

</DocNote>

<DocNote number={2} title="配体示意模型">

<LigandModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 Manual.
3. AutoDock Vina 官方 FAQ.

</details>
