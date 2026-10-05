---
title: "Vina 参数速查表"
sidebar_position: 2
sidebar_label: "Vina 参数速查表"
---

# Vina 参数速查表

DockStart 里真正作为命令行参数传给 Vina 的只有少数几个（`--maps`、`--scoring`、`--score_only`、`--local_only`、`--out`、`--autobox`、`--flex`），其余全部写进配置文件，由 `vina --config <文件>` 读取。

这一页列出全部可配置参数的定义、默认值、边界和适用条件。想理解"为什么要这样设"，看 [搜索与参数](../part-a/search-and-parameters/vina-search-process.md) 各篇；想知道"设错了怎么排查"，看 [Box 与 Maps FAQ](../part-c/faq-box-and-maps.md)。

---

## 怎么用这一页

```text
想知道某个参数的合法范围        → 查对应的表
想知道默认值是多少              → 查"默认"列
想知道它什么时候不起作用        → 查"适用条件"列
碰到报错说参数被拒绝            → 看是不是撞了边界或白名单
```

**一个重要前提：** 大部分参数不会出现在 Vina 的命令行里，而是写进 `configs/vina_config.txt`。所以排查问题时，**看配置文件比看命令行更有用** —— 每个 run 目录里的 `config_snapshot.txt` 就是当次实际写出的配置。

---

## Box 类

| 界面名 | 内部名 | 类型 | 默认值 | 允许范围 | 适用条件 |
|---|---|---|---|---|---|
| 中心 X | `center_x` | float | `0` | 有限数（禁止 NaN / Inf），必填 | 任务类型为全局对接，**或**未启用"评价范围" |
| 中心 Y | `center_y` | float | `0` | 同上 | 同上 |
| 中心 Z | `center_z` | float | `0` | 同上 | 同上 |
| 尺寸 X | `size_x` | float | `20` | 单项目 `> 0`；`> 60` 触发警告；批量 `> 0` 且 `≤ 126 Å` | 同上 |
| 尺寸 Y | `size_y` | float | `20` | 同上 | 同上 |
| 尺寸 Z | `size_z` | float | `20` | 同上 | 同上 |

几个要点：

- 启用"评价范围"（autobox）后，整个 center / size 段会从配置里**省略**。
- 批量筛选时，Box 会随任务**冻结**到每个配体任务上，中途改 Box 不会影响已建队列。
- 尺寸超过 60 Å 只是警告，不是拦截 —— 真正会拦住你的是网格内存硬上限（见下一节）。

---

## 搜索类

| 界面名 | 内部名 | 类型 | 默认值 | 允许范围 | 适用条件 |
|---|---|---|---|---|---|
| 评分函数 | `scoring` | str | `vina` | 单项目 `{vina, vinardo}`；批量 `{vina, vinardo, ad4}` | 全部模式 |
| 搜索彻底程度 | `exhaustiveness` | int | `8` | `> 0`；`> 64` 触发警告；边界 `(1, 128)` | **仅全局对接** |
| 输出构象数量 | `num_modes` | int | `9` | `> 0`；`> 50` 触发警告；边界 `(1, 50)` | **仅全局对接** |
| 每次搜索评估上限 | `max_evals` | int | `0`（Vina 自动） | `0 ~ 2147483647`；`> 1,000,000` 触发警告 | 仅全局对接 |
| 构象最小间距 | `min_rmsd` | float | `1` | `≥ 0`，上限 `100 Å` | 仅全局对接 |
| 能量范围 | `energy_range` | float | 单项目 `4`；**批量 `3`** | `> 0`；`> 10` 触发警告；边界 `(0, 20)` | 仅全局对接 |
| 网格间距 | `spacing` | float | `0.375` | `0.1 ~ 2.0 Å`；`< 0.25` 或 `> 0.75` 触发警告 | 非 AD4、非预计算 maps |
| 随机种子 | `seed` | int 或留空 | 留空（= 随机） | 全局边界 `(0, 2147483647)`；**批量允许负数** | 仅全局对接且非空 |
| CPU 核心数 | `cpu` | int | 单项目 `0`（自动）；**批量 `1`** | `≥ 0`；边界 `(0, 64)`；批量 `(1, 64)` | 全部模式 |

> **默认值有三处不一致，容易踩：**
>
> | 参数 | 单项目 / 全局默认 | 批量筛选默认 |
> |---|---|---|
> | `energy_range` | `4` | **`3`** |
> | `cpu` | `0`（自动） | **`1`**（且不接受 0） |
> | `seed` 允许范围 | `(0, 2147483647)` | **允许负数** |
>
> 所以"同一个参数，单跑和批量跑出来不一样"时，先看这一栏。

---

## 输出类

| 界面名 | 内部名 | 类型 | 默认值 | 允许范围 | 适用条件 |
|---|---|---|---|---|---|
| 日志详细程度 | `verbosity` | int | `1` | **只允许 `{1, 2}`**（`0` 会被拒绝）；选 `2` 会触发提示 | 全部模式，无条件写入 |

`verbosity` 比较特殊：**它是唯一一个在任何路径下都会被写进配置的参数**，包括 AD4 路径。

---

## 高级类

| 界面名 | 内部名 | 类型 | 默认值 | 适用条件 / 版本门槛 |
|---|---|---|---|---|
| 关闭显式受体原子精修 | `no_refine` | bool | `False` | 非 AD4、非预计算 maps；**要求 Vina ≥ 1.2.4** |
| 网格体素数取偶数 | `force_even_voxels` | bool | `False` | 非 AD4、非预计算 maps；**要求 Vina ≥ 1.2.0**，同时影响内存估算 |
| 显式未结合体系能量参考 | `unbound_energy` | float 或留空 | 留空（由 Vina 计算） | **仅刚性受体 + 姿势评分**，且值非空；**要求 Vina ≥ 1.2.4** |
| 评价范围 | `autobox` | bool | `False` | **仅姿势评分 / 局部优化**（全局对接不可用），AD4 maps 下也不可用；**要求 Vina ≥ 1.2.3** |

