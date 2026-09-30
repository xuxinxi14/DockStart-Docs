---
title: "AutoGrid4"
sidebar_position: 7
---

# AutoGrid4

## 简单概括

AutoGrid4 是 AutoDock4 工作流中的网格预计算程序，用来根据受体结构预先计算不同原子类型在空间各位置的相互作用网格。

AutoDock 官方资料说明，AutoDock4 的典型流程是先由 AutoGrid 计算网格，再由 AutoDock 利用这些网格进行 docking。([计算结构生物学中心](https://ccsb.scripps.edu/autodocksuite/autodock4/))

---

## 什么是“网格”？

可以先把三维空间想象成：

```text
·  ·  ·  ·  ·
·  ·  ·  ·  ·
·  ·  ·  ·  ·
·  ·  ·  ·  ·
```

这些离散位置组成一个三维网格。

AutoGrid4 会在这些位置预先计算受体对不同原子类型产生的相互作用信息，并生成对应的 **affinity maps**。([AutoDock](https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/AutoDock4.2.6_UserGuide.pdf))

这样，后面的 docking 搜索就可以直接查询这些预先计算的数据。

---

## AutoGrid4 为什么存在？

如果每次 docking 搜索配体的新位置时，都重新完整计算所有受体-配体相互作用，会比较耗费计算资源。

AutoGrid4 的思路是：

```text
先计算一次
受体周围空间的相互作用信息
          ↓
生成 Grid Maps
          ↓
Docking 时快速查询
```

因此可以把它理解为：

> **提前把“受体周围哪些地方对什么原子类型更有利”计算出来。**

---

## AutoGrid4 和 AutoDock4 是什么关系？

两者是配套关系：

```text
AutoGrid4
   ↓
生成 affinity maps

AutoDock4
   ↓
利用这些 maps 进行 docking
```

AutoDock 官方资料将 AutoDock4 描述为由 AutoDock 和 AutoGrid 两个主要程序组成的工作流：AutoGrid 负责预计算网格，AutoDock 负责进行 docking。([AutoDock](https://autodock.scripps.edu/))

---

## 那 Vina 为什么通常不用 AutoGrid4？

这是很容易混淆的一点。

使用 Vina scoring function 时：

```text
Vina
 ↓
自己在内部计算所需的网格
 ↓
执行 docking
```

因此普通 Vina docking 不要求用户提前运行 AutoGrid4。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

但是，如果使用 **AutoDock4 scoring function**，Vina 可以读取 AutoGrid4 生成的 affinity maps。([GitHub](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

所以：

> **AutoGrid4 是 AutoDock4 网格工作流的重要组成部分，但不是普通 Vina docking 的必需步骤。**

---

## 在 DockStart 中

在 DockStart 中，AutoGrid4 更可能出现在：

- AutoDock4 Maps Workflow；
- 使用 AutoDock4 scoring function；
- 某些特殊的 AutoDock 兼容工作流。

而普通的 Vina docking 通常不需要用户手动运行 AutoGrid4。

第二章的实战案例与第三章的操作说明，会分别介绍 AutoDock4 maps 流程。

---

## 总结

AutoGrid4 负责预计算 AutoDock4 工作流所需要的三维 affinity maps；它与 AutoDock4 密切配套，而普通 Vina scoring 通常不需要用户单独运行 AutoGrid4。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock 官方网站.
2. AutoDock4 官方说明.
3. AutoDock4.2.6 User Guide.
4. AutoDock Vina 官方 Basic Docking 文档.
5. AutoGrid 官方 GitHub 仓库.

</details>
