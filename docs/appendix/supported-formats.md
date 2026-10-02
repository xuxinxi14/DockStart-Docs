---
title: "DockStart 支持格式表"
sidebar_position: 1
sidebar_label: "DockStart 支持格式表"
---

# DockStart 支持格式表

## 简单概括

受体可导入 PDBQT，或从 PDB/CIF 准备；配体可导入 PDBQT，或从 SDF/MOL/MOL2 准备。SMILES 不在当前输入范围内。

需要了解格式本身的区别，可以先看 [常见结构文件格式](../part-a/structure-and-files/structure-file-formats.md)。

---

## 怎么用这一页

```text
先确认你的文件属于哪一类
   ↓
在下面找到对应的行
   ↓
看"状态"和"限制"
   ↓
有疑问再看"相关页面"
```

三档状态的含义：

| 状态 | 含义 |
|---|---|
| **支持** | 可以直接导入，校验链路完整接受 |
| **支持但有限制** | 有条件接受（依赖某个工具、只支持单分子，或只在某个协议下可用） |
| **不支持** | 源码显式拒绝，或全仓库没有实现 |

---

## 受体结构

| 格式 | 扩展名 | 状态 | 说明 |
|---|---|---|---|
| AutoDock PDBQT | `.pdbqt` | **支持** | 唯一可以直接导入项目的受体格式，导入后成为 `prepared/receptor.pdbqt` |
| PDB | `.pdb` | **支持** | 作为"原始结构"，交给 Assisted 的自动准备流程转成 PDBQT |
| mmCIF | `.cif` | **支持但有限制** | 需要可用的 Gemmi；先转成中间 PDB，再交给 Meeko |

**受体侧的几个硬性事实：**

- 只接受上面三种扩展名，其他会直接报错。
- `.cif` 的额外依赖是实打实的：拿不到可用的 Gemmi，`.cif` 就走不了自动准备（`.pdb` 不受影响）。
- v1.0.4 的显式受体残基控制可用于 PDB，也可用于 CIF；CIF 需先确认转换后的链/残基身份可对应。转换不能可靠对应时应停止，不能把控制项直接套到另一套编号。
- 结构审查（诊断）会多看一种 `.mmcif`，但那只是诊断层面的候选发现 —— **自动准备不接受 `.mmcif`**。

> 总结：想省事就给 `.pdbqt`；想从原始结构开始，优先 `.pdb`，`.cif` 作为备选。

---

## 配体结构

| 格式 | 扩展名 | 状态 | 说明 |
|---|---|---|---|
| AutoDock PDBQT | `.pdbqt` | **支持** | 可直接导入，成为 `prepared/ligand.pdbqt` |
| MDL SDF | `.sdf` | **支持** | 最常用的配体输入，可以带氢和三维坐标 |
| MDL MOL | `.mol` | **支持** | 单分子结构块 |
| Tripos MOL2 | `.mol2` | **支持但有限制** | 仅支持**单分子**；多记录、批量场景都不接受 |
| SMILES | — | **不支持** | 需要自己先用外部工具生成三维结构并准备成 PDBQT |

**配体侧的几个硬性事实：**

- 自动准备的允许集合就是 `{.sdf, .mol, .mol2}`，外加直接导入的 `.pdbqt`。
- **多记录 SDF**：普通单配体准备读取第一条记录，不能用来完成整库筛选；批量筛选有独立的逐记录导入流程。大环准备拒绝多记录 SDF，不能把各协议的行为混为一谈。
- **多记录 MOL2**：不支持。
- **`.mol2` 的可用范围特别窄**：单配体原始结构准备可以，但批量筛选的配体库**不接受** `.mol2`，批量导入时前端就会拦住。
- **SMILES 明确不支持**：界面提示是"PDB/SMILES 请先使用外部工具准备 PDBQT"，PubChem 的 SMILES 查询也会返回专门的错误码。
- **配体不能用 PDB 作原始结构**：PDB 与 SMILES 都不参与内置转换。

---

## 各类辅助输入

| 用途 | 支持的格式 | 状态 | 说明 |
|---|---|---|---|
| 共晶参考配体（做 RMSD 对比） | `.sdf` `.mol` `.pdb` `.pdbqt` | 支持 | 只认这四种 |
| 批量筛选的配体库 | `.pdbqt` `.sdf` `.mol` | 支持 | **不含 `.mol2`** |
| 大环协议的配体 | 单分子 `.sdf` / `.mol` / `.mol2` | 支持但有限制 | 多分子 SDF 会被直接拒绝 |
| 水合协议的配体 | `.sdf` / `.mol` | 支持但有限制 | 不含 MOL2，也不含已准备的 PDBQT |
| 在线下载的受体 | `.pdb` / `.cif` | 支持 | RCSB 检索 |
| 在线下载的配体 | `.sdf` | 支持 | PubChem 检索；SMILES 查询不支持 |

---

## AD4 maps 相关文件

