---
title: "Box 与 Maps FAQ"
sidebar_position: 5
sidebar_label: "Box 与 Maps FAQ"
---

# Box 与 Maps FAQ

Box 定义搜索区域。设置后要在 3D 视图中核对位置与尺寸；参数通过格式检查，仍可能没有覆盖目标结合位点。

基础定义见 [Box](../part-a/search-space-and-scoring/search-box.md) 与 [Grid / Maps](../part-a/search-space-and-scoring/grid-and-maps.md)。

---

## 先确认这六个数

Box 由 `center_x/y/z` 和 `size_x/y/z` 定义。六个数输入后，在 3D 视图里看一遍：目标位点是否在框内，配体和需要活动的部分是否有足够空间。

格式合法、预检查通过，并不代表位置合适。框放偏时，程序仍可能完成计算；只是它搜索的区域已经偏离你的研究问题。

---

## Box 到底是什么？

Box（搜索盒）就是你在蛋白质周围画出的一个三维区域，程序**只在这个区域里面**找配体的结合方式。

```text
center_x / center_y / center_z   盒子放在哪里
size_x   / size_y   / size_z     盒子有多大
```

默认值是中心在原点、边长 20 Å。

> **搜索范围之外的位置，程序根本不会去看。** 这就是 Box 最重要的含义。

---

## 点"定位到受体"之后，它做了什么？

只做一件事：

```text
读取受体 PDBQT 里所有原子的坐标范围
 ↓
取每个轴的 (最小值 + 最大值) / 2
 ↓
把 Box 中心挪到这个几何中心（尺寸不动）
```

它是**纯粹的几何操作**：

- **不做**口袋预测；
- **不判断**这个位置是不是真正的结合位点；
- **不改变** Box 的大小。

所以点完这个按钮，你的工作并没有结束。仍然得自己确认两件事：

- 这个位置是不是你想研究的区域？
- 尺寸够不够装下配体、以及需要活动的侧链？

**"定位到受体"是省事用的，不是省心用的。**

---

## Box 太小会怎样？

配体会**没办法充分探索目标区域**：

- 配体的一部分被切在盒子外面；
- 结合需要的空间不够，程序只能给出被压扁的构象；
- 结果看起来"有分"，但那个分数是在残缺空间里拿到的。

判断信号很直观：**如果最佳 pose 贴着盒子边界，就说明盒子可能太小了。**

---

## Box 太大会怎样？

搜索空间变大，代价是：

- 计算变慢；
- 需要更大的 `exhaustiveness` 才有机会搜透；
- 更容易搜到不相关的表面区域。

Vina 官方的建议是：搜索空间应**尽可能小，但不能小到排除可能的结合位置**。

所以正确做法不是"设大点保险"，而是：

```text
先明确你要研究哪个区域
 ↓
按这个区域定 Box
 ↓
如果结果贴着边缘，再适度放大
```

---

## DockStart 对 Box 有哪些限制？

| 限制 | 值 | 表现 |
|---|---|---|
| 尺寸必须大于 0 | `size_* > 0` | 否则阻止运行 |
| 尺寸偏大 | 任一维 > 60 Å | **只是警告**，不阻止 |
| 网格内存警告 | 512 MiB | 只是警告 |
| 网格内存硬上限 | 2 GiB | **阻止运行** |
| 批量筛选里的 Box 边长 | 126 Å | 超过就拒绝 |

网格内存是按 `ceil(size / spacing) + 1` 估算体素数之后折算出来的，所以**把 `spacing` 调细会让内存涨得很快**。如果你想"盒子开大点、`spacing` 再调细一点"，很容易一头撞上 2 GiB 的上限。

---

## 常见 Box 设置问题

| 现象 | 可能原因 | 排查 |
|---|---|---|
| Box 在受体外面 | 用了坐标范围中心，但目标位点不在几何中心 | 手动改 center，或用可视化确认 |
| 结果全在盒子边缘 | Box 太小 | 放大后再跑一次对比 |
| 运行很慢 | Box 过大 / `spacing` 过细 | 先缩小 Box，或把 `spacing` 放宽 |
| 提示网格内存超限 | Box × spacing 组合太大 | 缩小尺寸或增大 `spacing` |
| 换了 Box 后结果差异很大 | 正常现象 | 说明结果对搜索空间敏感，需要人工判断哪个更合理 |

