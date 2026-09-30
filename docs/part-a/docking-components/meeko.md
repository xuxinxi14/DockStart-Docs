---
title: "Meeko"
sidebar_position: 5
---

# Meeko

## 简单概括

Meeko 是 AutoDock/Vina 工作流中的结构准备工具，主要负责把受体和配体处理成 docking 程序可以使用的输入形式。

Meeko 官方文档提供了配体准备和受体准备工具，并支持命令行和 Python API。([Meeko](https://meeko.readthedocs.io/en/develop/lig_overview.html))

---

## Meeko 主要做什么？

最常见的工作可以理解成：

```text
原始受体结构
    ↓
Meeko
    ↓
受体 PDBQT

原始配体结构
    ↓
Meeko
    ↓
配体 PDBQT
```

例如，`mk_prepare_ligand.py` 可以读取 SDF 并生成用于 AutoDock-Vina 的 PDBQT；`mk_prepare_receptor.py` 可以从 PDB/CIF 等结构准备受体输入。([Meeko](https://meeko.readthedocs.io/en/develop/lig_prep_basic.html))

---

## Meeko 和 RDKit 是什么关系？

对于配体来说，可以简单理解为：

```text
RDKit
 ↓
表示和检查分子

Meeko
 ↓
进一步进行 docking 参数化和准备

PDBQT
 ↓
交给 Vina
```

Meeko 会根据分子的结构生成包括原子类型、部分电荷、可旋转键等在内的参数化信息，并将其写入 docking 所需的 PDBQT 表示。([Meeko](https://meeko.readthedocs.io/en/develop/lig_overview.html))

---

## Meeko 是 docking engine 吗？

**不是。**

Meeko 的主要任务是**准备输入**，真正执行 docking 搜索的是 AutoDock Vina、AutoDock-GPU 或其他 docking engine。

因此：

```text
RDKit
→ 理解分子

Meeko
→ 准备 docking 输入

Vina
→ 执行 docking
```

---

## Meeko 还能处理什么？

除了最基本的受体和配体准备，Meeko 还支持更复杂的工作流，例如：

- 柔性受体；
- 特定残基的处理；
- 某些特殊 docking 方法；
- 生成与搜索空间相关的辅助文件。

例如官方教程中，`mk_prepare_receptor.py` 可以同时准备刚性受体、柔性侧链以及搜索空间相关的信息。([Meeko](https://meeko.readthedocs.io/en/develop/tutorial1.html))

不过在基础使用阶段，可以先把 Meeko 理解成：

> **“负责把分子整理成 docking 程序需要的形式。”**

---

## 在 DockStart 中

DockStart 会调用相应的结构准备工具，把用户提供的结构转换成后续 docking 可以使用的输入。

所以当用户看到：

> “受体准备”

或者：

> “配体准备”

这背后通常就涉及 Meeko 这样的工具。

---

## 总结

Meeko 连接了“原始分子结构”和“Docking 程序输入”两个环节，它主要负责受体和配体的结构准备与参数化，而不负责真正执行 docking 搜索。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. Meeko Documentation, *Basic Docking*.
2. Meeko Documentation, *Basic ligand preparation*.
3. Meeko Documentation, `mk_prepare_receptor.py`.
4. Meeko Documentation, *Overview of ligand preparation*.

</details>
