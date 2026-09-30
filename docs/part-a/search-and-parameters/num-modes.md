---
title: "Num Modes"
sidebar_position: 3
---

# Num Modes

## 简单概括

Num Modes 设定 Vina 最多输出多少个结合模式（binding mode）；默认值为 9，但它只是“上限”，实际输出可能更少。

---

## 一个 mode 是什么？

Vina 的输出里，每个 mode 是一个候选的结合方式，带有自己的评分和与其他 mode 的 RMSD。

```text
mode |   affinity | dist from best mode
     | (kcal/mol) | rmsd l.b.| rmsd u.b.
-----+------------+----------+----------
1       -13.23          0          0
2       -11.29     0.9857      1.681
3       -11.28      3.044      12.41
```

`num_modes` 管的就是**这张表最多列几行**。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 默认值和含义

| 项目 | 值 |
|---|---|
| 默认值 | `9` |
| 命令行说明 | maximum number of binding modes to generate（要生成的结合模式的**最大**数量） |

Vina 的选项说明把它定义为“**最多**生成多少个结合模式”，而不是“一定生成多少个”。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 为什么实际输出可能少于设定值？

有两个原因：

```text
原因 1：搜索内部本身没有找到那么多“有区别”的 mode
原因 2：energy_range 把能量偏高的一部分过滤掉了
```

官方 FAQ 对第二点说得很直接：输出中 mode 的数量**也受到 `energy_range` 的限制**，如果希望看到更多 mode，可能需要把 `energy_range` 调大。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

因此：

> **`num_modes` 是上限，`energy_range` 是过滤器，两者共同决定最终看到几个 mode。**

---

## 还有一个相关的参数：min_rmsd

搜索结束后，Vina 会先做一次**去冗余**：彼此 RMSD 过小的 pose 会被视为同一个模式而合并掉。

这个“多接近算重复”的阈值由 `min_rmsd` 控制，默认值为 `1.0`（单位 Å）。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

```text
num_modes      →  最多输出几个
min_rmsd       →  多接近算同一个（先去重）
energy_range   →  能量差多大以内的才显示
```

---

## 应该设成多少？

对初学者来说，比较实用的思路是：

```text
先用默认值 9
    ↓
如果只想看最优结果 → 可以调小
如果希望看到更多备选构象 → 调大 num_modes 的同时考虑调大 energy_range
```

需要注意：mode 数量多**不代表**结论更可靠。如果很多 mode 的能量接近、构象也相似，它们反映的往往是同一个结合区域，而不是多个不同的结合方式。

---

## 在 DockStart 中

在 DockStart 的结果页面中，你能看到与 mode 对应的列表。

所以当结果列表的条目数比预期少时，先不要怀疑程序出错，而应检查：

- `num_modes` 设成了多少；
- `energy_range` 是否偏小；
- 搜索本身是否找到了多个有区别的模式。

---

## 总结

Num Modes 是 Vina 输出结合模式数量的上限（默认 9），实际输出数量还会被 energy_range 过滤、并被 min_rmsd 去重；mode 多不等于结论更可靠。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 FAQ, *Why don't I get as many binding modes as I specify with "--num_modes"?*.
3. AutoDock Vina 官方 Manual.

</details>
