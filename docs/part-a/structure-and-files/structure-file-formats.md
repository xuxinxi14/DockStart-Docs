---
title: "常见结构文件格式"
sidebar_position: 1
---

# 常见结构文件格式

## 简单概括

分子对接会接触多种结构文件格式，它们保存的信息各有侧重；对 DockStart 用户来说，最重要的是知道这些文件分别保存什么，以及它们最终怎样进入 docking 工作流。

---

## PDB 和 CIF 是什么？

**PDB（Protein Data Bank）**首先是一个结构数据库，而我们下载到的 `.pdb` 文件则是一种传统的结构文件格式。

现在 PDB 归档的主要数据格式是 **PDBx/mmCIF**。与传统 PDB 格式相比，mmCIF 能够表示更大、更复杂的结构，因此现在越来越重要。([RCSB PDB](https://www.rcsb.org/docs/general-help/structures-without-legacy-pdb-format-files))

对初学者来说，可以先简单记成：

> **PDB 是我们寻找生物大分子结构的数据库；`.pdb` 和 `.cif` 则是常见的结构文件。**

---

## SDF、MOL 和 MOL2 是什么？

这几种文件主要用于描述**化学分子结构**，在处理小分子时很常见。

其中 SDF（Structure Data File）特别常见，因为一个 SDF 文件可以包含一个或多个分子及其结构信息。Meeko 的配体准备工具可以直接读取 SDF；它也支持 MOL2，并且官方文档目前更推荐 SDF 作为配体输入。([Meeko Documentation](https://meeko.readthedocs.io/en/develop/lig_prep_basic.html))

所以可以简单理解：

> **PDB/mmCIF 更常见于生物大分子结构，SDF/MOL/MOL2 更常见于小分子结构。**

实际项目中，它们并不是绝对只能用于某一种分子，但这样的理解对于初学者已经足够。

---

## PDBQT 又是什么？

**PDBQT 是 AutoDock 系列工作流使用的结构输入格式。**

它在类似 PDB 坐标信息的基础上，还包含 AutoDock 所需的原子类型、部分电荷以及配体柔性等信息。([Meeko Documentation](https://meeko.readthedocs.io/en/develop/pdbqt_spec.html))

AutoDock Vina 使用 PDBQT 作为受体和配体的结构输入。([AutoDock Vina Manual](https://vina.scripps.edu/manual/))

因此在 DockStart 中，经常可以看到这样的关系：

```text
PDB / CIF
    ↓
受体准备
    ↓
PDBQT

SDF / MOL / MOL2
    ↓
配体准备
    ↓
PDBQT
```

---

## 为什么不能把这些文件看成“只是不同后缀”？

因为不同格式保存的信息并不完全相同。

一个文件可能主要保存：

- 原子和三维坐标；
- 原子之间的连接关系；
- 键级；
- 电荷；
- 分子名称及其他结构信息；
- Docking 所需的特殊信息。

因此：

> **“文件格式不同”往往意味着“程序能直接获得的信息不同”。**

所以 DockStart 的结构准备步骤，本质上是在把原始结构转换成 docking 程序能够正确理解和处理的形式。

---

## DockStart 使用哪些格式

对新手来说，先记住下面这条路线就够了：

```text
蛋白质结构
PDB / CIF
    ↓
受体准备
    ↓
PDBQT

小分子结构
SDF / MOL / MOL2
    ↓
配体准备
    ↓
PDBQT
```

然后：

```text
受体 PDBQT
      +
配体 PDBQT
      ↓
AutoDock Vina
      ↓
Docking 结果
```

Meeko 提供了受体和配体的准备工具，用于生成 Vina 可以使用的 PDBQT。([Meeko Documentation](https://meeko.readthedocs.io/en/develop/tutorial1.html))

---

## 总结

PDB/mmCIF、SDF、MOL、MOL2 等是常见结构文件，而 PDBQT 是 AutoDock/Vina 工作流中的重要输入格式；DockStart 的结构准备，就是把合适的原始结构转换成 docking 可以使用的形式。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. RCSB PDB, *Structures Without Legacy PDB Format Files*.
2. RCSB PDB / PDB-101, *Beginner’s Guide to PDBx/mmCIF*.
3. Meeko Documentation, *Basic ligand preparation*.
4. Meeko Documentation, *Basic Docking*.
5. Meeko Documentation, *PDBQT Format for Coordinate Files*.
6. AutoDock Vina 官方 Manual.

</details>
