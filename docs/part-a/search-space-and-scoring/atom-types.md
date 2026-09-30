---
title: "Atom Types"
sidebar_label: "Atom Types（原子类型）"
sidebar_position: 3
---

# Atom Types

## 简单概括

Atom Types（原子类型）是 docking 程序用来描述原子计算性质的分类，而不是简单地把原子按元素名称分类。

---

## 为什么需要 Atom Types？

对于一个 docking 程序来说，只知道：

```text
这是一个 O
这是一个 N
这是一个 C
```

还不一定足够。

因为不同化学环境中的原子，其相互作用性质可能不同。

例如，同样是氧原子：

- 一个可能属于羰基氧；
- 一个可能属于羟基氧；
- 一个可能参与其他特殊化学环境。

因此 docking 工作流通常会根据原子的化学环境，为它分配适合计算的 **atom type**。

---

## Atom Type 和元素有什么区别？

可以简单理解为：

```text
元素
↓
“它是什么元素？”

Atom Type
↓
“在 docking 计算中，
它应该被怎样对待？”
```

所以 Atom Type 并不一定和元素符号完全相同。

在 AutoDock4 的 maps 中，就可以看到 `C`、`A`、`N`、`OA`、`HD` 等类型。它们是 AutoDock 工作流中的计算原子类型，而不是简单重复元素周期表中的元素名称。([AutoDock](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf))

---

## Atom Types 为什么会影响 docking？

因为 docking 的评分和相互作用计算需要区分不同类型的原子。

例如，程序需要知道一个原子是否属于：

- 特定的氢键供体/受体类型；
- 特定的碳类型；
- 某种特殊的杂原子类型。

不同的原子类型可以对应不同的相互作用参数。

因此可以简单理解为：

```text
分子结构
 ↓
识别原子
 ↓
分配 Atom Types
 ↓
程序根据 Atom Types
处理相互作用和评分
```

Meeko 在分子参数化过程中就会为配体以及受体分配 atom types，同时处理部分电荷、可旋转键等信息。([Meeko](https://meeko.readthedocs.io/en/develop/))

---

## 为什么同一个元素可能出现不同 Atom Types？

因为 docking 关心的不是元素名称本身，而是原子的**化学和计算环境**。

例如，同样是碳原子，在不同的键合环境中，其计算分类可能不同。

因此：

> **Atom Type 是面向 docking 计算的分类，而不是普通化学元素标签。**

这也是为什么不能简单地把 PDBQT 里的 atom type 一栏当成“元素名称”。

---

## Atom Types 和 Grid / Maps 有什么关系？

两者是直接联系在一起的。

可以理解成：

```text
Atom Types
    ↓
程序知道“要计算哪些类型的原子”
    ↓
Grid / Maps
    ↓
记录这些类型在空间中的相互作用信息
```

例如 AutoDock4 会针对不同 atom types 生成相应的 affinity maps。([AutoDock](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf))

因此，在下一篇讲 Vina scoring 时，Atom Types 就会自然连接到评分和相互作用模型。

---

## 在 DockStart 中

正常使用 DockStart 时，用户通常不需要手动给每一个原子指定 atom type。

结构准备工具会根据输入结构完成相应的参数化。

例如 Meeko 会为分子分配 atom types，并生成供 AutoDock-Vina 或 AutoDock-GPU 使用的 PDBQT。([Meeko](https://meeko.readthedocs.io/en/develop/))

所以对于初学者，更重要的是理解：

> **Atom Types 是 docking 引擎理解“这个原子应该怎样参与计算”的基础信息之一。**

---

## 总结

Atom Types 是 docking 中对原子计算性质进行分类的方式，它比单纯的元素名称更具体，并会参与相互作用计算、Grid/Maps 以及后续评分过程；通常由结构准备工具自动处理。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. Meeko Documentation, *Interface for AutoDock*.
2. AutoDock4.2.6 User Guide.
3. AutoDock Vina 官方 Manual.
4. Meeko Documentation, *Ligand Preparation*.

</details>
