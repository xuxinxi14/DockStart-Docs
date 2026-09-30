---
title: "项目、版本与可复现性"
sidebar_position: 12
sidebar_label: "L. 项目、版本与可复现性"
---

# 项目、版本与可复现性

## 简单概括

一次 docking 想被复现或排查，要记的东西远不止参数：输入结构的精确字节、Box、评分函数、关键参数、DockStart 和所用工具的版本——缺一样，别人（或者三个月后的你）就可能跑不出同一个结果。

这一页讲"**该记什么、DockStart 已经替你记了什么**"。至于"哪些因素会导致结果不同"，见 [为什么结果不一致](./why-results-differ.md)。

---

## 运行记录能帮你查什么

每次运行的记录保存在 `runs/run_00N/` 下。需要复现、排查或写方法部分时，先从当次运行目录查输入快照、配置、命令和日志，避免误用后来替换的项目文件。

导出或分享前，也可以按下面的清单检查：哪些信息已经随记录保存，哪些还需要另外说明。

---

## 需要记录的信息清单

| 类别 | 具体项 |
|---|---|
| DockStart 版本 | 应用版本号 |
| 工具版本 | AutoDock Vina；Assisted 下的 Python / RDKit / Meeko；AD4 下的 AutoGrid4 |
| 输入结构 | 受体、配体（柔性时还有柔性侧链）的**文件内容**，不只是文件名 |
| Box | `center_x/y/z`、`size_x/y/z` |
| 评分函数 | vina / vinardo / ad4 |
| 搜索参数 | `exhaustiveness`、`num_modes`、`energy_range`、`cpu`、`seed` |
| 高级参数 | `max_evals`、`min_rmsd`、`spacing`、`verbosity`、`no_refine`、`force_even_voxels`（以及适用时的 `unbound_energy`） |
| 运行模式 | 全局对接 / 姿势评分 / 局部优化 |
| 协议 | 刚性 / 柔性 / maps / AD4Zn / 水合 / 多配体共同 |
| 输出 | 结果文件本身，以及它们的哈希 |
| 运行环境 | 操作系统、运行方式（安装版 / 源码运行） |

其中最容易漏掉的是**"输入结构的精确内容"**：**同名文件不等于同一份文件**。所以要记的是**内容哈希**，不是文件名。

---

## DockStart 已经帮你记了什么

一次运行结束后，run 目录里是一整套完整记录：

```text
runs/run_00N/
├─ metadata.json            运行元数据（冻结参数、输入哈希、协议、评分函数、输出路径）
├─ command_preview.txt      将要执行的命令
├─ config_snapshot.txt      本次实际使用的配置快照
├─ inputs/
│  ├─ receptor.pdbqt        不可变输入快照
│  ├─ ligand.pdbqt          不可变输入快照
│  └─ flex.pdbqt            仅柔性受体
├─ stdout.txt / stderr.txt / log.txt
├─ out.pdbqt                全局对接输出
├─ scores.csv
└─ docking_report.md
```

三个关键点：

- `inputs/` 里的文件是**运行开始那一刻的冻结快照**，不是指向项目当前文件的链接；
- 快照同时记 **SHA256**，可以用来验证有没有被改过；
- `config_snapshot.txt` 记的是**当次实际使用**的配置，不是"现在项目档案里的配置"。

所以想复现的时候，**以 run 目录里的快照为准**，不要直接拿项目当前的 `prepared/` 文件去跑 —— 那可能已经被你换过了。

---

## 项目结构

一个项目的基本形态：

```text
my_project/
├─ project.json          项目记录
├─ raw/                  原始结构
├─ prepared/             用于运行的 PDBQT
├─ preparation/          每次准备的记录与产物
├─ configs/              生成的 Vina 配置
├─ runs/                 每次运行的目录
├─ results/              项目级评分汇总
├─ reports/              项目级 Markdown 记录
└─ maps/                 maps（使用 AD4 类协议时）
```

几个对可复现性很重要的性质：

