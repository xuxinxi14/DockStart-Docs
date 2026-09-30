---
title: "主流 Docking 软件"
sidebar_position: 5
sidebar_label: "E. 主流 Docking 软件"
---

# 主流 Docking 软件

## 简单概括

分子对接领域存在多种 docking 软件，它们在搜索方法、评分函数、支持的工作流程和使用方式上有所不同；DockStart 主要围绕 AutoDock Vina / AutoDock Suite 工作流展开。

---

## 为什么有这么多 Docking 软件？

分子对接本身包含多个问题：

> 怎么搜索可能的结合构象？

> 怎么评价这些构象？

不同软件采用了不同的算法和评分方法，因此会形成不同的 docking 工作流。

这也意味着：

> **不同软件对同一个体系得到的结果不一定完全相同。**

这并不奇怪，因为它们使用的模型和计算方法可能不同。

---

## AutoDock 4

**AutoDock 4** 是 AutoDock 系列中的经典 docking 程序。

它采用基于预计算 grid maps 的工作方式，并支持一定程度的受体柔性等功能。

AutoDock Suite 还包含与特定体系相关的工具和工作流程。

在 DockStart 中，AutoDock 4 相关功能主要出现在需要 **AutoGrid4 / Maps** 的高级工作流中。

---

## AutoDock Vina

**AutoDock Vina** 是 AutoDock 系列中的另一套 docking 程序。

它与 AutoDock 4 使用了不同的评分函数和算法，同时保留了 PDBQT 等兼容性设计。Vina 本身支持分子对接和虚拟筛选。

这也是：

> **DockStart 主要围绕的 docking 引擎。**

所以在学习 DockStart 时，Vina 是最需要首先理解的一套 docking 软件。

---

## DOCK 6

**DOCK 6** 是由 UCSF 等研究团队发展的分子对接软件套件。

它包含多种搜索和评分相关功能，并支持不同的 docking 与分子设计工作流。

它与 AutoDock Vina 一样，都是用于蛋白质—配体分子对接研究的工具，但具体算法和工作流程并不相同。

---

## GOLD

**GOLD（Genetic Optimisation for Ligand Docking）** 是 CCDC 提供的蛋白质—配体 docking 软件。

它使用遗传算法进行柔性配体 docking，并提供多种评分函数、约束以及水处理等功能。

GOLD 是商业软件体系 CSD Portfolio 的组成部分。

---

## Glide

**Glide** 是 Schrödinger 的蛋白质—配体 docking 软件，面向结构基础药物设计、结合模式预测和虚拟筛选等工作。

它属于商业软件工作流的一部分，与 AutoDock Vina 在软件架构、评分体系和使用方式上都有区别。

---

## 它们之间有什么区别？

可以先用一个非常简单的方式理解：

| 软件 | 开发/所属 | 主要特点 |
|---|---|---|
| AutoDock 4 | Scripps / AutoDock Suite | 经典 AutoDock 工作流，使用 Grid Maps 等机制 |
| AutoDock Vina | Scripps | 新一代 AutoDock 系列 docking 引擎，DockStart 主要使用 |
| DOCK 6 | UCSF | 多组件、多种搜索与评分工作流 |
| GOLD | CCDC | 遗传算法、柔性配体、多种评分与约束 |
| Glide | Schrödinger | 商业结构基础药物设计与 docking 工作流 |

这里不需要把它们理解成：

> “谁最好？”

更重要的是：

> **它们是不同的 docking 工具，使用的算法、评分方法和工作流程有所不同。**

因此，后面即使看到不同软件对同一个蛋白质和配体得到不同结果，也需要先考虑：

> **它们是不是在使用相同的输入、相同的搜索条件和相同的评分模型？**

---

## 为什么 DockStart 选择 AutoDock Vina？

DockStart 主要使用 Vina，相关工具的关系如下：

```text
AutoDock Suite
      │
      ├── AutoDock 4
      │
      └── AutoDock Vina
                ↓
             DockStart
```

DockStart 将 Vina 的 docking 工作流整理成更适合桌面使用的操作流程，同时也提供部分 AutoDock4 / AutoGrid4 相关高级工作流。

因此：

> **学习 DockStart 时，首先需要理解的是 Vina 的基本概念和工作方式。**

---

## 总结

Docking 软件有很多种，它们采用不同的算法和评分方法；DockStart 主要围绕 AutoDock Vina，同时保留部分 AutoDock4 / AutoGrid4 高级工作流。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. Trott O, Olson AJ. *AutoDock Vina: Improving the Speed and Accuracy of Docking with a New Scoring Function, Efficient Optimization, and Multithreading*. Journal of Computational Chemistry. 2010;31(2):455–461.
2. AutoDock Vina 官方文档。
3. UCSF DOCK 6 官方网站与文档。
4. CCDC GOLD 官方文档。
5. Schrödinger Glide 官方页面。

</details>
