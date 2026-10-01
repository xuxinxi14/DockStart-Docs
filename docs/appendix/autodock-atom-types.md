---
title: "AutoDock atom types 简表"
sidebar_position: 3
sidebar_label: "AutoDock atom types 简表"
---

# AutoDock atom types 简表

## 简单概括

AutoDock 体系里的 atom type 是"这个原子应该怎么参与计算"的分类，不等于元素符号。而且它有两套：AD4 一套（`C`、`A`、`OA`、`HD`…），Vina 内部一套（`C_H`、`N_D`、`O_A`、`Met_D`…），两者的命名方式完全不同，不能混着理解。

这一页只做清单和对照。概念解释见 [Atom Types](../part-a/search-space-and-scoring/atom-types.md)。

---

## DockStart 里 atom type 出现在哪三处

```text
① AD4 maps 工作流
   map 文件名里带原子类型：receptor.OA.map、receptor.HD.map …

② Vina / Vinardo 预计算 maps
   map 文件名里带 Vina 自己的 XS 类型：receptor.C_H.map、receptor.W.map …

③ AD4Zn 协议
   除了普通类型，还会生成一个特殊的 TZ 伪原子
```

这三处用的命名体系**不一样**。所以看到 `OA` 和 `O_A` 时，不要以为只是写法不同 —— 它们来自两套不同的类型方案。

---

## AD4 的类型清单

DockStart 源码里维护了一份 AD4 的类型集合，由三部分组成。

### 标准非金属类型（20 种）

| 类型 | 说明 |
|---|---|
| `C` | 脂肪碳 |
| `A` | 芳香碳 |
| `N` | 氮 |
| `NA` | 氢键受体氮 |
| `NS` | 氮（另一类化学环境） |
| `O` | 氧 |
| `OA` | 氢键受体氧 |
| `OS` | 氧（另一类化学环境） |
| `S` | 硫 |
| `SA` | 氢键受体硫 |
| `H` | 极性氢 |
| `HD` | 极性氢（供体侧） |
| `HS` | 极性氢（另一类化学环境） |
| `P` | 磷 |
| `F` | 氟 |
| `Cl` | 氯 |
| `Br` | 溴 |
| `I` | 碘 |
| `Si` | 硅 |
| `B` | 硼 |

### 金属类型（8 种）

| 类型 | 元素 |
|---|---|
| `Ca` | 钙 |
| `Co` | 钴 |
| `Cu` | 铜 |
| `Fe` | 铁 |
| `Mg` | 镁 |
| `Mn` | 锰 |
| `Ni` | 镍 |
| `Zn` | 锌 |

### 特殊类型（2 种）

| 类型 | 说明 |
|---|---|
| `TZ` | AD4Zn 协议生成的特殊伪原子（四面体锌方向标记），**不是**常规元素类型 |
| `W` | 水 |

> 三种合起来构成 DockStart 认可的 AD4 类型全集（共 30 种）。
> 具体每种类型的非键参数值（半径、势阱深度、溶剂化参数等）以 AutoDock 官方参数文件和 User Guide 为准，本页只列名称与归类。

---

## Vina 的类型清单（XS types）

Vina / Vinardo 的预计算 maps 用的是另一套 20 种类型：

| 类型 | 命名拆解 |
|---|---|
| `C_H` | 碳，疏水 |
| `C_P` | 碳，极性 |
| `N_P` | 氮，极性 |
| `N_D` | 氮，氢键供体 |
| `N_A` | 氮，氢键受体 |
| `N_DA` | 氮，供体兼受体 |
| `O_P` | 氧，极性 |
| `O_D` | 氧，氢键供体 |
| `O_A` | 氧，氢键受体 |
| `O_DA` | 氧，供体兼受体 |
| `S_P` | 硫，极性 |
| `P_P` | 磷，极性 |
| `F_H` | 氟，疏水 |
| `Cl_H` | 氯，疏水 |
| `Br_H` | 溴，疏水 |
| `I_H` | 碘，疏水 |
| `Si` | 硅 |
| `At` | 砹 |
| `Met_D` | 金属，与供体结合 |
| `W` | 水 |

命名规律可以这样读：

```text
X_角色

_H   疏水（hydrophobic）
_P   极性（polar）
_D   氢键供体（donor）
_A   氢键受体（acceptor）
_DA  既是供体又是受体
```

这套命名描述的是**原子在 Vina 评分模型里扮演的角色**，比 AD4 的 `OA` / `NA` 更直白一些。

