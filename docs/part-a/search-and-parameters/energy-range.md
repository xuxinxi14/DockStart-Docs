---
title: "Energy Range"
sidebar_position: 4
---

# Energy Range

## 简单概括

Energy Range 设定“比最优 mode 差多少 kcal/mol 以内的构象才写入输出文件”，默认值为 3 kcal/mol；它是输出过滤条件，不是搜索彻底程度。日志评分行数可能多于实际保存的构象数量。

---

## Energy Range 过滤什么？

Vina 会先按评分排序得到一串候选 mode，然后只输出能量落在某个范围内的那些。

`energy_range` 的定义正是：

> 最好的结合模式与所显示的**最差**结合模式之间的**最大能量差**（单位 kcal/mol）。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

```text
最优 mode 能量 = -13.23
energy_range   = 3

只写入能量 ≤ -13.23 + 3 = -10.23 的构象
```

---

## 默认值和取值范围

| 项目 | 值 |
|---|---|
| 默认值 | `3`（kcal/mol） |
| 含义 | 相对最优 mode 的能量容差 |

因此默认情况下，**比最优结果差 3 kcal/mol 以上的构象不会写入 PDBQT 输出文件**，即使搜索过程中确实找到过它们。这里的“输出文件”与终端日志评分表需要区分。

---

## 它和 Num Modes 的关系

这两个参数一起限制输出文件中保存的构象数量：

```text
num_modes
   ↓
最多输出几个（上限）

energy_range
   ↓
只保留能量差在范围内的（过滤）
   ↓
最终保存的 MODEL 数量
```

官方 FAQ 指出，如果输出中的 mode 数量少于 `num_modes` 的设定，除了“搜索内部没有找到那么多有区别的模式”之外，另一个常见原因就是 `energy_range` 偏小，此时可以考虑把它调大。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 调大它会怎样？

调大 `energy_range` 会**允许更多能量偏高、排序靠后的构象写入输出文件**，实际数量还受搜索结果和 `num_modes` 限制。

好处是：

```text
可以看到更多备选结合方式
便于观察同一结合区域内能量接近的多个构象
```

需要注意的是：

> **在相同的一组搜索结果中，调大 energy_range 不会改变最优 mode 本身，只会放宽保存构象的能量范围。**

因此如果目的是让结果更好，应该调整的是搜索相关设置（例如 `exhaustiveness`、搜索空间），而不是 `energy_range`。

---

## 在 DockStart 中

**先区分评分表和结构文件。** DockStart v1.0.4 可从 Vina 日志解析 `scores.csv`；Vina 1.2.7 在打印候选评分后，写结构文件时另按 `energy_range` 过滤。因此一条评分记录不保证存在可加载的构象坐标，实际结构数量以 `out.pdbqt` 中的 `MODEL` 数量为准。相关实现见 [Vina 1.2.7 的 global_search 与 get_poses](https://github.com/ccsb-scripps/AutoDock-Vina/blob/v1.2.7/src/lib/vina.cpp)。

例如，某次 1IEP 演示使用 `num_modes=9`、`energy_range=4`：日志有 9 条评分，最佳评分约 -13.2；输出文件实际保存 5 个构象。后续候选评分超出保存范围时，不能把它们计为已保存构象。这个数量是该次运行的事实，不是每次运行都会得到的固定结果。

对于初学者，通常建议：

- 先保持默认值，只看能量接近最优的那几个 mode；
- 确实需要观察更多备选构象时再调大；
- 不要把评分更高直接解释成可靠程度更低；仍需结合构象、输入与验证判断。

---

## 总结

Energy Range 决定哪些候选构象写入输出文件（默认相对最优值 3 kcal/mol）。日志评分表、CSV 行数与输出文件的 MODEL 数量应分别核对，不能用评分行数代替保存构象数。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 FAQ, *Why don't I get as many binding modes as I specify with "--num_modes"?*.
3. AutoDock Vina 官方 Manual.

</details>
