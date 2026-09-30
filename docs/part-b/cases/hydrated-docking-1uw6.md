---
title: "Hydrated Docking — 1UW6"
sidebar_position: 6
sidebar_label: "G. Hydrated Docking — 1UW6"
---

# Hydrated Docking — 1UW6

## 简单概括

水合对接为配体加入候选水，并结合水分子 affinity map 判断哪些水保留、哪些被置换。本节以 1UW6 与尼古丁演示水合 AD4 流程，实测 Mode 1 为 `-7.493`，官方参考为 `-8.261`；后文用交叉对照分析这项差异。

---

## 这一节在讲什么：水不是背景

前面的基础案例没有专门处理可置换水。本节把这一部分单独纳入协议。

真实的生理环境不是这样。蛋白被水包围，配体要结合上去，必须**挤开**占据口袋的大部分水。但很少有口袋的水被完全挤干净——总有一些水结合得非常牢，在不同蛋白之间高度保守，**从对接的角度看，它们更像是受体的一部分**。

官方对这个方法的描述（三步）：

```text
① 给配体挂上一组水分子（用伪原子表示），它们是否参与相互作用由后续判断
② 用一张改造过的 AutoGrid map：水放对位置就给有利分数，
   水如果和受体重叠就把这个水去掉
③ 分析对接结果，只用「保留下来的水」重新评分
```

| 项目 | 内容 |
| --- | --- |
| 受体 | 乙酰胆碱结合蛋白（AChBP），PDB `1UW6`，官方文件 `1uw6_receptorH.pdb` |
| 配体 | **尼古丁**（fragment 级小分子），官方文件 `1uw6_ligand.sdf` |
| 加了几个候选水 | **2 个** |
| 搜索框中心 | `83.640, 69.684, -10.124` |
| 搜索框尺寸 | **`15 × 15 × 15 Å`** ← 注意是 15，不是 20 |
| 搜索彻底程度 | `32` |
| 官方 Vina 期望值 | 最佳构象 **-8.261 kcal/mol** |
| 本次实测 | **-7.493 kcal/mol**（2 秒） |

> 官方教程指出，水分子的处理会明显影响预测表现；对于其测试的 fragment 级配体，水合协议整体改善了 RMSD。适用范围仍应按这项协议的验证条件判断。

---

## 官方协议的适用条件

进入操作前，先核对这三项条件。它们决定了本例的输入与结果怎样使用。

### 约束一：只能用 AutoDock4 力场

官方对这个协议的原文警告是：

```text
While this method was calibrated and validated with the AutoDock4 forcefield,
we strongly advice you against using this protocol with the Vina and Vinardo
forcefield.
```

**也就是说：水合对接 + Vina 力场 = 官方明确不建议。** 这条方法就是用 AD4 力场校准和验证出来的，换力场等于脱离了它的验证范围。

### 约束二：不适用于虚拟筛选

```text
the method is not suitable for virtual screenings
```

原因是这个实现下**能量估计需要归一化**，不归一化就无法在"差别很大的配体"之间比较分值。但官方同时说明：**这不影响结构准确性，同一个 run 内部的构象之间比较是没问题的。**

### 约束三：它是独立协议，不是"运行工作台里的一个选项"

先准备普通工作流中的输入，再进入水合向导。下一节会说明它们怎样衔接。

---

## 官方每一步 → DockStart 怎么对应

| # | 官方 | DockStart 里怎么做 |
| --- | --- | --- |
| 1 | `mk_prepare_receptor.py -i 1uw6_receptorH.pdb -p -g --box_center ... --box_size 15 15 15` | 「结构获取与转换」转受体 PDBQT + 「运行工作台」设搜索范围 |
| 2 | `scrub.py 1uw6_ligand.sdf` 加氢（pH 7.4） | **DockStart 不做 pH 质子化**，见后面的对照 |
| 3 | `mk_prepare_ligand.py -i ...H.sdf -w` 挂 **2 个**水 | 水合向导第 ① 步「准备水合配体」 |
| 4 | `autogrid4 -p ...gpf` | 水合向导第 ② 步的一部分 |
| 5 | `mapwater.py` 生成 `W` map | 水合向导第 ② 步的第二部分（DockStart 内置实现） |
| 6 | `vina --maps ... --scoring ad4 --exhaustiveness 32` | 水合向导第 ④ 步 |
| 7 | `dry.py` 分类 STRONG / WEAK / DISPLC | 结果页「水分子后处理 / 逐构象水分子统计」 |

