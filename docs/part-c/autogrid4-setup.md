---
title: "配置 AutoGrid4"
sidebar_position: 3
sidebar_label: "配置 AutoGrid4"
---

# 配置 AutoGrid4

## 简单概括

AutoGrid4 不随 DockStart 安装包分发，需要自行准备并配置路径。标准 AD4 与水合 AD4 要求 4.2.6+，AD4Zn 要求 4.2.7+。

---

## 什么时候需要它

**不是所有对接都需要 AutoGrid4。** 先看这张表，判断你要不要往下读：

| 你想做的事 | 需要 AutoGrid4 吗 |
|---|---|
| 普通 Vina 对接（Basic / Assisted / 批量 / 多配体 / 大环） | **不需要** |
| Vina / Vinardo 预计算 maps 复用 | 不需要（用的是 Vina 自己的 `--write_maps`） |
| 标准 AutoDock4（maps）协议 | **需要** |
| 水合 AD4 | **需要** |
| AD4Zn beta | **需要，且必须是 4.2.7+** |

换句话说：**只要你一直在用 Vina 评分函数，AutoGrid4 缺失完全不影响你。** 工具链页把它标成"未配置"，但那不表示你的 DockStart 装坏了。

---

## 版本门禁：4.2.6 与 4.2.7 的分界

标准 AD4 与 AD4Zn 的最低版本不同：

| 协议 | 最低 AutoGrid4 版本 |
|---|---|
| 标准 AutoDock4（maps） | 4.2.6 |
| 水合 AD4 | 4.2.6 |
| **AD4Zn beta** | **4.2.7** |

三条都来自源码里的硬门禁：

```text
AD4_MIN_AUTOGRID_VERSION   = (4, 2, 6)
AD4ZN_MIN_AUTOGRID_VERSION = (4, 2, 7)
```

判断规则很简单：

```text
协议是 ad4zn_beta  →  要求 >= 4.2.7
其他协议           →  要求 >= 4.2.6
```

**后果要提前知道：**

- 装上 4.2.6 → 标准 AD4 和水合 AD4 可用，**AD4Zn 会被直接拦下**；
- 版本不满足时 DockStart **不会降级**成标准 AD4 硬跑，而是阻止运行并说明门禁；
- 版本号必须能解析成 `x.y.z` 三段。**输出里没有可识别的三段版本号，即使文件存在也会被判为"无法确认身份"。**

---

## 第 1 步：先判断你有没有

**别急着下载。** 很多人机器上其实已经有了。

### 方法一：看工具链页（推荐）

打开 DockStart 的**工具链**页，找到 AutoGrid4 卡片，读四个字段：

```text
来源     尚未找到 / 你填的路径 / 系统 PATH
版本     未获取 / 4.2.6 / ...
路径     未获取 / <exe 路径>
影响范围  未检测到 AutoGrid4；仅 AutoDock4 (maps) 协议需要该外部 GPL 工具。
```

如果"版本"显示出了具体数字，**说明已经配好了，直接跳到第 5 步验证能不能算就行。**

### 方法二：手动问它一句

在放 `autogrid4.exe` 的目录里开一个终端：

```text
autogrid4.exe --version
```

正常会输出类似：

```text
AutoGrid 4.2.6
compilation options:
  ...
 License GPLv2+: GNU GPL version 2 or later
```

看到 `AutoGrid 4.2.6` 或更高就对了。

**如果这一步就报错**（闪退、缺 DLL、"不是内部或外部命令"），那说明文件有问题或路径不对，先别往下配。

### 一个常见误解

**AutoDockTools / MGLTools 里通常不含它。** MGLTools 是图形界面工具，`autogrid4.exe` 和 `autodock4.exe` 是分开的 AutoDock 套件。所以"我装过 MGLTools"不等于"我有 AutoGrid4"。

---

## 第 2 步：拿到 autogrid4.exe

**这一节只针对还没装的读者。已经有的直接跳第 3 步。**

### 官方渠道的情况

