---
title: "Affinity / Docking Score"
sidebar_position: 2
---

# Affinity / Docking Score

Affinity 是 Vina 评分函数给出的预测数值，单位是 kcal·mol⁻¹；它是计算模型的结果，不是实验测得的结合自由能。

---

## Affinity 从哪来？

Vina 用评分函数对每个候选 pose 计算一个数值，并把它作为该 pose 的 affinity 输出：

```text
mode |   affinity | dist from best mode
     | (kcal/mol) | rmsd l.b.| rmsd u.b.
-----+------------+----------+----------
1       -13.23          0          0
2       -11.29     0.9857      1.681
```

在同一评分函数、同一次任务中，**affinity 越小（越负）表示在该模型下越有利**。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 它由哪些部分构成？

Vina 在 `--score_only` 或较详细的输出中会把评分拆开显示：

```text
Estimated Free Energy of Binding   : ... (kcal/mol) [=(1)+(2)+(3)-(4)]
(1) Final Intermolecular Energy    : ...
    Ligand - Receptor
    Ligand - Flex side chains
(2) Final Total Internal Energy    : ...
(3) Torsional Free Energy          : ...
(4) Unbound System's Energy        : ...
```

可以看到，它并不是一个单一物理量，而是由**分子间作用、分子内能量、可旋转键的构象代价**等几项组合得到的。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 为什么不能当成实验测得的结合自由能？

因为它来自**经验评分模型**，而不是实验测量。

需要特别注意官方 FAQ 里的几条说明：

| 说明 | 含义 |
|---|---|
| Vina 使用 **united-atom** 评分函数，只涉及重原子 | 输出中氢原子的位置是任意的，不具物理意义 |
| Vina **忽略用户提供的 partial charges** | 静电作用通过疏水项和氢键项间接体现 |
| AutoDock 与 Vina 的 energy scores **不可直接比较** | 不同 forcefield 的数值不在同一尺度上 |

([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

所以：

> **Affinity 这个数值可以用来比较同一个模型内的不同 pose，但不能直接当作真实结合亲和力。**

---

## 它能用来做什么？

在**同一评分函数、同一次或可比的任务**中，affinity 可以用来：

```text
对候选 pose 排序
比较同一批配体的相对高低
作为筛选的参考
```

它**不能**用来：

```text
直接得出实验 Kd 或 ΔG
跨评分函数比较（例如 Vina 的 -8.0 与 ad4 的 -9.0）
跨不同搜索空间或不同输入准备直接比较
```

---

## 在 DockStart 中

DockStart 的结果列表里显示的分数，就是这里的 affinity。

当你在结果中看到类似：

```text
Affinity = -7.4 kcal·mol⁻¹
```

应该首先理解为：

> **这个 pose 在 Vina 评分模型下得到的计算结果。**

而不是“这个分子真实结合的结合自由能是 −7.4”。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 FAQ, *Why don't the results change when I change the partial charges?*.
3. AutoDock Vina 官方 FAQ, *The bound conformation looks reasonable, except for the hydrogens. Why?*.
4. AutoDock Vina 官方 Manual.

</details>