---

## Grid / Maps 和 Box 是一回事吗？

不是。

```text
Box        → 规定"搜索哪里"
Grid/Maps  → 规定"空间中的相互作用信息怎么表示、怎么预计算"
```

普通 Vina 工作流里，**你只需要关心 Box**；内部的空间信息 Vina 会自己处理。

---

## 普通 Vina 和 AutoDock4 maps 有什么区别？

| | 普通 Vina | AutoDock4 maps |
|---|---|---|
| 需要外部工具 | 不需要 | **要自己装 AutoGrid4** |
| 网格从哪来 | Vina 内部处理 | AutoGrid4 提前生成 |
| 评分函数 | vina / vinardo | ad4 |
| 运行命令 | 直接给受体、配体、Box | `--maps <前缀> --scoring ad4` |

这里有个常见的误解要说清楚：

> AutoDock4 工作流**不是**在运行 AutoDock4 的对接引擎。它是 **AutoGrid4 生成 maps + Vina 以 ad4 评分运行**。

所以 `ad4` 的分数和原生 AutoDock4 程序的结果不能假定等同。

---

## Vina / Vinardo 预计算 maps 又是什么？

这是**第三类** maps，和上面两种都不是一回事：

| | AutoDock4 maps | Vina / Vinardo maps |
|---|---|---|
| 怎么生成 | 外部 AutoGrid4 | Vina 的 `--write_maps`，或导入带 manifest 的 maps |
| 需要 AutoGrid4 吗 | 需要 | **不需要** |
| 评分 | ad4 | vina 或 vinardo |
| 运行语义 | 标准 AD4 协议 | grid-only，等价于 no-refine |

一旦启用，运行时就用那份冻结的 `--maps`，**不再把 `--receptor`、Box 或 spacing 传给 Vina** —— 也就是说，你填的 Box 这时候不起作用了。

它的限制也更严：

- 只支持**刚性受体**；
- 只支持**单配体**；
- 只支持**全局对接**。

> 三类 maps 用的是不同的评分协议和 manifest，**不能混用，分数也不能直接比。**

---

## 怀疑搜索空间设错了，怎么排查？

建议按这个顺序来：

```text
1  用 3D 工作台确认 Box 是否盖住目标区域（眼睛比数字直观）
2  确认目标和 Box 用的是同一套坐标（中途换过受体吗？）
3  看最佳 pose 是不是贴着盒子边界  → 是就把 Box 放大
4  固定 seed 再跑一次              → 排除随机性
5  拿两次不同 Box 的结果对比        → 看结果对搜索空间有多敏感
6  如果还是不合理，先怀疑输入结构，别继续调 Box
```

第 6 步很关键：**很多所谓"Box 问题"，其实是结构准备或坐标问题。** 调到第 6 步就该换方向了。

---

## 相关页面

- Box 的定义与 Vina 官方建议：[Box](../part-a/search-space-and-scoring/search-box.md)
- Grid 与 Maps 的概念：[Grid / Maps](../part-a/search-space-and-scoring/grid-and-maps.md)
- 各评分函数：[Vina scoring](../part-a/search-space-and-scoring/vina-scoring.md)、[Vinardo](../part-a/search-space-and-scoring/vinardo.md)、[AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- 高级协议的适用条件：[高级协议的适用范围](./advanced-protocols.md)
- Box 相关错误码：[常见错误与恢复](./common-errors-and-recovery.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual，Search Space 与 Configuration File。
2. AutoDock Vina 官方文档，关于 `--maps`、`--write_maps` 与 ad4 评分。
3. AutoDock4.2 User Guide，AutoGrid4 与 affinity maps。
4. Meeko Documentation，`mk_prepare_receptor.py`。
5. DockStart 源码 `backend/dockstart_core/project.py`，Box 校验与网格内存门禁。
6. DockStart 源码 `backend/dockstart_core/vina_maps.py`、`autogrid.py`。

</details>