AutoGrid4 与 AutoDock4 一样，由 Scripps 研究院按 **GNU GPL** 发布：

- AutoDock 官方下载页：[autodock.scripps.edu/download-autodock4](https://autodock.scripps.edu/download-autodock4/)
- AutoGrid 源码仓库：[github.com/ccsb-scripps/AutoGrid](https://github.com/ccsb-scripps/AutoGrid)
- AutoDock4 源码仓库：[github.com/ccsb-scripps/AutoDock4](https://github.com/ccsb-scripps/AutoDock4)

**但要有心理准备：官方以源码为主。** 核对过的实际情况是，`AutoGrid` 仓库有 `v4.2.8`、`v4.2.9` 等标签，**但 release 里没有任何预编译二进制**；`AutoDock4` 仓库的 release 是空的。也就是说官方并没有提供 Windows 的可执行文件。

### 于是 Windows 上实际有三条路

| 做法 | 难度 | 说明 |
|---|---|---|
| **A. 用别人编译好的 Windows 版 `autogrid4.exe`** | 最低 | 最常见的做法。科研机构、教学资料、镜像站常有分发；网上教程里的安装包多属此类 |
| **B. 自己编译** | 高 | 从源码仓库取源码，用 C 编译器构建，产出 `autogrid4.exe` |
| **C. 用 WSL / Linux 版** | 中 | 官方有 Linux 版；但 DockStart 是 Windows 桌面应用，跨环境调用会很别扭 |

绝大多数 Windows 用户走的是 A。

> **⚠️ 走 A 就必须自己负责来源。**
> DockStart 对 AutoGrid4 只做两件检查：**文件在不在**、**能不能执行并报出版本号**。
> 它**不校验**这个二进制是谁编译的、从哪里下载的、有没有被改过。
> 从不受信任的地方拿可执行文件是有风险的事——请自行确认来源，能核对哈希就核对。

### 你只需要一个文件

**DockStart 只用 `autogrid4.exe` 这一个文件。** 不需要 AutoDockTools，不需要 MGLTools，不需要 `autodock4.exe`，也不需要整套目录结构。

---

## 第 3 步：放到哪里

**放哪都行。** DockStart 只要求路径能被它读到。两条建议：

```text
① 路径里不含中文和空格 —— 最省事，避免各种命令行转义问题
② 放在一个以后不会随手删掉的目录里 —— 项目记录会引用这个路径
```

一个典型布局：

```text
C:\AutoDock\
  autogrid4.exe
```

**注意：那个目录里只有这一个文件也是可以正常工作的。** 详见后面"三件不需要做的事"。

---

## 第 4 步：在 DockStart 里配置

### 操作路径

```text
工具链页
  ↓
找到 AutoGrid4 卡片（状态是"未配置"）
  ↓
点「配置 AutoGrid4 路径」
  ↓
填入 autogrid4.exe 的路径
  ↓
保存
  ↓
回到卡片点"重新检测"（或刷新页面）
```

### 路径可以填两种写法

源码里的解析逻辑接受**两种**：

```text
① 直接指向文件      C:\AutoDock\autogrid4.exe
② 指向所在目录      C:\AutoDock
                   —— 程序会自动在该目录里找 autogrid4.exe 或 autogrid4
```

**填目录更省事**，以后换 exe 文件名也不用再改配置。

顺带一提：路径两端的引号和空格会被自动去掉，所以从资源管理器复制粘贴过来的带引号路径也能用。

### 配置成功后应该看到什么

| 字段 | 期望值 |
|---|---|
| 状态 | `ok` |
| 版本 | `4.2.6`（或你实际装的版本） |
| 路径 | 你填的那个 exe |
| 来源 | `configured` |
| 提示 | 已检测到外部 AutoGrid4，可用于生成 AutoDock4 affinity maps |

**"来源"这一栏值得留意：**

- `configured` —— 用的是**你填的**路径；
- `auto` —— 你没填，程序**从系统 PATH 里**自己找到了；
- `missing` —— 两处都没有。

所以"必须配置"这句话要稍微修正一下：**DockStart 会先看你填的路径，没填就去 PATH 里找。** 你把 `autogrid4.exe` 所在目录加进系统 PATH，效果是一样的，只是不推荐——将来换机器、换账户时更难查。

### 兜底：直接改配置文件

设置页填的路径存在一个 JSON 文件里。**桌面版**（Tauri 打包）会把它放在应用配置目录：

```text
%APPDATA%\org.dockstart.desktop\dockstart_settings.json
```

本机检出的应用标识是 `org.dockstart.desktop`。文件长这样：

```json
{
  "tool_paths": {
    "vina": "",
    "python": "",
    "autogrid4": "C:\\AutoDock\\autogrid4.exe"
  },
  "project": {
    "default_project_dir": ""
  },
  "docking_defaults": {
    "scoring": "vina",
    "exhaustiveness": 8,
    "num_modes": 9,
    "energy_range": 4,
    "cpu": 0,
    "seed": null
  }
}
```

两个注意点：

- **JSON 里的反斜杠要写两个**（`\\`）。写成单个 `\` 会让整个文件解析失败。
- **改之前先退出 DockStart**，改完再启动。否则界面里的一次保存可能把你的手改覆盖掉。

这个位置可以被环境变量 `DOCKSTART_SETTINGS_PATH` 覆盖。**如果你在界面里看到这句话，就说明当前用的是被覆盖后的路径**，别去找上面那个文件了。

---

## 第 5 步：确认它真的能算

**"检测到"不等于"能出结果"。** 这一步要跑一次真实生成。

```text
配好 AutoGrid4
  ↓
建一个项目，准备受体 / 配体 PDBQT，保存 Box
  ↓
评分协议切到 AutoDock4（maps）
  ↓
检查 spacing、X/Y/Z 偶数点数、受体与配体原子类型
  ↓
点「生成并校验 maps」
```

生成结束后，去项目里找这个文件：

```text
maps/<map_set_id>/autogrid.glg
```

**在结尾附近找这一行：**

```text
Successful Completion.
```

**只有看到它，才算真的通了。** 旁边还应该有 `Real= ... CPU= ...` 的耗时统计。

如果失败，`autogrid.glg` 和同目录的 `stderr.txt` 就是第一现场——排查表见后面。

### 生成一次之后就不用再配了

maps 生成成功后会**冻结在项目里**并记录哈希。之后哪怕把 AutoGrid4 从机器上删掉，**已发布且完整性有效的 maps 也不自动失效**，仍然可以拿来跑对接。

---

## 三件不需要做的事

这三条都是"网上教程让你做、但 DockStart 这套流程里不需要"的：

### ① 不需要额外准备 `AD4_parameters.dat`

AutoDock 的老教程常要求把参数文件放在工作目录里。**实测不需要。**

一次干净的验证是这么做的：在一个**全新的空目录**里，只放一个 `receptor.gpf` 和受体 PDBQT，**整个目录里没有任何 `.dat` 文件**，指定 `autogrid4.exe` 的目录里也没有。直接运行：

```text
autogrid4.exe -p receptor.gpf -l autogrid.glg
```

结果 exit code 为 `0`，日志结尾是 `Successful Completion.`，全部 map 文件正常生成，受体原子的类型赋值（A / C / HD / N / NA / OA / SA）全部正确。

**也就是说：AutoGrid4 4.2.6 不需要外部参数文件即可工作。**

> 顺带说明：DockStart 生成的 GPF 里，**标准 AD4 和水合 AD4 都不写 `parameter_file` 行**。
> 这不是遗漏，是因为默认参数就够用。
> 水合 AD4 更是明确**不接受**自定义参数文件——传进去会直接报错。

### ② 不需要配系统 PATH

设置页里的路径优先于 PATH，填了就不用动环境变量。

### ③ 不需要装完整的 AutoDock 套件

一个 `autogrid4.exe` 就够。

---

## 排查表

| 现象 | 可能原因 | 处理 |
|---|---|---|
| 状态 `missing`，来源 `missing` | 没填路径，PATH 里也没有 | 填路径；或确认文件真的还在 |
| 状态 `error`，提示"路径不是可读取文件" | 路径写错 / 指向了目录但目录里没有 exe / 文件被删 | 用资源管理器复制完整路径重填；填目录时确认里面有 `autogrid4.exe` |
| 状态 `error`，提示"无法确认其命令行身份" | 文件在，但执行不起来 | 手动跑 `autogrid4.exe --version` 看报什么错。常见是**缺 DLL**、文件损坏、或下载到的是别的程序 |
| 检测到但版本为空 | 输出里没有可识别的 `x.y.z` | 换一个来源的构建；这个版本会被门禁判为不满足 |
| 版本显示 `4.2.6`，但 AD4Zn 说门禁不满足 | AD4Zn 要求 4.2.7+ | 正常行为，**不是 bug**。要么换 4.2.7+，要么不用 AD4Zn |
| 生成 maps 失败，`autogrid.glg` 报 `Too many "map" keywords` | GPF 里 `map` 行数多于 `ligand_types` 声明的类型数 | 这是 GPF 生成问题，不是 AutoGrid4 的问题，报给 DockStart |
| 生成 maps 失败，日志报 "unknown atom type" | 配体里出现了受体 maps 未覆盖的原子类型 | 检查受体/配体 PDBQT 的原子类型列表 |
| Box 太大直接报错 | AutoGrid4 每轴网格点上限 | 减小 Box 尺寸，或在科学上合理时增大 spacing。**DockStart 不会静默截断网格** |

最后一条的数值背景：源码里对每轴网格点有上限判断，超限时明确提示"AutoGrid4 的 npts 使用每轴偶数点数"，并建议先使用系统根据 Box 推导的默认值。

---

## 总结

配置好 AutoGrid4 后，确认检测版本满足所选协议的要求。生成 maps 时再检查 `autogrid.glg` 是否以 `Successful Completion.` 结束；路径检测成功只是第一步。

---

## 相关页面

- 工具链全貌与解析优先级：[工具链](./toolchain.md)
- AutoGrid4 是什么、为什么要它：[AutoGrid4](../part-a/docking-components/autogrid4.md)
- Maps 与 AD4 评分的关系：[Grid / Maps](../part-a/search-space-and-scoring/grid-and-maps.md)、[AutoDock4 scoring](../part-a/search-space-and-scoring/autodock4-scoring.md)
- 高级协议各自的适用范围与边界：[高级协议的适用范围](./advanced-protocols.md)
- 工具缺失导致的其它运行失败：[常见错误与恢复](./common-errors-and-recovery.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/adapters/autogrid_adapter.py`：检测、版本正则、两种路径写法、调用参数数组、超时。
2. DockStart 源码 `backend/dockstart_core/autogrid.py`：版本门禁常量 `AD4_MIN_AUTOGRID_VERSION` / `AD4ZN_MIN_AUTOGRID_VERSION`、GPF 生成（标准与水合协议不写 `parameter_file`）、maps manifest 与校验。
3. DockStart 源码 `backend/dockstart_core/settings.py`：`autogrid4` 路径的读写、`DOCKSTART_SETTINGS_PATH`、配置文件位置。
4. DockStart `docs/user_guide.md`（AutoDock4 maps 工作流、AD4Zn beta 的安装要求）与 `docs/license_notes.md`（"仅从用户配置路径或 PATH 检测"）。
5. DockStart 源码 `apps/desktop/src-tauri/src/main.rs`：桌面版把配置文件指向应用配置目录。
6. [AutoDock 官方下载页](https://autodock.scripps.edu/download-autodock4/)。
7. [AutoGrid 源码仓库](https://github.com/ccsb-scripps/AutoGrid)。
8. [AutoDock4 源码仓库](https://github.com/ccsb-scripps/AutoDock4)。
9. AutoDock4.2.6 User Guide。

</details>
