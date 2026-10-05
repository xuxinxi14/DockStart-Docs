---
title: "Vinardo"
sidebar_position: 5
---

# Vinardo

Vinardo 是一种基于 Vina 的替代评分函数，通过简化和重新参数化部分相互作用项，形成与默认 Vina scoring 不同的计算模型。

Vinardo 的名称来自 **Vina RaDii Optimized**。它是在 Vina 思路基础上发展出来的评分函数，并可作为 AutoDock Vina 的可选 scoring function 使用。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/))

---

## Vinardo 和 Vina 是什么关系？

两者不是两个完全无关的评分体系。

可以简单理解为：

```text
Vina scoring
      ↓
基于其思路进行重新设计
      ↓
Vinardo
```

Vinardo 和 Vina 都包含与**位阻、疏水作用和非定向氢键**有关的组成部分，但 Vinardo 修改了部分相互作用形式、原子半径和权重，并减少了参数数量。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/))

---

## Vinardo 主要改了什么？

不需要在这里记公式，可以抓住一个核心区别：

> **Vinardo 对 Vina 的位阻相互作用进行了简化和重新参数化。**

原始研究指出，Vina 的位阻项中存在一个额外的远距离吸引最低点；Vinardo 去除了这个第二个 Gaussian 吸引项，使位阻项更加简化。Vinardo 同时使用了不同的原子半径、参数和权重。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/))

因此：

```text
Vina
↓
一套参数和相互作用模型

Vinardo
↓
基于 Vina
但采用另一套参数和函数形式
```

---

## 为什么要有 Vinardo？

评分函数并没有一种对所有 docking 问题都完全理想的表达方式。

Vinardo 的研究目标之一，就是在 Vina 的基础上构建一个更简单、具有不同参数化方式的评分函数，并通过再对接、评分和虚拟筛选数据集进行评估。原始论文报告了 Vinardo 与 Vina 在所测试数据集上的表现差异。([PubMed Central (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4865195/))

这里需要注意：

> **论文中的性能结论来自特定数据集和测试方法，不能简单推广成“Vinardo 永远优于 Vina”。**

---

## Vinardo 的分数能不能和 Vina 的分数直接比较？

**不应该直接这样比较。**

例如：

```text
Vina     -8.0
Vinardo  -8.5
```

不能直接据此得出：

> “Vinardo 的 −8.5 一定比 Vina 的 −8.0 更强。”

因为两者使用的是不同的评分模型、参数和标度方式。

这是使用多个 scoring function 时非常重要的一条原则。

---

## 在 Vina 中怎么使用 Vinardo？

AutoDock Vina 支持通过：

```text
--scoring vinardo
```

选择 Vinardo scoring function。Vina 当前代码也将 `vina`、`vinardo` 和 `ad4` 作为可用的评分函数选项。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/build/python/vina/vina.py))

因此可以把它理解成：

```text
同一个 Vina 程序
        ↓
选择不同 scoring function
├─ vina
├─ vinardo
└─ ad4
```

它们仍然属于相关的 docking 工作流，但评分模型不同。

---

## 在 DockStart 中

DockStart 后面的高级工作流可能允许用户选择不同的 scoring function。

对于普通用户来说，最重要的是先知道：

> **换 scoring function，就相当于换了一套评价 pose 的计算标准。**

所以比较结果时，应该先确认使用的是哪一种 scoring function，而不能只看一个数字。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. Trott & Olson, *AutoDock Vina*.
2. Forli et al./Vinardo, *A Scoring Function Based on AutoDock Vina Improves Scoring, Docking, and Virtual Screening*.
3. AutoDock Vina Documentation.
4. AutoDock Vina source code.

</details>
