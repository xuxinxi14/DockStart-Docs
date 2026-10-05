---
title: "Grid / Maps"
sidebar_position: 2
---

# Grid / Maps

Grid / Maps 是将受体周围的三维空间转换成计算可处理的相互作用信息；不同 docking 工作流对它们的使用方式不同。

---

## 什么是 Grid？

可以把 Grid 简单想象成把三维空间划分成很多离散位置：

```text
·   ·   ·   ·
  ·   ·   ·
·   ·   ·   ·
  ·   ·   ·
```

程序可以在这些位置上表示或查询受体与不同类型原子之间的相互作用信息。

因此，Grid 的核心思想可以简单理解为：

> **把连续的三维空间变成计算机可以快速处理的离散空间。**

---

## 什么是 Maps？

Maps 可以理解为：

> **针对不同原子类型，在空间不同位置预先计算得到的相互作用信息。**

例如 AutoDock4 的网格文件中，可以分别保存不同原子类型的 affinity map，以及电静力学和去溶剂化等相关信息。AutoDock4 User Guide 中的示例包括 `A`、`C`、`HD`、`N`、`OA`、`SA` 等 affinity maps，以及 electrostatics 和 desolvation maps。([AutoDock](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf))

因此可以简单理解为：

```text
Grid
 ↓
空间中的离散位置

Maps
 ↓
这些位置上的相互作用信息
```

---

## Vina 和 AutoDock4 的 Maps 有什么区别？

这里非常容易混淆。

### 普通 Vina docking

在普通 Vina scoring 工作流中，用户**不需要自己运行 AutoGrid4 或准备外部 grid map 文件**。

Vina 会在内部计算所需的网格信息，因此普通 Vina docking 直接提供受体、配体和搜索空间即可。官方文档明确指出，传统 AutoDock/AutoGrid 的参数文件和 grid map 文件不是普通 Vina 输入的必需项。([AutoDock Vina](https://vina.scripps.edu/manual/))

可以理解为：

```text
受体 + 配体 + Box
       ↓
      Vina
       ↓
内部处理所需空间信息
       ↓
    Docking
```

### AutoDock4 工作流

AutoDock4 则通常先使用 **AutoGrid4** 生成 affinity maps，再由 docking 程序使用这些 maps。([AutoDock](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf))

可以理解为：

```text
受体
 ↓
AutoGrid4
 ↓
Grid Maps
 ↓
AutoDock4 / 相关工作流
 ↓
Docking
```

因此：

> **Grid/Maps 是一种计算思想和数据表示，而 Vina 与 AutoDock4 对它们的使用方式并不完全相同。**

---

## Box 和 Grid 是不是一个东西？

也不是。

可以简单区分：

```text
Box
↓
规定“搜索哪里”

Grid / Maps
↓
规定“如何在计算中表示空间以及空间中的相互作用信息”
```

Box 更偏向于**搜索范围的定义**，Grid/Maps 更偏向于**计算表示和预计算的信息**。

---

## 在 DockStart 中

在 DockStart 的基础 Vina 工作流中，用户通常只需要关心：

> **Box 设置是否正确。**

不需要自己手动制作传统 AutoDock4 grid maps。

而在后面的 **AutoDock4 Maps Workflow** 中，Grid / Maps 就会成为实际操作的重要内容。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual.
2. AutoDock4.2.6 User Guide.
3. AutoDock 官方资料.
4. Meeko Documentation, `mk_prepare_receptor.py`.

</details>
