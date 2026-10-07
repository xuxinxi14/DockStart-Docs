---
title: "English–Chinese Glossary"
sidebar_position: 6
sidebar_label: "English–Chinese glossary"
---

# English–Chinese Glossary {#专有名词中英对照}

Use this glossary to connect terms in English references with the Chinese DockStart interface and guide.

## How to use this page {#怎么用这一页}

Find the topic below. Keep terminology consistent when describing a workflow; the Chinese column is particularly useful when following screenshots.

## Structures {#结构相关}

| English | Chinese | Meaning |
| --- | --- | --- |
| Receptor | 受体 | Macromolecular docking partner, usually a protein |
| Ligand | 配体 | Small-molecule partner |
| Residue | 残基 | Amino-acid unit |
| Chain | 链 | An individual molecular chain |
| Binding site | 结合位点 | Location of binding |
| Binding pocket | 结合口袋 | Cavity associated with a binding site |
| Cofactor | 辅因子 | Functional component such as NAD or heme |
| Water molecule | 水分子 | Water represented in the structure |
| Metal ion | 金属离子 | For example Zn²⁺ or Mg²⁺ |
| Alternate location / altloc | 替代位置 | Alternative modeled atom position |
| Occupancy | 占据率 | Modeled occupancy of a position |
| Missing residue | 缺失残基 | Residue absent from the resolved structure |
| Protonation | 质子化 | Protonation state, affecting charge and hydrogen bonding |
| Formal charge | 形式电荷 | Charge specified by chemical structure |
| Partial charge | 部分电荷 | Model-assigned atomic charge |
| Chirality | 手性 | Stereochemical handedness |
| Conformation | 构象 | Molecular shape |
| Tautomer | 互变异构体 | Form differing in proton and bond placement |
| Rotatable bond | 可旋转键 | Source of conformational freedom |
| Topology | 拓扑 | Connectivity and bond orders |
| Hydrogen bond | 氢键 | Noncovalent interaction |
| Donor | 供体 | Hydrogen-bond donor |
| Acceptor | 氢键受体 | Hydrogen-bond accepting role |
| Hydrophobic | 疏水 | Nonpolar interaction character |

## File formats {#文件格式}

| Term | Chinese | Meaning |
| --- | --- | --- |
| PDB | 蛋白质数据库格式 | Classic structure format |
| mmCIF | 大分子晶体学信息文件 | Macromolecular structure format |
| PDBQT | AutoDock 对接输入格式 | Types, charges and torsion information |
| SDF | 结构数据文件 | Chemical structure exchange format |
| MOL | MDL 分子文件 | Molecular structure block |
| MOL2 | Tripos 分子文件 | Structure with atom types and charges |
| SMILES | 简化分子线性输入规范 | Molecular string; unsupported built-in DockStart input |
| GPF | 网格参数文件 | AutoGrid input parameters |
| Affinity map | 亲和力图 | Interaction values on a grid for an atom type |
| Grid / maps | 网格 / 图谱 | Spatial scoring representation |
| Manifest | 清单文件 | Metadata for an artifact set |

## Docking concepts {#对接概念}

| English | Chinese | Meaning |
| --- | --- | --- |
| Molecular docking | 分子对接 | Computational modeling of binding poses |
| Pose | 构象 | A specific spatial placement |
| Binding mode | 结合模式 | Binding arrangement |
| Search space | 搜索空间 | Region available for search |
| Docking / search box | 对接箱体 | Center and dimensions of that region |
| Scoring function | 评分函数 | Mathematical scoring model |
| Force field | 力场 | Interaction model and parameters |
| Induced fit | 诱导契合 | Receptor adjustment associated with binding |
| Rigid receptor | 刚性受体 | Fixed receptor coordinates |
| Flexible receptor | 柔性受体 | Selected movable side chains |
| Flexible side chain | 柔性侧链 | Side chain allowed to move |
| Virtual screening | 虚拟筛选 | Computational assessment of candidate molecules |
| Co-crystallized ligand | 共晶配体 | Ligand resolved with the receptor |
| Reference ligand | 参考配体 | Comparison structure |
| Refinement | 精修 | Further local adjustment |
| Local Optimization | 局部优化 | Optimization near a supplied pose |
| Score Only | 姿势评分 | Evaluate a pose without a search |
| Autobox | 评价范围 | Automatically derived evaluation region |
| Unbound energy | 未结合能量 | Unbound-state reference |

