---
title: "如何正确解读结果"
sidebar_position: 9
sidebar_label: "如何正确解读结果"
---

# 如何正确解读结果

## 简单概括

DockStart 给出的 pose、affinity、RMSD 都是计算模型的结果，不是实验测量。它们可以帮你在同一个模型里比较和排序，但不能直接当成"能结合""亲和力是多少""药效好坏"的证据。

---

## 结果表应该怎么看

运行完成后，先看 pose，再结合 affinity 和 RMSD 理解它。把数字单独摘出来，容易丢掉输入结构和评分模型这些前提。

还要区别“评分记录”和“保存的结构”：v1.0.4 可以从 Vina 日志解析评分表，而 Vina 1.2.7 写入 PDBQT 时会按 `energy_range` 过滤。日志/CSV 的行数可能多于 `out.pdbqt` 的 `MODEL` 数量；只有确实保存了坐标的构象才能加载查看。详细解释见 [Energy Range](../part-a/search-and-parameters/energy-range.md)。

写汇报或方法部分时，应同时说明输入、评分函数、参数与验证方式。结果页和 `docking_report.md` 中的提示也可以作为检查清单。

---

## 结果里有哪几个数字

| 名称 | 含义 | 单位 |
|---|---|---|
| mode | 构象编号（按评分排序） | — |
| affinity / docking score | Vina 评分函数给出的预测值 | kcal/mol |
| RMSD l.b. | 相对 Mode 1 的 RMSD 下界 | Å |
| RMSD u.b. | 相对 Mode 1 的 RMSD 上界 | Å |

结果表大致长这样：

```text
mode |   affinity | dist from best mode
     | (kcal/mol) | rmsd l.b.| rmsd u.b.
-----+------------+----------+----------
1       -13.23          0          0
2       -11.29     0.9857      1.681
```

---

## pose 是什么

pose 就是配体在受体里的**一种空间摆放方式**。

- 一次运行会输出多个 pose；
- 它们代表程序在搜索空间里找到的不同摆法；
- 表格里每一行的 mode 编号对应一个 pose。

> **pose 是模型给出的候选构象，不是你观察到的结合方式。**

---

## mode 1 是"真实结合构象"吗？

**不是。**

准确的说法是：

```text
mode 1 = 在当前评分函数下，本次搜索中得分最好的那个构象
```

它排第一，只是因为评分函数给了它最低的值。而评分函数是对复杂分子相互作用的**近似描述**，不是实验测量。

而且就算它真的是最低点，最低点也可能来自这些原因：

- 搜索没搜透，只找到局部较好的解；
- 评分函数在某些关键作用上不准；
- 输入结构的质子化 / 电荷处理跟实际不符。

---

## affinity 能用来做什么

在**同一评分函数、同一次或可比的同一批任务**里：

```text
可以用来：比较候选 pose 的排序
可以用来：比较同一批配体的相对高低
可以用来：作为筛选的参考
```

**不能**用来：

```text
直接得出实验 Kd 或 ΔG
跨评分函数比较（Vina 的 −8.0 与 ad4 的 −9.0 不在同一把尺子上）
跨不同搜索空间、不同输入准备直接比较
```

这一点 DockStart 的结果表里也印着同样的提示：

> Affinity（评分）只用于在同一次计算中比较候选构象，不能拿不同体系或不同条件的分数直接比较。

---

## 为什么不能把分数当实验亲和力

因为它来自**经验评分模型**，而不是实验测量。

AutoDock Vina 官方 FAQ 有三条关键说明：

| 说明 | 含义 |
|---|---|
| Vina 使用 united-atom 评分函数，只涉及重原子 | 输出里**氢原子的位置是任意的**，不具物理意义 |
| Vina **忽略用户提供的 partial charges** | 静电作用通过疏水项和氢键项间接体现 |
| AutoDock 与 Vina 的 energy scores **不可直接比较** | 不同 forcefield 的数值不在同一尺度上 |

第三条同样适用于 ad4：**ad4 的分数和 Vina / Vinardo 的分数不能直接比较。**

