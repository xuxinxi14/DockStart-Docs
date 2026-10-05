---
title: "Basic Docking — 1IEP"
sidebar_position: 1
sidebar_label: "Basic Docking — 1IEP"
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Basic Docking — 1IEP

用伊马替尼与 c-Abl 激酶的 1IEP 结构练习一次基础对接：创建项目、准备结构、设置对接箱体、运行并查看结果。首次安装先看 [下载与快速开始](../../part-c/quick-start-v1-0-4.md)。

## 官方三维结构文件 {#official-structure-files}

<OfficialExampleFiles example="basic"/>

## 案例设置

| 项目 | 内容 |
| --- | --- |
| 受体 | c-Abl 激酶结构域，PDB 编号 [1IEP](https://www.rcsb.org/structure/1IEP) |
| 配体 | 伊马替尼（imatinib / Gleevec），从 1IEP 晶体结构中提取 |
| 搜索框中心 | `15.190, 53.903, 16.917` |
| 搜索框尺寸 | 官方教程用 `20 × 20 × 20 Å` |
| 官方 Vina 期望值 | 最佳构象约 **-13.23 kcal/mol** |

## 第 1 步：从帮助页进入「项目」

![真实 v1.0.4 帮助页：下一步建议、快速入口和离线帮助](../../../static/img/releases/v1.0.4-help.png)

**图 1**　帮助页。

点击左侧「项目」开始创建。想先熟悉界面，也可以点击「打开示例入口」。<NoteRef number={2}/>

## 第 2 步：新建项目，选好三个东西

![创建项目页：任务类型选「全局对接」，下面依次填项目名称、保存目录、受体结构、配体结构](../../../static/img/cases/basic-docking-1iep/02-create-project.webp)

**图 2**　创建项目页。

选择「全局对接」，填写项目名称和可写的保存目录。受体选 `1iep_receptorH.pdb`，配体选 `1iep_ligand.sdf`；已有两份 PDBQT 时可直接导入。

从 PDB/SDF 开始，请使用 Assisted 的结构准备功能。

## 第 3 步：确认 PDBQT 准备结果

![格式转换与 PDBQT 准备页：受体与配体都已就绪，配体卡片上有一个橙色的「关键警告」](../../../static/img/cases/basic-docking-1iep/03-prepare-pdbqt.webp)

**图 3**　格式转换与 PDBQT 准备。

将受体和配体转换为 PDBQT，确认右侧两项文件检查都通过。已有 PDBQT 时跳过转换。

出现结构警告时，打开「查看配体完整结构审查」，核对质子化、电荷和手性；受体缺失原子若靠近结合位点，应先修复结构。

## 第 4 步：大环准备策略 → 设置搜索范围

![同一页向下滚动：大环配体准备选择「标准准备」，底部是「刷新文件状态」和「设置搜索范围」按钮](../../../static/img/cases/basic-docking-1iep/04-macrocycle-search-range.webp)

**图 4**　同一页的下半部分。

伊马替尼使用「标准准备」。受体与配体就绪后，点击「设置搜索范围」。

## 第 5 步：设定 Grid Box（搜索范围）

![运行工作台：中间是 3D 预览和橙色的 DOCKING BOX，右侧是中心与尺寸六个数值，最右侧是运行前检查](../../../static/img/cases/basic-docking-1iep/05-set-grid-box.webp)

**图 5**　运行工作台 → 准备运行任务（Vina 运行阶段）。

按下表填写对接箱体，并在三维视图中确认它覆盖目标位点。

| 坐标轴 | 中心（Å） | 尺寸（Å） |
| --- | --- | --- |
| X | `15.190` | `20` |
| Y | `53.903` | `20` |
| Z | `16.917` | `20` |

截图中的尺寸为 `20.25`；跟做官方案例时填 `20`。<NoteRef number={2}/>

## 第 6 步：填写 Vina 参数

![运行设置页：受体配体输入、全局对接参数六个数值、输出目录与工具来源、右下角「开始对接」](../../../static/img/cases/basic-docking-1iep/06-set-vina-parameters.webp)

**图 6**　运行设置 → 输入、参数与输出。

使用以下参数，保存后点击「重新检查」。伊马替尼较难搜索，官方建议将搜索彻底程度设为 `32`。

| 参数 | 建议取值 |
| --- | --- |
| 评分函数 | `Vina` |
| 搜索彻底程度 | `32` |
| 输出构象数量 | `9` |
| 能量范围 | `3 kcal/mol` |
| CPU 线程 | `0`（自动） |
| 随机种子 | 留空；重复对照时使用相同整数 |

解决运行前的阻塞项后，点击「开始对接」。

## 第 7 步：选择对接方式（受体柔性）

![受体柔性设置：默认「刚性受体 + 配体柔性」，下方是项目运行历史表](../../../static/img/cases/basic-docking-1iep/07-flexibility-and-history.webp)

**图 7**　受体柔性设置与运行历史。

保持「刚性受体 + 配体柔性」。运行完成后，在运行历史中找到本次 Vina 记录，点击「查看结果」。

## 第 8 步：看结果——Vina 的构象列表（run_001）

![Vina run_001 结果页：顶部显示运行标识 run_001 与耗时 14 秒，中间是构象列表，Mode 1 为 -12.58，右侧是所选构象分值与输出文件](../../../static/img/cases/basic-docking-1iep/08-result-vina-poses.webp)

**图 8**　结果 → 查看运行结果，`run_001`（**Vina**）。

先确认运行编号和评分函数，再点选构象查看位置与朝向。截图中 `run_001` 的 Mode 1 为 **-12.58 kcal/mol**；官方参考约为 **-13.23 kcal/mol**。<NoteRef number={3}/>

需要在其他分子查看器中打开结果时，先导出 SDF。若要比较预测构象与共晶配体，使用「选择参考配体并计算」。

## 第 9 步：看结果——Vina 的评分表（run_001）

![Vina run_001 的评分标签：scores.csv 表格列出 9 个构象的对接评分与两组 RMSD](../../../static/img/cases/basic-docking-1iep/09-result-vina-scores.webp)

**图 9**　同一页的「评分」（`scores.csv`）标签页。

「评分」标签显示分数表；「运行日志与文件」可查看原始记录。

| 构象 | 对接评分 kcal/mol | RMSD l.b. (Å) | RMSD u.b. (Å) |
| --- | --- | --- | --- |
| Mode 1 | -12.58 | 0 | 0 |
| Mode 2 | -10.89 | 3.036 | 12.39 |
| Mode 3 | -10.56 | 3.791 | 12.15 |
| Mode 4 | -9.659 | 2.477 | 12.41 |
| Mode 5 | -9.322 | 2.929 | 12.48 |
| Mode 6 | -8.199 | 1.742 | 13.35 |
| Mode 7 | -8.022 | 3.949 | 6.605 |
| Mode 8 | -6.772 | 2.832 | 13.19 |
| Mode 9 | -5.283 | 6.395 | 7.85 |

RMSD l.b./u.b. 是各构象相对 Mode 1 的距离，Mode 1 因而为 0。可打开的构象数量以输出文件为准。详细定义见 [RMSD](../../part-a/understanding-results/rmsd.md) 和 [Energy Range](../../part-a/search-and-parameters/energy-range.md)。

## 继续阅读

- 搜索范围的设定：[Box 与 Maps FAQ](../../part-c/faq-box-and-maps.md)
- 搜索彻底程度的影响：[Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- 结果怎么读：[如何正确解读结果](../../part-c/interpreting-results.md)
- 两次结果为什么不一样：[为什么结果不一致](../../part-c/why-results-differ.md)
- 同一条流程的 AD4 maps 分支：[AutoDock4 Maps 工作流](./autodock4-maps-workflow.md)

<DocNotes example="basic">

<DocNote number={2} title="版本与截图">

图 1 为 v1.0.4 帮助页；图 2 起的操作与分数来自历史 v1.0.3 案例，未作为 v1.0.4 的新一轮验收。按钮位置以当前界面为准。图 2 的项目名为 `demo_project`，图 3 起使用已有项目 `box1`；本机路径已遮盖。

历史 Vina 运行使用尺寸 `20.25 × 20.25 × 20.25 Å`、搜索彻底程度 `8` 和随机种子。正文建议按官方教程使用尺寸 `20`、搜索彻底程度 `32`。帮助页的建议随项目与工具链状态变化；问号可打开离线说明，在线文档需要联网。

</DocNote>

<DocNote number={3} title="历史结果与官方对照">

| 运行 | 力场 | 本次最佳构象 | 官方期望值 | 搜索彻底程度 |
| --- | --- | --- | --- | --- |
| `run_001` | Vina | **-12.58** | 约 **-13.23** | 8（官方建议 32） |
| `run_002` | AutoDock4 maps | **-14.7133** | 约 **-14.72** | 8 |
| `run_003` | AutoDock4 maps | **-14.7279** | 约 **-14.72** | 32（I 节的数据） |

搜索强度、箱体尺寸、输入准备和随机种子均可能影响结果；仅凭分数差异不能确定原因，也不能保证调整参数后逐位相同。`scores.csv` 的候选评分行数与 `out.pdbqt` 中保存的构象数应分别检查。

</DocNote>

<DocNote number={4} title="同一项目中的 AD4 记录">

图 10、11 对应另一次 AutoDock4 maps 运行 `run_002`，不是正文的 Vina 运行。完整操作见 [AutoDock4 Maps 工作流](./autodock4-maps-workflow.md)。AD4 与 Vina/Vinardo 分数不直接比较。

![AutoDock4 maps run_002 的构象列表：顶部橙色横幅提示本页评分来自 AutoDock4 maps](../../../static/img/cases/basic-docking-1iep/10-result-ad4-poses.webp)

**图 10**　`run_002`（AutoDock4 maps）的构象列表。

![AutoDock4 maps run_002 的评分表：表头是「AutoDock4 评分 kcal/mol」](../../../static/img/cases/basic-docking-1iep/11-result-ad4-scores.webp)

**图 11**　`run_002` 的评分表。注意表头是「**AutoDock4 评分** kcal/mol」，与图 9 的「对接评分」不同——这正是判断"这一页是哪套力场"的最快方法。

| 构象 | AutoDock4 评分 kcal/mol | RMSD l.b. (Å) | RMSD u.b. (Å) |
| --- | --- | --- | --- |
| Mode 1 | -14.7133 | 0 | 0 |
| Mode 2 | -11.8242 | 1.1474 | 1.5922 |
| Mode 3 | -11.7852 | 4.9399 | 11.4034 |
| Mode 4 | -11.2658 | 3.9539 | 11.9977 |
| Mode 5 | -10.7951 | 1.723 | 2.6179 |
| Mode 6 | -9.972 | 1.9672 | 13.4634 |
| Mode 7 | -9.7896 | 2.9273 | 12.1557 |
| Mode 8 | -9.6593 | 2.5074 | 12.3973 |
| Mode 9 | -8.7951 | 2.73 | 12.8242 |

</DocNote>

<DocNote number={5} title="结果用途">

Docking score 仅供结构结合趋势参考，不能替代实验验证。自动准备后仍需人工核对结构，分数接近参考值也不能单独证明构象正确。

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic docking 教程（1IEP / imatinib、Box 设置、ad4 与 vina 两套期望结果，以及 exhaustiveness 的说明）。
2. RCSB PDB 条目 [1IEP](https://www.rcsb.org/structure/1IEP)（c-Abl 激酶结构域与伊马替尼复合物）。
3. 官方教程 *4.a Using AutoDock4 forcefield* 与 *4.b Using Vina forcefield*（两套力场分数不可比较的原始说明）。
4. 官方教程 *5. Expected results*（`-14.72` 与 `-13.23` 两个期望值及完整输出表）。
5. DockStart 界面：运行工作台的运行前检查、结果页的评分协议横幅与运行信息条（截图来源）。

</details>
