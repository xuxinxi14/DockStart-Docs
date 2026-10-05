---
title: "刚性与柔性"
sidebar_position: 3
---

# 刚性与柔性

刚性与柔性描述 docking 过程中哪些结构可以改变、哪些结构保持不变；最基本的 Vina docking 通常采用刚性受体和具有柔性的配体模型。

---

## 什么叫刚性？

如果一个结构在 docking 计算过程中保持不变，就可以把它看作**刚性（rigid）**。

例如：

```text
Receptor
   ↓
固定不动
```

这意味着 docking 搜索主要改变配体，而不是不断改变整个蛋白质的结构。

---

## 什么叫柔性？

如果分子的一部分可以改变空间构象，就可以称为**柔性（flexible）**。

对于小分子配体来说，最常见的变化就是某些可旋转键发生旋转：

```text
配体
 ↓
改变可旋转键
 ↓
构象发生变化
```

这样程序就可以寻找不同的配体构象。

---

## Vina 中通常怎样处理？

基本 docking 中，Vina 将：

```text
Receptor → 刚性
Ligand   → 可以具有柔性
```

Vina 的输入参数中，`--receptor` 表示受体的刚性部分；如果存在柔性侧链，还可以额外使用 `--flex` 指定柔性受体部分。([AutoDock Vina](https://vina.scripps.edu/manual/))

Meeko 也支持将受体中的指定侧链设置为柔性，并生成对应的 rigid/flex PDBQT 文件。([Meeko](https://meeko.readthedocs.io/en/develop/py_rec_prep.html))

---

## 为什么不能让整个蛋白质都自由运动？

因为这样会显著增加搜索空间和计算复杂度。

一个蛋白质有大量原子，如果允许整个蛋白质任意改变构象，docking 就不再只是寻找配体的位置和形状，而变成一个非常复杂的蛋白质-配体联合构象搜索问题。

所以实际 docking 通常会采用一定程度的简化。

最基本的假设就是：

> **受体基本固定，配体在结合位点中进行搜索。**

---

## 柔性也不是“越多越好”

对于受体来说，某些结合位点侧链确实可能发生明显变化，因此在特定情况下可以采用 flexible docking。

但柔性设置需要结合具体研究问题。

例如：

```text
Basic Docking
受体刚性
配体柔性

Flexible Docking
受体的大部分仍刚性
+
指定部分侧链具有柔性
+
配体柔性
```

Meeko 的柔性受体工作流就是选择特定残基的侧链进行柔性处理，而不是让整个蛋白质全部自由运动。([Meeko](https://meeko.readthedocs.io/en/develop/py_rec_prep.html))

---

## 刚性与柔性为什么重要？

因为它会直接影响 docking 搜索的范围。

可以简单理解为：

```text
允许变化的部分越多
        ↓
需要搜索的可能状态越多
        ↓
计算问题越复杂
```

但这并不意味着“柔性越多结果越好”。

真正重要的是：

> **设置的柔性是否符合研究对象和具体任务。**

---

## 在 DockStart 中

DockStart 的不同 docking 工作流可能采用不同的刚性/柔性设置。

例如：

- Basic Docking：通常使用刚性受体；
- Flexible Docking：允许指定受体侧链发生变化；
- 某些更特殊的 docking：还可能涉及其他柔性处理方式。

因此看到 DockStart 中不同的 docking 模式时，首先可以问：

> **这个任务允许哪些结构发生变化？**

这会比单纯记住某个参数名称更容易理解后续操作。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual.
2. Meeko Documentation, *Basic Docking*.
3. Meeko Documentation, *Parameterizing receptor*.
4. Meeko Documentation, *PDBQT Format for Flexible Sidechains*.

</details>