**注意第 4、5 步在 DockStart 里是同一步。** 界面上的「生成并校验 maps」会先生成基础 affinity maps，再由 DockStart 自己的实现派生 `receptor.W.map`。

---

## 水合流程穿插在普通工作流的哪里

DockStart 的普通工作流负责准备输入，水合向导接着完成专用协议。两者按下面的顺序衔接：

```text
【普通工作流 · 左侧导航】
 ① 项目             新建项目、导入结构
 ② 结构获取与转换    受体 PDB  -> PDBQT      ┐
 ③ 结构获取与转换    配体 SDF  -> PDBQT      │ 铺路：给水合向导供货
 ④ 运行工作台        搜索范围 15/15/15 + 参数 ┘
──────────────────────────────────────────────
【水合向导 · 左侧导航「水合 AD4」】
 ⑤ ① 准备水合配体              <- 挂 2 个候选水
 ⑥ ② 生成水合 AD4 maps         <- 用 ②③ 的受体 + ④ 的 Box
 ⑦ ③ 运行前检查
 ⑧ ④ 创建并执行 run            <- 评分函数强制 ad4
 ⑨ ⑤ 读取水合结果              <- 水分子分类
──────────────────────────────────────────────
【收尾 · 左侧导航】
 ⑩ 结果 / 报告
```

**四条依赖决定了这个顺序：**

| 依赖 | 为什么 |
| --- | --- |
| 受体 PDBQT 必须在 ⑥ 之前 | 生成 maps 的第一件事就是读项目里的刚性受体 PDBQT |
| **标准配体** PDBQT 必须在 ④ 之前 | 「运行工作台」要求受体与配体**都**就绪才放行，缺一个会被弹回结构转换页 |
| Box 必须在 ⑥ 之前 | maps 是用项目 Box 算出来的网格 |
| 参数必须在 ⑧ 之前 | 水合 run 创建时**冻结**项目参数，建完就改不动 |

**两个必须知道的细节：**

1. **左侧导航里没有「设置搜索范围」这一项。** 导航只有「项目 / 结构获取与转换 / 运行工作台 / 结果 / 水合 AD4」加「设置」。搜索范围是**运行工作台**里面的一个卡片。

2. **普通工作流的「运行对接」这一步在本节是跳过的。** 你**不需要**在运行工作台里跑一遍 Vina；只要把受体配体转好、Box 和参数设好就够了。**而且最好不要跑**——水合向导第 ③ 步有一道活动运行守卫，如果项目里留着一个未完成的 run，这一步会被直接挡回来。

---

## 第 1 步：准备受体和配体 PDBQT

![格式转换与 PDBQT 准备：受体卡片显示 PDBQT 已就绪、链 ID A/B、总原子数 4069；配体卡片显示 PDBQT 已就绪、重原子数 12；右侧文件检查两项都是绿勾](../../../static/img/cases/hydrated-docking-1uw6/01-preparation-ready.webp)

**图 1**　准备完成的状态。

红框圈出的两处：**受体卡片**和**配体卡片**。

```text
受体   1uw6_receptorH.pdb  ->  PDBQT 已就绪  329,589 B  链 ID A, B  总原子数 4069
配体   1uw6_ligand.sdf     ->  PDBQT 已就绪    1,159 B  重原子数 12
```

右侧「文件检查」两项都是绿勾（受体 PDBQT ✓、配体 PDBQT ✓），**这是「运行工作台」的入场券**。

> **为什么标准配体也要做？** 水合计算本身**不用**这份标准配体 PDBQT——真正参与对接的是水合向导第 ① 步生成的那份。但「运行工作台」的门禁要求 `受体 && 配体` 都存在，缺一个就进不去，也就设不了 Box。它纯粹是入场券。

