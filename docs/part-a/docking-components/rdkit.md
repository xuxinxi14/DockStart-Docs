---
title: "RDKit"
sidebar_position: 4
---

# RDKit

## 简单概括

RDKit 是一个开源的化学信息学工具包，用来读取、表示、检查和处理分子结构；在 DockStart 的 docking 工作流中，它主要参与小分子结构的准备和处理。

RDKit 提供 Python、C++ 等接口，并包含分子结构表示、化学信息处理等功能。当前官方文档将其定位为一个 cheminformatics toolkit（化学信息学工具包）。([RDKit](https://www.rdkit.org/docs/))

---

## RDKit 主要处理什么？

对于一个小分子，程序不仅需要知道：

> 有哪些原子？

还需要知道：

- 原子之间怎么连接；
- 键是什么类型；
- 分子是否符合基本化学规则；
- 是否存在形式电荷、手性等结构信息；
- 分子是否具有三维坐标。

RDKit 可以把这些信息组织成计算机可以处理的**分子对象（molecule）**。

因此可以简单理解为：

```text
小分子文件
    ↓
RDKit 读取和表示
    ↓
得到计算机可处理的分子结构
```

---

## RDKit 为什么会出现在 Meeko 里？

Meeko 的配体准备流程以 RDKit molecule 作为输入。

Meeko 官方文档说明，Meeko 接收具有三维坐标和真实氢原子的 RDKit 分子，并进一步建立用于 docking 的 `MoleculeSetup`；RDKit 还会检查原子的价态，使明显错误的键级或形式电荷更容易被发现。([Meeko](https://meeko.readthedocs.io/en/develop/lig_overview.html))

所以两者的关系可以简单理解为：

```text
RDKit
 ↓
负责理解和处理小分子

Meeko
 ↓
把处理后的分子参数化为
AutoDock/Vina 所需结构
```

---

## RDKit 是 docking 软件吗？

**不是。**

RDKit 是化学信息学工具包，而不是像 AutoDock Vina 那样负责执行 docking 搜索的 docking engine。

也就是说：

```text
RDKit
≠
Docking Engine
```

它更多是在 docking 之前帮助程序**理解和准备分子**。

---

## 在 DockStart 中

当 DockStart 处理小分子时，RDKit 可以作为底层化学结构处理工具，为后续的 Meeko 和 docking 工作提供分子信息。

对于普通用户来说，不需要先学会 RDKit 编程才能使用 DockStart。

只需要先记住：

> **RDKit 更像是“认识和处理分子”的工具，而不是“进行对接”的工具。**

---

## 总结

RDKit 是用于分子结构处理和化学信息学计算的工具包，在 DockStart 工作流中主要帮助处理和理解小分子，为后续 Meeko 配体准备提供基础。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. RDKit 官方 Documentation.
2. Meeko Documentation, *Overview of ligand preparation*.
3. Meeko Documentation, *Basic ligand preparation*.

</details>
