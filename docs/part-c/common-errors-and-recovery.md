---
title: "常见错误与恢复"
sidebar_position: 10
sidebar_label: "J. 常见错误与恢复"
---

# 常见错误与恢复

## 简单概括

遇到错误时，先保留项目与日志，再按预检查提示或错误码定位问题。修改输入或环境后重新运行，避免直接改动已经保存的运行证据。

---

## 出现错误后从哪里查

先保留项目和日志，再按界面的阻塞项或错误码查表。如果不确定是什么问题，记录发生在哪一步、完整报错，以及此前改过哪些输入或设置。

修正输入或环境后重新运行，比直接修改已有运行记录更便于排查。下面先说明两条通用规则，再按准备、运行和结果读取阶段列出处理方法。

---

## 先认识两条通用规则

### 规则一：DockStart 用结构化错误回应你

后端返回的错误对象长这样：

```text
error
 ├─ code        错误码（大写下划线，比如 VINA_RUN_FAILED）
 ├─ message     中文说明，告诉你怎么回事
 ├─ raw_error   底层原始错误，用来排查根因
 └─ suggestion  下一步建议
```

界面上通常展示 message 和 suggestion。排查时按这个顺序看：**message 看现象 → suggestion 看动作 → raw_error 看根因。**

记错误码很有用：报问题时把 `code` 一起贴出来，比描述一百字现象都管用。

### 规则二：失败不会破坏已有的好结果

这是设计上的保证，不是巧合：

- 运行失败不会覆盖上一份可用产物；
- 准备失败不会让项目里可用的指针回退；
- 生成 maps 失败时，原先的 active maps 仍然可用；
- 中断的 preparation **不会采用候选输出**。

所以看到失败时，第一反应应该是**保留现场、查日志、修好后重跑**，而不是急着删文件。删了反而可能把现场弄没了。

---

## 排查模板

本页下面所有条目都按这个格式组织：

```text
错误现象
   ↓
可能原因
   ↓
检查方法
   ↓
处理方法
   ↓
什么时候应该停下来
```

如果提示需要换输入或修复工具环境，可以先处理这些条件，再尝试运行参数。

---

## 运行前：右侧栏出现 N 个阻塞项

| 项 | 内容 |
|---|---|
| 现象 | 运行面板右侧显示"N 个阻塞项"，运行按钮点不动 |
| 原因 | 运行前检查发现某些 `blocking` 项没满足 |
| 检查 | 逐条看检查列表的状态和说明；非 ok 的条目通常带"修复"按钮 |
| 处理 | 点"修复"跳到对应页面处理，回来点"重新检查" |
| 停止条件 | 修完还报同一项 → 记下完整错误码和 message，再上报 |

运行前检查覆盖的内容：项目、柔性受体、maps 模式与受体、受体/配体 PDBQT、柔性侧链、输入姿势确认、结构审查、Box、Vina 参数、CPU、maps 就绪、AutoGrid4、配置、Vina 工具、Vina 能力、输出目录、磁盘空间。

**注意：这一排全是绿色，只表示文件和工具都可用，不代表你的结构方案在科学上是对的。**

---

## 一个界面层面的已知问题（当前源码存在）

| 项 | 内容 |
|---|---|
| 现象 | 打开"准备运行任务"页面时整页白屏，没有任何报错提示 |
| 原因 | 后端进程级失败时，界面收到的是兜底错误载荷 `PYTHON_BACKEND_ERROR`，这个载荷**不含 `blockers` 字段**；而页面头部有一处代码直接读了 `blockers.length`，遇到缺字段就抛错、中断渲染 |
| 检查 | 看是不是出现了错误码 `PYTHON_BACKEND_ERROR`（这通常意味着 Python 后端没能正常启动） |
| 处理 | 重新打开应用；如果还是失败，按提示重装或恢复完整的应用目录 |
| 停止条件 | 反复出现 → 说明后端运行环境有问题，先去修工具链/安装，别继续调参数 |
| 适用版本 | DockStart 0.14.3（当前源码版本）；修复后本条会随版本更新调整 |
| 反馈 | 若在 0.14.3 上能稳定复现，可通过项目 Issues 反馈：https://github.com/xuxinxi14/DockStart/issues |

这一处已经确认是源码缺陷（同一个文件里另一处同类访问已经用了可选链，只有这一处漏了）。**本文档只记录现象和绕行方式，不修改软件源码。**

---

## 运行阶段

