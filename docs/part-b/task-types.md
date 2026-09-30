---
title: "三种计算任务：Global Docking / Score Only / Local Optimization"
sidebar_position: 1
sidebar_label: "A. 三种计算任务"
---

# 三种计算任务：Global Docking / Score Only / Local Optimization

## 简单概括

先确定你要解决的是“找姿势”“评价已有姿势”，还是“微调已有姿势”，再选择运行模式。三种任务的输入、搜索范围和输出含义不同。

---

## 选择哪一种

| 你的问题 | 选择 | 输入姿势 | 主要结果 |
| --- | --- | --- | --- |
| 配体可能以什么方式结合？ | Global Docking（全局对接） | 不要求给定结合姿势 | 搜索得到的多个 pose 与评分 |
| 这个已经给定的姿势在当前模型里得多少分？ | Score Only（姿势评分） | 必须提供并确认 | 输入姿势的能量分解，不搜索新姿势 |
| 已有姿势在附近小幅调整会怎样？ | Local Optimization（局部优化） | 必须提供并确认 | 输入与优化后姿势、评分及位移 |

全局对接在指定 Box 内搜索；姿势评分只评价现有构象；局部优化围绕现有构象做局部搜索。评分、优化和全局搜索回答不同的问题，不能把数值直接混作同一类结果。

---

## 阅读路线

第一次使用，先阅读 [受体与配体](../part-a/docking-components/receptor.md)、[搜索框](../part-a/search-space-and-scoring/search-box.md) 与 [Basic Docking — 1IEP](./cases/basic-docking-1iep.md)。

已有共晶或人工准备的输入姿势时，再读 [Global / Score / Local FAQ](../part-c/faq-task-types.md)；那里详细解释前后评分、输出文件、输入确认和位移指标。

## 总结

按研究问题选任务，记录输入结构与评分函数，并只在同一协议条件下解读分数差异。
