---
title: "AutoDock4 Maps Workflow"
sidebar_position: 8
sidebar_label: "AutoDock4 Maps"
---

import OfficialExampleFiles from '@site/src/components/OfficialExampleFiles';

# AutoDock4 Maps Workflow

这个案例在 1IEP 体系中使用 AutoDock4 评分：先由 AutoGrid4 生成 affinity maps，再由 Vina 以 `--scoring ad4` 搜索。实测 Mode 1 为 `-14.7279`，官方参考为 `-14.72`；二者相差约 `0.008 kcal/mol`。

## 官方三维结构文件 {#official-structure-files}

<OfficialExampleFiles example="ad4"/>

---

## 这一节在讲什么：同一个体系，换一套力场

B 节和这一节用的是**完全相同**的输入：

```text
受体   1iep_receptorH.pdb        ABL 激酶
配体   imatinib（STI-571）       Gleevec
搜索框 center 15.190 / 53.903 / 16.917   size 20 × 20 × 20
搜索彻底程度 32
```

唯一变的是**力场和网格来源**：

```text
B 节   Vina 力场 + Vina 内部实时算网格      Mode 1 = -12.58
I 节   AD4  力场 + AutoGrid4 预计算 maps    Mode 1 = -14.7279
```

**两个数字差 2.15，但它们不是"谁更准"的证据。** 官方在同一个教程页面里明确警告：

```text
Please don't forget that energy scores giving by the AutoDock and Vina
forcefield are not comparable between each other.
```

这组对照说明：输入与搜索条件相近时，改用评分函数也会改变分值尺度。因此，不宜把两种力场的数值直接排在一起比较。

---

## 使用前的两项限制

### 约束一：需要外部 AutoGrid4

```text
Vina / Vinardo   引擎自己在内部算网格，不需要额外工具
AutoDock4        必须先用 AutoGrid4 把 maps 算好，Vina 只负责搜索和打分
```

**但 AutoDock4 的版本门禁比水合和 AD4Zn 都低：标准 AD4 maps 只需要 AutoGrid4 `4.2.6` 或更高。** 本机的 4.2.6 正好满足。

### 约束二：DockStart 不会调用 `autodock4`

这是最容易误解的一点，值得单独讲：

```text
"AutoDock4 maps 工作流"
  = 外部 AutoGrid4 生成 maps
  + AutoDock Vina 以 --scoring ad4 运行
```

翻遍源码，**没有任何一处调用 `autodock4` 可执行文件**。真正执行搜索的仍然是 **Vina**。所以：

> **AD4 的分数是"Vina 跑 AD4 评分函数"的结果**，不能假定它和 AutoDock4 原生程序算出来的一模一样。

---

## 官方每一步 → DockStart 怎么对应

| # | 官方 | DockStart 里怎么做 |
| --- | --- | --- |
| 1 | `mk_prepare_receptor.py -i 1iep_receptorH.pdb -o 1iep_receptor -p -g --box_center 15.190 53.903 16.917 --box_size 20 20 20` | 「结构获取与转换」转受体 PDBQT + 「运行工作台」设搜索范围 |
| 2 | `mk_prepare_ligand.py` 转配体 PDBQT | 「结构获取与转换」转配体 PDBQT |
| 3 | `autogrid4 -p 1iep_receptor.gpf -l 1iep_receptor.glg` | 「运行工作台」→「Vina / AutoDock4 Maps」面板 →「生成并校验 maps」 |
| 4 | `vina --ligand 1iep_ligand.pdbqt --maps 1iep_receptor --scoring ad4 --exhaustiveness 32` | 「运行工作台」→ 开始对接 |
| 5 | （无对应官方步骤）项目汇总与报告 | `results/ad4_scores.csv`、`reports/ad4_docking_report.md` |

---

## 流程穿插：这一节**没有**额外的向导

F 节（大环）和 G 节（水合）都有独立的向导页面，要从普通流程里"借"输入。**这一节不一样——从头到尾都在「运行工作台」里，是一条直线。**

