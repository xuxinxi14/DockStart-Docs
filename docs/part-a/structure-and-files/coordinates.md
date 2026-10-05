---
title: "坐标、坐标系与常用单位"
sidebar_position: 2
---

# 坐标、坐标系与常用单位

分子结构不仅要知道“有哪些原子”，还要知道每个原子位于三维空间中的什么位置；这些位置通常用 X、Y、Z 坐标表示，而 docking 中最常见的长度单位是 Å（埃）。

---

## 什么是坐标？

可以把蛋白质想象成一个三维模型。

模型中的每一个原子都有一个位置，而计算机需要用数字表示这个位置。

最常见的方式就是：

```text
X
Y
Z
```

三个坐标共同表示一个原子在三维空间中的位置。

例如一个原子可能位于：

```text
X = 10.2
Y = 5.7
Z = -3.1
```

这三个数字共同确定它在空间中的位置。

RCSB PDB 的结构数据就包含原子的 X、Y、Z 三维坐标。传统 PDB 格式的坐标字段以 Å 为单位。([RCSB PDB](https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/dealing-with-coordinates))

---

## 什么是坐标系？

坐标系就是我们用来描述这些位置的一套共同标准。

最简单的理解是：

```text
        Z
        ↑
        │
        │
        └────────→ X
       /
      /
     Y
```

程序通过这套坐标系知道：

> 原子在哪里？

> 两个原子之间距离多远？

> 一个分子相对于另一个分子位于什么位置？

因此，Docking 中的“位置”并不是肉眼看到的概念，而是由这些三维坐标表示的。

---

## 为什么坐标对 docking 很重要？

因为分子对接本质上就是在三维空间中寻找合适的分子排列。

例如，一个配体如果靠近某个氨基酸，就可能产生某种相互作用。

如果配体的位置发生变化，那么：

- 原子间距离会变化；
- 空间方向会变化；
- 可能形成的相互作用也会变化。

所以 docking 程序不断改变配体的位置和方向，本质上就是在不断改变这些三维坐标。

---

## Å 是什么？

**Å（Ångström，埃）是分子尺度中非常常见的长度单位。**

可以简单理解为：

> **1 Å = 10⁻¹⁰ m**

蛋白质、配体以及原子之间的距离都处在非常小的尺度，因此使用 Å 比使用米更加方便。

在 AutoDock Vina 中，搜索空间的 `size_x`、`size_y`、`size_z` 就使用 Å 作为单位。([AutoDock Vina Manual](https://vina.scripps.edu/manual/))

---

## kcal·mol⁻¹ 又是什么？

在 docking 结果中，我们还经常看到：

```text
kcal/mol
```

它是**能量相关的单位**。

AutoDock Vina 输出的 predicted binding affinity 就使用 kcal/mol。([AutoDock Vina Manual](https://vina.scripps.edu/manual/))

这里需要特别注意：

> **Vina 输出的 kcal/mol 数值是计算模型产生的预测结果，不是实验仪器直接测得的结合能。**

关于 Affinity 到底应该怎样理解，会在后面的“理解结果”部分进一步介绍。

---

## 在 DockStart 中最常见的两个单位

所以，对于刚开始使用 DockStart 的人，可以先记住：

| 单位 | 主要表示什么 |
|---|---|
| **Å** | 分子和空间的长度、距离、搜索区域大小 |
| **kcal·mol⁻¹** | Docking 结果中常见的预测能量/亲和力数值单位 |

暂时不需要在这里深入学习物理化学中的能量定义。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. RCSB PDB-101, *Dealing with Coordinates*.
2. RCSB PDB, *PDB Format*.
3. AutoDock Vina 官方 Manual.
4. AutoDock Vina 官方 Basic Docking 文档.

</details>
