---
title: "Docking box"
sidebar_position: 1
---

# Docking box {#box}

The docking box defines the three-dimensional region in which the ligand and any flexible receptor atoms are searched.

## What does the box define? {#什么是-box}

It answers where the program can look for binding arrangements. Vina defines it through three center coordinates and three dimensions, in Å. See the [Vina manual](https://vina.scripps.edu/manual/).

## Center and dimensions {#box-的中心和大小}

| Settings | Meaning |
| --- | --- |
| `center_x`, `center_y`, `center_z` | Position of the box center |
| `size_x`, `size_y`, `size_z` | Full lengths along the three axes |

## Why choose the box carefully? {#为什么-box-不能随便设置}

A small box can exclude relevant ligand or side-chain motion. A large box increases the search space. Keep it as small as practical while covering plausible binding arrangements; larger regions may require higher `exhaustiveness`.

## Is the box the binding site? {#box-和-binding-site-是一回事吗}

The binding site is a structural or functional region of the protein. The box is a computational region you define around it, with enough room for the intended search.

## In DockStart {#在-dockstart-中}

Set the box for the chosen task and inspect its placement in 3D. Global Docking searches within this defined box; choose its location and dimensions for the site you intend to investigate.

<details className="guide-references">
<summary id="参考资料">References</summary>

1. AutoDock Vina manual, *Search Space* and *Configuration File*.
2. Meeko, `mk_prepare_receptor.py`.

</details>
