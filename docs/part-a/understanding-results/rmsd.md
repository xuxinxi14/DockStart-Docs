---
title: "RMSD（含 RMSD l.b. / u.b.）"
sidebar_label: "RMSD 与 RMSD l.b. / u.b."
sidebar_position: 3
---

# RMSD（含 RMSD l.b. / u.b.）

## 简单概括

RMSD 用来衡量两个 pose 在空间上差多少；Vina 在结果里给出 rmsd l.b. 和 rmsd u.b. 两个值，它们都表示该 pose 与最优 pose（mode 1）之间的几何偏差。

---

## RMSD 是什么？

RMSD（root-mean-square deviation）是**均方根偏差**：把两套原子坐标逐个相减，求平方平均，再开方。

```text
两个 pose 的原子坐标
        ↓
逐个比较同一批重原子的位置差
        ↓
得到 RMSD（单位 Å）
```

所以 RMSD 回答的是：

> **这两个 pose 在空间上到底差多少？**

RMSD 越大，说明两个 pose 的摆放方式差别越大。

---

## Vina 输出的两个 RMSD

在结果表里，RMSD 是以**两列**出现的：

```text
mode |   affinity | dist from best mode
     | (kcal/mol) | rmsd l.b.| rmsd u.b.
-----+------------+----------+----------
1       -13.23          0          0
2       -11.29     0.9857      1.681
3       -11.28      3.044      12.41
```

表头写得很清楚：这两列都是 **dist from best mode**，也就是**相对最优 pose 的距离**。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

因此：

```text
mode 1         →  它就是基准，所以永远是 0 / 0
mode 2、3 ...  →  与 mode 1 比较得到的 RMSD
```

---

## 两者有什么区别？

两个值的计算方式不同：

| 列 | 计算方式 | 直观含义 |
|---|---|---|
| `rmsd u.b.` | 按**相同的原子顺序**逐个比较（第 i 个原子对第 i 个原子） | 直接、严格的逐原子比较 |
| `rmsd l.b.` | 每个重原子与另一个 pose 中**距离最近的同元素重原子**比较 | 更宽松的匹配方式 |

因为 `l.b.` 允许“就近匹配”，所以它给出的数值**不会大于** `u.b.`：

```text
rmsd l.b.  ≤  rmsd u.b.
```

这也是它们被称为 lower bound（下界）和 upper bound（上界）的原因——两个值共同围出一个范围。

---

## 几个容易被忽略的细节

**第一：这两个 RMSD 都不做叠合。**

它们是在**同一个受体坐标系**里直接比较坐标差的，不会先把两个 pose 叠合到一起再算。也就是说，它反映的是“在结合位点里的实际位置差异”，而不是“形状相似程度”。

**第二：只算重原子。**

Vina 使用 united-atom 模型，评分只涉及重原子，RMSD 也只统计重原子。这与官方 FAQ 的说明一致：输出中氢原子的位置是任意的，不具物理意义。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

**第三：起算的原子范围。**

参与比较的是**可移动原子**，即配体原子加上（如果使用了）柔性受体侧链的原子。

---

## 怎么用它？

对初学者，最实用的读法是：

```text
先看 affinity 排序
    ↓
再看各 mode 与 mode 1 的 RMSD
    ↓
RMSD 很小的多个 mode  →  很可能是同一个结合方式
RMSD 很大的 mode      →  是另一种摆放方式（可能在不同子口袋）
```

在官方示例里就能看到这种情形：mode 2 与 mode 1 的 RMSD 很小（0.99 / 1.68），而 mode 3 的 u.b. 达到 12.41——说明它与最优 pose 明显不是同一种摆放方式。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 和其他 RMSD 用法要区分开

RMSD 也常用于**把 docking 结果与已知实验结构比较**（例如重新对接时与晶体结构中的配体比较）。

这时 RMSD 的含义仍然是“两套坐标差多少”，但**比较对象不同**：

```text
Vina 输出中的 rmsd l.b./u.b.   →  与本次 docking 的最优 pose 比较
与实验结构比较时的 RMSD        →  与参考结构比较
```

---

## 在 DockStart 中

在 DockStart 的结果表格中，RMSD 这两列可以帮助你判断：

- 哪些 mode 其实是同一个结合方式的重复；
- 哪些 mode 代表了真正不同的摆放位置。

结合 affinity 一起看，就能比较快地筛出值得进一步观察的 pose。

---

## 总结

RMSD 衡量两个 pose 在空间上的偏差；Vina 输出的 rmsd l.b. 和 rmsd u.b. 都表示该 mode 与最优 mode 之间的重原子坐标差异（不叠合、不做形状拟合），其中 l.b. 采用就近同元素匹配因而不会大于 u.b.。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 FAQ, *The bound conformation looks reasonable, except for the hydrogens. Why?*.
3. AutoDock Vina 官方 Manual.
4. AutoDock Vina 源代码（`src/lib/model.cpp` 中的 `rmsd_lower_bound` / `rmsd_upper_bound`）.

</details>
