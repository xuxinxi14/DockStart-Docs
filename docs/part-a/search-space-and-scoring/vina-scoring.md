---
title: "Vina scoring"
sidebar_position: 4
---

# Vina scoring

## 简单概括

Vina scoring 是 AutoDock Vina 默认使用的经验评分函数，用来根据受体和配体之间的相互作用以及配体构象等因素，对候选 pose 进行评价。

---

## Scoring function 是什么？

Docking 程序会找到很多可能的配体 pose，但还需要回答一个问题：

> **哪个 pose 在计算模型中更合适？**

这就需要 **scoring function（评分函数）**。

可以简单理解为：

```text
一个 pose
   ↓
计算其中的各种相互作用
   ↓
得到一个分数
   ↓
用于比较不同 pose
```

Vina 的评分函数属于经验模型，由多个与原子距离和相互作用有关的项组合而成。其核心项包括两类空间/位阻相关的 Gaussian 项和排斥项，以及疏水作用、非定向氢键作用；同时还包含与配体可旋转键相关的构象项。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/))

---

## Vina 主要考虑什么？

不需要记住复杂公式，可以先把它理解成几个方面：

```text
Vina scoring
├─ 原子间空间接触
├─ 位阻/排斥
├─ 疏水作用
├─ 氢键相关作用
└─ 配体柔性的构象代价
```

这些因素共同构成最终的预测 affinity。

需要注意，这些并不是实验仪器分别测出来的能量，而是由 Vina 的计算模型组合得到的结果。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/))

---

## 为什么 Vina 的分数通常是负值？

Vina 输出的 affinity 通常以 **kcal·mol⁻¹** 表示。

在同一评分函数和相同任务中，较低的计算 score 通常表示在该模型下更加有利的 pose。例如官方示例中会输出：

```text
mode    affinity
1       -13.23
2       -11.29
3       -11.28
```

这些数值用于对该次 docking 得到的候选 pose 进行排序。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

但不要直接把：

> `-10 kcal/mol`

理解成实验测得的：

> “真实结合自由能就是 −10 kcal/mol”。

Vina 的 affinity 是**计算模型的预测值**。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## Vina score 能不能直接和实验值比较？

不能简单地这样做。

Vina 的评分函数虽然以 kcal·mol⁻¹ 表示，并且被设计用于估计结合亲和力，但其数值来自经验模型，因此不能把一个 docking score 当成实验测得的结合自由能。

同样重要的是：

> **不同 scoring function 得到的分数不能直接当作同一尺度比较。**

Vina 官方文档明确警告，AutoDock 和 Vina forcefield 的 energy scores 不具有直接可比性。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_multiple_ligands.rst))

---

## 在 DockStart 中

在最常见的 DockStart 基础 docking 中，如果使用默认的 Vina scoring，程序会：

```text
受体
+
配体
+
Box
↓
Vina 搜索
↓
候选 poses
↓
Vina scoring
↓
affinity + pose 排序
```

因此，当你在 DockStart 结果中看到：

> Affinity = −7.4 kcal·mol⁻¹

首先应该理解为：

> **这个 pose 在 Vina 评分模型下得到的计算结果。**

后面的“理解结果”章节还会专门讨论怎样正确解释这个分数。

---

## 总结

Vina scoring 是 Vina 用来评价候选 pose 的经验评分模型，它综合考虑原子间空间接触、排斥、疏水作用、氢键相关作用和配体柔性等因素，并输出用于 pose 排序的计算 affinity；它不是实验测得的真实结合自由能。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual.
2. AutoDock Vina 官方 Basic Docking 文档.
3. Trott & Olson, *AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading*.
4. Vinardo, *A Scoring Function Based on AutoDock Vina*.

</details>