```text
① 项目              新建项目、导入 1IEP 结构        （同 B 节）
② 结构获取与转换     受体 + 配体 -> PDBQT            （同 B 节）
③ 运行工作台         搜索范围 20/20/20              （同 B 节）
④ 运行工作台 ★       评分协议切成 AutoDock4（maps）   ← 本节新增
⑤ 运行工作台 ★       核对网格间距与轴点数             ← 本节新增
⑥ 运行工作台 ★       生成并校验 maps                 ← 本节新增
⑦ 运行工作台         参数：搜索彻底程度 32
⑧ 运行工作台         开始对接
⑨ 结果 / 报告        Mode 1 应 ≈ -14.72
```

**四条依赖决定了顺序：**

| 依赖 | 为什么 |
| --- | --- |
| 受体 PDBQT 必须在 ⑥ 之前 | 生成 maps 的第一件事就是读项目里的受体 PDBQT |
| 配体 PDBQT 必须在 ⑥ 之前 | 生成 maps 需要配体的原子类型列表，才能决定要算哪几张 map |
| Box 必须在 ⑥ 之前 | maps 就是用这个 Box 算出来的网格 |
| **⑥ 必须在 ⑧ 之前** | AD4 运行**不接收 `--receptor`**，受体信息全在 maps 里；没有 maps 就没法跑 |

---

## 第 1 步：准备受体和配体 PDBQT

![格式转换与 PDBQT 准备：受体 1iep_receptorH.pdb 显示 PDBQT 已就绪、链 ID A、总原子数 2702、右侧 218,862 B；配体 ligand.pdbqt 显示 PDBQT 已就绪、重原子数 37、3,904 B；右侧文件检查两项都是绿勾](../../../static/img/cases/autodock4-maps-workflow/01-preparation-ready.webp)

**图 1**　两张卡片都已经就绪。

红框圈出的两处：

```text
受体   1iep_receptorH.pdb  ->  PDBQT 已就绪  218,862 B  链 ID A   总原子数 2702
配体   ligand.pdbqt        ->  PDBQT 已就绪    3,904 B  重原子数 37
```

> **注意配体卡片上的警告**：「当前仅有最终 PDBQT；盐、总形式、电荷与立体信息可能无法可靠审计」。
> 因为你导入的是**已经准备好的 PDBQT**，而不是从 SDF 开始转换，所以 DockStart 无法回溯审计来源。
> 这不是错误，但要知道自己用的是哪一份。

---

## 第 2 步：设置搜索范围

![运行工作台：DOCKING BOX 显示 8,000 Å³、范围可用；中心 15.19 / 53.903 / 16.917，尺寸 20/20/20 且已锁定；右侧运行前检查列出受体 2702 原子、atom types A C HD N OA S SA，配体 40 原子、atom types A C HD N NA OA](../../../static/img/cases/autodock4-maps-workflow/02-run-workbench-box.webp)

**图 2**　搜索范围与运行前检查。

红框圈出的两处：

**① DOCKING BOX `8,000 Å³`，标记「范围可用」。**

```text
中心 X  15.19        尺寸 X  20   🔒已锁定
中心 Y  53.903       尺寸 Y  20   🔒已锁定
中心 Z  16.917       尺寸 Z  20   🔒已锁定
```

**② 受体与配体的原子类型。**

```text
受体 PDBQT   已读取 2702 个原子。atom types: A, C, HD, N, OA, S, SA
配体 PDBQT   已读取 40 个原子。 atom types: A, C, HD, N, NA, OA
```

**这两行是本节的关键前提**：配体的每一种原子类型（`A C HD N NA OA`）都必须在接下来生成的 maps 里有对应的图，否则运行时会直接被拒绝。

---

## 第 3 步：看运行前检查

![运行前检查面板：保留参数尚未保存；项目文件已读取；受体 PDBQT 已读取 2702 个原子，atom types A C HD N OA S SA；配体 PDBQT 已读取 40 个原子，atom types A C HD N NA OA；受体与配体结构审查各有需人工确认的项；对接箱体、搜索参数、CPU 线程均通过；Vina 配置待刷新](../../../static/img/cases/autodock4-maps-workflow/03-preflight-checks.webp)

**图 3**　运行前检查清单。