- **`project.json` 里全部用相对路径**，所以整个项目目录可以整体移动、复制、归档；
- 输入、输出和工具来源都在 metadata 里；
- 这意味着"把项目目录打包发给别人"在技术上是可行的 —— 但**发之前先检查里面有没有不该外传的本机路径或研究数据**（详见 [安装、更新和数据安全](./install-update-data-safety.md)）。

---

## 项目文件的版本与保护

`project.json` 有 schema 版本，当前是 **1**。

```text
打开旧版本项目   → 自动迁移到当前 schema
                   迁移前先备份为 project.json.schema-v<旧版本>.bak
                   而且先完整校验已知字段，校验不过就不写

打开更高版本项目 → 直接拒绝，原文件一个字节都不改
```

另外还有 **revision 冲突检测**：

```text
你手上的项目记录 revision = 5
磁盘上的 project.json revision = 7
        ↓
保存被拒绝（PROJECT_SAVE_CONFLICT）
        ↓
避免用旧数据覆盖新数据
```

看到这个提示时，正确做法是**重新读取项目**再提交修改，而不是去手工编辑 `project.json`。同理，想改实验设计就新建一次运行，别改旧记录 —— 旧记录里的哈希校验会把改动识破。

---

## 归档与导出是什么定位

DockStart 支持把批量筛选结果归档，并导出成 ZIP。但它的定位要说清楚：

| 它是 | 它不是 |
|---|---|
| 只读的实验记录 | 可以直接恢复运行的项目备份 |
| 便于移动与审计的包 | 数字签名 |
| 带逐文件哈希与树哈希的集合 | 一键还原运行环境的工具 |

补充两点：

- 导出包里**不包含** Vina 可执行文件、活动队列、项目当前状态或 staging 文件；
- 已有的 JSON 记录**可能包含本机绝对路径**，导出**不做匿名化**。

所以分享之前请自己过一遍内容，必要时先脱敏。

---

## 为什么这些记录真的有用

```text
想复现结果
  → 需要输入快照 + 参数 + 工具版本

想解释"为什么不一致"
  → 需要两份记录的差异点

想排查"是不是文件被改了"
  → 需要 SHA256

想证明"这次结果出自哪次运行"
  → 需要配置快照与命令记录
```

反过来说，如果这些东西没记，出问题时你只能靠猜。这也是为什么 `metadata.json` 和 `config_snapshot.txt` 值得在提交结果前先看一眼 —— **花一分钟，省半天。**

---

## 一个实用建议

导出报告或归档之前，确认这几件事：

```text
1  这次 run 用的受体/配体快照，是不是你想要的那一份？
2  Box 和参数，跟你的实验记录一致吗？
3  评分函数是什么？（别事后才发现混了 vina 和 ad4）
4  seed 是手动固定还是随机生成的？（随机的话日志里有实际值）
5  Vina 版本和 DockStart 版本记下来了吗？
```

---

## 总结

想复现或排查一次 docking，要把输入结构、Box、评分函数、关键参数和版本一起记下来；缺一样，别人或者三个月后的你，都可能跑不出同一个结果。

---

## 相关页面

- 结果不一致的原因：[为什么结果不一致](./why-results-differ.md)
- 安装位置与数据安全：[安装、更新和数据安全](./install-update-data-safety.md)
- 参数含义：[Seed](../part-a/search-and-parameters/seed.md)、[Exhaustiveness](../part-a/search-and-parameters/exhaustiveness.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/project.py`，项目 schema、迁移、revision 冲突、run 元数据。
2. DockStart 源码 `backend/dockstart_core/persistence.py`，原子写入。
3. DockStart 源码 `backend/dockstart_core/screening.py`，归档与导出 ZIP 的完整性校验。
4. DockStart 源码 `backend/dockstart_core/diagnostics.py`，诊断报告内容。
5. AutoDock Vina 官方 Basic Docking 文档与 FAQ，随机种子与可重复性。

</details>
