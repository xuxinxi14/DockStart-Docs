---
title: "Energy Range"
sidebar_position: 4
---

# Energy Range

## 简单概括

Energy Range 设定“比最优 mode 差多少 kcal/mol 以内的 mode 才显示”，默认值为 3 kcal/mol；它是一个过滤器，不是搜索参数。

---

## Energy Range 过滤什么？

Vina 会先按评分排序得到一串候选 mode，然后只输出能量落在某个范围内的那些。

`energy_range` 的定义正是：

> 最好的结合模式与所显示的**最差**结合模式之间的**最大能量差**（单位 kcal/mol）。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

```text
最优 mode 能量 = -13.23
energy_range   = 3

只显示能量 ≤ -13.23 + 3 = -10.23 的 mode
```

---

## 默认值和取值范围

| 项目 | 值 |
|---|---|
| 默认值 | `3`（kcal/mol） |
| 含义 | 相对最优 mode 的能量容差 |

因此默认情况下，**比最优结果差 3 kcal/mol 以上的 mode 不会出现在输出里**，即使搜索过程中确实找到过它们。

---

## 它和 Num Modes 的关系

这两个参数一起决定你最终看到几个 mode：

```text
num_modes
   ↓
最多输出几个（上限）

energy_range
   ↓
只保留能量差在范围内的（过滤）
   ↓
最终显示的 mode 数量
```

官方 FAQ 指出，如果输出中的 mode 数量少于 `num_modes` 的设定，除了“搜索内部没有找到那么多有区别的模式”之外，另一个常见原因就是 `energy_range` 偏小，此时可以考虑把它调大。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 调大它会怎样？

调大 `energy_range` 会**显示出更多能量偏高、排序靠后的 mode**。

好处是：

```text
可以看到更多备选结合方式
便于观察同一结合区域内能量接近的多个构象
```

需要注意的是：

> **调大 energy_range 不会改变最优 mode 本身，它只是让更多“次优结果”显示出来。**

因此如果目的是让结果更好，应该调整的是搜索相关设置（例如 `exhaustiveness`、搜索空间），而不是 `energy_range`。

---

## 在 DockStart 中

在 DockStart 的结果列表中看不到某个分数明显更高的 mode 时，可以先确认 `energy_range` 是多少。

对于初学者，通常建议：

- 先保持默认值，只看能量接近最优的那几个 mode；
- 确实需要观察更多备选构象时再调大；
- 不要把能量差很大的 mode 与最优结果并列比较，它们的可靠程度不同。

---

## 总结

Energy Range 决定比最优 mode 差多少 kcal/mol 以内的结合模式会被显示出来（默认 3 kcal/mol）；它只影响结果的显示范围，不改变搜索过程和最优结果本身。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 FAQ, *Why don't I get as many binding modes as I specify with "--num_modes"?*.
3. AutoDock Vina 官方 Manual.

</details>
