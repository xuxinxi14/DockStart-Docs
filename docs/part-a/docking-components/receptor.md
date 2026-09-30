---
title: "Receptor"
sidebar_label: "Receptor（受体）"
sidebar_position: 1
---

# Receptor

## 简单概括

Receptor（受体）是 docking 中用来提供结合环境、与配体进行空间匹配和相互作用计算的分子结构。

在最常见的蛋白质-小分子 docking 中，Receptor 通常就是蛋白质。

---

## Receptor 在 docking 中做什么？

可以简单理解为：

```text
Receptor
    +
Ligand
    ↓
在三维空间中寻找合适的结合方式
```

受体提供了一个三维结构环境，其中包含：

- 原子的空间位置；
- 原子之间的连接关系；
- 结合位点附近的化学环境。

Vina 根据这些信息，对配体放入受体后的不同构象进行计算和搜索。Vina 的基本输入中，`--receptor` 指定的是受体的刚性部分，格式为 PDBQT。([AutoDock Vina](https://vina.scripps.edu/manual/))

---

## 为什么受体需要进行结构准备？

从 PDB 或 mmCIF 得到的结构，通常不能直接理解成“已经可以用于 docking 的最终模型”。

结构准备可能涉及：

- 原子和残基的识别；
- 氢原子的处理；
- 化学状态的确定；
- 原子类型和电荷等参数的准备；
- 水、金属、辅因子等特殊成分的处理。

Meeko 的 receptor preparation 就是将生物大分子结构处理并生成 docking 所需的 receptor 输入文件。对于 Vina，最终通常需要受体 PDBQT。([Meeko](https://meeko.readthedocs.io/en/develop/tutorial1.html))

因此：

> **Receptor preparation 不是简单地把 PDB 改成 PDBQT，而是在建立 docking 使用的计算模型。**

---

## 受体一定是完全刚性的吗？

不一定。

在最基本的 Vina docking 中，受体通常作为刚性结构处理；但 Vina 也支持将部分受体侧链定义为柔性。此时需要把受体分成刚性部分和柔性部分。([AutoDock Vina](https://vina.scripps.edu/manual/))

因此：

```text
Basic Docking
Receptor → 通常刚性

Flexible Docking
Receptor → 刚性部分 + 柔性部分
```

关于刚性与柔性，会在下一篇专门介绍。

---

## 在 DockStart 中

在 DockStart 中，用户准备的蛋白质结构最终会成为 docking 工作流中的 **Receptor**。

因此，一个重要的原则是：

> **程序能够正常运行，不等于受体模型本身就一定适合你的科学问题。**

受体选择和结构准备是否合理，会直接影响后续 docking 结果的解释。

---

## 总结

Receptor 是 docking 中提供结合空间和化学环境的结构，常见情况下是蛋白质；在 DockStart/Vina 中，它需要经过适当的结构准备，才能成为可靠的 docking 输入。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual.
2. Meeko Documentation, *Basic Docking*.
3. Meeko Documentation, *Parameterizing receptor*.

</details>
