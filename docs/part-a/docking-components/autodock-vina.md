---
title: "AutoDock Vina"
sidebar_position: 6
---

# AutoDock Vina

AutoDock Vina 是一个 docking engine，用来在指定的搜索空间中寻找配体与受体可能的结合构象，并对这些构象进行评分。

Vina 是 AutoDock 系列中的独立 docking 程序，使用 PDBQT 结构输入，并通过搜索和评分得到多个候选结合模式。([AutoDock Vina](https://vina.scripps.edu/manual/))

---

## Vina 在整个流程中处于什么位置？

可以把前面的几个工具连起来：

```text
原始分子结构
      ↓
RDKit
      ↓
Meeko
      ↓
受体 / 配体 PDBQT
      ↓
AutoDock Vina
      ↓
Docking 结果
```

所以 Vina 是真正执行 **docking 搜索** 的核心程序。

---

## Vina 在搜索什么？

对于一个基本 docking 任务，Vina 会在指定的三维搜索空间中寻找可能的配体构象。

需要考虑的主要变化包括：

- 配体的位置；
- 配体的方向；
- 配体的构象；
- 如果使用柔性受体，还包括指定受体侧链的变化。

Vina 的输入参数中，`--receptor`、`--ligand` 和搜索空间的中心、尺寸等共同定义了一次基本 docking 任务。([AutoDock Vina](https://vina.scripps.edu/manual/))

---

## Vina 和 AutoDock 4 一样吗？

**不是。**

虽然两者都属于 AutoDock 家族，也使用 PDBQT，并且都用于分子对接，但 Vina 不是 AutoDock 4 的简单升级版本。

官方说明指出，Vina 使用了不同的评分函数和新的算法实现。([AutoDock Vina](https://vina.scripps.edu/manual/))

因此：

```text
AutoDock 4
≠
AutoDock Vina
```

它们属于相关但不同的 docking engine / 工作流。

---

## Vina 需要 AutoGrid4 吗？

对于最常见的 **Vina scoring**：

> **不需要预先运行 AutoGrid4。**

Vina 会在 docking 开始前计算所需的内部网格信息。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

但 Vina 1.2.x 也支持使用 **AutoDock4 scoring function**。在这种情况下，需要先通过 AutoGrid4 生成相应的 affinity maps，再交给 Vina 使用。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

所以以后看到 AutoGrid4 时，要注意它并不是 Basic Vina docking 的必经步骤。

---

## 在 DockStart 中

DockStart 最终需要调用 docking engine 来完成计算，而 AutoDock Vina 就是其中最核心的一个。

因此：

> **DockStart 是工作流工具，Vina 是执行 docking 计算的核心引擎。**

两者不是同一个层级的软件。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual.
2. AutoDock Vina 官方 Basic Docking 文档.
3. AutoDock Suite 官方网站.

</details>