红框圈出的两处：

**① 受体与配体的原子读取结果。**

```text
受体 PDBQT   已读取 2702 个原子。atom types: A, C, HD, N, OA, S, SA
配体 PDBQT   已读取 40 个原子。 atom types: A, C, HD, N, NA, OA
```

可以先用原子数做一次文件角色检查。受体两千多个原子、配体几十个原子——数量级不对就说明文件放错了。见后面「关于本篇截图」里那个坑。

**② 两条结构审查提示。**

```text
受体结构审查   检测到 1 项需要人工确认的结构事实。
              检测到 1 个残基记录被连续片段打断，请在准备阶段复核。
配体结构审查   文件事实已归档，但仍有 2 项不能自动判定。
              未读到明确立体标记；这不等于分子不存在立体…
```

**这两条是提示不是错误**——DockStart 的立场一贯是"文件事实我归档，科学判断你做"。

---

## 第 4 步：把评分协议切成 AutoDock4（maps）

**这一步是本节的入口。** 位置在「运行工作台」里的一个独立面板，标题是 **「Vina / AutoDock4 Maps」**。

面板顶部是**一对页签**（不是下拉框，注意别找错）：

```text
[ Vina / Vinardo ]   [ AutoDock4（maps） ]        <- 本节点右边这个
```

点完之后面板下半部分整个换掉，并多出一层**子协议页签**：

```text
AutoDock4 maps 协议
标准 AD4 用于非金属体系；AD4Zn beta 只用于 Zn。
[ 标准 AD4 ]   [ AD4Zn beta ]                     <- 本节保持「标准 AD4」
```

**⚠️ 子协议必须是「标准 AD4」。** `AD4Zn beta` 是给含锌体系用的，而且需要 AutoGrid4 **4.2.7+**——本机是 4.2.6，选它会被门禁挡下。

### 刚切过去时会看到「未就绪」

![AutoDock4 maps 面板未就绪状态：评分协议页签停在 AutoDock4（maps）、子协议停在标准 AD4；状态为「需要生成或导入完整 maps」，原因是「当前 Box 的 size_x 与 maps 不一致」，右侧徽标 AutoGrid4 4.2.6；网格间距 0.375，X/Y/Z 轴点数均为 54；受体与配体原子类型已自动读取；自定义参数文件留空](../../../static/img/cases/autodock4-maps-workflow/04-ad4-maps-not-ready.webp)

**图 4**　切过去之后的「未就绪」状态 —— **这一张讲的是 maps 的失效机制。**

红框圈出的三处：

**① 状态条：`需要生成或导入完整 maps`。**

**② 原因：`当前 Box 的 size_x 与 maps 不一致。`**

这一行是整个 AD4 协议最重要的一条规则：

> **maps 是绑定到「受体 + Box」上的冻结资产。受体或 Box 一变，旧 maps 立刻失效**，
> 并且会**阻止运行**——而不是偷偷用旧网格跑。

这个项目里原本有一批更早生成的 maps（对应一个尺寸略有不同的 Box），所以切过来时它先报了"不一致"。

**③ 网格字段与原子类型。**

```text
网格间距（Å）  0.375        小字提示「标准值 0.375」
X 轴点数       54           小字提示「2–126 的偶数」
Y 轴点数       54
Z 轴点数       54
受体原子类型   A C HD N OA S SA      自动读取
配体原子类型   A C HD N NA OA        自动读取
自定义参数文件（可选）  留空 →「留空使用 AutoGrid4 默认参数库」
```

**为什么是 54**：Box 边长 20 Å ÷ 间距 0.375 = 53.33，而 AutoGrid4 的 `npts` **必须是偶数**，所以向上取 54。实际跨度 54 × 0.375 = **20.25 Å**。

**填错会被就地拦下**，面板会显示：

```text
间距须为 0.1–1.0 Å；每轴点数须为 2–126 的偶数。
```

---

## 第 5 步：生成并校验 maps

点 **「生成并校验 maps」**——这一步会**真的调用 AutoGrid4**。

