---
title: "高级协议的适用范围"
sidebar_position: 11
sidebar_label: "高级协议的适用范围"
---

# 高级协议的适用范围

## 简单概括

高级协议有各自的适用条件和额外输入要求。选用哪一条，取决于体系与研究问题；名称中的“高级”不表示结果一定更准确。

---

## 使用前先核对适用条件

柔性受体、预计算 maps、AD4Zn 和水合 AD4 分别解决不同问题。选择前先看：你的体系是否符合条件，准备了哪些额外输入，工具版本是否满足要求。

有些协议不能组合。下面的对照表列出适用范围和限制，遇到阻塞时可以据此判断是输入缺失，还是当前组合本身不受支持。

---

## 哪些协议不能组合

```text
错误理解
高级模式 = 更接近真实 = 结果一定更好

正确理解
高级模式 = 多引入了一个前提假设
           只有当这条假设符合你的体系时，它才有意义
```

举个具体例子：柔性受体把"受体侧链固定"换成了"侧链可以动"。如果你根本不知道侧链参不参与诱导契合，那打开柔性只会让搜索空间变大、耗时增加，**结果未必更有说服力**。

**先问"我需要这条假设吗"，再决定用不用。**

---

## 成熟度标记

DockStart 的协议带成熟度标记，源码里正式登记的是这四个：

| 协议 | 成熟度 |
|---|---|
| 刚性单配体（标准流程） | stable |
| AD4Zn | **beta** |
| 水合 AD4 | **experimental** |
| 多配体共同对接 | **experimental** |

有两点要说清楚：

1. 这个标记描述的是**协议**的成熟度，**不代表当前应用构建已经是正式稳定版**。当前源码版本整体仍然只是"本地候选"。
2. `AutoDock4 maps`、`Vina / Vinardo maps`、柔性受体、串行批量筛选**不在**这份登记表里 —— 它们可以用，但**不受这个成熟度契约覆盖**。写作和口头交流时，都不要把它们说成"stable"。

---

## 各协议一览

| 协议 | 额外假设 | 额外依赖 | 主要限制 |
|---|---|---|---|
| 柔性受体 | 受体侧链会参与结合 | 需要柔性受体三件套 | 与 Vina/Vinardo 预计算 maps 不兼容 |
| 多配体共同对接 | 两个配体同时存在 | 恰好两个已准备的 PDBQT | 刚性受体 + 全局对接 |
| AD4Zn | 单核三配位 Zn 位点 | 外部 AutoGrid4 4.2.7+、用户自备 `AD4Zn.dat` | 只支持单核 Zn；单配体全局对接 |
| 水合 AD4 | 显式水参与结合 | 外部 AutoGrid4、Meeko | experimental；单配体子协议 |
| AutoDock4 maps | 用预计算网格代替内部计算 | 外部 AutoGrid4 4.2.6+ | 只支持单配体全局对接 |
| Vina / Vinardo maps | 复用预计算网格，等价 no-refine | 无（用 Vina 自己生成） | 刚性受体 + 单配体 + 全局对接 |
| 大环（Macrocycle） | 配体含大环，需要显式断环处理 | Meeko 0.7.1 | 属于准备流程；需要三维坐标 |

---

## 柔性受体（Flexible）

**什么时候适用**：你怀疑结合口袋的侧链会调整位置来容纳配体，而且这条侧链在你的研究问题里是重要的。

**什么时候不适用**：

- 只是常规初筛（代价高、收益不确定）；
- 受体结构本身分辨率低、侧链位置不可信；
- 想和 Vina / Vinardo 预计算 maps 组合（源码直接拒绝）。

**额外注意**：柔性受体要先准备三件套，**必须准备齐全才能切模式**。从柔性切回刚性时，相关的 maps 设置会被清空 —— 这是为了防止出现"协议与受体不匹配"的状态，不是 bug。

---

## 多配体共同对接（Multiple）

**什么时候适用**：你关心的是两个配体**同时存在**时整个体系的联合行为。

**什么时候不适用**：

- 想分别知道每个配体各自的结合强弱 → 用串行批量；
- 需要成员级的 affinity（联合评分不拆）；
- 组成或数量跟已有任务不同，还想直接比分数。

**额外注意**：它**不会**自动替代串行批量筛选，两者是不同的工具。详见 [Batch / Multiple / Flexible 的区别](./batch-multiple-flexible.md)。

---

## AD4Zn（Zinc）

**什么时候适用**：受体含**单核、三配位**的 Zn 位点，而且这个 Zn 位点就是你的研究重点。

**什么时候不适用**：

- 多核金属位点（**不自动处理**）；
- Mg / Fe / Ca 等其他金属；
- 只想"顺便支持一下金属"。

**门槛很硬**：

```text
必须满足三配位几何条件
AND 必须有可用的 TZ 伪原子
AND 必须提供 AD4Zn.dat 参数文件
AND AutoGrid4 版本 >= 4.2.7
```

任何一条不满足都会**阻止运行**，而且**不会降级**为标准 AutoDock4 让你凑合跑。

关于参数文件：`AD4Zn.dat` 要你自己提供，**不随安装包分发、也不会自动下载**。为了可复现，应用会在你明确选择之后把它复制进项目，并记录本机来源路径、SHA256、许可证 ID 和固定上游参考。

如果要分享含这份副本的项目，**分享者需要自行履行相应的 GPL 再分发义务**。

---

## 水合 AD4（Hydrated）

**什么时候适用**：水分子在结合中扮演明确角色，你想让水显式参与。

**什么时候不适用**：

