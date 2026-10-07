---
title: "Global Docking, Score Only and Local Optimization"
sidebar_label: "Three calculation tasks"
sidebar_position: 1
---

# Global Docking, Score Only and Local Optimization {#三种计算任务global-docking--score-only--local-optimization}

Choose whether you want to find a pose, evaluate an existing pose or refine an existing pose. The inputs and meanings of the outputs differ.

## Which task should I choose? {#选择哪一种}

| Question | Task | Starting pose | Main result |
| --- | --- | --- | --- |
| How might the ligand bind? | Global Docking | No established binding pose required | Searched poses and scores |
| How does this supplied pose score? | Score Only | Required and must be confirmed | Energy breakdown without pose search |
| What changes near this supplied pose? | Local Optimization | Required and must be confirmed | Input and optimized poses, scores and displacement |

Global Docking searches within the defined box. Score Only evaluates supplied coordinates. Local Optimization searches near those coordinates. Keep these result types distinct.

## Suggested reading {#阅读路线}

Start with [receptors](../part-a/docking-components/receptor.md), the [docking box](../part-a/search-space-and-scoring/search-box.md) and [Basic Docking — 1IEP](./cases/basic-docking-1iep.md). For a known experimental or prepared pose, read the [task FAQ](../part-c/faq-task-types.md) for input confirmation, files and displacement metrics.