![AutoDock4 maps 面板已就绪状态：状态条显示「ad4_002 可用于运行 / 54 × 54 × 54 点 · 0.375 Å · 10 个文件」，右侧徽标 AutoGrid4 4.2.6；其余字段与未就绪时相同](../../../static/img/cases/autodock4-maps-workflow/05-ad4-maps-ready.webp)

**图 5**　maps 生成完成：检查状态、网格信息和冻结记录。

红框圈出的两处：

**① 状态条变成绿色：**

```text
ad4_002 可用于运行
54 × 54 × 54 点 · 0.375 Å · 10 个文件
```

**② 右侧徽标：`AutoGrid4 4.2.6`。** 版本能显示出来，说明工具链配置正确、检测通过。

**「10 个文件」是哪些**：

```text
receptor.gpf          网格参数文件
receptor.maps.fld     网格数据索引
receptor.maps.xyz     网格尺寸
receptor.A.map        ┐
receptor.C.map        │
receptor.HD.map       │ 每个配体原子类型一张亲和力图
receptor.N.map        │
receptor.NA.map       │
receptor.OA.map       ┘
receptor.e.map        静电势图
receptor.d.map        去溶剂化势图
```

**验收标准：去项目里打开 `maps/<map_set_id>/autogrid.glg`，结尾必须是 `Successful Completion.`**

```text
 * Note:  Every pairwise-atomic interaction was clamped at 100000.00

 D:\AutoDock\Autodock\4.2.6\autogrid4.exe: Successful Completion.
 Real= 8.78s,  CPU= 8.72s,  System= 0.03s
```

**本次耗时 8.78 秒。** 顺便说明：`maps` 里没有任何 `.dat` 参数文件，也不需要一个——**AutoGrid4 4.2.6 内置了 AD4 的默认参数库**，所以「自定义参数文件」留空是正确做法。

### 生成的 GPF 长这样

```text
npts 54 54 54
gridfld receptor.maps.fld
spacing 0.375
receptor_types A C HD N OA S SA
ligand_types A C HD N NA OA
receptor inputs/receptor.pdbqt
gridcenter 15.19 53.903 16.917
smooth 0.500
map receptor.A.map
map receptor.C.map
map receptor.HD.map
map receptor.N.map
map receptor.NA.map
map receptor.OA.map
elecmap receptor.e.map
dsolvmap receptor.d.map
dielectric -42.000
```

**两个字段值得注意：**

- **`ligand_types A C HD N NA OA`** —— 这是**按当前配体实际含有的原子类型**生成的，不多不少。如果换一个含硫的配体，这里就会多出 `SA`，并且必须重新生成 maps。
- **`dielectric -42.000`** —— 负值表示 AD4 的距离依赖介电模型（与 AutoDock4 原生一致）。

---

## 第 6 步：设置参数

![运行设置页：受体 PDBQT prepared/receptor.pdbqt 2702 原子·链 A；配体 PDBQT prepared/ligand.pdbqt 40 原子·活性扭转 7；评分协议 AutoDock4（maps）、搜索彻底程度 32、输出构象数量 9、能量范围 3、CPU 线程 0；下方提示「当前运行使用预计算 AutoDock4 网格图；AD4、Vina 与 Vinardo 的分值不能直接横向比较。」](../../../static/img/cases/autodock4-maps-workflow/06-ad4-parameters.webp)

**图 6**　输入、参数与输出。

红框圈出的三处：

**① 受体与配体的准备结果。**

```text
受体 PDBQT   prepared/receptor.pdbqt   2,702 原子 · 链 A
配体 PDBQT   prepared/ligand.pdbqt        40 原子 · PDBQT 活性扭转 7
```

**② `AutoDock4 运行参数`。**

| 参数 | 本次取值 |
| --- | --- |
| 评分协议 | **`AutoDock4（maps）`** ← 本节的入口开关 |
| 搜索彻底程度 | **`32`** ← 官方 |
| 输出构象数量 | `9` |
| 能量范围 | `3` |
| CPU 线程 | `0` |
| 随机种子 | 留空 |

注意这一栏的标题已经从 B 节的「全局对接参数」变成了 **「AutoDock4 运行参数」**，下面还有一行小字：

