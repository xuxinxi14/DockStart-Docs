---
title: "Box"
sidebar_label: "Box（搜索盒）"
sidebar_position: 1
---

# Box

## 简单概括

Box（搜索框）定义 docking 在三维空间中的搜索范围，也就是程序允许配体和柔性受体原子进行搜索的区域。

---

## 什么是 Box？

可以把 Box 理解成 docking 时在蛋白质周围画出的一个三维“盒子”：

```text
       ┌─────────────────┐
      /                 /|
     /      ligand     / |
    /       ↓         /  |
   └─────────────────┘   |
   |     binding       |  |
   |      site         | /
   |                   |/
   └───────────────────┘
```

这个盒子规定：

> **程序可以在哪里寻找配体的结合方式。**

在 AutoDock Vina 中，搜索空间由中心坐标 `center_x`、`center_y`、`center_z` 和尺寸 `size_x`、`size_y`、`size_z` 定义，长度单位为 Å。([AutoDock Vina](https://vina.scripps.edu/manual/))

---

## Box 的中心和大小

Vina 中通常需要指定：

```text
center_x
center_y
center_z
```

表示搜索空间中心的位置。

同时指定：

```text
size_x
size_y
size_z
```

表示盒子在三个方向上的尺寸。

因此可以简单理解为：

```text
center
↓
“盒子放在哪里”

size
↓
“盒子有多大”
```

---

## 为什么 Box 不能随便设置？

因为搜索空间直接限制了 docking 搜索。

如果 Box 太小，配体或者柔性侧链可能无法充分探索目标结合区域；如果 Box 很大，程序需要搜索的空间也会变大，计算难度通常会增加。

Vina 官方建议搜索空间应当**尽可能小，但不能小到排除可能的结合位置**；对于较大的搜索空间，还可能需要提高 `exhaustiveness`。([AutoDock Vina](https://vina.scripps.edu/manual/))

所以设置 Box 时需要同时考虑：

> **目标结合区域有多大，以及配体需要多大的运动范围。**

---

## Box 和 binding site 是一回事吗？

**不是完全一样的概念。**

Binding site 是蛋白质上的一个结构或功能区域，而 Box 是计算时人为定义的一个三维搜索区域。

例如：

```text
蛋白质上的结合位点
        ↓
根据研究目的确定搜索区域
        ↓
设置 Box
```

Box 通常会覆盖目标结合位点，并留出足够空间让配体进行搜索。

---

## 在 DockStart 中

在 DockStart 中，用户最终需要为 docking 任务确定搜索区域。

因此看到 Box 时，可以直接理解为：

> **“我要让程序在哪里找？”**

不同 docking 任务可能使用不同的 Box。尤其是 Global Docking、特定位点 docking 等任务，它们的搜索范围设置可能不同。

---

## 总结

Box 是 docking 的三维搜索边界，由中心和尺寸定义；它决定程序在哪个空间范围内寻找配体的可能结合方式，因此需要覆盖目标区域，但不宜无目的地设置得过大。

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. AutoDock Vina 官方 Manual, *Search Space*.
2. AutoDock Vina 官方 Manual, *Configuration File*.
3. Meeko Documentation, `mk_prepare_receptor.py`.

</details>