> 顺带说明：这份标准配体只有 **12 个重原子**（`A=5 C=5 NA=2`），**不含氢**——因为官方那份 SDF 本身就没有氢。加氢是水合向导第 ① 步的事。

---

## 第 2 步：设置搜索范围

![运行工作台：DOCKING BOX 显示 3,375 Å³、范围可用；中心 83.64/69.684/-10.124，尺寸 15/15/15；右侧运行前检查列出受体 4069 原子、配体 12 原子、箱体与搜索参数均有效](../../../static/img/cases/hydrated-docking-1uw6/02-run-workbench-box.webp)

**图 2**　搜索范围与运行前检查。

红框圈出的两处：

**① DOCKING BOX `3,375 Å³`，标记「范围可用」。** 3,375 = 15³。

**② 六个数值。**

```text
中心 X  83.64        尺寸 X  15
中心 Y  69.684       尺寸 Y  15
中心 Z  -10.124      尺寸 Z  15
```

右侧「运行前检查」里值得注意的几行：

```text
受体 PDBQT    已读取 4069 个原子。atom types: A, C, HD, N, NA, OA, SA
配体 PDBQT    已读取 12 个原子。atom types: A, C, NA
对接箱体      中心、尺寸和体积有效
搜索参数      Vina 参数格式有效
```

> **⚠️ 尺寸一定是 15，不是 20。** 官方 GPF 里写的是 `npts 40 40 40`，而 `40 × 0.375 = 15`——两个数字互相印证。旧的尝试用过 20，那是错的。

---

## 第 3 步：设置 Vina 参数

![运行设置页：受体 PDBQT prepared/receptor.pdbqt 4069 原子；配体 PDBQT prepared/ligand.pdbqt 12 原子、活性扭转 1；评分协议 Vina、搜索彻底程度 32、输出构象数量 9、能量范围 3、CPU 线程 0](../../../static/img/cases/hydrated-docking-1uw6/03-vina-parameters.webp)

**图 3**　输入、参数与输出。

红框圈出的两处：

**① 受体与配体的准备结果。**

```text
受体 PDBQT   prepared/receptor.pdbqt   4,069 原子 · 链 A, B
配体 PDBQT   prepared/ligand.pdbqt        12 原子 · PDBQT 活性扭转 1
```

**② 六个全局对接参数：**

| 参数 | 本次取值 |
| --- | --- |
| 评分协议 | `Vina` ← **不用改，见下面说明** |
| 搜索彻底程度 | **`32`** ← 必须手动改成 32，项目默认是 8 |
| 输出构象数量 | `9` |
| 能量范围 | `3` |
| CPU 线程 | `0` |
| 随机种子 | 留空 |

**⚠️ 评分协议不用手动改成 AutoDock4。** 水合协议会**强制**把它设成 `ad4`——源码里冻结参数时写的是：

```text
{ ...项目当前参数, "scoring": "ad4" }
```

也就是先铺开项目参数，再把评分函数覆盖掉。所以界面上显示 `Vina` 是正常的，水合 run 实际执行的是 `--scoring ad4`。

**但「搜索彻底程度」必须改。** 这一项**不受强制**，是原样取自项目参数的，而官方明确用了 32。

---

## 第 4 步：进入水合向导

![水合 AutoDock4 对接页：顶部是实验协议横幅「不用于虚拟筛选，也不支持跨配体直接比较分值」；状态概览显示原始配体 ligand_1uw6_ligand.sdf、水合位点待准备、Maps 未生成；下方是 01–03 步，右侧流程门禁与当前绑定](../../../static/img/cases/hydrated-docking-1uw6/04-hydrated-wizard-start.webp)

**图 4**　水合向导的起始状态。

红框圈出的四处：

**① 协议横幅。** 这一段就是本节三项限制的界面版：

```text
实验性水合 AD4 协议   |  单配体  |  刚性受体  |  全局对接  |  AD4 maps
不用于虚拟筛选，也不支持跨配体直接比较分值。        处理后评分未计算。
```

**② 状态概览。** 四张卡片把"当前协议输入"一次说清：