```text
与 Vina / Vinardo 分值不可直接横向比较
```

**③ 底部的说明。**

```text
当前运行使用预计算 AutoDock4 网格图；AD4、Vina 与 Vinardo 的分值不能直接横向比较。
```

**界面在设计上就一直在提醒你"别比大小"**，这一点值得注意。

---

## 第 7 步：运行

![运行中状态：AutoDock Vina 正在搜索构象，run_003 · 2 秒，进度条正在推进，可终止运行；下方显示「参数已保存并通过重新检查」](../../../static/img/cases/autodock4-maps-workflow/07-run-in-progress.webp)

**图 7**　运行中。

实际执行的命令是：

```text
AutoDock Vina  --maps <AutoGrid4 生成的 maps>  --scoring ad4  --exhaustiveness 32
```

**注意它不传 `--receptor`**——受体信息已经全部烘进 maps 里了。这是 AD4 协议和普通 Vina 运行在命令层面最大的区别。

**本次耗时 2 秒**（界面显示 `run_003 · 2 秒`）。对 54³ 的预计算网格 + 40 个原子的配体来说，这个速度是合理的。

---

## 第 8 步：看结果

![结果页：顶部横幅「AutoDock4 maps 评分协议 / 本页评分来自 AutoDock4 maps；不要与 Vina 或 Vinardo 的分值直接横向比较。」；构象列表 Mode 1 到 Mode 9；右侧显示所选构象 Mode 1 = -14.7279 kcal/mol；输出文件 log.txt、scores.csv、docking_report.md 均已生成，poses.sdf 未导出](../../../static/img/cases/autodock4-maps-workflow/08-result-poses.webp)

**图 8**　构象列表。

红框圈出的三处：

**① 顶部横幅。**

```text
AutoDock4 maps 评分协议
本页评分来自 AutoDock4 maps；不要与 Vina 或 Vinardo 的分值直接横向比较。
```

**② 构象列表。**

| 排名 | 构象 | AutoDock4 评分 | RMSD l.b. | RMSD u.b. |
| --- | --- | --- | --- | --- |
| 1 | **Mode 1** | **-14.7279** | 0 | 0 |
| 2 | Mode 2 | -13.3167 | 0.6339 | 1.4592 |
| 3 | Mode 3 | -13.2168 | 1.3586 | 2.0664 |
| 4 | Mode 4 | -12.3938 | 1.343 | 2.0797 |
| 5 | Mode 5 | -11.6772 | 4.9781 | 11.4143 |
| 6 | Mode 6 | -11.3986 | 3.9986 | 12.2448 |
| 7 | Mode 7 | -11.2254 | 2.0253 | 13.5211 |
| 8 | Mode 8 | -11.1312 | 3.4094 | 11.4399 |
| 9 | Mode 9 | -10.6617 | 1.7836 | 2.7905 |

**③ 输出文件。**

```text
log.txt                  runs/run_003/log.txt              已生成
scores.csv               runs/run_003/scores.csv           已生成
docking_report.md        runs/run_003/docking_report.md    已生成
poses.sdf                未导出
```

**注意列表标题是「AutoDock4 评分」而不是 B 节的「评分」或 G 节的「Raw AD4 affinity」** —— 三种协议各自有各自的列名，这也是防止混用的一道设计。

![结果页评分表：构象列表显示 AutoDock4 评分 kcal/mol 与 RMSD l.b./u.b. 两列，Mode 1 到 Mode 9 的数值；上方显示 scores.csv 路径与「重新生成分析」按钮；底部结果状态说明「scores.csv 已读取。」](../../../static/img/cases/autodock4-maps-workflow/09-result-scores.webp)

**图 9**　评分表视图。

同一批数字的表格版。另外项目汇总里还生成了独立的 AD4 结果文件：

```text
results/scores.csv             Vina 的结果（B 节那次）
results/ad4_scores.csv         本次 AD4 的结果
reports/docking_report.md      Vina 报告
reports/ad4_docking_report.md  AD4 报告
```

**两套结果文件并存，互不覆盖。** 这就是"AD4 分值不能和 Vina 混着看"在文件层面的落实。

