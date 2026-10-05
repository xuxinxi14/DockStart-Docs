---
title: "Multiple Ligands Docking — 5X72"
sidebar_position: 4
sidebar_label: "Multiple Ligands — 5X72"
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Multiple Ligands Docking — 5X72

让 5X72 的 P59、P69 在同一次搜索中对接。每个输出构象包含两个配体，得到一个联合评分；需要分别给配体排名时，请用 [批量筛选](./batch-docking.md)。

## 官方三维结构文件 {#official-structure-files}

<OfficialExampleFiles example="multiple"/>

## 案例设置

| 项目 | 内容 |
| --- | --- |
| 受体 | PDE，PDB 编号 [5X72](https://www.rcsb.org/structure/5X72) |
| 配体 | 5X72 里的两个抑制剂 **P59** 与 **P69**（立体异构体） |
| 搜索框中心 | `-15, 15, 129` |
| 搜索框尺寸 | `30 × 24 × 24 Å`（17,280 Å³） |
| 官方 Vina 期望值 | 最佳联合评分约 **-19.04 kcal/mol** |
| 本次实测 | **-21.09 kcal/mol**（37 秒） |

## 第 1 步：新建项目——两个配体要一次导入

![创建项目页：项目名 case4_multiple_5x72，受体 5x72_receptorH.pdb，配体结构里一次导入了 5x72_ligand_p59.sdf 与 5x72_ligand_p69.sdf 两个文件](../../../static/img/cases/multiple-ligands-docking-5x72/01-create-project.webp)

**图 1**　创建项目。

选择「全局对接」，填写名称与保存目录。受体选 `5x72_receptorH.pdb`，一次选入 P59、P69 两份 SDF，确认配体库中有两个成员。

## 第 2 步：结构审查——两项必须人工确认

![结构审查面板：不完整残基 A:29 已勾选同意忽略，替代构象 A:133 PHE 的下拉框选了 A，右下角是「确认并重新转换」按钮](../../../static/img/cases/multiple-ligands-docking-5x72/02-structure-review.webp)

**图 2**　结构审查：确认不完整残基与替代构象。

打开结构审查：先核对不完整残基 `A:29` 是否适合忽略，再为 `A:133 PHE` 选择替代构象。本案例沿用官方选择 `A`。

确认两项处理后，点击「确认并重新转换」。

## 第 3 步：确认 PDBQT 准备结果

![格式转换与 PDBQT 准备页：受体 PDBQT 已就绪、链 A、1479 原子；配体库批量配体 (2) 列出 P59 与 P69；底部显示 receptor PDBQT 自动准备完成](../../../static/img/cases/multiple-ligands-docking-5x72/03-prepare-pdbqt.webp)

**图 3**　格式转换与 PDBQT 准备。

确认受体显示「PDBQT 已就绪」，配体库中的 P59、P69 都已完成准备。复查配体的质子化、电荷与手性。

## 第 4 步：设定 Grid Box，并切到多配体模式

![运行工作台：顶部页签选中「多配体共同对接」（实验性），DOCKING BOX 17,280 Å³，中心 -15/15/129，尺寸 30/24/24](../../../static/img/cases/multiple-ligands-docking-5x72/04-set-grid-box.webp)

**图 4**　搜索范围 —— 注意顶部页签。

顶部切换到「多配体共同对接（实验性）」。中心填 `-15, 15, 129`，尺寸填 `30 × 24 × 24 Å`；保存前检查六个数值。

## 第 5 步：确认运行参数

![运行设置页：评分函数 Vina、搜索彻底程度 32；提示「共同对接的两个成员在下面板中选择」；说明 Box 与 Vina 参数会冻结到一个联合 run](../../../static/img/cases/multiple-ligands-docking-5x72/05-set-vina-parameters.webp)

**图 5**　共享输入、参数与输出。

保存以下共享参数。

| 参数 | 本次取值 | 说明 |
| --- | --- | --- |
| 评分函数 | `Vina` | 官方 4.b |
| 搜索彻底程度 | **`32`** | 官方要求 |
| 输出构象数量 | `9` | 官方输出 9 个 Mode |
| 能量范围 | `3` | Vina 默认 |
| CPU 线程 | `0` | 官方 `CPU: 0` |
| 随机种子 | 留空 | 每次随机 |

## 第 6 步：在共同对接面板里选成员、定顺序

![多配体共同对接面板：01 · 成员显示 2/2 已选 P59 与 P69；02 · 输入顺序列出成员 1 P59、成员 2 P69；03 · 共同运行条件显示受体、Box 30×24×24 与 exhaustiveness 32；右下角是「创建并开始共同对接」](../../../static/img/cases/multiple-ligands-docking-5x72/06-multi-ligand-panel.webp)

**图 6**　多配体共同对接面板。

勾选 P59 与 P69，成员计数应为 `2 / 2`。确认输入顺序为 `P59 → P69`，箱体为 `30 × 24 × 24 Å`，搜索彻底程度为 `32`。

点击「创建并开始共同对接」。

## 第 7 步：看结果——联合构象列表

![多配体共同结果页：运行标识 run_001、任务类型「双配体联合搜索」、耗时 37 秒；橙色横幅说明联合评分不可拆分并标出「成员顺序：P59 → P69」；联合构象列表 Mode 1 为 -21.09](../../../static/img/cases/multiple-ligands-docking-5x72/07-joint-results.webp)

**图 7**　结果 → 多配体共同结果。

确认任务类型为「双配体联合搜索」，成员顺序与创建时一致。点选联合构象，查看两个配体的位置。

截图的 Mode 1 联合评分为 **-21.09 kcal/mol**，官方参考约为 **-19.04 kcal/mol**。这项分数属于整个体系，不能拆成两个配体各自的评分。<NoteRef number={3}/>

## 第 8 步：看结果——联合评分表

![联合评分表：表头是「联合构象 / 联合评分 kcal/mol / RMSD l.b. / RMSD u.b.」，Mode 1 为 -21.09，共 9 个 Mode](../../../static/img/cases/multiple-ligands-docking-5x72/08-joint-scores.webp)

**图 8**　`scores.csv`。

查看「联合评分」表，并保存 `scores.csv` 与 `multi_ligand_report.md`。

| 联合构象 | 联合评分 kcal/mol | RMSD l.b. (Å) | RMSD u.b. (Å) |
| --- | --- | --- | --- |
| Mode 1 | **-21.09** | 0 | 0 |
| Mode 2 | -20.73 | 1.056 | 3.647 |
| Mode 3 | -20.49 | 1.393 | 3.178 |
| Mode 4 | -19.7 | 1.744 | 4.84 |
| Mode 5 | -19.14 | 1.387 | 3.351 |
| Mode 6 | -18.85 | 1.201 | 9.181 |
| Mode 7 | -18.67 | 1.198 | 3.585 |
| Mode 8 | -18.66 | 1.442 | 3.361 |
| Mode 9 | -18.55 | 1.858 | 9.024 |

## 继续阅读

- 上一个案例：[Batch Docking](./batch-docking.md)（同一套受体配体，换一种跑法）
- 再上一个：[Flexible Docking — 1FPU](./flexible-docking-1fpu.md)
- 第一个案例：[Basic Docking — 1IEP](./basic-docking-1iep.md)
- 三种任务类型的概念区分：[Batch / Multiple / Flexible 的区别](../../part-c/batch-multiple-flexible.md)
- 搜索盒的设定：[Box 与 Maps FAQ](../../part-c/faq-box-and-maps.md)
- 搜索彻底程度的影响：[Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- 结果怎么读：[如何正确解读结果](../../part-c/interpreting-results.md)

<DocNotes example="multiple">

<DocNote number={2} title="截图与运行记录">

截图来自项目 `case4_multiple_5x72` 的历史 `run_001`，耗时 37 秒，成员顺序 `P59 → P69`，未作为 v1.0.4 的新一轮验收。本机路径已遮盖。共同运行后界面选择可能清空，成员身份以运行记录为准。

</DocNote>

<DocNote number={3} title="结果对照与评分范围">

| 构象 | 本次 run_001 | 官方 Vina | 差值 |
| --- | --- | --- | --- |
| Mode 1 | **-21.09** | **-19.04** | **-2.05** |
| Mode 2 | -20.73 | -18.33 | -2.40 |
| Mode 3 | -20.49 | -17.27 | -3.22 |
| Mode 4 | -19.70 | -17.22 | -2.48 |
| Mode 5 | -19.14 | -16.45 | -2.69 |
| Mode 6 | -18.85 | -16.35 | -2.50 |
| Mode 7 | -18.67 | -16.24 | -2.43 |
| Mode 8 | -18.66 | -16.00 | -2.66 |
| Mode 9 | -18.55 | -15.29 | -3.26 |

本例尚未完成官方数值复现。输入准备、箱体、参数和随机搜索都可能影响结果，应逐项检查。CSV 的 `score_scope` 为 `joint_two_ligand_pose`；评分不与单配体、批量或不同成员组合直接比较。

Docking score 仅供结构结合趋势参考，不能替代实验验证。

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 [Multiple ligands docking 教程](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_multiple_ligands.rst)（5X72、两个立体异构体、Box、exhaustiveness 与两套期望结果）。
2. 官方示例目录 [`example/mulitple_ligands_docking`](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example/mulitple_ligands_docking)（注意官方目录名的拼写是 `mulitple`）。
3. 官方 solution 文件 `solution/5x72_ligand_vina_out.pdbqt`（本文 `-19.043` 的直接来源，从文件里的 `REMARK VINA RESULT` 读出）。
4. RCSB PDB 条目 [5X72](https://www.rcsb.org/structure/5X72)（PDE 与两个抑制剂的复合物）。
5. DockStart 界面：结构审查、配体库、多配体共同对接面板、联合结果页（截图来源）；以及项目记录 `runs/run_001/` 下的 `log.txt` 与 `scores.csv`。

</details>