```text
原始配体   ligand_1uw6_ligand.sdf (SDF / MOL)
水合位点   —  （准备后记录的 W 原子）
Maps       未生成（等待生成）
当前 run   未创建（等待运行前检查）
```

**③ 第 01 步「准备水合配体」。** 这一步会**从当前配体的 SDF 或 MOL 生成一份独立的水合 PDBQT**——注意界面原话「已有记录仍可重新准备；新的有效记录会成为当前水合输入」，**它不会覆盖你的标准配体**。同一个项目里可以同时有"标准配体"和"水合配体"两套。

**④ 右侧「当前绑定」。** 这一栏是排查的依据：

```text
受体       prepared/receptor.pdbqt
原始配体   raw/ligand_1uw6_ligand.sdf
Box 中心   83.64, 69.684, -10.124
Box 尺寸   15 × 15 × 15 Å
```

**如果这里显示「受体：未准备」，那生成 maps 一定会失败**——见后面「关于本篇截图」里的说明。

---

## 第 5 步：走完向导的 ①②③

![水合向导五步状态：01 准备水合配体「已就绪」（记录 …/hydrated_ligand_001/manifest.json，水位点 2）；02 生成水合 AD4 maps「已就绪」（Map set hydrated_001）；03 运行前检查「检查通过」（下一 run run_001，Vina 已校验）；04 创建并执行 run「可以创建」；05 读取水合结果「等待运行完成」](../../../static/img/cases/hydrated-docking-1uw6/05-hydrated-wizard-steps.webp)

**图 5**　前三步就绪后，核对向导中的输入、maps 与预检查状态。

红框圈出的三处：

**① 第 01 步「已就绪」。**

```text
记录     protocols/hydrated/ligand_preparations/hydrated_ligand_001/manifest.json
水位点   2
```

**「水位点 2」和官方完全一致**——官方原文写着 "In total, **2 water molecules** were added to the fragment."

**② 第 02 步「已就绪」。**

```text
Map set    hydrated_001
Manifest   maps/hydrated_001/hydrated_manifest.json
```

这一步 = 官方的 `autogrid4` + `mapwater.py` 两步合一。生成出来的 GPF 是：

```text
npts 40 40 40
gridfld receptor.maps.fld
spacing 0.375
receptor_types A C HD N NA OA SA
ligand_types A C HD NA OA
receptor inputs/receptor.pdbqt
gridcenter 83.64 69.684 -10.124
smooth 0.500
...
elecmap receptor.e.map
dsolvmap receptor.d.map
dielectric -42.000
```

**`npts 40 40 40`、`gridcenter 83.64 69.684 -10.124`、`spacing 0.375`、`smooth 0.500`、`dielectric -42.000` —— 与官方 GPF 逐项相同。**

**③ 第 03 步「检查通过」。** 下一 run 是 `run_001`，Vina「已校验」。

> 第 03 步是**只读**的——界面原话「核对水合配体、maps、Vina 1.2.x 能力、项目参数和活动运行守卫」，**不会启动 Vina**。

---

## 第 6 步：创建并执行 run

![执行 AutoDock Vina 页：步骤条 1 生成运行配置「已通过」、2 创建运行记录「已通过」、3 开始对接「当前步骤」、4 解析结果、5 结果分析报告；运行记录 run_001，状态「可进行」，exit code 尚未产生](../../../static/img/cases/hydrated-docking-1uw6/06-run-execute-ready.webp)

**图 6**　执行页，run 已创建但还没跑。

红框圈出的两处：

**① 五步执行条。**

```text
1 生成运行配置（configs/vina_config.txt） 已通过
2 创建运行记录（保存命令预览与配置快照） 已通过
3 开始对接（保存 stdout / stderr / log / out.pdbqt） 当前步骤
4 解析结果（从 log.txt 生成 scores.csv）
5 结果分析报告（生成 Markdown 分析记录）
```

**② 运行记录 `run_001`，状态「可进行」。**

这一步实际执行的命令是：

```text
AutoDock Vina  --maps <AutoGrid4 生成的 maps>  --scoring ad4
```

**它不传 `--receptor`**——受体信息已经全部烘进 maps 里了。这也是为什么必须先生成 maps 才能建这个 run。

