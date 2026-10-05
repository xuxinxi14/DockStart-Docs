---
title: "常见文件扩展名"
sidebar_position: 4
sidebar_label: "常见文件扩展名"
---

# 常见文件扩展名

在 DockStart 的工作目录里，扩展名基本能告诉你"这个文件是干什么的"：`.pdb`/`.cif` 是原始结构，`.pdbqt` 是准备/运行用的输入输出，`.json` 是 DockStart 自己的记录，`.csv` 是结果表，`.md`/`.txt` 是报告与日志。

这一页是速查表。哪些扩展名可以导入，见 [DockStart 支持格式表](./supported-formats.md)。

---

## 一眼判断法

来不及细看时，先按这张图归类：

```text
.pdb  .cif  .mmcif     → 原始结构（还没准备好）
.pdbqt                 → 已经准备好的对接输入 / 输出
.sdf  .mol  .mol2      → 配体原始结构
.fld  .map  .gpf  .glg → maps 与网格相关
.json                  → DockStart 的记录与清单
.csv                   → 结果表
.md  .txt              → 报告与日志
.zip                   → 批量筛选的归档导出包
```

---

## 结构文件

| 扩展名 | 全称 | 谁产生 | DockStart 里怎么用 |
|---|---|---|---|
| `.pdb` | Protein Data Bank format | 结构数据库 / 其他软件 | 受体原始结构，交给自动准备；也可作共晶参考配体 |
| `.cif` | Crystallographic Information File（mmCIF） | 结构数据库（较新结构多为这种） | 受体原始结构，先用 Gemmi 转成中间 PDB 再准备 |
| `.mmcif` | 同上（另一种常见后缀写法） | 结构数据库 | 只在结构审查的候选发现里出现，**自动准备不接受** |
| `.pdbqt` | AutoDock PDBQT | Meeko / 其他准备工具 / DockStart 自己 | 对接的直接输入；运行输出也是它 |
| `.sdf` | Structure-Data File | 化学数据库 / 画图软件 | 配体原始结构；可带氢与三维坐标 |
| `.mol` | MDL MOL | 化学数据库 / 画图软件 | 配体原始结构（单分子） |
| `.mol2` | Tripos MOL2 | 部分建模软件 | 配体原始结构，**仅支持单分子** |
| `.smi` | SMILES 文本 | 手工编辑 | **不支持**，DockStart 不会读它 |

> 一个容易搞混的点：**`.pdb` 和 `.pdbqt` 不是一回事**。前者是原始结构，后者已经带上了 docking 需要的原子类型、电荷和可旋转键信息。DockStart 不接受拿 `.pdb` 当配体直接对接。

---

## maps 与网格文件

| 扩展名 | 是什么 | 典型文件名 |
|---|---|---|
| `.fld` | AutoGrid 的场文件主索引，指向一整套 map | `receptor.maps.fld` |
| `.map` | 单张亲和图（一种原子类型一张） | `receptor.OA.map`、`receptor.C_H.map` |
| `.gpf` | AutoGrid 的参数文件 | `receptor.gpf` |
| `.glg` | AutoGrid 的运行日志 | `autogrid.glg` |
| `.xyz` | 网格点坐标（可选） | `receptor.maps.xyz` |
| `.dat` | 参数文件，AD4Zn 用它 | `AD4Zn.dat` |

这里的 `.map` **有两套命名体系**：AD4 用 `OA`、`HD` 这类，Vina 用 `C_H`、`O_A` 这类。看到文件名就能判断是哪一套，详见 [AutoDock atom types 简表](./autodock-atom-types.md)。

---

## DockStart 的记录与结果

| 扩展名 | 是什么 | 典型文件 |
|---|---|---|
| `.json` | 结构化记录（项目状态、元数据、清单） | `project.json`、`metadata.json`、`manifest.json` |
| `.csv` | 结果表 | `scores.csv`、`screening_summary.csv` |
| `.md` | Markdown 报告 | `docking_report.md` |
| `.txt` | 日志与快照 | `log.txt`、`stdout.txt`、`config_snapshot.txt` |

关于这两类文件，有三件事值得记住：

- **`.json` 不要手工编辑。** 里面有 schema 版本与 revision 保护，手改容易把项目弄坏；
- **`.csv` 与 run 产物不要手工编辑。** DockStart 会用 SHA256 校验它们，改过就会被判定为异常，结果会被拒绝读取；
- **`.txt` 里的 `config_snapshot.txt` 很有用** —— 它记着那次运行**实际使用**的配置，是排查"为什么结果不一样"的第一手材料。

---

## 打包与临时文件

| 扩展名 | 是什么 | 注意 |
|---|---|---|
| `.zip` | 批量筛选的归档导出包 | 是只读实验记录，**不是**可直接恢复运行的项目备份 |
| `.lock` | 并发保护锁文件 | 正常运行时存在，不要手动删 |
| `.tmp` | 原子写入的临时文件 | 写完后立即替换并清理，正常情况下你看不到 |

> 如果你在项目目录里看到了 `.tmp` 残留，通常意味着某个进程异常退出。这时候该查的是进程，而不是删文件。

---

## 一个常见困惑：同一个扩展名，不同角色

`project.json` 这个文件被多个模块读取 —— Vina 预计算 maps、AutoGrid maps、AD4Zn、大环协议都要读它。所以当某个协议报"项目文件无法解析"时，问题可能在项目文件本身，而不在那个协议。

同理，`.pdbqt` 既是准备产物（`prepared/`），也是运行产物（`runs/{run}/out.pdbqt`），还是 maps 的输入快照（`maps/{set}/inputs/`）。**看路径比看扩展名更能说明它扮演什么角色。**

---

## 相关页面

- 哪些格式可以导入：[DockStart 支持格式表](./supported-formats.md)
- 结构格式的基础概念：[常见结构文件格式](../part-a/structure-and-files/structure-file-formats.md)
- 项目目录结构与文件位置：[项目、版本与可复现性](../part-c/projects-versions-reproducibility.md)
- 文件位置与数据安全：[安装、更新和数据安全](../part-c/install-update-data-safety.md)
- maps 相关：[Grid / Maps](../part-a/search-space-and-scoring/grid-and-maps.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/project.py`，项目文件与 run 产物命名。
2. DockStart 源码 `backend/dockstart_core/preparation.py`，准备产物与日志命名。
3. DockStart 源码 `backend/dockstart_core/autogrid.py`，AD4 maps 文件命名规则。
4. DockStart 源码 `backend/dockstart_core/vina_maps.py`，Vina / Vinardo maps 与 manifest。
5. DockStart 源码 `backend/dockstart_core/screening.py`，归档 ZIP 与结果表命名。
6. DockStart 源码 `backend/dockstart_core/persistence.py`，原子写入临时文件。
7. AutoDock4.2 User Guide，AutoGrid4 输出文件。
8. AutoDock Vina 官方 Manual，Configuration File。

</details>
