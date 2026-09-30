---
title: "CPU"
sidebar_position: 5
---

# CPU

## 简单概括

CPU 参数决定 Vina 使用多少个处理器核心进行计算；默认值为 0，表示自动检测并使用可用的核心。

---

## 默认值是什么？

| 项目 | 值 |
|---|---|
| 默认值 | `0` |
| 含义 | 自动检测 CPU 数量；如果检测失败，则使用 1 个 |

Vina 的命令行帮助对 `--cpu` 的说明是：要使用的 CPU 数量，默认会尝试检测 CPU 数量，检测不到时使用 1。([AutoDock Vina 官方 Basic Docking 文档](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst))

所以：

```text
--cpu 0      →  自动（默认）
--cpu 4      →  只用 4 个核心
```

---

## 为什么它和搜索有关？

因为 Vina 的全局搜索由**若干次相互独立的运行**组成，而这些运行是可以并行执行的。

```text
exhaustiveness = 8
        ↓
8 次独立搜索
        ↓
可以分给多个 CPU 核心同时跑
```

官方 FAQ 提到：各个运行在适当的情况下是并行执行的，因此 `exhaustiveness` 在某种程度上也**限制了并行度**。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 一个常见现象：CPU 没有全部用上

如果 `exhaustiveness` 比可用的 CPU 核心数还小，程序可能无法把所有核心都用满，Vina 会给出提示：

> At low exhaustiveness, it may be impossible to utilize all CPUs.

也就是说：

```text
exhaustiveness = 2，CPU 有 8 个
     ↓
最多只有 2 个核心能同时干活
```

这种情况下，想让多核发挥作用，应该**提高 exhaustiveness**，而不是只增加 CPU 数量。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 调整 CPU 会改变结果吗？

CPU 数量影响的是**并行方式**，而不是搜索使用的评分模型或参数。

需要注意：由于搜索本身是非确定性的，改变并行方式后，**具体结果仍可能有细微差别**；如果要求完全可重复，需要固定随机种子并保持其他输入与参数一致。([AutoDock Vina 官方 FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst))

---

## 在 DockStart 中

在 DockStart 中，CPU 属于运行环境相关设置。

对初学者来说，实用建议是：

```text
一般保持默认（自动）即可
    ↓
如果算得很慢，并且 exhaustiveness 明显大于核心数
    ↓
再考虑 CPU 设置是否有意义
```

简单说：**CPU 决定“算多快”，exhaustiveness 决定“算多仔细”。**

---

## 总结

CPU 参数决定 Vina 并行使用多少个处理器核心，默认值 0 表示自动检测；它影响计算速度，但并行度受 exhaustiveness 限制，因此两者需要配合考虑。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Basic Docking 文档.
2. AutoDock Vina 官方 FAQ, *What does "exhaustiveness" really control, under the hood?*.
3. AutoDock Vina 官方 Manual.

</details>