![执行完成：运行记录 run_001，当前状态「已完成」，exit code 0；执行结果「实验性水合 AD4 对接完成。」；下一步提示「解析结果并生成 scores.csv」，右侧运行状态 exit code 0](../../../static/img/cases/hydrated-docking-1uw6/07-run-execute-finished.webp)

**图 7**　执行完成。

红框圈出的两处：**① 状态「已完成」**、**② `exit code 0`**。

底部提示「实验性水合 AD4 对接完成。」，并且出现「查看全局对接结果」按钮。

**本次耗时 2 秒。** 对 AD4 maps 预计算 + 只有 1 个活性扭转的 fragment 配体来说，这个速度是合理的——注意别和 F 节大环那次 102 秒混起来比较，两者配体大小和扭转数差得很远。

---

## 第 7 步：读水分子后处理

![结果页水分子后处理：原始候选水 18、保留水 9、强水 8、弱水 1、置换水 9；下方表格逐 Mode 列出 Raw AD4 affinity 与保留/强/弱/置换水数量，Mode 1 为 -7.493](../../../static/img/cases/hydrated-docking-1uw6/08-water-postprocessing.webp)

**图 8**　水分子后处理：查看每个构象的水分类与处理状态。

红框圈出的三处：

**① 标题与说明。**

```text
水分子后处理 / 逐构象水分子统计
Raw AD4 affinity 保持不变；强、弱、置换与保留水仅用于本次 run 的结构解释。
```

注意**「处理后评分未计算」**这个标记。这是水合协议的一贯态度：**水分子分类用来解释结构，不用来改分数。**

**② 五个计数。**

```text
原始候选水  18
保留水       9
强水         8
弱水         1
置换水       9
```

**9 + 9 = 18**，正好把候选水分成"留下"和"被置换"两堆。

**③ 逐构象表格。** 每个 Mode 一行，列出该构象的 `Raw AD4 affinity` 与它的保留 / 强 / 弱 / 置换水数量。

---

## 第 8 步：看结果

![结果页构象列表：Mode 1 到 Mode 9，Raw AD4 affinity 从 -7.493 到 -6.791；右侧显示所选构象 Mode 1 = -7.493 kcal/mol，输出文件 log.txt 已生成、scores.csv 与 hydrated_docking_report.md 未生成、poses.sdf 未导出](../../../static/img/cases/hydrated-docking-1uw6/09-result-poses.webp)

**图 9**　构象列表。

红框圈出的三处：

**① 构象列表（按评分排序）。**

| 排名 | 构象 | Raw AD4 affinity | RMSD l.b. | RMSD u.b. |
| --- | --- | --- | --- | --- |
| 1 | **Mode 1** | **-7.493** | 0 | 0 |
| 2 | Mode 2 | -7.411 | 1.525 | 1.996 |
| 3 | Mode 3 | -7.289 | 2.348 | 3.111 |
| 4 | Mode 4 | -7.263 | 1.828 | 2.386 |
| 5 | Mode 5 | -6.997 | 3.401 | 5.792 |
| 6 | Mode 6 | -6.986 | 2.629 | 3.529 |
| 7 | Mode 7 | -6.948 | 2.884 | 5.442 |
| 8 | Mode 8 | -6.898 | 2.984 | 3.977 |
| 9 | Mode 9 | -6.791 | 1.971 | 2.49 |

**② 所选构象：`Mode 1`，`-7.493 kcal/mol`。**

**③ 输出文件。** `log.txt` 已生成；`scores.csv`、`hydrated_docking_report.md` **未生成**（要回上一步点「生成结果分析」）；`poses.sdf` 未导出。

> 列表底部还有一行提醒值得注意：**「RMSD 相对于基于 Mode 1 的构象，仅用于本次输出内比较。」** 这对应官方的"不适用于虚拟筛选"——**分值只在同一次 run 内部可比。**

![结果页评分表：Mode 1 到 Mode 9 的 Raw AD4 affinity、RMSD l.b. 与 RMSD u.b.；右上有「生成结果分析」按钮；底部结果状态说明「已按完整冻结溯源合同读取 raw AD4 affinity 与逐构象水分子分类；未计算处理后 affinity。」](../../../static/img/cases/hydrated-docking-1uw6/10-result-scores.webp)

