---
title: "Seed"
sidebar_position: 6
---

# Seed

Seed 是随机数种子，决定搜索从哪些随机起点出发；固定它可以提高可重复性，但只有在其他输入和参数都完全一致时才能真正复现结果。

---

## Seed 是什么？

Vina 的搜索过程是**非确定性的**：它从随机构象开始，反复进行随机扰动。随机数从哪来，由随机种子决定。

| 项目 | 值 |
|---|---|
| 默认值 | `0` |
| 含义 | 由程序自动生成一个随机种子 |

当默认值为 0 时，Vina 会随机挑选一个种子，并**在程序启动时把它打印出来**，例如：

```text
Performing docking (random seed: -1622165383) ...
```

([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 为什么要把种子打印出来？

因为这样即使你没有手动指定种子，也能知道**这一次计算用的是什么种子**，从而在需要时把它重新填回去。

```text
第一次运行           →  随机种子 -1622165383
想复现这次结果       →  手动指定 --seed -1622165383
```

---

## 固定种子就能保证结果一模一样吗？

**不一定。** 官方 FAQ 说得很明确：

> 只有在你把相同的随机种子提供给两次计算，**并且其他所有输入和参数也完全相同**时，才能保证精确的可重复性。

而且：

> 输入的**任何微小改动**，产生的影响可能与换一个新随机种子类似。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

因此可以这样理解：

```text
相同种子 + 相同输入 + 相同参数   →  可以复现
相同种子 + 输入有一点不同         →  结果可能不同
```

---

## 那为什么还要用 Seed？

因为它能帮你区分两类“结果不一致”：

```text
固定种子后仍然不一致
    ↓
说明是输入或参数真的变了

固定种子后就一致了
    ↓
说明之前的不一致只来自搜索的随机性
```

这对排查问题很有用，也是记录实验时应该把种子一起记下来的原因。

---

## 结果不稳定时，换种子有用吗？

如果搜索**本来就能找到**正确构象，只是这次运气不好没找到，那么换一个种子再跑确实可能得到更好的结果。

但如果评分函数的最低点**本身就不对应**正确构象，那么反复换种子也不会解决问题——官方 FAQ 把这一类情况归为“搜索和评分都只是近似”的固有限制。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

所以在换种子之前，更值得先检查的是输入结构和搜索空间。

---

## 在 DockStart 中

在 DockStart 中，如果要让一次计算**可追溯、可复现**，建议：

```text
记录随机种子
记录 exhaustiveness
记录搜索空间
记录使用的输入结构
```

这些信息一起，才构成一次可重复的计算记录。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 FAQ, *I changed something, and now the docking results are different. Why?*.
2. AutoDock Vina 官方 FAQ, *Why is my docked conformation different from what you get in the video tutorial?*.
3. AutoDock Vina 官方 Basic Docking 文档.

</details>
