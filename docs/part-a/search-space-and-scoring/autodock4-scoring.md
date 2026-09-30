---
title: "AutoDock4 scoring"
sidebar_position: 6
---

# AutoDock4 scoring

## 简单概括

AutoDock4 scoring 是 AutoDock4 使用的半经验自由能评分模型，它综合考虑范德华作用、氢键、静电作用、去溶剂化以及配体构象熵损失等因素。

AutoDock4 的评分函数与 Vina scoring 不同，是另一套独立的计算模型。AutoDock4 将多个能量项组合起来估计配体结合的计算自由能。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4639406/))

---

## AutoDock4 主要考虑什么？

可以先记成五项：

```text
AutoDock4 scoring
├─ 范德华作用
├─ 氢键
├─ 静电作用
├─ 去溶剂化
└─ 配体扭转熵损失
```

其中：

- **范德华作用**描述原子之间的色散/排斥等相互作用；
- **氢键项**描述氢键相关作用；
- **静电项**描述带电原子之间的静电相互作用；
- **去溶剂化项**近似描述配体从溶剂环境进入结合位点时的溶剂化变化；
- **扭转熵项**反映配体结合后柔性降低所带来的构象熵损失。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4639406/))

---

## 为什么 AutoDock4 需要 Grid Maps？

AutoDock4 的这些空间相互作用信息通常通过 **AutoGrid4** 预先计算成 affinity maps。

因此它的典型关系是：

```text
受体
 ↓
AutoGrid4
 ↓
Affinity Maps
 ↓
AutoDock4 scoring
 ↓
Docking
```

AutoDock4 的评分过程中，会使用这些 maps 来快速评价不同位置上的相互作用。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8063785/))

这也就是上一批文章中 **Grid / Maps** 和 **AutoGrid4** 最终连接到评分函数的地方。

---

## AutoDock4 和 Vina scoring 有什么区别？

可以用一个非常简化的方式理解：

|  | Vina | AutoDock4 |
|---|---|---|
| 评分模型 | Vina scoring | AutoDock4 scoring |
| 典型相互作用 | 位阻、疏水、氢键等 | 范德华、氢键、静电、去溶剂化、扭转熵 |
| 外部 AD4 affinity maps | 普通 Vina 不需要 | 典型 AD4 工作流需要 |
| Vina 中的使用方式 | 默认评分函数 | 可作为 `ad4` scoring 使用 |

Vina 当前版本同时支持 `vina`、`vinardo` 和 `ad4` 三种 scoring function；使用 `ad4` 时，Vina 可以读取 AutoGrid4 生成的 maps。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/build/python/vina/vina.py))

---

## AutoDock4 分数能不能和 Vina 分数比较？

**不能直接比较。**

例如：

```text
Vina       -8.0 kcal/mol
AutoDock4 -9.0 kcal/mol
```

这两个数并不意味着：

> AutoDock4 的结果“一定比” Vina 的结果更有利。

因为二者采用不同的评分函数和参数体系。

Vina 官方教程明确提醒，AutoDock 和 Vina forcefield 得到的 energy scores 不可直接比较。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_multiple_ligands.rst))

---

## 在 DockStart 中

在 DockStart 中，AutoDock4 scoring 更可能出现在：

- AutoDock4 Maps Workflow；
- 使用 AD4 scoring function 的 docking；
- 某些特殊的兼容工作流。

AutoDock4 maps 的操作见第二章独立案例。阅读结果时，也应与普通 Vina scoring 分开比较。

---

## 总结

AutoDock4 scoring 是与 Vina scoring 不同的半经验自由能模型，包含范德华、氢键、静电、去溶剂化和配体扭转熵等项，并通常结合 AutoGrid4 生成的 affinity maps 使用；它的分数不能直接与 Vina 或 Vinardo 的分数比较。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock4.2.6 User Guide.
2. AutoDock4 官方资料.
3. AutoDock Vina 官方 Basic Docking 文档.
4. AutoDock Vina 官方 Manual.
5. AutoDock4 scoring function 相关文献.

</details>
