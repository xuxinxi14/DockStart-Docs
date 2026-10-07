---
title: "CPU"
sidebar_position: 5
---

# CPU {#cpu}

The CPU setting controls how many processors Vina uses. `0` means automatic detection.

## What is the default? {#默认值是什么}

The default is `0`. Vina detects the available CPU count and falls back to one if detection fails. `--cpu 4` requests four. See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## How does it relate to search? {#为什么它和搜索有关}

Independent Vina searches can run in parallel. `exhaustiveness` therefore also limits available parallel work. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

## Why might not every CPU be used? {#一个常见现象cpu-没有全部用上}

At low exhaustiveness, there may be fewer searches than CPUs. For example, two independent searches cannot fully occupy eight CPUs. Increasing CPU count alone does not create more search tasks.

## Can changing CPU use affect a result? {#调整-cpu-会改变结果吗}

CPU count affects parallel execution, rather than the scoring model. For reproducible comparisons, keep the seed, inputs, parameters and relevant execution environment consistent.

## In DockStart {#在-dockstart-中}

Automatic detection is usually sufficient. Review CPU settings when performance is a concern, together with exhaustiveness and available cores. CPU use concerns execution speed; exhaustiveness concerns search effort.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina Basic Docking documentation and manual.
2. AutoDock Vina FAQ, *What does "exhaustiveness" really control, under the hood?*

</details>
