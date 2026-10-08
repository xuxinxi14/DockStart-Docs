---
title: "Vina 搜索过程"
sidebar_position: 1
---

import SearchExplorer from '@site/src/components/interactive/SearchExplorer';
import {SearchModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Vina 搜索过程

Vina 的搜索过程是在搜索空间里反复进行“随机改变构象 → 局部优化 → 取舍”的独立计算，最后把找到的候选 pose 合并、去重、排序。

---

## 搜索开始前：先把网格算出来

使用 Vina scoring function 时，Vina 会**在 docking 之前先在内部计算所需的网格**。

```text
受体 + Box
    ↓
Vina 内部计算网格
    ↓
开始搜索
```

这一点与 AutoDock4 工作流不同：AutoDock4 通常需要用户先用 AutoGrid4 生成外部的 affinity maps，而 Vina 自己会在内部完成这一步。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 一次 docking 不等于“跑一次”

Vina 的全局搜索由**若干次相互独立的运行（run）**组成，每一次都从随机的构象出发。

每一次运行内部又由多个连续的步骤组成，每个步骤包括三件事：

```text
随机扰动构象
    ↓
局部优化
    ↓
决定这一步是否接受
```

其中局部优化使用的是 **BFGS 算法**（Broyden–Fletcher–Goldfarb–Shanno），并在“位置—朝向—可旋转键”这些坐标上反复计算评分函数及其导数。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

<SearchExplorer />

## 步数和运行次数分别由谁决定？

这两件事的确定方式不同：

| 项目 | 由什么决定 |
|---|---|
| 每次运行的**步数** | 根据配体（以及柔性侧链）的大小和柔性**按启发式规则**决定 |
| 运行的**次数** | 由 `exhaustiveness` 参数决定 |

```text
exhaustiveness  →  跑多少次独立搜索
启发式规则      →  每次搜索走多少步
```

因此 `exhaustiveness` 调大，增加的是**独立搜索的次数**，而不是单次搜索的长度。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 中间结果不会被浪费

与 AutoDock4 不同，Vina 的每一次运行都可以产出多个结果：搜索过程中出现的**有希望的中间结果会被保留下来**。

这些结果随后会被自动处理：

```text
合并
 ↓
精修
 ↓
聚类
 ↓
排序
```

最终形成你在输出里看到的 mode 列表。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 搜索结果不是唯一的

Docking 算法本身是**非确定性的**。

即使评分函数的最低点正好对应正确的构象，搜索过程也可能没有找到它；换一个随机起点再跑，结果可能不同。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

所以要这样理解结果：

> **一次 docking 得到的是“这一次搜索找到的最好答案”，而不是“这个体系唯一的答案”。**

---

## 在 DockStart 中

在 DockStart 中点击运行后，底层执行的就是上面这一套过程。

所以当你觉得结果不够稳定、想让它更可靠时，通常可调的是：

- `exhaustiveness`：跑多少次独立搜索；
- 搜索空间 Box 的大小；
- `seed`：换一个随机起点。

这几个参数的含义会在后面几篇分别介绍。

---

<DocNotes>

<DocNote number={1} title="搜索示意模型">

<SearchModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 FAQ, *What does "exhaustiveness" really control, under the hood?*.
2. AutoDock Vina 官方 FAQ, *Why is my docked conformation different from what you get in the video tutorial?*.
3. AutoDock Vina 官方 Basic Docking 文档.
4. AutoDock Vina 官方 Manual.

</details>
