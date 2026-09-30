---
title: "Exhaustiveness"
sidebar_position: 2
---

# Exhaustiveness

## 简单概括

Exhaustiveness 控制 Vina 运行多少次相互独立的搜索，是“花多少计算力气去找构象”的主要参数；默认值为 8。

---

## Exhaustiveness 控制什么？

在 Vina 的实现里，一次 docking 由若干次**相互独立的运行**组成，每次都从随机构象出发。

`exhaustiveness` 决定的就是**这些运行的次数**；单次运行内部的步数则由启发式规则根据配体大小和柔性决定。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

```text
exhaustiveness = 8
    ↓
跑 8 次独立搜索
    ↓
把结果合并、聚类、排序
```

---

## 默认值和取值范围

| 项目 | 值 |
|---|---|
| 默认值 | `8` |
| 取值范围 | 1 或更大（`1+`） |
| 与时间的关系 | 大致与运行时间成正比 |

Vina 的命令行帮助把 exhaustiveness 描述为“全局搜索的彻底程度（大致与时间成正比）”。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 调大它会怎样？

调大 `exhaustiveness` 意味着**更多次独立搜索**，因此：

- 找到评分函数较低构象的机会通常更大；
- 结果通常更稳定、更可重复；
- 但运行时间也会明显增加。

官方教程里有一个具体例子：对于 imatinib / c-Abl 这个例子，默认参数下 Vina 有时找不到正确 pose，把 exhaustiveness 从 `8` 提高到 `32` 后结果会更稳定。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

所以：

> **Exhaustiveness 不是“越大越正确”，而是“愿意花多少力气去找”。**

---

## 什么时候需要考虑调大？

比较常见的情形是：

```text
搜索空间比较大
配体柔性比较高（可旋转键多）
默认参数下结果不稳定
```

官方 FAQ 也提到：搜索空间不应当超过约 30 × 30 × 30 Å，除非同时提高 `exhaustiveness`。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 它和 CPU 数量有关系

由于各个运行是并行的，`exhaustiveness` 在某种程度上也**限制了并行度**。

如果 exhaustiveness 比可用的 CPU 数还小，程序可能无法把所有 CPU 都用上，Vina 会给出相应提示。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 在 DockStart 中

在 DockStart 中，`exhaustiveness` 属于“搜索与参数”这一类设置。

对初学者来说，比较实用的策略是：

```text
先用默认值跑通流程
    ↓
如果结果不稳定或明显不合理
    ↓
再适当提高 exhaustiveness 重跑
```

同时也要记得：提高 exhaustiveness 只能让搜索更充分，**不能修正输入结构本身的问题**。

---

## 总结

Exhaustiveness 决定 Vina 运行多少次相互独立的搜索，默认值为 8；调大它通常能让结果更稳定，但运行时间也会增加，而且它不能弥补输入结构或搜索空间设置本身的错误。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 FAQ, *What does "exhaustiveness" really control, under the hood?*.
2. AutoDock Vina 官方 Basic Docking 文档.
3. AutoDock Vina 官方 FAQ, *How big should the search space be?*.

</details>