### 附：AD4 会给完整能量分解

日志里比 Vina 多了这一段（这是 AD4 力场的特点）：

```text
ENERGY FROM SEARCH: -17.9528
FINAL ENERGY:
Estimated Free Energy of Binding   : -14.728 (kcal/mol) [=(1)+(2)+(3)-(4)]
(1) Final Intermolecular Energy    : -16.816 (kcal/mol)
    Ligand - Receptor              : -16.816 (kcal/mol)
    Ligand - Flex side chains      : 0.000 (kcal/mol)
(2) Final Total Internal Energy    : -1.137 (kcal/mol)
    Ligand                         : -1.137 (kcal/mol)
    Flex   - Receptor              : 0.000 (kcal/mol)
(3) Torsional Free Energy          : 2.088 (kcal/mol)
(4) Unbound System's Energy [=(2)] : -1.292 (kcal/mol)
```

**`Ligand - Flex side chains` 是 0.000**，因为本次是刚性受体（没有柔性侧链）。字段保留着，说明这套输出本来就是为柔性 AD4 准备的。

---

## 结果合理吗？与官方对照

**结论：本次精确复现了官方数值。**

> 需要说明的是，B 节的项目里本来就留着一次更早的 AD4 记录（`run_002`，`-14.7133`），
> 也已经很接近官方值。本节与它的区别是：**这次是用完整的界面流程（自己生成 maps）跑出来的**，
> 并且搜索强度用了官方指定的 `32`。

### 与官方对照

| Mode | 本次实测 | 官方 | 差 |
| --- | --- | --- | --- |
| **1** | **-14.7279** | **-14.72** | **0.008** |
| 2 | -13.3167 | -14.63 | 1.31 |
| 3 | -13.2168 | -13.12 | 0.10 |
| 4 | -12.3938 | -11.70 | 0.69 |
| 5 | -11.6772 | -11.44 | 0.24 |
| 6 | -11.3986 | -11.39 | 0.01 |
| 7 | -11.2254 | -11.21 | 0.02 |
| 8 | -11.1312 | -10.71 | 0.42 |
| 9 | -10.6617 | -10.41 | 0.25 |

官方原文对这个案例的说明是：

```text
The predicted free energy of binding should be about -14 kcal/mol for poses
that are similar to the crystallographic pose for this example system.
```

**Mode 1 差 0.008 kcal/mol**，可以说就是同一个数。

### 但 Mode 2 之后对不上，这是正常的

看 Mode 2：本次 `-13.3167`，官方 `-14.63`。Mode 3 却又对上了（`-13.2168` vs `-13.12`）。

原因是**随机种子不同**。日志里写着本次的种子：

```text
Performing docking (random seed: 1221186026) ...
```

官方那次是 `1045208650`。**Vina 只在 Mode 1 上稳定收敛**，后面的构象排序会随搜索路径变化。所以：

- **Mode 1 可以拿来和官方比对**（这是收敛到的最优解）
- **Mode 2 往后不要逐条比对顺序**

### 顺便看看 B 节那组数字

同一个项目里的三次运行：

| 运行 | 力场 | 搜索彻底程度 | Mode 1 |
| --- | --- | --- | --- |
| `run_001` | Vina | 8 | **-12.58** |
| `run_002` | AD4 maps | 8 | -14.7133 |
| `run_003` | AD4 maps | **32** | **-14.7279** |

**对照看两件事：**

1. **换力场：-12.58 → -14.73，差 2.15。** 这就是官方警告"不可比较"的直观体现——两个数字属于不同的能量尺度。
2. **同力场提高搜索强度：-14.7133 → -14.7279，只差 0.015。** 说明**在这个体系上 exhaustiveness 8 就已经收敛到最优构象了**，提到 32 只是更保险。（官方仍然用 32。）

---

## 为什么这次能对上，而 G 节对不上

G 节（水合 1UW6）实测 `-7.493`，官方 `-8.261`，差 0.768。**这一节却差 0.008。** 差别在哪？

G 节查出的主因是**配体的质子化状态**：官方用 `scrub.py` 在 pH 7.4 下把尼古丁的吡咯烷氮质子化成 +1，而 DockStart 只做补氢、保持中性。

