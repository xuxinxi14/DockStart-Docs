---
title: "Flexible Docking — 1FPU"
sidebar_position: 2
sidebar_label: "Flexible Docking — 1FPU"
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Flexible Docking — 1FPU

将伊马替尼对接到 1FPU，并让受体的 Thr315 侧链参与搜索。与基础案例相比，本例多了柔性残基的选择、审查和启用。

## 官方三维结构文件 {#official-structure-files}

<OfficialExampleFiles example="flexible"/>

## 案例设置

| 项目 | 内容 |
| --- | --- |
| 受体 | c-Abl 激酶结构域，PDB 编号 [1FPU](https://www.rcsb.org/structure/1FPU) |
| 配体 | **仍然是伊马替尼**，直接复用 B 节的 `1iep_ligand.pdbqt` |
| 柔性残基 | `A:315`（Thr315），只设这一个 |
| 搜索框中心 | `15.190, 53.903, 16.917`（与 B 节完全相同） |
| 搜索框尺寸 | `20 × 20 × 20 Å`（与 B 节官方值相同） |
| 官方 Vina 期望值 | 最佳构象约 **-11.63 kcal/mol** |

## 第 1 步：准备结构

![格式转换与 PDBQT 准备页：受体 1fpu_receptorH.pdb 已就绪，链 A，2427 原子；配体已就绪并带橙色关键警告](../../../static/img/cases/flexible-docking-1fpu/01-prepare-structure.webp)

**图 1**　格式转换与 PDBQT 准备。

导入受体 `1fpu_receptorH.pdb` 与配体 `1iep_ligand.pdbqt`。完成受体准备，确认两项 PDBQT 文件检查都通过。

## 第 2 步：把受体切成「有限柔性」

![受体柔性设置：两个页签「刚性受体」与「有限柔性」，已选中有迎柔性；右上角协议徽标仍显示「刚性受体」](../../../static/img/cases/flexible-docking-1fpu/02-flexibility-setting.webp)

**图 2**　受体柔性设置。

在「受体柔性设置」中选择「有限柔性」。切换页签后还需准备并启用，才能改变项目实际使用的协议。

## 第 3 步：指定柔性残基 A:315，并处理「坏残基」

![柔性残基输入框填入 A:315，下方弹出橙色警告：Meeko 将删除 27 个无法匹配模板的残基，需要勾选确认](../../../static/img/cases/flexible-docking-1fpu/03-flexible-residue-warning.webp)

**图 3**　填入柔性残基后，严格准备被拦住。

柔性残基填 `A:315`，点击「准备并启用」。

若出现无法匹配模板的残基，先打开完整清单，确认删除是否影响目标位点。确认适用后勾选同意，再次点击「准备并启用」；不能确定时先修复受体。

## 第 4 步：确认柔性已经生效

![受体柔性设置：右上角协议徽标已变为「柔性模式」，已验证柔性受体 flex_006，使用柔性成为主按钮](../../../static/img/cases/flexible-docking-1fpu/04-flexibility-activated.webp)

**图 4**　柔性受体已激活。

确认协议徽标变为「柔性模式」，柔性残基仍为 `A:315`，且「使用柔性」已启用。准备记录编号可与截图不同。<NoteRef number={2}/>

## 第 5 步：检查 Grid Box

![运行工作台：DOCKING BOX 体积 8,000 Å³，中心 15.19/53.903/16.917，尺寸 20/20/20，右侧运行前检查两条维修](../../../static/img/cases/flexible-docking-1fpu/05-set-grid-box.webp)

**图 5**　搜索范围与运行前检查。

中心填 `15.190, 53.903, 16.917`，尺寸填 `20 × 20 × 20 Å`。在三维视图中检查对接箱体的位置。

## 第 6 步：确认运行参数

![运行设置页：评分函数 Vina，搜索彻底程度 32，输出构象数量 9，能量范围 3，CPU 线程 0](../../../static/img/cases/flexible-docking-1fpu/06-set-vina-parameters.webp)

**图 6**　输入、参数与输出。

填写以下参数，保存并重新检查，然后开始对接。

| 参数 | 本次取值 | 说明 |
| --- | --- | --- |
| 评分函数 | `Vina` | 官方 4.b 用的就是这个 |
| 搜索彻底程度 | **`32`** | 官方明确要求，**不是默认的 8** |
| 输出构象数量 | `9` | 最多输出的构象数 |
| 能量范围 | `3` | Vina 默认 |
| CPU 线程 | `0` | 官方 `CPU: 0` |
| 随机种子 | 留空 | 重复对照时使用相同整数 |

命令行重跑时必须同时提供 `--flex` 侧链文件；单用导出的配置会遗漏它。<NoteRef number={4}/>

## 第 7 步：运行完成

![运行设置页底部：完整流程已完成，run_003 · 35 秒，AutoDock Vina 运行完成](../../../static/img/cases/flexible-docking-1fpu/07-run-completed.webp)

**图 7**　运行完成的状态条。

看到「完整流程已完成」后，记下本次运行编号，再打开对应结果。截图的运行编号为 `run_003`。

## 第 8 步：看结果——构象列表

![结果页：运行标识 run_003，耗时 35 秒，构象列表 Mode 1 为 -11.62，右侧所选构象 -11.62 kcal/mol](../../../static/img/cases/flexible-docking-1fpu/08-result-poses.webp)

**图 8**　结果 → 查看运行结果，`run_003`（**柔性 Vina**）。

点选构象检查配体与柔性侧链的位置。截图的 Mode 1 为 **-11.62 kcal/mol**，官方参考约为 **-11.63 kcal/mol**。<NoteRef number={3}/>

截图中 SDF 尚未导出；需要查看构象时，先在结果页导出。

## 第 9 步：看结果——评分表

![结果页评分标签：scores.csv 表格，表头为「对接评分」，Mode 1 为 -11.62](../../../static/img/cases/flexible-docking-1fpu/09-result-scores.webp)

**图 9**　「评分」（`scores.csv`）标签页。

在「评分」标签查看数值，在「运行日志与文件」查看原始输出。

| 构象 | 对接评分 kcal/mol | RMSD l.b. (Å) | RMSD u.b. (Å) |
| --- | --- | --- | --- |
| Mode 1 | -11.62 | 0 | 0 |
| Mode 2 | -10.56 | 3.197 | 12.1 |
| Mode 3 | -10.4 | 3.95 | 11.86 |
| Mode 4 | -10.13 | 1.447 | 2.123 |
| Mode 5 | -9.926 | 2.609 | 12.26 |
| Mode 6 | -9.872 | 3.832 | 12.01 |
| Mode 7 | -9.838 | 3.749 | 11.87 |
| Mode 8 | -9.291 | 2.572 | 12.78 |
| Mode 9 | -8.852 | 1.571 | 2.385 |

RMSD 两列相对本次 Mode 1；与共晶配体比较需另做姿势验证。

## 继续阅读

- 上一个案例：[Basic Docking — 1IEP](./basic-docking-1iep.md)
- 柔性与刚性的基础概念：[刚性受体与柔性配体](../../part-a/docking-components/rigid-and-flexible.md)
- 搜索彻底程度的影响：[Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- 搜索范围的设定：[Box 与 Maps FAQ](../../part-c/faq-box-and-maps.md)
- 结果怎么读：[如何正确解读结果](../../part-c/interpreting-results.md)
- 同一条流程的 AD4 maps 分支：[AutoDock4 Maps 工作流](./autodock4-maps-workflow.md)

<DocNotes example="flexible">

<DocNote number={2} title="截图与准备记录">

截图来自已有项目 `test2_Flexible_Docking`，未作为 v1.0.4 的新一轮验收。图中出现 `flex_002`、`flex_006`；历史 `run_003` 绑定 `flex_004`。记录中的柔性残基均为 `A:315`，忽略清单含 27 个残基。复现时以自己的运行绑定记录为准，本机路径无需与截图一致。

</DocNote>

<DocNote number={3} title="历史评分对照">

| 构象 | 本次 run_003 | 官方 Vina | 差值 |
| --- | --- | --- | --- |
| Mode 1 | **-11.62** | **-11.63** | **+0.01** |
| Mode 2 | -10.56 | -10.57 | +0.01 |
| Mode 3 | -10.4 | -10.3 | -0.10 |
| Mode 4 | -10.13 | -9.906 | -0.224 |
| Mode 5 | -9.926 | -9.895 | -0.031 |
| Mode 6 | -9.872 | -9.854 | -0.018 |
| Mode 7 | -9.838 | -8.849 | -0.989 |
| Mode 8 | -9.291 | -8.758 | -0.533 |
| Mode 9 | -8.852 | -8.543 | -0.309 |

此前 `run_001` 的最佳分数为 `-11.66`；`run_003` 为 `-11.62`。分数接近只能作为流程对照，不能据此声称构象完全复现。历史 `run_002` 的日志有 `-11.64`，但未生成评分 CSV 与报告。

</DocNote>

<DocNote number={4} title="柔性协议与命令行复现">

历史案例通过命令行 `--flex` 传入柔性侧链，导出的 `configs/vina_config.txt` 未包含该项。核对本次运行的完整命令与日志中的 `Flex receptor:`，或直接在 DockStart 中重跑。刚性受体、柔性侧链和配体三份文件应同时保留。

最多选择 8 个柔性残基。本例只使用 Thr315；增加柔性残基需要结构依据，可能增加搜索时间。AD4 与 Vina/Vinardo 分数不直接比较。

</DocNote>

<DocNote number={5} title="结果用途">

Docking score 仅供结构结合趋势参考，不能替代实验验证。

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Flexible docking 教程（1FPU / Thr315、`-f A:315`、`-a`、Box 设置与两套期望结果）。
2. RCSB PDB 条目 [1FPU](https://www.rcsb.org/structure/1FPU)（c-Abl 激酶结构域）。
3. 官方教程 *1. Preparing the flexible receptor*（`mk_prepare_receptor.py ... -f A:315 -a` 的原始用法与 `-a` 的含义）。
4. 官方教程 *5. Results*（`-14.2` 与 `-11.63` 两个期望值及完整输出表）。
5. DockStart 界面：受体柔性设置、严格模式坏残基审查、运行前检查、结果页（截图来源）。

</details>
