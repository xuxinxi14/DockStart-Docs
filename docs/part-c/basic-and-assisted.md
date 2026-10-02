---
title: "Basic 与 Assisted"
sidebar_position: 1
sidebar_label: "Basic 与 Assisted"
---

# Basic 与 Assisted

## 简单概括

Basic 适合已经准备好 PDBQT 的用户；Assisted 随包提供结构准备工具链，可以尝试从原始结构生成 PDBQT。两者都支持完整的 PDBQT 对接流程。

---

> **v1.0.4 实际公开下载只有 Assisted EXE 试用包。** 已有 PDBQT 也可直接使用它；下文比较的是两种构建档位，不表示本次发布提供两个下载。安装入口见 [v1.0.4 下载与快速开始](./quick-start-v1-0-4.md)。

## 安装前怎么选

先看手上的文件：受体、配体都已经是 PDBQT，可以用 Basic；需要从 PDB、CIF、SDF 等原始文件准备输入，则选 Assisted。

两种安装包共用应用身份，不能同时安装。换用另一种 profile 前要先卸载已有版本。如果暂时不想更换，也可以在外部准备好 PDBQT，再导入 Basic。

---

## 它们是两个安装 profile

DockStart 定义两个 Windows x64 构建档位，比较如下：

| | Basic profile | Assisted profile |
|---|---|---|
| 适合谁 | 已经有 `receptor.pdbqt` 和 `ligand.pdbqt` | 手里只有受体 PDB/CIF 与配体 SDF/MOL/MOL2 |
| 自带 AutoDock Vina | 有 | 有 |
| 自带后端 Python | 有（精简运行时） | 有（独立运行时） |
| 自带 RDKit / Meeko | 没有 | 有 |
| 能不能把 PDB/SDF/MOL 转成 PDBQT | 不提供 | 可以，且离线就能做 |
| 能不能跑完整 PDBQT 对接 | 能 | 能 |
| 能不能跑 AutoDock4 maps 工作流 | 能（需自装 AutoGrid4） | 能（需自装 AutoGrid4） |

注意最后两行：两种 profile 都支持 PDBQT 对接。Basic 不包含原始结构准备这一段。

> Basic 与 Assisted 是**发布档位（profile）**，不是产品成熟度标签。v1.0.4 当前公开包按试用版本说明，完整安装、GUI 和科学发布门禁仍待完成，跟选哪个 profile 没有关系。

---

## 装完之后，DockStart 怎么知道该让你用哪个模式

这一点很容易被忽略：**软件不是看你的安装包叫什么名字来决定能用什么，而是实打实去检测本机工具链**，再反推可用模式。

```text
Basic 可用    ← 只要 AutoDock Vina 可用
Assisted 可用 ← Vina 可用
                且 Python 可用
                且 RDKit 可用
                且 Meeko 可用
Demo 可用     ← 本机存在示例项目资源
```

推荐顺序则是：

```text
Assisted 可用   → 推荐 Assisted
否则 Basic 可用 → 推荐 Basic
否则 Demo 可用  → 推荐 Demo
都不满足        → 提示你先去配工具链
```

这带来一个有意思的后果：**你装的明明是 Basic，但如果你在设置页里把外面的 Python / RDKit / Meeko 配好了，工具链页一样会显示"Assisted 可用"。**

> **模式跟着工具链走，不跟着安装包名字走。** 这也是为什么"我装的是 Basic，为什么它说 Assisted 可用"不是 bug。

---

## 各自的自动化到什么程度

两个 profile 共有的自动化（这些你不用操心）：

- 建立并维护项目目录结构；
- 把输入复制成 run 级的**不可变快照**，并记录 SHA256；
- 生成 Vina 配置、组装命令行、执行；
- 捕获 `stdout` / `stderr` / `log` 和退出码；
- 解析 affinity / RMSD，写 `scores.csv`，导出 Markdown 记录；
- 运行前的检查与阻塞项汇总；
- 异常中断后的保守状态恢复。

Assisted 额外多出来的：

- 从 PDB / CIF 尝试准备受体 PDBQT；
- 从 SDF / MOL / 单分子 MOL2 尝试准备配体 PDBQT；
- CIF 受体先由随附的 Gemmi 转成中间 PDB，再交给 Meeko；
- 把每次准备的参数、输入快照、`stdout`、`stderr` 和输出检查都存档。

用一句话概括差别：**Assisted 替你多做了一段"结构加工"，但只多这一段。**

---

## 剩下的这些，软件不会替你做

不管选哪个 profile，下面这些事都还得你自己拍板：

- 用哪个受体结构、哪个配体；
- 要不要去掉水、金属、辅因子，保留哪些链；
- 质子化状态、电荷、手性、缺失残基怎么处理；
- Box 放在哪里、开多大；
- `exhaustiveness` / `num_modes` / `energy_range` / `cpu` / `seed` 怎么填；
- 结果在科学上可不可信、要不要做实验验证。

自动准备只解决"能不能生成 PDBQT"。**能生成文件，不等于它在科学上是正确的。** 这句话在 [结构准备 FAQ](./faq-structure-preparation.md) 里会反复出现。

---

## 别急着上手：先用 Demo 走一遍

如果你只是想先熟悉一下软件长什么样、流程怎么走，两个 profile 都带示例项目，可以走 Demo 路径：

- `basic_pdbqt`：从已有 PDBQT 开始的最小对接流程；
- `assisted_raw`：从 PDB + SDF 开始的结构准备流程；
- `viewer_result`：直接打开一个已完成的 pose、score 与报告看看结果长什么样。

示例只用于软件回归测试和操作教学，**不要拿它当科研结论**。

---

## 常见误解

| 你可能以为 | 实际情况 |
|---|---|
| "Basic 是残缺版" | Basic 能跑完整的 PDBQT 对接，它只是不自带结构准备工具 |
| "装了 Assisted 就一定准备得对" | 自动准备照样要人工检查质子化、电荷、构象、缺失残基、水、金属、辅因子和链选择 |
| "工具链缺项说明我装错了" | Basic 本来就不带 RDKit / Meeko，工具链页显示缺失是预期行为，不是安装失败 |
| "两个都装上功能最全" | 两个 profile 共用同一应用身份，不能并行安装 |

---

## 总结

本次下载使用 Assisted：已有 PDBQT 可直接导入，需要原始结构准备时再使用随包工具链。更换 profile 前，记得备份项目并卸载原有版本。

---

## 相关页面

- 工具链由哪些东西组成、怎么找、从哪来：[工具链](./toolchain.md)
- 结构准备时会碰到的具体问题：[结构准备 FAQ](./faq-structure-preparation.md)
- Meeko 与 RDKit 分别是什么：[Meeko](../part-a/docking-components/meeko.md)、[RDKit](../part-a/docking-components/rdkit.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/capabilities.py`，模式可用性与能力画像。
2. DockStart 源码 `backend/dockstart_core/toolchain.py`，工具链状态判定。
3. DockStart `docs/release/release_artifact_profile.md`，两个发布档位的资源边界。
4. DockStart `docs/demo_projects.md`，示例项目说明。
5. Meeko Documentation.
6. RDKit Documentation.

</details>