**这一节之所以没问题，是因为官方提供的配体文件本身就带着正确的质子化状态。** 打开官方的 `1iep_ligand.sdf`：

```text
 69 73  0  0  0  0  0  0  0  0999 V2000
 M  CHG  1  32   1
```

`M  CHG  1  32   1` 的意思是：**第 32 号原子带 +1 formal charge** —— 那是 imatinib 哌嗪环上的氮。而 DockStart 准备出来的配体 PDBQT：

```text
REMARK SMILES Cc1ccc(NC(=O)c2ccc(CN3CC[NH+](C)CC3)cc2)cc1Nc1nccc(-c2cccnc2)n1
原子数 40   电荷总和 0.999 ≈ +1
```

**`[NH+]` 被完整保留下来了。**

> **所以两个案例合起来给出了一条很实用的规则：**
>
> **DockStart 不会改变输入结构的质子化状态和电荷——它只补氢。**
> **输入是对的，结果就对；输入是错的，它也不会替你纠正。**
> 这也是为什么准备页上一直有一句「自动准备 PDBQT 仍需要人工检查质子化、电荷、构象、缺失残基、水、金属、辅因子和 Box 合理性」。

---

## 关于 AD4 maps 的四条边界

**① AD4 分值不能和 Vina / Vinardo 横向比较。**

两种力场的能量基线不同。这一节和 B 节的 `-14.73` 与 `-12.58` 就是活例子。DockStart 把 AD4 结果单独存在 `results/ad4_scores.csv`，不覆盖 Vina 的结果，就是为了防止混用。

**② 运行时不传 `--receptor`。**

AD4 协议用 `--maps` 取代 `--receptor`，Box、spacing 等也不再传入——**它们是生成 maps 时用的输入**。所以**受体或 Box 一改，maps 立刻失效并阻止运行**（本节图 4 就是这个机制）。

**③ maps 是冻结资产。**

生成成功后会记录受体、Box、spacing、网格点数、每个 map 的哈希和 AutoGrid4 的版本。运行前后都会复查，被改过的 maps 会被拒绝。

**④ 支持范围。**

DockStart 的 AD4 maps 协议支持**刚性单配体、有限柔性单配体、刚性串行批量、刚性双配体共同对接**；**所有路径都会先验证 maps 覆盖全部配体原子类型**。本节只用了最简单的刚性单配体。

> **本节不含 AD4Zn。** 含锌体系要先看 [高级协议的适用范围](../../part-c/advanced-protocols.md)，那里解释了为什么标准协议会拒绝含 Zn 的受体、以及 AD4Zn 的前置条件。AD4Zn 的完整实操暂不在本系列中（原因：需要 AutoGrid4 4.2.7+，详见 [配置 AutoGrid4](../../part-c/autogrid4-setup.md)）。

---

## 关于本篇截图

**① 项目和运行信息。**

```text
项目        box1（与 B 节同一个项目）
运行        run_003，耗时 2 秒
maps        ad4_002，npts 54 54 54，spacing 0.375
自动网格    AutoGrid4 4.2.6，Real= 8.78s，Successful Completion.
结果        Mode 1 = -14.7279（9 个 Mode）
```

**② 本节是在 B 节的项目里继续做的，运行编号是 `run_003`。**

这不是笔误。这个项目里还留着两次更早的运行记录：

```text
run_001   Vina      exhaustiveness 8    B 节那次
run_002   AD4 maps  exhaustiveness 8    本文档编写过程中的一次 AD4 记录
run_003   AD4 maps  exhaustiveness 32   本节这次
```

**你自己从 B 节跟做的话，这次的编号会是 `run_002`**（前面只有 Vina 那一次）。编号不同不影响任何结论。

> 让本节和 B 节共用一个项目是有意为之：**两套结果就在同一个项目里并排保存**，
> `results/scores.csv`（Vina）与 `results/ad4_scores.csv`（AD4）互不覆盖 —— 这比分成两个项目更能说明问题。

**③ 本机路径已打码。** 图 6 里的输出目录和 Vina 安装路径已被遮盖，**你自己的目录不必和它一样**。

