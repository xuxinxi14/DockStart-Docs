---
title: "Batch Docking"
sidebar_position: 3
sidebar_label: "Batch Docking"
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';
import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# Batch Docking

把 5X72 的 P59、P69 两个配体分别对接到同一个受体，再查看各自的最佳评分。先用两个配体熟悉批量流程。

## 官方三维结构文件 {#official-structure-files}

<OfficialExampleFiles example="batch"/>

## 案例设置

| 项目 | 内容 |
| --- | --- |
| 受体 | PDE（磷酸二酯酶），PDB 编号 [5X72](https://www.rcsb.org/structure/5X72) |
| 配体库 | 5X72 晶体结构里的两个抑制剂 **P59** 与 **P69** |
| 搜索框中心 | `-15, 15, 129` |
| 搜索框尺寸 | `30 × 24 × 24 Å`（体积 17,280 Å³） |
| 配体数 | 2 |
| 结果 | P69 **-11.280** ／ P59 **-10.720** |
| 总耗时 | 27 秒（每个配体 13 秒） |

## 第 1 步：导入受体与配体库

![结构获取与转换页：01 · RECEPTOR 显示 raw 已完成；02 · LIGAND 显示 raw 缺失、未记录，但 Vina 输入 PDBQT 已准备](../../../static/img/cases/batch-docking/01-import-structure.webp)

**图 1**　结构获取与转换。

![配体库面板：02 · LIGAND LIBRARY 批量配体 (2)，列出 P69 与 P59，各自 SDF → PDBQT · 24 重原子](../../../static/img/cases/batch-docking/02-ligand-library.webp)

**图 2**　配体库：`批量配体 (2)`。

创建全局对接项目，导入受体 `5x72_receptorH.pdb`，将 P59、P69 两份 SDF 一起加入配体库。确认「批量配体 (2)」中两个成员都在。

批量输入以配体库为准；单配体卡片显示 raw 未记录时，先检查库中的成员是否就绪。

## 第 2 步：确认 PDBQT 准备结果

![格式转换与 PDBQT 准备页：受体 5x72_receptorH.pdb 链 A 1479 原子并带 altloc 警告；配体 P69 重原子 24；右侧文件检查两项 ✓](../../../static/img/cases/batch-docking/03-prepare-pdbqt.webp)

**图 3**　格式转换与 PDBQT 准备。

完成受体与配体的 PDBQT 准备。若提示不完整残基或替代构象，先在结构审查中确认；本体系要核对 `A:29` 和 `A:133`，操作可参考 [5X72 结构审查](./multiple-ligands-docking-5x72.md)。

## 第 3 步：设定 Grid Box

![结构复核：DOCKING BOX 17,280 Å³ 范围可用，中心 -15/15/129、尺寸 30/24/24；右侧运行前检查里受体与配体结构审查两条维修](../../../static/img/cases/batch-docking/04-set-grid-box.webp)

**图 4**　结构复核：受体、配体与搜索范围。

中心填 `-15, 15, 129`，尺寸填 `30 × 24 × 24 Å`。在三维视图中确认箱体覆盖目标区域。

## 第 4 步：确认运行参数

![运行设置页：评分函数 Vina、搜索彻底程度 8、输出构象数量 9、能量范围 3、CPU 线程 0；可看到"其余配体在下方串行队列中管理"](../../../static/img/cases/batch-docking/05-set-vina-parameters.webp)

**图 5**　共享输入、参数与输出。

选择「串行批量筛选」，保存以下共享参数。

| 参数 | 本次取值 | 说明 |
| --- | --- | --- |
| 评分函数 | `Vina` | 也可选 AutoDock4（需先算 maps） |
| 搜索彻底程度 | **`8`** | Vina 默认值 |
| 输出构象数量 | `9` | 每个配体最多输出的构象数 |
| 能量范围 | `3` | kcal/mol |
| CPU 线程 | `0` | 0 = 由 Vina 自动 |
| 随机种子 | 留空 | 每次随机 |

## 第 5 步：检查配体队列与冻结协议

![配体队列与批量运行：总数 2 / 成功 2 / 待处理 0 / 失败 0；队列冻结协议显示 Box 中心 -15/15/129、尺寸 30×24×24、评分协议 Vina·exhaustiveness 8](../../../static/img/cases/batch-docking/06-ligand-queue.webp)

**图 6**　配体队列与批量运行（已完成）。

核对队列中的两个配体、对接箱体与实际执行参数，然后创建并开始队列。

**修改参数后需要新建队列**，已有队列继续使用创建时保存的设置。运行后检查总数、成功数与失败数；本例为总数 2、成功 2、失败 0。

## 第 6 步：看结果

![批量筛选结果页：结果 · BATCH SCREENING / 多配体批量筛选结果，总数 2 成功 2；下方列出结果文件](../../../static/img/cases/batch-docking/07-batch-results.webp)

**图 7**　结果页：多配体批量筛选结果。

![配体结果工作区：排名表 #1 P69 成功 -11.280 kcal/mol，#2 P59 成功 -10.720 kcal/mol](../../../static/img/cases/batch-docking/08-ligand-ranking.webp)

**图 8**　配体排名 —— 本节的主结果。

查看批次统计和配体排名。截图结果如下：

| 配体 | 状态 | 最佳评分（kcal/mol） |
| --- | --- | --- |
| P69 | 成功 | `-11.280` |
| P59 | 成功 | `-10.720` |

完整结果在 `screening/results/screening_summary.csv`，实验记录在 `screening_report.md`。分享排名时一并报告失败项；排名用于挑选后续检查的结构。<NoteRef number={3}/>

## 继续阅读

- 上一个案例：[Flexible Docking — 1FPU](./flexible-docking-1fpu.md)
- 下一个案例：[Multiple Ligands Docking — 5X72](./multiple-ligands-docking-5x72.md)（同一套受体配体、换一种跑法）
- 三种任务类型的概念区分：[Batch / Multiple / Flexible 的区别](../../part-c/batch-multiple-flexible.md)
- 搜索盒的设定：[Box 与 Maps FAQ](../../part-c/faq-box-and-maps.md)
- 搜索彻底程度的影响：[Exhaustiveness](../../part-a/search-and-parameters/exhaustiveness.md)
- 结果怎么读：[如何正确解读结果](../../part-c/interpreting-results.md)

<DocNotes example="batch">

<DocNote number={2} title="截图与输入来源">

截图来自已有批次 `screening_001`，项目为 `text3_Batch_docking`，总耗时 27 秒。本页未重新计算，也未作为 v1.0.4 的新一轮验收。本机路径已遮盖。历史队列执行 CPU 为 `1`，通用参数页显示 `0`；实际运行以队列冻结记录为准。

</DocNote>

<DocNote number={3} title="批量与共同对接">

本例让 P59、P69 分别运行，搜索彻底程度为 `8`；[共同对接案例](./multiple-ligands-docking-5x72.md)使用 `32`，并对两个配体一起评分。两类分数不能互相比较或相加来代替联合评分。失败表示本次运行未完成，不能据此判断配体不能结合。

Docking score 仅供结构结合趋势参考，不能替代实验验证。

</DocNote>

<DocNote number={4} title="准备与队列补充">

5X72 的 `A:29` 有不完整侧链，`A:133` 有 A/B 替代构象；应在审查后决定处理方式。历史案例的首次受体准备曾因 `A:29` 模板匹配失败，确认后重试成功。

队列会记录受体、箱体、评分协议、参数和输入快照。历史界面限制包括配体数 500、每个配体 16 MB、箱体单边 126 Å、搜索彻底程度 128、输出构象数量 50、CPU 64；以实际版本的校验提示为准。

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方教程 [Docking in batch mode](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_in_batch.rst)（`--batch` / `--dir` 的用法，以及"不要和多配体共同对接混淆"的原始说明）。
2. AutoDock Vina 官方 [`example/` 目录](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example)（8 个目录中 6 个是对接案例、2 个是脚本示例，**其中没有 batch 的示例数据**）。
3. RCSB PDB 条目 [5X72](https://www.rcsb.org/structure/5X72)（PDE 与两个抑制剂的复合物，配体即本文的 P59 / P69）。
4. 官方教程 [Multiple ligands docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_multiple_ligands.rst)（E 节的官方来源；其受体与配体与本节完全相同）。
5. DockStart 界面：结构获取与转换、配体库、运行工作台批量面板、结果页（截图来源）。

</details>