- 常规对接（水处理会显著增加复杂度）；
- 对水的位置没有可靠依据的体系。

**额外注意**：这是 **experimental** 协议，它有自己的准备链（水合配体准备 → 水合 maps → 后处理）和独立产物（保留水的配体、去水配体、水清单）。它的分数**不用于虚拟筛选**，也不支持跨配体、跨评分函数、跨协议直接比较。

---

## AutoDock4 maps

**什么时候适用**：你需要用 ad4 评分体系，并且已经能自己提供 AutoGrid4。

**什么时候不适用**：

- 不想装外部工具（那就用普通 Vina）；
- 体系含 Zn（标准协议会拒绝，并提示改用 AD4Zn）。

**关键澄清**：

> AutoDock4 工作流**不是**在运行 AutoDock4 的引擎。它是**外部 AutoGrid4 生成 maps + Vina 以 `--scoring ad4` 运行**。

所以 `ad4` 的分数和原生 AutoDock4 程序的结果不能假定等同，跟 Vina / Vinardo 的分数更不能直接比。

---

## Vina / Vinardo 预计算 maps

**什么时候适用**：你需要复用同一组搜索空间下的网格，或者需要跟已有的预计算 maps 对齐。

**什么时候不适用**：

- 需要柔性受体（**不支持**）；
- 需要评分或局部优化（**只支持全局对接**）；
- 配体或 Box 会变的任务。

**额外注意**：启用之后，运行用的是那份冻结的 `--maps`，**不再传入受体、Box 或 spacing**，属于 grid-only 语义，等价于 no-refine。它跟 AutoDock4 maps 是**两套不同的协议和 manifest**，不能混用。

---

## 大环（Macrocycle）

**什么时候适用**：配体含大环结构，常规的键处理方式没法正确表达环的柔性。

**什么时候不适用**：配体不含大环。

**额外注意**：

- 它属于**准备流程**（不是一种对接任务）；
- 走"审查 → 确认候选 → 准备"的流程，断环位置需要人工确认；
- **要求配体已经有三维坐标**；
- 对 Meeko 版本有硬要求（当前支持 0.7.1）。

---

## 组合限制总表

这张表建议存下来，遇到"为什么这个选项点不亮"的时候直接查：

| 组合 | 是否允许 | 错误码 |
|---|---|---|
| 多配体共同对接 + 柔性受体 | 不允许 | `MULTIPLE_LIGAND_RIGID_RECEPTOR_REQUIRED` |
| 多配体共同对接 + 评分 / 局部优化 | 不允许 | `MULTIPLE_LIGAND_GLOBAL_SEARCH_REQUIRED` |
| 多配体共同对接 + Vina 预计算 maps | 不允许 | `MULTIPLE_LIGAND_PRECOMPUTED_MAPS_UNSUPPORTED` |
| 多配体共同对接 + AD4Zn / 水合 | 不允许 | `MULTIPLE_LIGAND_AD4_SUBPROTOCOL_UNSUPPORTED` |
| 多配体共同对接 + autobox | 不允许 | `MULTIPLE_LIGAND_AUTOBOX_UNSUPPORTED` |
| 串行批量 + 柔性受体 | 不允许 | `SCREENING_RIGID_RECEPTOR_REQUIRED` |
| 串行批量 + 评分 / 局部优化 | 不允许 | `SCREENING_GLOBAL_SEARCH_REQUIRED` |
| 串行批量 + AD4Zn / 水合 | 不允许 | `SCREENING_AD4_SUBPROTOCOL_UNSUPPORTED` |
| Vina 预计算 maps + 柔性受体 | 不允许 | `MAPS_FLEXIBLE_RECEPTOR_UNSUPPORTED` |
| Vina 预计算 maps + 评分 / 局部优化 | 不允许 | `VINA_MAPS_RUN_MODE_UNSUPPORTED` |
| AD4Zn + 评分 / 局部优化 | 不允许 | `AD4ZN_RUN_MODE_UNSUPPORTED` |

这些限制都是**硬校验**，会直接阻止运行。它们背后的理由只有一个：**评分口径必须可比、输入必须可追溯。**

---

## 总结

高级协议不是"更准的模式"，而是"带额外前提的模式"。用之前先确认这条前提在你的体系里成立；不成立的时候，标准流程反而更可靠。

---

## 相关页面

- 批量 / 多配体 / 柔性的区别：[Batch / Multiple / Flexible 的区别](./batch-multiple-flexible.md)
- Maps 的基础概念：[Grid / Maps](../part-a/search-space-and-scoring/grid-and-maps.md)
- 各评分函数：[Vina scoring](../part-a/search-space-and-scoring/vina-scoring.md)、[Vinardo](../part-a/search-space-and-scoring/vinardo.md)、[AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- 结果解读：[如何正确解读结果](./interpreting-results.md)
- 被这些限制挡住时的报错处理：[常见错误与恢复](./common-errors-and-recovery.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/capabilities.py`，协议成熟度登记。
2. DockStart 源码 `backend/dockstart_core/ad4zn.py`、`autogrid.py`，AD4Zn 前提条件与版本要求。
3. DockStart 源码 `backend/dockstart_core/hydrated.py`、`hydrated_run.py`，水合协议。
4. DockStart 源码 `backend/dockstart_core/vina_maps.py`、`flexible_receptor.py`、`macrocycle.py`。
5. AutoDock Vina 官方 Manual，`--flex`、`--maps`、`--scoring`。
6. AutoDock4.2 User Guide，AutoGrid4 与 AD4Zn 参数。
7. Meeko Documentation，柔性受体与大环处理。

</details>