**④ 拍摄过程中撞到的坑，值得写在这里。**

一开始那次运行失败了，报错是：

```text
PDBQT parsing error: Unknown or inappropriate tag found in flex residue or ligand.
 > ATOM      1  N   MET A 225      19.489  41.513  -4.249  1.00 79.27    -0.066 N
```

**原因不是软件，是输入拿错了**：受体卡片和配体卡片**都放了蛋白质**——受体放的是 1IEP 的受体，配体放的是一个别的受体的 PDBQT（2,592 个原子）。

**这条报错的准确含义就是"你交给 Vina 的配体其实是个蛋白质"。** 三条自查法：

```text
① 看数量级    受体几千个原子、几百 KB；配体几十个原子、几 KB
② 看结构标记  配体 PDBQT 必须有 ROOT / BRANCH / TORSDOF
③ 看原子类型  配体原子类型应该是 A / C / HD / N / NA / OA 这类少数几种
```

**图 3 那一屏（"受体 2702 个原子 / 配体 40 个原子"）就是最快的核对手段**——数量级不对，立即停下。

**⑤ 本节只用了一个配体、一个受体、一次运行。** 有限柔性 AD4、批量 AD4、双配体共同 AD4 都在 DockStart 的支持范围内，但不在本节。

---

## 总结

标准 AD4 在运行工作台内完成 maps 生成、校验和搜索，实际执行搜索的仍是 Vina。这个 1IEP 案例的 Mode 1 为 `-14.7279`，接近官方 `-14.72`。复现时保持受体与 Box 一致，并核对配体质子化、maps 和运行记录；AD4 分数不与 Vina/Vinardo 分数直接比较。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方教程 [Basic docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst) 第 4.a / 5.a 节（`--maps ... --scoring ad4` 命令、9 个 Mode、期望值 -14.72、两种力场不可比较的警告）。
2. 官方示例目录 [`example/basic_docking`](https://github.com/ccsb-scripps/AutoDock-Vina/tree/develop/example/basic_docking)（1IEP 的 `data/` 与 `solution/`，含带 `M  CHG` 的 `1iep_ligand.sdf`）。
3. DockStart `docs/user_guide.md`「AutoDock4（maps）工作流」一节（七步操作、`results/ad4_scores.csv`、`reports/ad4_docking_report.md`）。
4. DockStart 源码 `backend/dockstart_core/autogrid.py`（GPF 生成、`AD4_MIN_AUTOGRID_VERSION = (4, 2, 6)`、网格点偶数与每轴上限校验、maps manifest 与失效逻辑）。
5. DockStart 源码 `backend/adapters/autogrid_adapter.py`（AutoGrid4 检测与调用；`-p` / `-l` 参数数组与超时）。
6. DockStart 源码 `apps/desktop/src/components/AutoGridMapsPanel.tsx`（评分协议页签、子协议、网格字段与「生成并校验 maps」）。
7. 项目内产物：`maps/ad4_002/receptor.gpf`、`maps/ad4_002/autogrid.glg`、`maps/ad4_002/manifest.json`、`runs/run_003/log.txt`、`runs/run_003/scores.csv`、`results/ad4_scores.csv`。
8. 操作步骤逐条说明：`DockStart-Docs-ShootScript-08-ad4-maps-1iep.md`。
9. B 节（同一个体系的 Vina 对照）：[Basic Docking — 1IEP](./basic-docking-1iep.md)；G 节（质子化的反面案例）：[Hydrated Docking — 1UW6](./hydrated-docking-1uw6.md)。

</details>

## 继续阅读

- 上一个案例：[Hydrated Docking — 1UW6](./hydrated-docking-1uw6.md)
- AutoGrid4 的获取与配置：[配置 AutoGrid4](../../part-c/autogrid4-setup.md)
- 高级协议的适用范围：[高级协议的适用范围](../../part-c/advanced-protocols.md)
- 为什么结果不一致：[为什么结果不一致](../../part-c/why-results-differ.md)
- 如何解读结果：[如何正确解读结果](../../part-c/interpreting-results.md)