| 错误码 | 现象 | 原因 | 处理 | 何时停止 |
|---|---|---|---|---|
| `VINA_RUN_FAILED` | 运行失败，没产出构象文件 | Vina 返回非 0，或输出文件缺失 | 看本次 run 的 `stderr.txt` / `log.txt`；修好后**新建一个 run** 重试 | 同一输入连续失败 → 回到结构准备检查 |
| `AUTOGRID_RUN_FAILED` | maps 生成失败 | AutoGrid4 返回非 0，或缺少 map 文件 | 看 gpf 和日志；修好工具后重新生成 | AutoGrid4 自身不可用 → 先解决工具问题 |
| `AD4ZN_AUTOGRID_VERSION_UNSUPPORTED` | AD4Zn 跑不了 | AutoGrid4 版本低于要求（需要 4.2.7 及以上） | 装受支持的版本后重试 | **不会**自动降级为标准 AD4，别指望绕过去 |
| `MAPS_NOT_PREPARED` | 提示 maps 未准备 | maps 还没生成，或者已经判为失效 | 重新生成 maps | 反复失效 → 检查受体是不是被换过 |
| `MAPS_FLEXIBLE_RECEPTOR_UNSUPPORTED` | 提示该组合不支持 | Vina / Vinardo 预计算 maps 配柔性受体 | 要么切回刚性受体，要么不用预计算 maps | — |
| `VINA_MAPS_RUN_MODE_UNSUPPORTED` | 提示运行模式不支持 | 用预计算 maps 时选了非全局对接 | 改回全局对接 | — |

**注意：失败的 run 记录会保留为 `failed`，不会被清理。** 这是为了留下审计痕迹，属于预期行为，不要手动去删。

---

## 准备阶段

| 错误码 | 现象 | 原因 | 处理 |
|---|---|---|---|
| `PREPARATION_ALREADY_RUNNING` | 提示同一个目标已在准备中 | 同一个受体/配体的准备任务已经在跑了 | 等它结束；不要重复点击 |
| `PREPARATION_OUTPUT_CONFLICT` | 准备被拒绝 | 准备过程中，输出文件被外部替换或导入了 | 保留现有文件，确认后重新准备 |
| `PREPARATION_OWNERSHIP_LOST` | 准备记录被取代 | 这次准备已经被更新的任务取代了 | 用最新那条记录；旧记录不会发布候选输出 |
| `PREPARATION_INTERRUPTED` | 准备显示为已中断 | 进程消失，且超过宽限期仍没恢复 | 重新准备；中断记录的 `published` 为否，没污染项目 |

---

## 中断后重新打开应用

| 项 | 内容 |
|---|---|
| 现象 | 上次运行中关掉了应用（或进程被杀），重开后提示"已中断"/"可恢复" |
| 原因 | 元数据还处于运行中状态，但进程已经验证不了了 |
| 自动行为 | 运行与准备会被**保守收敛**为中断状态：有启动宽限期、需要二次身份确认，避免误杀 |
| 批量队列 | 中断项会转回待运行并重新入队（在尝试次数用尽之前）；点"恢复队列"触发 |
| 单次运行 | 提示"打开详情"或"安全取消" |
| 停止条件 | 同一个任务反复中断 → 检查是不是有别的程序占着输出目录或者杀进程 |

水合协议的中断会单独记录：后处理阶段挂掉会标为失败，并保留原始 Vina 输出，不会静默丢弃。

---

## 结果文件被改动

| 项 | 内容 |
|---|---|
| 现象 | 解析结果、读取评分或生成报告时报哈希不匹配 |
| 原因 | 本次 run 的日志、`scores.csv` 或报告被手工编辑或替换过 |
| 处理 | **不要手改这些文件**；从可信的 run 重新运行 |
| 停止条件 | 想改记录内容 → 应该新建一次运行，而不是改旧文件 |

DockStart 会给运行产物做 SHA256 绑定，并在读取和生成报告前再校验一次。被改过的产物会被明确标记出来，而不是当作正常数据用。

---

## 项目文件相关

| 错误码 | 现象 | 原因 | 处理 |
|---|---|---|---|
| `PROJECT_SAVE_CONFLICT` | 保存被拒绝 | `project.json` 已被其他操作更新，你手上那份过期了 | 重新读取项目后再提交修改 |
| `PROJECT_SCHEMA_VERSION_UNSUPPORTED` | 项目打不开 | 项目来自更高版本的 DockStart | 用创建它的版本打开；当前版本**不会改写**该项目 |
| `PROJECT_JSON_NOT_FOUND` | 找不到项目文件 | 目录选错了，或者项目文件被移动/删除了 | 确认项目目录；必要时用恢复功能 |

---

## 参数与 Box

