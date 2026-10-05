---
title: "工具链"
sidebar_position: 2
sidebar_label: "工具链"
---

# 工具链

DockStart 组织结构准备、搜索和结果记录：RDKit、Meeko 处理结构，AutoDock Vina 执行搜索与评分，AutoGrid4 为 AD4 maps 协议预计算网格。

---

## 先检查工具是否可用

遇到“工具不可用”时，先打开工具链页。这里会列出每个工具是否找到、来源路径、版本，以及哪些功能会受影响。

Basic 与 Assisted 随包提供的工具不同；AutoGrid4 则需要自行准备。下面按用途、检测顺序和状态说明，帮助你判断该检查哪个工具。

---

## 各工具在流水线里的位置

```text
受体 PDB / CIF ──┐
                 ├─→ Meeko（+ RDKit）─→ PDBQT ─→ AutoDock Vina ─→ 对接结果
配体 SDF / MOL ──┘                                    ↑
                                              外部 AutoGrid4 生成的 maps
                                              （仅 AutoDock4 maps 协议）
```

各自的分工：

| 工具 | 干什么 | 是 docking 引擎吗 |
|---|---|---|
| AutoDock Vina | 搜索构象 + 打分 | **是** |
| RDKit | 读取、表示、检查分子 | 不是 |
| Meeko | 把受体/配体参数化成 PDBQT | 不是 |
| Gemmi | 把 CIF 转成中间 PDB | 不是 |
| AutoGrid4 | 为 AutoDock4 评分提前生成 affinity maps | 不是 |

这条工作流中，Vina 执行对接搜索；其他工具负责准备它需要的输入。

---

## AD4 协议仍由 Vina 执行搜索

先区分评分函数和执行程序。

DockStart 的 AutoDock4 maps 协议使用 AD4 评分，但不会调用 `autodock4` 可执行文件。

实际发生的事是：让 **Vina** 用 AutoGrid4 算好的网格，同时把评分函数切成 ad4。

```text
受体 + 配体 PDBQT
      ↓
AutoGrid4（外部工具，你自己装）
      ↓
affinity maps
      ↓
AutoDock Vina  --maps <前缀>  --scoring ad4
      ↓
对接结果
```

所以：

> **AutoDock4 工作流 = 外部 AutoGrid4 生成 maps + Vina 以 `--scoring ad4` 运行。**
> 真正执行搜索的仍然是 Vina。

这也意味着 `ad4` 的分数是"Vina 跑 ad4 评分函数"的结果，**不能假定它和 AutoDock4 原生程序算出来的一样**。

---

## 各工具的版本与来源

| 工具 | 版本 | 是否随包 | 说明 |
|---|---|---|---|
| AutoDock Vina | 1.2.7 | Basic 与 Assisted 都内置 | docking 引擎 |
| Python runtime | CPython 3.11.15 | 都内置，但角色不同 | 后端运行环境 |
| RDKit | 2026.3.3 | **仅 Assisted** | 分子表示与检查 |
| Meeko | 0.7.1 | **仅 Assisted** | 结构准备与参数化 |
| Gemmi | 0.7.5 | 仅 Assisted | CIF → 中间 PDB |
| AutoGrid4 | 4.2.6+ | **不内置** | 标准 AD4 maps；AD4Zn 需要 4.2.7+ |

Basic 里的 Python runtime 只当后端用，**不含 RDKit / Meeko，也没有它们的 site-packages**。

---

## DockStart 去哪里找工具（解析优先级）

同一个工具可能有好几个来源，DockStart 按固定顺序挑：

| 场景 | 优先级 |
|---|---|
| 后端宿主 Python | 随包 → 你配置的 → 当前环境 |
| 结构准备 Python | **你配置的 → 随包 → 当前环境** |
| AutoDock Vina | 随包 → 你配置的 → 系统 PATH |
| AutoGrid4 | 你配置的 → 系统 PATH |

注意第二行：结构准备 Python 把**你配置的路径排在最前面**，这是有意设计的——如果你已经有一个装好 RDKit / Meeko 的 conda 环境，DockStart 会优先用它，而不是用随包的那份。

配置路径会指定 DockStart 实际使用的工具环境。排查版本不一致时，也要核对这里的路径。

---

## 工具状态怎么看

工具链页会给每个工具标两个东西：

```text
状态：ok / missing / error / unknown
来源：bundled / configured / auto / current_environment /
      frontend_dependency / missing / unknown
```

怎么读：

- `ok` —— 检测通过，能用；
- `missing` —— 没找到；
- `error` —— 找到了，但检测时出错（比如试着执行了一下没跑起来）；
- `bundled` —— 来自安装包自带资源；
- `configured` —— 来自你在设置页里填的路径；
- `auto` —— 靠系统 PATH 之类的方式自动找到的。

**排查时先看"来源"再看"状态"。** 比如状态是 `ok` 但来源是 `current_environment`，说明它用的是你系统里那份，将来换机器就可能变。

---

## 工具缺失时会怎样

DockStart 只做三件事：

```text
检测
 ↓
生成结构化的"修复建议"（问题是什么、影响哪个模式、推荐步骤、可复制的命令、文档链接）
 ↓
等你手动处理完，回来点"重新检测"
```

它**不会**：

- 自动安装工具；
- 改你的系统 PATH；
- 联网下载大型运行环境。

三类最常见的建议：

| 缺什么 | 影响 |
|---|---|
| Vina 缺失 | Basic 和 Assisted 都没法真正跑 docking |
| Python / RDKit / Meeko 不完整 | 只影响 Assisted（raw → PDBQT 那段准备） |
| 检测到 Microsoft Store 版 Python | 提示这个环境不适合拿来当 RDKit / Meeko 工具链 |

最后一条的判断依据是路径落在 `WindowsApps` 下、或者路径里含 `PythonSoftwareFoundation`——因为这类环境的包管理和路径行为容易不稳。官方推荐改用独立的 conda / mamba 环境。

---

## 一个高频场景

这一段几乎每个 Basic 用户都会遇到：

```text
你装的是 Basic profile
 ↓
工具链页显示 RDKit / Meeko 缺失
 ↓
这是预期行为，不是安装失败
 ↓
只需要跑已有 PDBQT 的对接？忽略它就行
需要从 PDB/SDF 开始准备？配一个外部的 conda 环境即可
```

---

## 相关页面

- 两个档位的差别：[Basic 与 Assisted](./basic-and-assisted.md)
- 工具本身的介绍：[AutoDock Vina](../part-a/docking-components/autodock-vina.md)、[Meeko](../part-a/docking-components/meeko.md)、[RDKit](../part-a/docking-components/rdkit.md)、[AutoGrid4](../part-a/docking-components/autogrid4.md)
- Maps 与评分的概念：[Grid / Maps](../part-a/search-space-and-scoring/grid-and-maps.md)、[AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- AutoGrid4 的获取、配置与验收步骤：[配置 AutoGrid4](./autogrid4-setup.md)
- 工具缺失导致的运行失败怎么排查：[常见错误与恢复](./common-errors-and-recovery.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/toolchain.py`、`tool_check.py`、`toolchain_paths.py`。
2. DockStart 源码 `backend/dockstart_core/toolchain_repair.py`，工具链修复建议。
3. DockStart 源码 `backend/dockstart_core/project.py`，Vina 命令行组装与 `--maps` / `--scoring ad4`。
4. DockStart `docs/toolchain_repair_guide.md`。
5. AutoDock Vina 官方 Manual：https://vina.scripps.edu/manual/
6. Meeko Documentation.
7. RDKit Documentation.
8. AutoDock4.2 User Guide.

</details>