前两个是布尔开关，**只有为 `true` 时才写进配置**；`unbound_energy` 只有非空时才写。

---

## 版本门槛全表

所有版本门槛都来自同一处定义：

| 能力 | Vina 选项 | 最低版本 |
|---|---|---|
| 多配体输入 | `--ligand` | 1.2.0 |
| 预计算 / 外部 maps | `--maps` | 1.2.0 |
| 写出 maps | `--write_maps` | 1.2.0 |
| 评价范围 | `--autobox` | **1.2.3** |
| 关闭受体精修 | `--no_refine` | **1.2.4** |
| 未结合能量参考 | `--unbound_energy` | **1.2.4** |
| 体素数取偶数 | `--force_even_voxels` | 1.2.0 |

版本比较按语义化版本规则，**预发布版本不算通过**（例如 `1.2.4-rc1` 不满足 1.2.4 的门槛）。

DockStart 的做法是：既检查版本号，也检查 `vina --help_advanced` 里是否声明了对应选项；两者都通过才放行。不满足时会**阻止运行**并给出提示，而不是静默降级。

---

## 评分函数的白名单差异

单项目与批量筛选的参数范围有以下差别：

| 路径 | 白名单 |
|---|---|
| 单项目（参数校验） | `{vina, vinardo}` |
| 批量筛选 | `{vina, vinardo, ad4}` |

**为什么不一样？** `ad4` 评分必须依赖预先生成的 affinity maps，而那是批量筛选独有的 `ad4_maps` 协议才提供的前置条件。标准单项目流程给不了这个条件，所以在源码里被**刻意排除**。

在界面上你会直接感受到这一点：**单项目里的评分函数下拉框把 `ad4` 置灰**；想用 `ad4`，得走批量筛选或自动对接的 AD4 maps 协议。

如果硬填 `ad4`，会拿到 `VINA_SCORING_INVALID`。

---

## 网格内存是怎么算的

Box 不是一个"想设多大就设多大"的参数，因为它对应真实的内存开销。DockStart 按下面六步估算：

```text
1  每轴区间数 = max(1, ceil(该轴尺寸 / spacing))
2  勾选"体素数取偶数"时，奇数区间 +1 变成偶数
3  每轴点数 = 区间数 + 1
4  总点数   = 三个轴的点数连乘
5  图数量   = 去重后的可移动原子类型数（取不到时按 4 兜底）
6  预计字节 = 总点数 × 图数量 × 8
```

判定标准：

| 阈值 | 值 | 表现 |
|---|---|---|
| 警告 | 512 MiB | 仅提示，不阻止 |
| 硬上限 | 2 GiB | **阻止运行**（`VINA_GRID_RESOURCE_LIMIT_EXCEEDED`） |

从公式能直接看出两件事：

- **`spacing` 变小，内存按平方级往上走**（三个轴都受影响）；
- **配体原子类型越多，图数量越大，内存也越大**。

批量筛选会对每个配体分别估算，然后取**最大值**作为整批的门禁依据。

---

## 界面在哪一页

| 参数组 | 界面位置 |
|---|---|
| 全局默认值（scoring / exhaustiveness / num_modes / energy_range / cpu / seed） | 设置页 |
| Box 六项 | Box 设置页 |
| 基础 Vina 参数 | Vina 参数页 |
| 完整的参数表单（含适用性过滤与高级开关） | 运行准备页 |

**"适用性过滤"值得注意**：界面会按当前的运行模式和协议，把不适用的参数隐藏或禁用。所以"某个选项找不到"往往不是 bug，而是当前模式不支持它 —— 具体的禁用组合见 [高级协议的适用范围](../part-c/advanced-protocols.md)。

---

## 相关页面

- 参数的含义与直觉：[搜索与参数](../part-a/search-and-parameters/vina-search-process.md)
- 高级参数：[高级参数](../part-a/search-and-parameters/advanced-parameters.md)
- Box 概念：[搜索盒](../part-a/search-space-and-scoring/search-box.md)
- 评分函数：[Vina scoring](../part-a/search-space-and-scoring/vina-scoring.md)、[Vinardo](../part-a/search-space-and-scoring/vinardo.md)、[AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- 参数被拒绝时的报错处理：[常见错误与恢复](../part-c/common-errors-and-recovery.md)
- 默认值为什么会影响可复现性：[项目、版本与可复现性](../part-c/projects-versions-reproducibility.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/project.py`，`VinaSettings`、`BoxSettings`、参数校验与网格内存门禁。
2. DockStart 源码 `backend/dockstart_core/settings.py`，全局默认值与边界。
3. DockStart 源码 `backend/dockstart_core/screening_models.py`，批量筛选的资源上限。
4. DockStart 源码 `backend/adapters/vina_adapter.py`，专家选项与版本门槛。
5. DockStart 源码 `apps/desktop/src/pages/VinaParamPage.tsx`、`BoxSetupPage.tsx`、`RunPreparePage.tsx`、`SettingsPage.tsx`，界面表单与适用性过滤。
6. AutoDock Vina 官方 Manual，Configuration File 与 Search Space。
7. AutoDock Vina 官方命令行帮助（`vina --help_advanced`）。

</details>
