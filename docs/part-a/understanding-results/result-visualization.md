---
title: "结果可视化"
sidebar_position: 5
---

# 结果可视化

Vina 的结果保存为包含多个 pose 的 PDBQT 文件；可视化就是把这个文件在分子查看器中打开，逐个观察配体在结合位点中的摆放方式。

---

## 结果文件里有什么？

一次 docking 的输出文件（PDBQT）里，**每个 pose 是一个 `MODEL`**，并带有自己的 REMARK：

```text
MODEL 1
REMARK VINA RESULT:   -13.23  0.000  0.000
...

MODEL 2
REMARK VINA RESULT:   -11.29  0.986  1.681
...
```

也就是说，一个文件里就装下了全部候选 pose，不需要为每个 mode 单独保存文件。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 打开它时需要注意什么？

**PDBQT 不是标准的分子结构格式。**

官方 FAQ 专门提醒了这一点：教程里使用的旧版 PyMOL 恰好能正常显示 PDBQT（因为它和 PDB 有些相似），但较新版本的 PyMOL 就不一定了。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

所以：

```text
能打开 PDBQT 的程序       →  通常可以看到结果
但显示效果 / 键级可能不理想
```

---

## 想在其他软件里用，建议先转成 SDF

官方文档给出了明确建议：为了在其他软件中使用，并**保证键级和形式电荷正确**，建议用 Meeko 把结果从 PDBQT 转成 SDF。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

原因在于：

> **PDBQT 本身不完整记录键级信息，其他工具只能去“猜”。**

```text
PDBQT 本身不完整记录键级信息
    ↓
其他工具（如 OpenBabel）只能“猜”键级
    ↓
对某些分子来说，这是不可能猜对的
```

Meeko 的做法是把 SMILES 写在 PDBQT 文件头里，再用它构建出键级和形式电荷正确的分子。这也是官方推荐流程的一部分。

---

## 看结果时，重点看什么？

可视化不只是“把结构打开”，更重要的是带着问题去看：

```text
配体落在哪个区域？          是否与预期结合位点一致
与周围残基可能形成哪些相互作用？   是否存在合理的氢键/疏水接触
多个高分 pose 是否落在同一区域？  判断结果是否集中
```

同时别忘了配合数值一起看：

```text
affinity  →  模型给出的评分
RMSD      →  各 pose 之间差多少
```

只有把几何图像和数值对照起来，才不容易被“看起来很像”的构象误导。

---

## 关于氢原子

需要提醒一点：Vina 使用 united-atom 评分模型，只涉及重原子，**输出中氢原子的位置是任意的**，不具物理意义。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

因此在可视化时，不必纠结输出结构里氢原子的朝向。

---

## 在 DockStart 中

DockStart 提供了结果查看功能，可以直接查看 pose 列表与构象。

如果需要把结果拿到其他软件里做进一步分析或作图，建议使用项目提供的导出方式（生成 SDF 等标准格式），而不是直接把 PDBQT 交给只认识标准格式的工具。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档, *Exporting results to SDF*.
2. AutoDock Vina 官方 FAQ, *Why do my results look weird in PyMOL?*.
3. AutoDock Vina 官方 FAQ, *The bound conformation looks reasonable, except for the hydrogens. Why?*.
4. Meeko 官方文档.

</details>
