---
title: "专有名词中英对照"
sidebar_position: 6
sidebar_label: "专有名词中英对照"
---

# 专有名词中英对照

这份对照表按主题分组，收入本文档正文里出现过的术语。看英文资料时对不上中文、或者跟别人交流时说法不一致，都可以回来查。

---

## 怎么用这一页

```text
看英文文档遇到不认识的词  → 按主题找
想确认某个中文词的标准译法 → 按主题找
写方法部分需要统一用词      → 全文照这里的写法
```

**说明：** 本文档优先使用中文术语；英文列用于对照，不表示"必须用英文"。同一行的英文可能有多个常见写法，这里给的是最通行的那个。

---

## 结构相关

| 英文 | 中文 | 说明 |
|---|---|---|
| Receptor | 受体 | 对接中的"大分子"一方，通常是蛋白质 |
| Ligand | 配体 | 对接中的"小分子"一方 |
| Residue | 残基 | 蛋白质里的氨基酸单元 |
| Chain | 链 | 多聚体结构里的一条独立链 |
| Binding site | 结合位点 | 配体结合的宏观位置 |
| Binding pocket | 结合口袋 | 结合位点形成的凹陷区域 |
| Cofactor | 辅因子 | 参与功能的小分子（如 NAD、血红素） |
| Water molecule | 水分子 | 晶体结构中的水 |
| Metal ion | 金属离子 | 如 Zn²⁺、Mg²⁺、Fe³⁺ |
| Alternate location (altloc) | 替代位置 | 同一原子在晶体中的多个可能位置 |
| Occupancy | 占据率 | 某个位置的占据比例 |
| Missing residue | 缺失残基 | 结构里没有解析出来的残基 |
| Protonation | 质子化 | 是否带质子（影响氢键与电荷） |
| Formal charge | 形式电荷 | 化学结构上明确的电荷 |
| Partial charge | 部分电荷 | 计算分配的原子电荷，属模型参数 |
| Chirality | 手性 | 分子的三维手性 |
| Conformation | 构象 | 分子在空间中的形状 |
| Tautomer | 互变异构体 | 质子转移形成的异构形式（如组氨酸） |
| Rotatable bond | 可旋转键 | 构象搜索的自由度来源 |
| Topology | 拓扑 | 原子连接关系与键级 |
| Hydrogen bond | 氢键 | 一种重要的非键相互作用 |
| Donor | 供体 | 氢键供体 |
| Acceptor | 受体 | 氢键受体（注意与"受体分子"区分） |
| Hydrophobic | 疏水 | 非极性、避水的性质 |

---

## 文件格式

| 英文 | 中文 | 说明 |
|---|---|---|
| PDB | 蛋白质数据库格式 | 经典结构文件格式 |
| mmCIF | 大分子晶体学信息文件 | 较新的结构格式，可表达更多信息 |
| PDBQT | AutoDock 对接输入格式 | 带原子类型、电荷与可旋转键标记 |
| SDF | 结构数据文件 | 化学结构的常见交换格式 |
| MOL | MDL 分子文件 | 单分子结构块 |
| MOL2 | Tripos 分子文件 | 带原子类型与电荷的格式 |
| SMILES | 简化分子线性输入规范 | 用字符串表示分子（**DockStart 不支持**） |
| GPF | 网格参数文件 | AutoGrid4 的输入参数文件 |
| Affinity map | 亲和力图 | 某种原子类型在网格点上的相互作用值 |
| Grid / Maps | 网格 / 图谱 | 空间相互作用信息的预计算表示 |
| Manifest | 清单文件 | 描述一整套 maps 的元数据（JSON） |

---

## 对接概念

| 英文 | 中文 | 说明 |
|---|---|---|
| Molecular docking | 分子对接 | 预测配体与受体的结合方式 |
| Pose | 构象 / 姿态 | 一种具体的空间摆放方式 |
| Binding mode | 结合模式 | 配体的结合方式 |
| Search space | 搜索空间 | 程序允许搜索的三维区域 |
| Search box | 搜索盒 | 搜索空间的具体定义（中心 + 尺寸） |
| Scoring function | 评分函数 | 给构象打分的数学模型 |
| Force field | 力场 | 描述原子间作用的一组参数 |
| Induced fit | 诱导契合 | 受体侧链因配体结合而调整 |
| Rigid receptor | 刚性受体 | 受体视为固定不动 |
| Flexible receptor | 柔性受体 | 受体的部分侧链参与搜索 |
| Flexible side chain | 柔性侧链 | 允许活动的侧链 |
| Virtual screening | 虚拟筛选 | 用计算筛选大量候选分子 |
| Co-crystallized ligand | 共晶配体 | 与受体一起被解析出来的配体 |
| Reference ligand | 参考配体 | 用于比对 RMSD 的参照分子 |
| Refinement | 精修 | 对构象做进一步的局部调整 |
| Local optimization | 局部优化 | 在给定构象附近做小幅调整 |
| Score only | 姿势评分 | 只对给定构象打分、不搜索 |
| Autobox | 评价范围 | 由程序自动确定搜索范围的模式 |
| Unbound energy | 未结合能量 | 未结合状态的参考能量 |