## Parameters and units {#参数与数值}

| English | Chinese | Meaning |
| --- | --- | --- |
| Exhaustiveness | 搜索彻底程度 | Search effort |
| Num modes | 输出构象数量 | Requested maximum number of poses |
| Energy range | 能量范围 | Output energy window above the best pose |
| Spacing | 网格间距 | Distance between grid points |
| Seed | 随机种子 | Random-sequence initialization |
| CPU | 处理器核心数 | Requested parallel resources |
| Max evals | 评估次数上限 | Search evaluation limit |
| Min RMSD | 最小构象间距 | Output diversity threshold |
| Verbosity | 日志详细程度 | Logging detail |
| Angstrom / Å | 埃 | 0.1 nanometers |
| kcal/mol | 千卡每摩尔 | Energy per mole |

## Scores and results {#评分与结果}

| English | Chinese | Meaning |
| --- | --- | --- |
| Affinity | 亲和力评分 | Scoring-model value |
| Docking score | 对接评分 | Calculated pose score |
| RMSD | 均方根偏差 | Coordinate difference measure |
| RMSD l.b. | RMSD 下界 | Lower-bound difference from Mode 1 |
| RMSD u.b. | RMSD 上界 | Upper-bound difference from Mode 1 |
| Upper bound | 上界 | Upper limit |
| Lower bound | 下界 | Lower limit |
| Higher / lower score | 分数更高 / 更低 | Numerical ranking within a comparable model |

## Tools and ecosystem {#工具与生态}

| Name | Chinese term / role |
| --- | --- |
| AutoDock Vina | DockStart's docking engine |
| AutoDock4 | Separate engine; not called by DockStart |
| AutoGrid4 | External AD4 map generator |
| AD4Zn | Beta protocol for supported mononuclear, three-coordinate zinc sites |
| Meeko | Structure preparation and parameterization |
| RDKit | Cheminformatics library |
| Gemmi | Structure processing and CIF conversion |
| Macrocycle | 大环 |
| Hydrated docking | 水合对接 |

## DockStart terms {#dockstart-自身概念}

| English | Chinese | Meaning |
| --- | --- | --- |
| Profile | 发布档位 | Basic / Assisted build profile |
| Toolchain | 工具链 | Tools used by the workflow |
| Tool status | 工具状态 | `ok`, `missing`, `error`, `unknown` |
| Tool source | 工具来源 | Bundled, configured or discovered environment |
| Preflight | 运行前检查 | Checks before execution |
| Preparation | 结构准备 | Raw structure to prepared input |
| Run | 运行 | One calculation |
| Snapshot | 快照 | Frozen input copy |
| Atomic write | 原子写入 | Temporary write followed by replacement |
| Archive | 归档 | Read-only screening record |
| Protocol | 协议 | Defined behavior and requirements |
| Maturity | 成熟度 | `stable`, `beta`, `experimental` protocol label |
| Workspace mode | 工作区模式 | Single, batch or multiple-ligand workflow |
| Schema | 数据模式 | File structure version |
| Revision | 修订号 | Concurrent-edit protection |
| Diagnostic report | 诊断报告 | Environment and error record |

## Acceptor versus receptor {#一个容易混淆的词acceptor}

Chinese uses “受体” in two contexts: hydrogen-bond acceptor and macromolecular receptor. Use the surrounding context to distinguish the chemical role from the docking partner.

## Related pages {#相关页面}

- [Search and parameters](../part-a/search-and-parameters/vina-search-process.md)
- [AutoDock atom types](./autodock-atom-types.md)
- [File extensions](./file-extensions.md)
- [References](./references.md)

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina manual and FAQ; AutoDock4.2 User Guide.
2. Meeko and RDKit documentation.
3. DockStart models, capabilities, settings and project parameter definitions.

</details>
