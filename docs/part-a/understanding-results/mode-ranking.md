---
title: "Mode 排序"
sidebar_position: 4
---

import PoseFilterExplorer from '@site/src/components/interactive/PoseFilterExplorer';
import {PoseFilterModelNote} from '@site/src/components/interactive/TeachingNotes';
import DocNotes, {DocNote} from '@site/src/components/DocNotes';

# Mode 排序

Mode 排序是 Vina 把找到的候选 pose 按评分从好到差排列的结果；排在第 1 位的就是这次 docking 的最优结果。

---

## 排序是按照什么排的？

按照 affinity 排序，**数值越小（越负）越靠前**：

```text
mode |   affinity | dist from best mode
     | (kcal/mol) | rmsd l.b.| rmsd u.b.
-----+------------+----------+----------
1       -13.23          0          0
2       -11.29     0.9857      1.681
3       -11.28      3.044      12.41
```

这张表就体现了排序结果：mode 1 是评分最好的，往后依次变差。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

---

## 排序之前的几步处理

你看到的 mode 列表并不是搜索结果的原始顺序，中间经过了几步自动处理：

```text
搜索得到大量候选
      ↓
合并
      ↓
精修（refine）
      ↓
去重（按 min_rmsd）
      ↓
按评分排序
      ↓
按 num_modes / energy_range 输出
```

其中「去重」和「输出截断」是决定最终看到几个 mode 的关键。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 为什么 mode 数量会变化？

| 参数 | 作用 |
|---|---|
| `min_rmsd` | 彼此过于接近的 pose 会被视为重复而合并（默认 1.0 Å） |
| `num_modes` | 最多输出几个 |
| `energy_range` | 能量差超过范围的被过滤掉 |

所以控制 mode 数量和排序结果的，是这三个参数共同作用的结果。官方 FAQ 也指出，如果输出中的 mode 数量少于设定值，可能是因为搜索内部没有找到那么多有区别的模式，也可能是因为 `energy_range` 偏小。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

<PoseFilterExplorer focus="ranking" />

## 排序第一就一定是正确结合方式吗？

**不一定。**

排序第一只说明：

> **在当前评分模型下，它是最好的那一个。**

它不能说明：

```text
它一定是真实结合方式
它的亲和力等于实验值
```

原因在于评分函数本身是近似的。官方 FAQ 明确说明：评分函数和搜索都只是近似，最低点并不一定对应正确的构象。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 更实用的读法

与其只盯着 mode 1，更稳妥的做法是结合 RMSD 一起看：

```text
查看排在前面的一组 mode
      ↓
把 RMSD 很小的归为同一类（同一结合方式）
      ↓
看它们是否集中在同一个结合区域
```

如果前列的多个 mode 都落在同一区域、且彼此 RMSD 很小，那么“这个区域是主要候选”这一判断就比较稳。

反过来，如果前列 mode 分散在完全不同的区域，通常意味着搜索空间设得过大，或者这个体系本身就存在多个可能位点。

---

## 在 DockStart 中

DockStart 的结果列表就是按这个顺序呈现的。

对初学者，建议：

- 先看第 1 位，但不要把它当成唯一答案；
- 再结合 RMSD 判断后面的 mode 是不是同一类；
- 如果排序结果在不同次运行之间变化较大，考虑提高 `exhaustiveness`。

---

<DocNotes>

<DocNote number={1} title="固定候选集的筛选演示">

<PoseFilterModelNote />

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 FAQ, *Why don't I get as many binding modes as I specify with "--num_modes"?*.
3. AutoDock Vina 官方 FAQ, *Why do I not get the correct bound conformation?*.
4. AutoDock Vina 官方 Manual.

</details>