---

## RMSD 要注意什么

### RMSD l.b. / u.b. 是相对 Mode 1 的

```text
RMSD l.b. / u.b. = 这条 pose 相对 Mode 1 差多少
```

它们描述的是**同一批输出内部的构象差异**，不是"离真实结构有多远"。

### 它只在本次输出里有意义

> RMSD 相对基于 Mode 1 的构象，仅用于本次输出内比较。

所以不要拿 A 任务的 RMSD 去跟 B 任务的 RMSD 比。

### 局部优化里的 RMSD 更特殊

局部优化报告的"未对齐重原子 RMSD"，是**输入姿势和优化后姿势在同一个受体坐标系里的位移**：

- 已经做过重原子筛选，而且**不做额外的刚体对齐**；
- 它是"这次松弛让结构动了多少"的度量；
- **不是**跟共晶结构比对得到的验证 RMSD。

要做跟实验结构的比对，那是另一件事（而且需要有可信的参考结构）。

---

## 多配体共同对接的结果怎么读

只有一件事要记住：**联合评分不能拆。**

```text
一条 Mode = 一组联合构象
           = 一个联合评分
```

因此：

- 不要拆出成员 affinity；
- 不要推断"谁的贡献更大"；
- 不要把成员数或组成不同的联合任务放在一起比分数。

---

## 可视化该怎么用

3D 视图适合回答这类问题：

- pose 是不是落在你预期的区域；
- 配体是不是贴着盒子边界；
- 有没有明显不合理的空间冲突。

它**不适合**用来直接下结论：视觉上"看起来很合理"不是证据。可视化是帮你**发现问题**的工具，不是帮你**证明结论**的工具。这两件事差别很大。

---

## 一张速查表

| 你可能想说 | 能这么说吗 | 更稳妥的说法 |
|---|---|---|
| "这个分子能结合" | 不能 | "在当前模型下，这个配体给出了一个合理的结合假设" |
| "亲和力是 −9.0 kcal/mol" | 不能 | "该 pose 的评分为 −9.0 kcal/mol" |
| "mode 1 就是真实构象" | 不能 | "mode 1 是本次搜索中评分最优的构象" |
| "分数更低所以药效更好" | 不能 | "在同一模型内，分数更低表示模型认为更有利" |
| "ad4 的 −9 比 Vina 的 −8 更强" | 不能 | 不同评分函数不可直接比较 |
| "RMSD 小所以预测准" | 不能 | RMSD 只反映本次输出内部的一致性 |

---

## 科学边界

DockStart 输出的 docking score 只表示在特定输入结构、特定对接箱体、特定参数和特定 AutoDock Vina 版本下算出来的结果。

> **Docking score 只供结构结合趋势参考，不能替代实验验证，也不能证明真实结合、药效、安全性或临床价值。**

---

## 总结

pose、affinity、RMSD 只在同一个模型内部可比；它们能帮你排序和提出假设，但既不能证明结合，也不能当成实验亲和力或药效。

---

## 相关页面

- Pose：[Pose](../part-a/understanding-results/pose.md)
- 评分：[Affinity / Docking Score](../part-a/understanding-results/affinity-and-docking-score.md)
- 排序：[Mode 排序](../part-a/understanding-results/mode-ranking.md)
- RMSD：[RMSD](../part-a/understanding-results/rmsd.md)
- 可视化：[结果可视化](../part-a/understanding-results/result-visualization.md)
- 整体科学边界：[科学边界](../part-a/understanding-results/scientific-limits.md)
- 两次结果为什么不一样：[为什么结果不一致](./why-results-differ.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档与 FAQ。
2. AutoDock Vina 官方 Manual。
3. AutoDock4.2 User Guide，评分函数之间的差异。
4. DockStart 源码 `backend/dockstart_core/project.py`，`scores.csv` 字段与结果解析。
5. DockStart 源码 `backend/dockstart_core/multiple_ligands.py`，联合评分语义。

</details>
