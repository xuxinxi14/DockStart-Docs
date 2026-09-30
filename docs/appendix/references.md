---
title: "推荐文献与官方资料"
sidebar_position: 7
sidebar_label: "G. 推荐文献与官方资料"
---

# 推荐文献与官方资料

## 简单概括

这份清单只收两类东西：一是本文档正文里实际引用过的官方文档，二是理解 docking 与 DockStart 行为所必需的少量基础文献。按"你想解决什么问题"来挑，不必通读。

---

## 怎么挑

```text
想搞懂某个参数到底做什么          → AutoDock Vina 官方 Manual
想知道某个"奇怪现象"是不是正常的  → AutoDock Vina 官方 FAQ
想理解 AD4 maps 与 AutoGrid4      → AutoDock4.2 User Guide
想查某个格式 / 接口细节            → Meeko、RDKit、Gemmi 文档
想找结构数据                      → RCSB PDB、PubChem
想看背景与学术脉络                → 下面的基础文献
想了解 DockStart 自己的约定        → DockStart 仓库内文档
```

---

## 一、官方软件与文档

| 资料 | 主要覆盖 | 什么时候看 |
|---|---|---|
| AutoDock Vina 官方 Manual | 参数、配置文件、运行模式 | 想确认某个参数的官方定义 |
| AutoDock Vina 官方 Basic Docking 文档 | 基础用法、结果导出 | 想理解标准工作流 |
| AutoDock Vina 官方 FAQ | 常见疑问与官方解释 | **最值得读的一类** |
| AutoDock Vina 官方命令行帮助（`vina --help_advanced`） | 高级选项是否存在 | 排查版本能力问题 |
| AutoDock Vina 源码 | 内部类型与算法实现 | 想看清底层行为 |
| AutoDock4.2 User Guide | AutoGrid4、affinity maps、AD4Zn 参数 | 使用 AD4 相关协议时 |
| AutoGrid 官方仓库 | AutoGrid4 的获取与版本 | 准备安装 AutoGrid4 时 |
| Meeko Documentation | 结构准备与 PDBQT 生成 | 关心"PDBQT 是怎么来的" |
| RDKit Documentation | 分子读取、表示、检查 | 关心分子解析与手性等问题 |
| Gemmi 文档 | CIF 处理 | 使用 `.cif` 受体时 |
| AutoDock Suite 官方网站 | 整个生态的入口 | 想了解工具之间的关系 |

---

## 二、官方 FAQ 里最值得读的几条

下面这些问题，在本文档多个章节里被引用过。它们正好对应了使用中最容易产生误解的地方：

| FAQ 主题 | 为什么值得读 |
|---|---|
| Vina 的准确性如何？ | 建立对评分结果的正确期待 |
| 搜索空间应该多大？ | Box 设置的官方依据 |
| 怎么调整评分函数？ | 理解 `--scoring` 与不同评分函数的关系 |
| 改了一点东西，结果就变了，为什么？ | 可复现性的官方解释 |
| 结合构象看着合理，但氢原子位置很奇怪？ | 解释"氢的坐标不具物理意义" |
| `exhaustiveness` 到底控制什么？ | 理解搜索投入与结果质量的关系 |
| 为什么没有得到正确的结合构象？ | 排查方向的官方提示（含"换种子是否有用"） |
| 结果在 PyMOL 里看着很怪？ | 可视化相关的常见误解 |
| 为什么没有输出我指定的那么多构象？ | `num_modes` 与实际输出的差别 |
| 改了部分电荷，结果没变？ | 解释"Vina 忽略用户提供的 partial charges" |

> 这几条 FAQ 直接支撑了本文档第一章与第三章中关于**科学边界**的表述。

---

## 三、结构数据库

| 资料 | 用途 |
|---|---|
| RCSB PDB | 下载受体结构；DockStart 的在线结构检索会访问它 |
| PubChem | 下载小分子配体（SDF）；DockStart 的在线配体检索会访问它 |

**两点提醒：**

- DockStart 只在**你主动使用在线检索**时联网，日常对接不上传任何数据；
- 从数据库拿到的结构**不一定适配你的研究体系**（质子化状态、水、金属、缺失残基都需要自己判断），详见 [结构准备 FAQ](../part-c/faq-structure-preparation.md)。

---

## 四、基础文献

以下是理解分子对接方法与评分函数的基础读物。**引用格式请以出版方页面为准**，此处只给便于检索的信息。

