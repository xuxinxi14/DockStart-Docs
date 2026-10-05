---
title: "Global / Score / Local FAQ"
sidebar_position: 6
sidebar_label: "Global / Score / Local FAQ"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Global / Score / Local FAQ

这三种计算任务做的不是同一件事：全局对接是"去把构象找出来"，姿势评分是"给一个已有构象打分"，局部优化是"在已有构象附近小幅松一松"。它们互相替代不了，结果也不能混着比。

---

## 先选运行模式

参数区的“运行模式”决定这次计算要做什么。想寻找新的结合构象，选全局对接；想评价已有姿势，选姿势评分；想在已有姿势附近调整，选局部优化。

后两种任务会要求先确认输入姿势。运行前看一眼配体是否已经位于受体的目标区域，能避免把独立构象误当成结合姿势交给程序。

---

## 三种任务分别是什么

| 任务 | 界面名称 | 内部标识 | 做什么 |
|---|---|---|---|
| 全局对接 | 全局对接 | `dock` | 在搜索空间里找结合构象 |
| 姿势评分 | 姿势评分 | `score_only` | **不搜索**，只评价你给的输入姿势 |
| 局部优化 | 局部优化 | `local_only` | 先记录输入姿势的评分，再在它附近做局部优化 |

---

## 姿势评分（Score Only）

```text
你提供一个已经存在的姿势（配体 PDBQT）
        ↓
Vina 用当前评分函数给它打分
        ↓
得到能量分解
```

关键点：

- **不产生新的构象文件**（不写 `--out`）；
- 结果里的"姿势"**就是你的输入文件本身**；
- 输出重点是能量分解，保存成 `evaluation.json`。

**什么时候用**：想比较两个已有构象在同一模型下的评分，或者想确认某个已知结合模式在当前模型里得多少分。

**什么时候不该用**：想找出更好的结合模式。评分不会改变构象，它是"打分"不是"搜索"。

---

## 局部优化（Local Optimization）

它是一次运行里的**两个阶段**：

```text
阶段 1  给输入姿势评分             → 基线评分
        ↓
阶段 2  在输入姿势附近做局部优化    → 优化后姿势 + 优化后评分
        ↓
报告"优化后 − 输入"的差值
```

产出和全局对接不一样：

| 产物 | 说明 |
|---|---|
| `optimized.pdbqt` | 优化后的姿势（注意不是 `out.pdbqt`） |
| `baseline_stdout.txt` 等 | 阶段 1 的基线日志 |
| `evaluation.json` | 含两阶段评分与能量块 |

它还会报告**同一受体坐标系内的未对齐重原子 RMSD**、平均/最大位移、质心位移。

> 这是"输入姿势和优化后姿势之间的位移"，**不是**跟共晶结构比对出来的验证 RMSD，不能混着理解。

现代双阶段结果可以同时显示冻结的输入姿势和优化后姿势（用青色细棒 / 橙色粗棒区分），而且**不做额外的刚体对齐** —— 这样你看到的就是真实的位移，不是对齐之后"看起来差不多"的假象。

---

## 为什么三者不能混为一谈

```text
全局对接   回答："可能结合在哪里、以什么构象？"
姿势评分   回答："这个给定姿势，在当前模型下打多少分？"
局部优化   回答："如果把给定姿势小幅松一松，会好多少？"
```

具体差别：

| 维度 | 全局对接 | 姿势评分 | 局部优化 |
|---|---|---|---|
| 是否搜索构象 | 是 | 否 | 只在附近做局部搜索 |
| 是否产生新构象 | 是（`out.pdbqt`） | 否 | 是（`optimized.pdbqt`） |
| 主要输出 | affinity 与 RMSD 表 | 能量分解 | 前后评分与位移 |
| 需要你提供姿势吗 | 不需要 | **需要** | **需要** |
| 能不能用于批量筛选 | 能 | 不能 | 不能 |

最后一行很重要：**串行批量筛选只支持全局对接**，不接受评分或局部优化模式。

---

## 用评分或局部优化时，必须先确认输入姿势

在三维视图中检查受体与配体处于同一坐标系，并确认当前输入姿势。更换受体、柔性侧链或配体文件后，需要重新确认。<NoteRef number={1}/>
---

## 高级选项的适用范围

| 选项 | 适用范围 |
|---|---|
| `autobox` | 非全局对接模式（评分 / 局部优化）可用；AD4 maps 下不可用 |
| `unbound_energy` | **只有刚性单配体 + 姿势评分**可用 |
| `max_evals` / `min_rmsd` | 界面在局部优化下不提供 |

`autobox` 和 `unbound_energy` 还有版本门槛：

| 选项 | 最低要求 |
|---|---|
| `autobox` | 稳定版 Vina 1.2.3 或更高 |
| `unbound_energy` | 稳定版 Vina 1.2.4 或更高 |

版本不满足时，按工具链提示更换兼容 Vina。<NoteRef number={2}/>

---

## 什么时候该用哪个

```text
还不知道配体怎么结合                       → 全局对接
已经有实验/文献给出的结合模式               → 姿势评分（看模型给它多少分）
想比较"模型认为更优的构象"与"已知构象"的差距 → 局部优化
要筛一批候选分子                           → 串行批量筛选（内部用全局对接）
```

---

## 相关页面

- 结果怎么读：[如何正确解读结果](./interpreting-results.md)
- 批量与多配体的区别：[Batch / Multiple / Flexible 的区别](./batch-multiple-flexible.md)
- 参数含义：[Exhaustiveness](../part-a/search-and-parameters/exhaustiveness.md)、[Seed](../part-a/search-and-parameters/seed.md)

<DocNotes>

<DocNote number={1} title="姿势确认的记录">

确认绑定刚性受体、可选柔性侧链及配体 PDBQT 的 SHA256，运行前再与输入快照核对。该记录表示用户已复核输入，不表示软件已验证姿势的科学正确性。软件不会自动证明受体与配体在同一坐标系。

</DocNote>

<DocNote number={2} title="版本比较">

专家选项按语义化版本校验，预发布版本不满足对应稳定版门槛；例如 `1.2.4-rc1` 不满足 `1.2.4` 的要求。

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual 与 Basic Docking 文档，`--score_only`、`--local_only`、`--autobox`。
2. AutoDock Vina 官方 FAQ。
3. DockStart 源码 `backend/dockstart_core/project.py`：`VINA_RUN_MODES`、`_build_vina_command`、局部优化执行计划。
4. DockStart 源码 `backend/adapters/vina_adapter.py`，专家选项的版本门槛。

</details>
