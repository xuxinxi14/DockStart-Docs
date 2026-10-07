---
title: "Seed"
sidebar_position: 6
---

# Seed {#seed}

The seed controls the random sequence used by the search. Keeping it fixed supports reproducibility when all other inputs, parameters and relevant versions are also unchanged.

## What is a seed? {#seed-是什么}

Vina starts from random poses and makes random perturbations. Its default seed value `0` requests automatic generation. The actual seed is printed in the log, for example:

```text
Performing docking (random seed: -1622165383) ...
```

See [Basic Docking](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/docking_basic.rst).

## Why record the generated seed? {#为什么要把种子打印出来}

You can reuse it with `--seed -1622165383` when reproducing that calculation, even if you did not select it manually on the first run.

## Is a fixed seed enough? {#固定种子就能保证结果一模一样吗}

Inputs and parameters must also match. Small input changes can alter the result much like a new random seed. See the [Vina FAQ](https://github.com/ccsb-scripps/AutoDock-Vina/blob/develop/docs/source/faq.rst).

## Why use a fixed seed? {#那为什么还要用-seed}

It helps investigate whether a difference comes from random sampling or another changed condition. Compare complete run records instead of assuming the seed explains every difference.

## Will changing seeds fix unstable results? {#结果不稳定时换种子有用吗}

It may find a pose that the previous search missed. It cannot repair an inappropriate scoring model or input structure. Check preparation and box placement before repeatedly changing seeds.

## In DockStart {#在-dockstart-中}

Record the actual seed, exhaustiveness, search box and exact input files together. They form part of a traceable calculation record.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina FAQ, *I changed something, and now the docking results are different. Why?*
2. AutoDock Vina FAQ, *Why is my docked conformation different from what you get in the video tutorial?*
3. AutoDock Vina Basic Docking documentation.

</details>