| 文献 | 主题 |
|---|---|
| Trott & Olson, *AutoDock Vina: improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading*（J Comput Chem, 2010） | Vina 的原始论文，理解 Vina 评分函数的起点 |
| Eberhardt 等, *AutoDock Vina 1.2.0: New Docking Methods, Expanded Force Field, and Python Bindings*（J Chem Inf Model, 2021） | Vina 1.2 系列的改进，与当前使用版本直接相关 |
| Morris 等, *AutoDock4 and AutoDockTools4: Automated docking with selective receptor flexibility*（J Comput Chem, 2009） | AutoDock4 与柔性受体，理解 AD4 体系的背景 |
| Quiroga & Villarreal, *Vinardo: A Scoring Function Based on AutoDock Vina Improves Scoring, Docking, and Virtual Screening*（PLoS ONE, 2016） | Vinardo 评分函数的来源 |
| Forli 等, *Computational protein–ligand docking and virtual drug screening with the AutoDock suite*（Nat Protoc, 2016） | AutoDock 套件的实操综述，适合先建立整体印象 |
| Wojdyr, *GEMMI: A library for structural biology*（J Open Source Softw, 2022） | Gemmi 库，对应 CIF 处理路径 |

**关于"文献能不能支持某个结论"：** 本文档所有关于结果的表述都遵守一条底线 —— docking 结果是**结构结合趋势参考**，不是实验事实。文献能帮助你理解方法，但不能把计算结果变成实验证据。

---

## 五、DockStart 自身资料

仓库里还有几份值得一读的文档，它们更偏"工程视角"：

| 文件 | 内容 |
|---|---|
| `README.md` | 版本状态、两个发布档位的对比、不提供什么 |
| `docs/demo_projects.md` | 示例项目说明 |
| `docs/manual_pdbqt_preparation.md` | 手工准备 PDBQT 的说明 |
| `docs/toolchain_repair_guide.md` | 工具链缺失时的处理指引 |
| `docs/release/release_artifact_profile.md` | 各发布档位的资源边界 |
| `docs/release/release_checklist.md` | 发布验收清单与版本一致性要求 |

**理解源码的入口**（如果你想追到最底层）：

```text
backend/dockstart_core/     后端核心：项目、准备、运行、协议
backend/adapters/           对外部工具的适配（Vina 能力与版本）
apps/desktop/src/           前端界面
apps/desktop/src-tauri/src/ Tauri 外壳与后端进程管理
```

本文档每一页的"参考资料"都标注了对应的源码文件，可以从那里反向查证。

---

## 六、怎么判断一份资料能不能用

```text
是工具官方发布的吗？
   ├─ 是 → 可以作为行为依据
   └─ 否 → 需要交叉验证

是官方 FAQ 或 User Guide 吗？
   ├─ 是 → 通常最贴近实际行为
   └─ 否 → 注意版本是否对应

是论坛回答或教程吗？
   └─ 只当线索，不要当依据 —— 版本差异会带来完全不同的结论
```

**最后一条尤其重要：** docking 工具的默认值和行为在不同版本之间会变化。本文档所有关于"当前行为"的描述都以**本地源码版本**为准，与在线教程不一致时，以源码和官方对应版本文档为准。

---

## 总结

按当前问题选择资料即可。核对适用版本、方法前提和原始证据，通常比一次读完清单更有用。

---

## 相关页面

- 支持格式与工具链：[DockStart 支持格式表](./supported-formats.md)、[工具链](../part-c/toolchain.md)
- 参数速查：[Vina 参数速查表](./vina-parameters-quick-reference.md)
- 术语对照：[专有名词中英对照](./glossary-zh-en.md)
- 科学边界：[如何正确解读结果](../part-c/interpreting-results.md)
- 可复现性需要记录什么：[项目、版本与可复现性](../part-c/projects-versions-reproducibility.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart `README.md`，版本状态与能力边界说明。
2. DockStart `docs/` 目录下的项目文档（示例项目、手工准备、工具链修复、发布相关）。
3. DockStart 源码 `backend/dockstart_core/`、`backend/adapters/`、`apps/desktop/`，行为的第一手依据。
4. AutoDock Vina 官方 Manual、Basic Docking 文档与 FAQ。
5. AutoDock4.2 User Guide。
6. Meeko、RDKit、Gemmi 官方文档。

</details>