**图 10**　评分表视图。

同一批数字的表格版。底部那行状态说明再次强调了本节的评分边界：

```text
已按完整冻结溯源合同读取 raw AD4 affinity 与逐构象水分子分类；
未计算处理后 affinity。
```

---

## 结果合理吗？与官方对照

这次记录中，使用官方 maps 与官方配体得到 `-8.261`；使用 DockStart 准备的输入得到 `-7.493`。下面在固定条件下交叉替换 maps 与配体，检查 `0.768 kcal/mol` 的差异怎样产生。

### 先把两个数放在一起

| | Mode 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **官方** | **-8.261** | -7.673 | -7.489 | -7.225 | -7.211 | -7.065 | -6.978 | -6.968 | -6.931 |
| **本次** | **-7.493** | -7.411 | -7.289 | -7.263 | -6.997 | -6.986 | -6.948 | -6.898 | -6.791 |

官方原文对这个案例的说明是 "The predicted free energy of binding should be about **-8 kcal/mol** for poses that are similar to the crystallographic pose."

**差 0.768 kcal/mol。**

### 四个交叉实验

为了定位差异，我把"用谁的 maps"和"用谁的配体"这两个变量交叉开，各跑一次同样的命令（`--scoring ad4 --exhaustiveness 32`）：

| # | maps | 配体 | Mode 1 |
| --- | --- | --- | --- |
| **A** | 官方 | 官方 | **-8.261** |
| B | 官方 | DockStart | -7.321 |
| **C** | 本机 | DockStart | **-7.493** ← 本次实测 |
| D | 本机（补 `N` 图） | 官方 | -7.623 |

**A 与官方参考逐位相同（-8.261）。** 这说明：Vina 版本、AD4 maps 的读取、搜索参数、评分函数——**全都没有问题**。差异只可能来自准备出来的文件本身。

### 差异一（主因）：配体的质子化状态

把两份配体 PDBQT 摊开看：

```text
本机   REMARK SMILES CN1CCC[C@H]1c1cccnc1
官方   REMARK SMILES C[N@@H+]1CCC[C@H]1c1cccnc1
```

| | DockStart | 官方 |
| --- | --- | --- |
| 吡咯烷氮 | **中性（`NA`）** | **质子化（`N` + 一个 `HD`）** |
| 原子类型 | `NA:2 C:5 A:5 W:2` | `C:5 N:1 A:5 NA:1 W:2 HD:1` |
| 电荷总和 | **0.001（中性）** | **1.001（+1）** |
| `TORSDOF` | **1** | **2** |

**原因在准备方式上：**

```text
官方     scrub.py 1uw6_ligand.sdf -o 1uw6_ligandH.sdf     ← 按 pH 7.4 质子化
本机     Chem.AddHs(molecule, addCoords=True)             ← 纯补氢，不改质子化状态
```

尼古丁的吡咯烷氮 pKa 约 8.0，在 pH 7.4 下**大部分是质子化的**。所以官方的 `+1` 形态更接近生理条件，而 DockStart 保留了输入 SDF 的中性形态。

**同一个官方 maps 下只换配体（A→B）：-8.261 → -7.321，差 0.940 kcal/mol。** 这是主因。

> **官方教程自己就警告过这件事**，原文：
> *"Please don't forget to always check the protonation state of your molecules before docking. Your success can sometimes hang by just an hydrogen atom. ;-)"*
> 一个氢原子就能决定成败——这一节正是这句话的实例。

### 差异二（次因）：受体里一个二硫键的分型

把两份受体 PDBQT 对比，原子数和绝大多数类型完全一样：

```text
            官方      本机
A/C/HD/N/NA/OA   266 / 1805 / 756 / 561 / 6 / 665   ← 完全相同
S                  4        0
SA                 6       10
电荷总和         -21.0    -17.0
```

硫原子**都是 10 个**，但分型不同。具体到残基：