### 两套清单的对照差异

| 差异点 | AD4 | Vina |
|---|---|---|
| 碳 | 区分 `C`（脂肪）与 `A`（芳香） | 区分 `C_H`（疏水）与 `C_P`（极性） |
| 氧 / 氮 | 用 `O` / `OA` / `OS`、`N` / `NA` / `NS` 表达化学环境 | 用 `_P` / `_D` / `_A` / `_DA` 表达氢键角色 |
| 砹（At） | 标准类型里没有 | 有 `At` |
| 硼（B） | 有 | 没有 |
| 硫 | `S` / `SA` | `S_P` |
| 水 | `W` | `W` |

**共同点是 W（水）两套都有** —— 这也解释了为什么水合协议要单独生成 `W` 的 map。

---

## 类型的大小写会被规范化

PDBQT 的写入程序对元素大小写的处理并不统一（比如 `CL` 和 `Cl`）。DockStart 的处理方式是：

```text
读入一个类型字符串
 ↓
转成小写去查规范表
 ↓
查得到 → 替换成规范写法（如 cl → Cl）
查不到 → 原样保留，不翻译
```

**关键在于最后一步：未知类型不会被悄悄"翻译"成某个已知类型**，而是保留原样，交给后续参数/类型校验去拒绝。这是为了避免把错误的数据静默地"修好"，让问题一直隐藏到结果里。

---

## 实际使用中，DockStart 会怎么处理

普通用户**不需要手动给原子指定类型**。流程是这样的：

```text
你导入受体 / 配体（PDBQT 或原始结构）
        ↓
准备工具完成参数化，PDBQT 里带上类型
        ↓
DockStart 从 PDBQT 里读出实际用到的类型
        ↓
用这些类型去校验 maps / 参数文件是否覆盖
```

所以**类型是从文件里读出来的，不是预先写死的白名单** —— 上面的清单用于规范化和校验，而不是限制你只能用这些类型。

这也带来两个实际的报错场景：

- **maps 没有覆盖配体用到的类型** → 提示类型缺失，需要补齐对应的 `.map` 文件；
- **参数文件没有覆盖所需类型** → 提示类型未被参数覆盖（AD4Zn 路径下尤其严格）。

---

## 三个需要单独记住的类型细节

### 1. AD4Zn 的 TZ

`TZ` 是 beta 协议 AD4Zn 特有的四面体方向伪原子，用来表达单核三配位 Zn 位点未被占用的那个方向。它由 DockStart 在准备阶段生成，**不在**常规元素类型里。

### 2. AD4Zn 的配位原子类型

AD4Zn 判定"谁在配位"时，只看这 6 种类型：

```text
O   OA   NA   N   S   SA
```

其他类型不会被视为配位原子。

### 3. 氢类型

配体的 PDBQT 里，氢对应的类型被限定为：

```text
H   HD
```

这两种在多配体共同对接的输入校验中被当作氢来处理。这也和 Vina 官方的说法一致 —— **输出中氢原子的位置不具物理意义**，不要拿去做结论。

---

## 总结

Atom type 是面向计算的分类而不是元素标签；AD4 与 Vina 各有一套命名，含义和写法都不同，不能互相对照使用。

---

## 相关页面

- 概念解释：[Atom Types](../part-a/search-space-and-scoring/atom-types.md)
- 网格与 maps：[Grid / Maps](../part-a/search-space-and-scoring/grid-and-maps.md)
- 各评分函数：[Vina scoring](../part-a/search-space-and-scoring/vina-scoring.md)、[Vinardo](../part-a/search-space-and-scoring/vinardo.md)、[AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- maps 相关文件与命名：[DockStart 支持格式表](./supported-formats.md)
- AD4Zn 协议的适用条件：[高级协议的适用范围](../part-c/advanced-protocols.md)
- 扩展名速查：[常见文件扩展名](./file-extensions.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/autogrid.py`，AD4 类型集合与类型规范化。
2. DockStart 源码 `backend/dockstart_core/vina_maps.py`，Vina / Vinardo 的 XS 类型集合。
3. DockStart 源码 `backend/dockstart_core/ad4zn.py`，`TZ` 伪原子与配位原子类型。
4. DockStart 源码 `backend/dockstart_core/multiple_ligands.py`，PDBQT 氢类型。
5. AutoDock4.2 User Guide，原子类型与非键参数。
6. AutoDock Vina 官方 Manual 与源码，XS atom typing scheme。
7. Meeko Documentation, *Interface for AutoDock*。

</details>