| 文件 | 命名规则 | 状态 | 说明 |
|---|---|---|---|
| 场文件主索引 | `{前缀}.maps.fld` | 支持 | 导入外部 maps 时**必需**，且必须非空 |
| 原子类型亲和图 | `{前缀}.{原子类型}.map` | 支持 | 每种配体原子类型一张 |
| 静电项 | `{前缀}.e.map` | 支持 | 必需 |
| 去溶剂项 | `{前缀}.d.map` | 支持 | 必需 |
| GPF 参数文件 | `{前缀}.gpf` | 支持 | 导入外部 maps 时必需 |
| 网格坐标 | `{前缀}.maps.xyz` | 可选 | 名称固定 |
| AutoGrid 日志 | `autogrid.glg` | 支持 | 审计用 |
| AD4Zn 参数 | `AD4Zn.dat` | 支持（严格） | 必须是固定的上游版本，含 GPL 声明与关键系数校验 |

DockStart 自己生成 maps 时，前缀固定为 `receptor`。导入外部 maps 时，前缀从 `*.maps.fld` 的文件名反推，并受命名规则限制。

> 缺文件时的提示很具体：**"请补齐 .maps.fld、每种配体原子类型的 .map、e.map 和 d.map"**。

---

## Vina / Vinardo 预计算 maps

| 文件 | 状态 | 说明 |
|---|---|---|
| `manifest.json` | 支持 | 必需的清单文件，固定放在 `maps/vina_{NNN}/` |
| `{前缀}.{原子类型}.map` | 支持 | 原子类型必须属于 Vina 的 20 种类型 |
| 输入快照 | 支持 | 受体与配体的快照文件 |

**每个 `.map` 文件必须带 6 行表头**，缺一行都不行：

```text
GRID_PARAMETER_FILE
GRID_DATA_FILE
MACROMOLECULE
SPACING
NELEMENTS
CENTER
```

清单文件 `manifest.json` 也有硬性字段要求（schema 版本必须是 1、`protocol_id` 必须是 `vina_maps`、状态必须是 `ready`、`semantics` 必须同时声明 grid-only / 等价 no-refine / 仅刚性受体），具体含义见 [Box 与 Maps FAQ](../part-c/faq-box-and-maps.md)。

**资源上限：** 最多 32 个 map 文件，单文件不超过 512 MiB，合计不超过 4 GiB，每张图不超过 2000 万个点。

---

## 项目内部产生的文件

这些不是你输入的东西，而是 DockStart 自己写出来的：

| 扩展名 | 代表文件 | 产生位置 |
|---|---|---|
| `.pdbqt` | `prepared/receptor.pdbqt`、`runs/{run}/out.pdbqt`、`maps/{set}/inputs/*.pdbqt` | 准备 / 运行 / maps |
| `.json` | `project.json`、`runs/{run}/metadata.json`、`maps/{set}/manifest.json` | 项目 / 运行 / maps |
| `.csv` | `runs/{run}/scores.csv`、`results/*.csv`、`screening/results/*.csv` | 结果 |
| `.md` | `runs/{run}/docking_report.md`、`reports/*.md` | 报告 |
| `.txt` | `log.txt`、`stdout.txt`、`stderr.txt`、`config_snapshot.txt` | 日志与快照 |
| `.zip` | 批量筛选归档导出 | 归档 |
| `.lock` | `.project.lock`、`.vina-maps.lock` | 并发保护 |
| `.tmp` | 原子写入的临时文件 | 写入过程中，通常看不到 |

---

## 明确不支持的格式

| 格式 | 情况 |
|---|---|
| SMILES / `.smi` 文件 | 配体输入不支持，也没有任何处理实现 |
| PDB 作为配体原始结构 | 不支持 |
| 多记录 MOL2 | 不支持 |
| 批量筛选库里的 `.mol2` | 不支持 |
| `.mae` / `.maegz`（Schrödinger） | 未找到任何实现 |
| `.gz` / `.tar` / `.tgz` | 未找到任何实现（压缩只支持 `.zip`，且仅用于批量归档导出） |

---

## 总结

DockStart 的输入格式是刻意收窄的：受体与配体各只有少数几种可用格式，SMILES 不在其中；不在清单里的格式需要你先在外部转好再导入。

---

## 相关页面

- 结构格式的基础概念：[常见结构文件格式](../part-a/structure-and-files/structure-file-formats.md)
- 扩展名逐个解释：[常见文件扩展名](./file-extensions.md)
- 结构准备时会遇到的问题：[结构准备 FAQ](../part-c/faq-structure-preparation.md)
- maps 与 Box 的关系：[Box 与 Maps FAQ](../part-c/faq-box-and-maps.md)
- 原子类型：[AutoDock atom types 简表](./autodock-atom-types.md)
- 高级协议各自的格式要求：[高级协议的适用范围](../part-c/advanced-protocols.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/preparation.py`，受体 / 配体允许格式集合与校验。
2. DockStart 源码 `backend/dockstart_core/project.py`，PDBQT 导入校验与扩展名检查。
3. DockStart 源码 `backend/dockstart_core/structure_fetch.py`，在线检索与下载的格式白名单。
4. DockStart 源码 `backend/dockstart_core/screening.py`，批量配体库的允许集合。
5. DockStart 源码 `backend/dockstart_core/autogrid.py`、`vina_maps.py`，maps 命名规则与必需文件。
6. DockStart 源码 `backend/dockstart_core/ad4zn.py`，`AD4Zn.dat` 校验。
7. DockStart 源码 `apps/desktop/src/pages/ProjectCreatePage.tsx`、`components/BatchScreeningPanel.tsx`，前端文件过滤器。
8. Meeko Documentation.
9. RDKit Documentation.
10. AutoDock4.2 User Guide，AutoGrid4 与 affinity maps。

</details>
