---
title: "科学边界"
sidebar_position: 6
---

# 科学边界

## 简单概括

Docking 的分数和构象都是计算模型的预测；它可以用来排序、比较和提出假设，但不能当作实验测得的结合自由能或实验验证过的结构。

---

## 分数不是实验结合自由能

Vina 输出的 affinity 单位是 kcal·mol⁻¹，看起来很“物理”，但它来自**经验评分模型**，不是实验测量。

```text
可以这样用：同一次任务内比较不同 pose、比较同一批配体
不能这样用：直接当成实验的结合自由能或 Kd
```

而且官方 FAQ 指出：

- Vina 使用 **united-atom** 评分函数，只涉及重原子；
- Vina **忽略用户提供的 partial charges**；
- AutoDock 与 Vina 两个 forcefield 的 energy scores **不可直接比较**。

([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## Pose 不是实验结构

Docking 得到的是**预测的结合构象**，而不是实验观测到的结构。

它没有说明：

```text
这个分子在实验中一定以这种方式结合
这个分子一定有活性
```

官方 FAQ 把“得不到正确构象”的原因列了很长一串，其中包括输入质子化状态、搜索空间设置、评分函数的最低点本身就不在正确位置、受体的诱导契合效应、晶体结构质量等等。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

这说明一件重要的事：

> **docking 出错的原因可能来自模型、输入或方法本身，而不只是“运气不好”。**

---

## 搜索本身带有随机性

Docking 算法是**非确定性的**：同一次计算的重复运行也可能给出不同结果。

只有在**相同的随机种子 + 完全相同的输入和参数**下，才能得到精确一致的结果；输入的任何微小改动，效果可能等同于换一个种子。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

因此在记录和比较结果时，应该同时记录：

```text
输入结构
搜索空间
exhaustiveness
随机种子
使用的评分函数
```

---

## 模型本身的简化

Docking 是一个近似方法，其中包含若干简化。官方资料中明确提到的包括：

| 简化 | 含义 |
|---|---|
| 受体通常刚性处理 | 基本 docking 中受体不改变构象；柔性侧链需要额外设置 |
| 环通常保持刚性 | 官方 FAQ 指出 docking 期间环只能是刚性的 |
| 氢原子位置不精确 | united-atom 模型只涉及重原子 |
| 评分函数与搜索都是近似的 | 最低点不一定对应真实构象 |

([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

另外，AutoDock Vina **只面向受体—配体 docking**；如果需要做蛋白—蛋白对接，官方明确建议使用其他程序。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 准确度取决于体系

官方 FAQ 的第一条就指出：预测准确度**因靶点而差异很大**。

并建议：如果手上已有已知活性分子或带有天然配体的结构，应当**先针对自己的靶点评估** AutoDock Vina 的表现。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

因此：

> **不存在“Vina 在这个分数以上就一定结合”这样的通用阈值。**

---

## 那 docking 还能用来做什么？

它仍然非常有用，只是要放在正确的位置上：

```text
理解可能的结合方式
比较多个候选分子的相对高低
缩小实验筛选范围
提出结构层面的假设，供实验验证
```

一个合理的整体思路是：

```text
Docking
   ↓
计算预测
   ↓
提出结构假设
   ↓
实验验证
   ↓
修正认识
```

---

## 在 DockStart 中

DockStart 帮助你顺利完成 docking 工作流，但：

> **软件能成功运行，不等于计算结果在科学上已经被验证。**

因此在使用结果时，建议始终把下面三件事分开：

```text
程序是否正常运行      →  使用问题
结果在模型内是否合理   →  方法问题
结果是否符合真实体系   →  科学问题，需要实验回答
```

---

## 总结

Docking 提供的是计算预测：分数不等于实验结合自由能，pose 不等于实验结构，搜索带有随机性，模型本身也有刚性受体、刚性环等简化；它适合用于排序、比较和提出假设，而不是替代实验。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 FAQ, *How accurate is AutoDock Vina?*.
2. AutoDock Vina 官方 FAQ, *Why do I not get the correct bound conformation?*.
3. AutoDock Vina 官方 FAQ, *I changed something, and now the docking results are different. Why?*.
4. AutoDock Vina 官方 Basic Docking 文档（关于不同 forcefield 分数不可比较的提示）.
5. AutoDock Vina 官方 Manual.

</details>