| 错误码 | 现象 | 原因 | 处理 |
|---|---|---|---|
| `BOX_SIZE_NOT_POSITIVE` | Box 尺寸被拒绝 | 某一维 ≤ 0 | 填正数 |
| `BOX_PARAM_INVALID` | Box 参数无效 | 空值、非数字或非有限数 | 重新填写 |
| `VINA_GRID_RESOURCE_LIMIT_EXCEEDED` | 网格内存超限 | Box 尺寸和 `spacing` 组合太大 | 缩小 Box 或增大 `spacing` |
| `VINA_SCORING_INVALID` | 评分函数被拒绝 | 单项目下填了 `ad4` | 只能选 Vina 或 Vinardo；AD4 要走 maps 协议 |
| `VINA_RUN_MODE_INVALID` | 运行模式无效 | 非法的模式值 | 重新选三种任务之一 |

---

## 批量与多配体

| 错误码 | 现象 | 原因 | 处理 |
|---|---|---|---|
| `SCREENING_GLOBAL_SEARCH_REQUIRED` | 建不了队列 | 批量筛选只支持全局对接 | 切回全局对接 |
| `SCREENING_RIGID_RECEPTOR_REQUIRED` | 建不了 / 恢复不了队列 | 批量筛选只支持刚性受体 | 切回刚性受体（系统**不会**静默改用旧受体） |
| `SCREENING_AD4_SUBPROTOCOL_UNSUPPORTED` | 建不了队 | AD4 只支持标准 maps | 改用标准 AD4 maps，或者换回 Vina 评分 |
| `SCREENING_ALREADY_FINISHED` | 恢复被拒绝 | 队列已经到终态了 | 新建队列 |
| `SCREENING_RESUME_ERROR` | 恢复失败 | 冻结的输入或工具已经不一致 | 按提示的检查项处理，必要时新建队列 |
| `MULTIPLE_LIGAND_RIGID_RECEPTOR_REQUIRED` | 共同对接不可用 | 联合对接要求刚性受体 | 切回刚性 |
| `MULTIPLE_LIGAND_PRECOMPUTED_MAPS_UNSUPPORTED` | 共同对接不可用 | Vina 下不能用预计算 maps | 去掉预计算 maps |

---

## 工具链与结构

| 错误码 | 现象 | 原因 | 处理 |
|---|---|---|---|
| `STRUCTURE_REVIEW_FORMAT_INVALID` | 结构审查做不了 | 结构文件格式不符合要求 | 换成受支持的格式后重新导入 |
| Vina 缺失 | 工具链页显示 missing | 没装，或者路径不对 | 按"修复建议"手动装好并配置路径，然后重新检测 |
| Python / RDKit / Meeko 缺失 | 工具链页显示 missing | Basic profile 本来就不带；或者外部环境没配好 | 配一个独立的 conda 环境 |

**DockStart 不会自动安装工具、不会改你的系统 PATH、不会联网下载大型环境。** 这一类问题必须人工处理，详见 [工具链](./toolchain.md)。

---

## 什么时候该停下来

碰到下面这些情况，**不要再继续试参数了**：

```text
同一输入反复失败，而且日志指向工具本身
 → 先去修工具链

结果哈希反复校验失败
 → 说明文件被外部改动了，先查是谁在动这些文件

项目打不开且提示 schema 不支持
 → 不要尝试手工编辑 project.json

后端反复启动失败（PYTHON_BACKEND_ERROR）
 → 先处理运行环境，而不是继续跑任务

不确定某个高级协议适不适用
 → 先读"高级协议的适用范围"，别贸然组合
```

---

## 总结

先按错误码和日志确认问题，再修正输入或环境、重新运行。保留原记录，有助于区分新的输入错误、工具问题和历史数据损坏。

---

## 相关页面

- 工具链修复：[工具链](./toolchain.md)
- 结构准备问题：[结构准备 FAQ](./faq-structure-preparation.md)
- Box 与 maps 问题：[Box 与 Maps FAQ](./faq-box-and-maps.md)
- 结果为什么会不一样：[为什么结果不一致](./why-results-differ.md)
- 要记录什么才能复现：[项目、版本与可复现性](./projects-versions-reproducibility.md)
- 各协议的限制组合：[高级协议的适用范围](./advanced-protocols.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/project.py`，运行前检查、错误对象、恢复逻辑。
2. DockStart 源码 `backend/dockstart_core/persistence.py`，原子写入。
3. DockStart 源码 `backend/dockstart_core/screening.py` 与 `preparation.py`，队列恢复与准备中断处理。
4. DockStart 源码 `apps/desktop/src-tauri/src/main.rs`，后端失败兜底载荷。
5. DockStart 源码 `backend/tests/`，失败与恢复矩阵测试。
6. DockStart `docs/toolchain_repair_guide.md`。

</details>