---

## 参数与数值

| 英文 | 中文 | 说明 |
|---|---|---|
| Exhaustiveness | 搜索彻底程度 | 搜索的投入程度，越高越慢也越彻底 |
| Num modes | 输出构象数 | 最多输出多少个构象 |
| Energy range | 能量范围 | 输出构象允许比最优构象高出的能量 |
| Spacing | 网格间距 | 网格点之间的距离 |
| Seed | 随机种子 | 决定随机数序列；留空则由程序自动生成 |
| CPU | 处理器核心数 | 并行使用的核心数 |
| Max evals | 评估次数上限 | 搜索过程中允许的评估次数 |
| Min RMSD | 最小构象间距 | 输出构象之间至少相差多少 |
| Verbosity | 日志详细程度 | 日志的详尽级别 |
| Angstrom (Å) | 埃 | 长度单位，0.1 纳米 |
| kcal/mol | 千卡每摩尔 | 能量单位 |

---

## 评分与结果

| 英文 | 中文 | 说明 |
|---|---|---|
| Affinity | 亲和力（评分值） | 评分函数给出的预测值 |
| Docking score | 对接评分 | 同上，更中性的说法 |
| RMSD | 均方根偏差 | 衡量两个构象的差异 |
| RMSD l.b. | RMSD 下界 | 相对最优构象的偏差下界 |
| RMSD u.b. | RMSD 上界 | 相对最优构象的偏差上界 |
| Upper bound | 上界 | 取值范围的上限 |
| Lower bound | 下界 | 取值范围的下限 |
| Higher / lower score | 分数更高 / 更低 | 数值越小通常表示模型认为越有利 |

---

## 工具与生态

| 英文 | 中文 | 说明 |
|---|---|---|
| AutoDock Vina | — | 当前 DockStart 使用的对接引擎 |
| AutoDock4 | — | AutoDock 系列的另一代引擎；DockStart **不调用**它 |
| AutoGrid4 | — | 生成 AD4 affinity maps 的外部工具 |
| AD4Zn | — | 面向单核三配位锌位点的 beta 协议 |
| Meeko | — | 把分子参数化为 PDBQT 的工具 |
| RDKit | — | 开源化学信息学库 |
| Gemmi | — | 结构文件处理库（CIF → PDB） |
| Macrocycle | 大环 | 含大环结构的配体，需特殊断环处理 |
| Hydrated docking | 水合对接 | 让水显式参与的协议 |

---

## DockStart 自身概念

| 英文 | 中文 | 说明 |
|---|---|---|
| Profile | 发布档位 | Basic / Assisted 两个安装档位 |
| Toolchain | 工具链 | DockStart 依赖的一组外部工具 |
| Tool status | 工具状态 | `ok` / `missing` / `error` / `unknown` |
| Tool source | 工具来源 | `bundled` / `configured` / `auto` / `current_environment` 等 |
| Preflight | 运行前检查 | 运行前的一系列阻塞项检查 |
| Preparation | 结构准备 | 把原始结构转成 PDBQT 的过程 |
| Run | 运行 | 一次具体的对接执行 |
| Snapshot | 快照 | 运行时冻结的输入副本 |
| Atomic write | 原子写入 | 先写临时文件再整体替换的写入方式 |
| Archive | 归档 | 只读的批量筛选实验记录包 |
| Protocol | 协议 | 一组预先约定的行为与限制 |
| Maturity | 成熟度 | 协议标记：stable / beta / experimental |
| Workspace mode | 工作区模式 | 单配体 / 批量 / 多配体等工作方式 |
| Schema | 数据模式 | 项目文件的结构版本 |
| Revision | 修订号 | 用于检测并发修改 |
| Diagnostic report | 诊断报告 | 用于反馈问题的环境信息汇总 |

---

## 一个容易混淆的词：Acceptor

英文 `acceptor` 在不同语境下有两个意思：

```text
氢键受体（hydrogen bond acceptor） → 化学上的角色
受体分子（receptor）               → 蛋白质那一方
```

中文里"受体"这两个字被用来翻译两个不同的英文词，容易看混。**遇到"受体"时，看上下文判断**：讲氢键时是前者，讲分子对接的双方时是后者。

---

## 相关页面

- 全书术语的概念讲解：[第一章](../part-a/search-and-parameters/vina-search-process.md)
- 术语背后的原子分类：[AutoDock atom types 简表](./autodock-atom-types.md)
- 扩展名对照：[常见文件扩展名](./file-extensions.md)
- 官方资料清单：[推荐文献与官方资料](./references.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual 与 FAQ，术语用法。
2. AutoDock4.2 User Guide，原子类型与参数术语。
3. Meeko Documentation.
4. RDKit Documentation.
5. DockStart 源码 `backend/dockstart_core/models.py`，工具状态与来源枚举。
6. DockStart 源码 `backend/dockstart_core/capabilities.py`，协议成熟度术语。
7. DockStart 源码 `backend/dockstart_core/settings.py`、`project.py`，参数命名。

</details>