```text
官方   SG CYS187  类型=S    电荷=-0.788   ┐ 两条链各一对，
       SG CYS188  类型=S    电荷=-0.788   ┘ 共 4 个原子
本机   SG CYS187  类型=SA   电荷=-0.092
       SG CYS188  类型=SA   电荷=-0.092
```

**CYS187–CYS188 是 AChBP 的邻位二硫键。** 二硫键上的硫**不再是一个氢键受体**，所以官方把它标成 `S`；DockStart 的受体准备**没有识别这个二硫键**，按自由巯基处理标成了 `SA`，电荷也从 -0.788 变成 -0.092。

这 4 个原子改变了 AutoGrid 计算 pairwise 参数时的输入，**因此所有 map 都会有细微差异**。实测（同一份中性配体下只换 maps，B→C）：**-7.321 → -7.493，差 -0.172 kcal/mol。**

**注意方向**：本机的 maps 让分数**更低**（更好）0.172，部分抵消了配体那边的 0.940。

### 两个原因合起来

```text
-8.261  （官方）
+0.940  （配体：官方 +1  ->  本机中性）
-0.172  （maps：官方  ->  本机）
────────
-7.493  （本次实测）      ✓ 与实测完全吻合
```

### 顺带发现的一件事：maps 不能跨配体复用

实验 D 第一次跑的时候直接报错：

```text
ERROR: Affinity map for atom type N is not present.
```

原因是本机 GPF 的 `ligand_types` 是 `A C HD NA OA`——**没有 `N`**。因为中性配体里根本没有 `N` 型原子，DockStart 按配体实际原子类型生成 maps，这个"省略"是对的。

**但这也意味着一件事：换一个质子化的配体，必须重新生成 maps**，不能拿旧的 map set 硬套。我手工往 GPF 里补了一张 `N` 图并重跑 AutoGrid 之后，D 才跑通。

### 那要怎么才能复现官方数值？

按证据，有两条路：

**① 让配体带上正确的质子化状态。** DockStart 的水合配体准备不会做 pH 质子化，所以要在**输入 SDF 里就带上正确的质子化与电荷**。用官方的 `1uw6_ligandH.sdf`（27 个原子、+1）就是一个现成的做法。**换配体之后必须重新生成 maps。**

**② 让受体的二硫键正确分型。** 这需要准备阶段能识别 CYS187–CYS188 这对二硫键。作为对照，DockStart 支持「导入已有 PDBQT」——本项目里 A 实验已经证明：**只要 maps 和配体都是官方的，本机就能精确复现 -8.261。**

> **本节选择如实报告差异，不声称复现。** 而且这里可以回到结构检查本身：**这两件事都属于"人工检查结构"的范畴**——DockStart 自己在准备完成时给出的提示正是「请继续人工检查受体结构、金属离子、水分子、辅因子和质子化状态」和「请继续人工检查配体质子化、电荷、构象合理性」。这一节的差异，就是那两句提示所指向的东西。

---

## 关于水合 AD4 的四条边界

**① 分值只在本 run 内部可比。**

官方原文："the method is not suitable for virtual screenings"，DockStart 界面转译成「不用于虚拟筛选，也不支持跨配体直接比较分值」。结果页也写着「RMSD 相对于基于 Mode 1 的构象，仅用于本次输出内比较」。

**② 不能和 Vina / Vinardo 的分值横向比较。**

界面原话：「本页评分来自实验性 AutoDock4；不要与 Vina 或 Vinardo 的分值直接横向比较。」两种力场的能量基线不同。

**③ 水分子分类不改分数。**

结果页明确标注「处理后评分未计算」——强水 / 弱水 / 置换水只用于**解释结构**，不参与打分。

**④ 只支持刚性受体、单配体、全局对接。**

协议横幅上写着「单配体 | 刚性受体 | 全局对接 | AD4 maps」四个限制。选了柔性残基会被直接挡下（「水合 maps 仅支持刚性受体。」）。

---

## 关于本篇截图

**① 项目信息。**

```text
项目名    case6_hydrated_1uw6
运行      run_001，耗时 2 秒，exit code 0
结果      Mode 1 = -7.493（9 个 Mode）
候选水    原始 18 / 保留 9（强 8、弱 1）/ 置换 9
maps      hydrated_001，npts 40 40 40
水位点    2
```

