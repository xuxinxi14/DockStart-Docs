---
title: "高级参数"
sidebar_position: 7
---

# 高级参数

除了 exhaustiveness、num_modes 这些常见参数外，Vina 还提供一组高级选项，用来切换评分函数、只做打分或局部优化、控制网格细节，以及人工调整评分权重。

---

## 先建立一个总体印象

Vina 的命令行参数大致可以分成几类：

```text
输入         受体 / 配体 / 柔性侧链 / 评分函数
搜索空间     Box 的中心与尺寸 / maps / autobox
输出         输出文件 / 批量输出目录
高级         只打分 / 只做局部优化 / 随机化 / 网格细节 / 评分权重
杂项         CPU / seed / exhaustiveness / num_modes / ...
```

这一篇只介绍其中比较值得知道的高级选项。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 改变任务的类型

有三个选项会改变“这次要做什么”，而不只是调参数：

| 选项 | 作用 |
|---|---|
| `--score_only` | 只对当前构象打分，**不需要搜索空间** |
| `--local_only` | 只做局部搜索，不做全局搜索 |
| `--randomize_only` | 只把输入构象随机化，尽量避开原子冲突 |

这几个选项在 DockStart 中对应不同的计算任务类型。

其中 `--score_only` 还可以配合 `--unbound_energy` 显式指定未结合体系的能量。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 切换评分函数

| 选项 | 说明 |
|---|---|
| `--scoring vina` | 默认，使用 Vina scoring function |
| `--scoring vinardo` | 使用 Vinardo scoring function |
| `--scoring ad4` | 使用 AutoDock4 scoring function |

需要注意：使用 `ad4` 时，Vina 需要读取 **AutoGrid4 生成的 affinity maps**，因此命令形式和普通 Vina docking 不同。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 控制网格细节

| 选项 | 说明 |
|---|---|
| `--maps` | 直接指定已有的 affinity maps |
| `--write_maps` | 把计算出的网格写出到文件 |
| `--spacing` | 网格间距（默认 0.375 Å） |
| `--force_even_voxels` | 让网格在各方向上的体素数取偶数 |
| `--no_refine` | 提供受体时，局部优化和打分不使用受体的显式原子（而用预先算好的网格） |

`--no_refine` 影响的是 docking 之后的局部优化与打分方式。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

对初学者来说，这些通常**不需要手动调整**；它们更多出现在自动化流程或需要保存网格的场景中。

---

## 与打分和搜索相关的其他选项

| 选项 | 说明 |
|---|---|
| `--min_rmsd` | 输出 pose 之间的最小 RMSD（默认 1.0 Å），用于去重 |
| `--max_evals` | 每次搜索的评估次数上限；为 0 时由启发式规则决定 |
| `--verbosity` | 输出详细程度（0 无输出 / 1 正常 / 2 详细） |
| `--autobox` | 根据输入配体自动设定网格范围（用于 `--score_only` 和 `--local_only`） |

([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 人工调整评分权重

Vina 允许在命令行或配置文件中直接修改评分函数各项的权重，例如：

```text
--weight_hydrogen -1.2
```

官方 FAQ 给出了这个例子，并说明它会**把氢键作用的强度加倍**。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

也就是说：

> **权重是可调的，但改变权重就等于改变了评分模型本身。**

因此调整权重后，结果**不能**再与使用默认权重的结果直接比较。对初学者来说，除非确有明确的研究理由，建议保持默认值。

---

## 批量运行

Vina 支持批量模式，可以一次处理一个目录下的多个配体：

```text
--batch <目录或配体列表>
--dir   <输出目录>
```

批量模式下必须指定输出目录。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 在 DockStart 中

DockStart 会把其中一部分高级选项包装成界面上的任务类型或设置项。

对初学者，建议的顺序是：

```text
先用默认参数跑通一次完整 docking
    ↓
理解 Box、exhaustiveness、num_modes 的作用
    ↓
确有必要时，再接触 --scoring、--score_only、权重等高级选项
```

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 FAQ, *How can I tweak the scoring function?*.
3. AutoDock Vina 官方 Manual.
4. AutoDock Vina 官方命令行帮助（`vina --help_advanced`）.

</details>