**② 本篇从「结构获取与转换」开始，没有新建项目那一张。**

创建项目的界面和前面的案例完全一样，本节省略，请按 B 节的做法自行导入：受体 `1uw6_receptorH.pdb`、配体 `1uw6_ligand.sdf`。

**③ 本机路径已打码。** 图 3 里的输出目录和 Vina 安装路径已被遮盖，**你自己的目录不必和它一样**。

**④ 拍摄过程中撞到的一个坑，值得记住。** 「生成并校验 maps」被点很多次都毫无反应——原因是**受体 PDBQT 还没准备**。这时向导第 ② 步的按钮其实是可点的（它的启用条件只看水合配体就绪），但后端会在读项目受体字段的第一步立刻返回：

```text
水合 maps 需要项目内刚性受体 PDBQT。
请先导入准备后的刚性受体 PDBQT。
```

**而且这个返回发生在创建 maps 记录之前**，所以 `maps\` 目录是空的，**等多久都不会有结果，也不会留下失败记录**。判断方法很简单：看右侧「当前绑定」里的**受体**那一行是不是显示「未准备」。

**⑤ 图 1、图 3 的界面文案里的两个数字值得留意**：受体 4,069 原子、配体 12 原子。前者和官方 `dry.py` 输出里的 "receptor structure loaded [ 4069 atoms ]" 完全一致，是本机受体准备没丢原子的证据。

---

## 总结

运行水合向导前，先准备受体、标准配体、Box 和参数；不需要先运行一次普通 Vina 对接。本次与官方相差 `0.768 kcal/mol`，交叉对照观察到配体准备差异带来 `+0.940`、maps 差异带来 `-0.172`，合计与实测差值一致。官方 maps 与官方配体在本机得到 `-8.261`。这些记录说明，复查质子化与受体分型是这次排查的关键。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方教程 [Hydrated docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_hydrated.rst)（方法三步、2 个候选水、GPF 全文、`mapwater.py` 与 `dry.py` 输出、期望值 -8.261、两条力场与虚拟筛选警告）。
2. 官方示例目录 [`example/hydrated_docking`](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example/hydrated_docking)（`data/` 提供受体与配体；`solution/` 提供配体 PDBQT、maps、GPF 与参考输出）。
3. 官方 `solution/1uw6_receptor.W.map`、`solution/1uw6_receptor.gpf`、`solution/1uw6_ligand.pdbqt`、`solution/boron-silicon-atom_par.dat`（本节对照实验直接用到的文件）。
4. 相关论文（官方推荐引用）：Forli & Olson (2012) *J Med Chem* 55(2), 623-638（discrete displaceable waters 力场）；Forli et al. (2016) *Nature Protocols* 11(5), 905-919。
5. DockStart 界面：水合 AD4 页面（五步向导与流程门禁）、运行工作台、执行页、结果页（截图来源）。
6. DockStart 源码与项目记录：`backend/dockstart_core/hydrated.py`（`generate_hydrated_maps`、W map 派生、`_project_receptor_mode`）、`hydrated_run.py`（`{**project.vina, "scoring": "ad4"}` 冻结逻辑）、`preparation.py`（受体/配体准备）、以及项目内的 `maps/hydrated_001/hydrated_manifest.json`、`maps/hydrated_001/receptor.gpf`、`runs/run_001/log.txt`。
7. 操作步骤逐条说明：`DockStart-Docs-ShootScript-06-hydrated-1uw6.md`。

</details>

## 继续阅读

- 上一个案例：[Macrocycle Docking — BACE1](./macrocycle-docking-bace1.md)
- AutoGrid4 的获取与配置：[配置 AutoGrid4](../../part-c/autogrid4-setup.md)
- 结构准备 FAQ：[结构准备 FAQ](../../part-c/faq-structure-preparation.md)
- 为什么结果不一致：[为什么结果不一致](../../part-c/why-results-differ.md)
- 高级协议的适用范围：[高级协议的适用范围](../../part-c/advanced-protocols.md)
