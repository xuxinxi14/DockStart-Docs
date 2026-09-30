---
title: "常见错误信息索引"
sidebar_position: 5
sidebar_label: "E. 常见错误信息索引"
---

# 常见错误信息索引

## 简单概括

错误码的前缀通常能帮助定位出错阶段。这里按准备、运行和结果读取等环节整理，具体处理方法见 [常见错误与恢复](../part-c/common-errors-and-recovery.md)。

---

## 这两页怎么分工

| 页面 | 回答什么 |
|---|---|
| 本页（索引） | **这串错误码是什么意思、属于哪个环节** |
| [常见错误与恢复](../part-c/common-errors-and-recovery.md) | **遇到它该怎么办、什么时候该停下来** |

建议用法：拿到错误码 → 在本页确认含义和环节 → 去对应章节看处理步骤。

---

## 先认识错误的统一结构

后端返回的错误对象长这样：

```text
error
 ├─ code        错误码（本页列的就是它）
 ├─ message     中文说明，告诉你怎么回事
 ├─ raw_error   底层原始错误，用来查根因
 └─ suggestion  下一步建议（不是每个错误都有）
```

**排查顺序：`message` 看现象 → `suggestion` 看动作 → `raw_error` 看根因。**

记错误码很有用：反馈问题时把 `code` 一起贴出来，比描述一百字现象都管用。

---

## 关于错误码的数量

当前源码里的错误码**总数在 1400 个以上**。听到这个数字不用紧张，因为其中绝大多数是**内部完整性校验**用的，普通用户几乎碰不到：

| 类别 | 特点 | 用户会遇到吗 |
|---|---|---|
| 内部审计与身份合同类 | 例如坐标身份、准备控制合同、快照哈希一致性 | 基本不会 |
| 归档完整性类 | 归档包逐文件哈希、清单一致性校验 | 只在归档被改动时 |
| 高级协议内部状态类 | 大环审查、水合后处理、柔性分区的中间校验 | 偶尔（往往伴随明确提示） |
| **本页列出的这些** | 运行、准备、参数、项目、批量、结构获取、工具链 | **会，且是高频** |

所以本页的定位是：**把你会真正看到的那部分挑出来，按环节排好。**

---

## A. 运行前检查与运行

| 错误码 | 含义 |
|---|---|
| `VINA_RUN_FAILED` | 运行失败，没有产出构象文件 |
| `VINA_RUN_MODE_INVALID` | 运行模式值非法（不属于三种任务之一） |
| `VINA_SCORING_INVALID` | 评分函数被拒绝（单项目下填了 `ad4`） |
| `VINA_GRID_RESOURCE_LIMIT_EXCEEDED` | 网格内存超过硬上限（2 GiB） |
| `BOX_SIZE_NOT_POSITIVE` | Box 尺寸有一维 ≤ 0 |
| `BOX_PARAM_INVALID` | Box 参数无效（空值 / 非数字 / 非有限数） |
| `AUTOGRID_RUN_FAILED` | AutoGrid4 生成 maps 失败 |
| `MAPS_NOT_PREPARED` | 需要的 maps 还没生成，或已被判为失效 |
| `MAPS_ATOM_TYPES_MISSING` | maps 缺少配体用到的原子类型 |
| `MAPS_ATOM_TYPE_UNSUPPORTED` | 出现了不被支持 / 未经校验的原子类型 |
| `MAPS_ATOM_TYPES_INCOMPLETE` | 声明的原子类型与实际检测到的不一致 |
| `MAPS_FLEXIBLE_RECEPTOR_UNSUPPORTED` | 预计算 maps 与柔性受体组合，不被允许 |
| `VINA_MAPS_RUN_MODE_UNSUPPORTED` | 用预计算 maps 时选了非全局对接 |

---

## B. 结构准备

| 错误码 | 含义 |
|---|---|
| `PREPARATION_ALREADY_RUNNING` | 同一个目标已经在准备中 |
| `PREPARATION_OUTPUT_CONFLICT` | 准备过程中输出文件被外部替换或导入 |
| `PREPARATION_OWNERSHIP_LOST` | 该次准备已被更新的任务取代 |
| `PREPARATION_INTERRUPTED` | 准备进程消失且超过宽限期未恢复 |
| `RECEPTOR_RAW_FORMAT_UNSUPPORTED` | 受体原始结构格式不在允许集合里 |
| `LIGAND_RAW_FORMAT_UNSUPPORTED` | 配体原始结构格式不在允许集合里 |
| `RECEPTOR_CONTROLS_PDB_REQUIRED` | 显式受体残基控制只接受原始 PDB |
| `STRUCTURE_REVIEW_FORMAT_INVALID` | 结构审查无法进行，格式不符合要求 |
| `STRUCTURE_REVIEW_READ_ERROR` | 读取结构审查信息时出错 |
| `MEEKO_PYTHON_UNAVAILABLE` | 找不到可用来执行 Meeko 的 Python |

---

## C. 高级协议：AD4Zn / 水合 / 大环 / 柔性

| 错误码 | 含义 |
|---|---|
| `AD4ZN_RUN_MODE_UNSUPPORTED` | AD4Zn 不支持评分或局部优化模式 |
| `AD4ZN_AUTOGRID_VERSION_UNSUPPORTED` | AutoGrid4 版本低于 4.2.7，AD4Zn 无法运行 |
| `AD4ZN_RECEPTOR_TYPE_UNSUPPORTED` | 受体包含 AD4Zn 不支持的原子类型 |
| `AD4ZN_PARAMETER_SNAPSHOT_ATOM_TYPES_UNCOVERED` | 参数文件没有覆盖所需的原子类型 |
| `HYDRATED_AUTOGRID_NOT_AVAILABLE` | 水合协议需要 AutoGrid4，但当前不可用 |
| `HYDRATED_AUTOGRID_VERSION_UNSUPPORTED` | AutoGrid4 版本不满足水合协议要求 |
| `HYDRATED_LIGAND_FORMAT_UNSUPPORTED` | 水合协议的配体格式不在允许范围内 |
| `HYDRATED_LIGAND_NOT_READY` | 水合配体尚未准备好 |
| `HYDRATED_ACTIVE_RUN_BLOCKED` | 已有水合任务在跑，当前操作被阻止 |
| `MACROCYCLE_3D_COORDINATES_REQUIRED` | 大环处理要求配体已有三维坐标 |
| `MACROCYCLE_MULTIPLE_MOLECULES_UNSUPPORTED` | 大环审查不会从多分子 SDF 里静默挑第一条 |
| `FLEX_BAD_RESIDUES_REVIEW_REQUIRED` | 柔性受体存在需要人工复核的残基 |
| `FLEX_BAD_RESIDUE_ACKNOWLEDGEMENT_REQUIRED` | 必须先确认这些残基，才能继续 |
| `FLEX_MMCIF_VERIFIED_BRIDGE_REQUIRED` | 柔性受体缺少经过验证的 mmCIF→PDB 桥接 |

---

## D. 项目文件

| 错误码 | 含义 |
|---|---|
| `PROJECT_SAVE_CONFLICT` | 保存被拒绝：你手上的版本已过期（revision 冲突） |
| `PROJECT_SCHEMA_VERSION_UNSUPPORTED` | 项目来自更高版本的 DockStart，当前版本拒绝打开且不改写 |
| `PROJECT_JSON_NOT_FOUND` | 找不到项目文件（目录选错，或被移动 / 删除） |

---

## E. 批量筛选

| 错误码 | 含义 |
|---|---|
| `SCREENING_GLOBAL_SEARCH_REQUIRED` | 批量筛选只支持全局对接 |
| `SCREENING_RIGID_RECEPTOR_REQUIRED` | 批量筛选只支持刚性受体 |
| `SCREENING_AD4_PROTOCOL_REQUIRED` | 批量用 AD4 时，需先启用标准 AD4 maps |
| `SCREENING_AD4_MAPS_NOT_READY` | 标准 AD4 maps 未通过完整性校验 |
| `SCREENING_AD4_MAP_TYPES_MISSING` | maps 没有覆盖配体库用到的原子类型 |
| `SCREENING_AD4_SUBPROTOCOL_UNSUPPORTED` | 批量不支持 AD4Zn 或水合子协议 |
| `SCREENING_ALREADY_EXISTS` | 项目里已经有一个批量筛选任务 |
| `SCREENING_ALREADY_FINISHED` | 队列已到终态，不能恢复 |
| `SCREENING_RESUME_ERROR` | 恢复前的复核失败（冻结的输入或工具已不一致） |
| `SCREENING_PROCESS_ACTIVE` | 检测到 Vina 进程仍在运行 |
| `SCREENING_EXECUTION_ACTIVE` | 另一个进程正在执行该筛选 |
| `SCREENING_STAGE_ERROR` | 导入批量配体失败 |
| `SCREENING_ORPHANED_DATA` | 检测到未归档的遗留文件，拒绝覆盖 |
| `SCREENING_REPORT_NOT_TERMINAL` | 队列未结束，不能生成实验记录 |
| `SCREENING_RESULT_SDF_NOT_TERMINAL` | 队列未结束，不能生成结果 SDF |
| `SCREENING_ARCHIVE_EXPORT_EXISTS` | 导出目标已存在，需要显式确认覆盖 |
| `SCREENING_ARCHIVE_EXPORT_DESTINATION_INVALID` | 导出目标名必须以 `.zip` 结尾 |
| `SCREENING_ARCHIVE_COMPARE_IDS_INVALID` | 比较归档需要选择两个不同且有效的归档 |

---

## F. 多配体共同对接

| 错误码 | 含义 |
|---|---|
| `MULTIPLE_LIGAND_EXACTLY_TWO_REQUIRED` | 共同对接必须**恰好两个**配体 |
| `MULTIPLE_LIGAND_DUPLICATE_INPUT` | 两个配体的内容完全相同 |
| `MULTIPLE_LIGAND_RECEPTOR_NOT_SET` | 尚未导入刚性受体 |
| `MULTIPLE_LIGAND_RIGID_RECEPTOR_REQUIRED` | 共同对接要求刚性受体 |
| `MULTIPLE_LIGAND_GLOBAL_SEARCH_REQUIRED` | 共同对接只支持全局对接 |
| `MULTIPLE_LIGAND_PRECOMPUTED_MAPS_UNSUPPORTED` | 共同对接不支持预计算 maps |
| `MULTIPLE_LIGAND_AUTOBOX_UNSUPPORTED` | 共同对接必须使用已保存的 Box |
| `MULTIPLE_LIGAND_AD4_SUBPROTOCOL_UNSUPPORTED` | 共同对接不支持 AD4Zn 或水合 |
| `MULTIPLE_LIGAND_SCORING_PROTOCOL_UNSUPPORTED` | 评分协议不在允许范围内 |
| `MULTIPLE_LIGAND_VINA_NOT_AVAILABLE` | 未检测到可用的 Vina |
| `MULTIPLE_LIGAND_VINA_VERSION_UNSUPPORTED` | Vina 版本过低，不支持多配体输入 |
| `MULTIPLE_LIGAND_VINA_FAILED` | 多配体共同对接执行失败 |
| `MULTIPLE_LIGAND_UNSUPPORTED_ATOM_TYPE` | 配体含未经校验的原子类型 |
| `MULTIPLE_LIGAND_MEMBER_ATOM_LIMIT_EXCEEDED` | 某个配体的原子数超限 |
| `MULTIPLE_LIGAND_FLEXIBILITY_RISK_LIMIT_EXCEEDED` | 两个配体的可扭转键合计超出风险上限 |
| `MULTIPLE_LIGAND_BOX_DIAGONAL_TOO_SMALL_FOR_INPUT_GEOMETRY` | 配体尺寸大于有效网格范围 |
| `MULTIPLE_LIGAND_POSE_NOT_READY` | 只有已完成的任务才能加载构象 |
| `MULTIPLE_LIGAND_REPORT_NOT_READY` | 只有已完成的任务才能生成报告 |

---

## G. 结构获取与导入

| 错误码 | 含义 |
|---|---|
| `PDB_ID_REQUIRED` | PDB ID 不能为空 |
| `PDB_ID_INVALID` | PDB ID 必须是 4 位字母或数字 |
| `PDB_FORMAT_UNSUPPORTED` | 只支持下载 pdb 或 cif 格式 |
| `PUBCHEM_CID_REQUIRED` | PubChem CID 不能为空 |
| `PUBCHEM_CID_INVALID` | PubChem CID 必须是正整数 |
| `PUBCHEM_FORMAT_UNSUPPORTED` | PubChem 下载只支持 sdf |
| `PUBCHEM_SMILES_UNSUPPORTED` | SMILES 查询暂未支持 |
| `PUBCHEM_QUERY_TYPE_UNSUPPORTED` | PubChem 查询类型不在支持范围内 |
| `RCSB_METADATA_NOT_RETURNED` | RCSB 未返回该候选的元数据 |
| `STRUCTURE_SEARCH_QUERY_REQUIRED` | 搜索内容不能为空 |
| `STRUCTURE_SEARCH_QUERY_TOO_LONG` | 搜索内容过长 |
| `STRUCTURE_SEARCH_EMPTY_RESPONSE` | 搜索返回空响应 |
| `STRUCTURE_SEARCH_RESPONSE_TOO_LARGE` | 搜索响应超过 4 MiB 上限 |
| `STRUCTURE_SEARCH_TIMEOUT` | 搜索超时 |
| `STRUCTURE_DOWNLOAD_HTTP_ERROR` | 远端服务返回错误 |
| `STRUCTURE_DOWNLOAD_NETWORK_ERROR` | 可能网络不可用或超时 |
| `STRUCTURE_DOWNLOAD_TIMEOUT` | 下载超时 |
| `STRUCTURE_DOWNLOAD_TOO_LARGE` | 超过 256 MiB 上限 |
| `STRUCTURE_DOWNLOAD_EMPTY` | 下载结果为空 |
| `STRUCTURE_DOWNLOAD_FORMAT_INVALID` | 下载结果不是可识别的文本结构 |
| `STRUCTURE_PREVIEW_SELECTION_REQUIRED` | 请先选择一个候选结构 |
| `STRUCTURE_PREVIEW_FORMAT_UNSUPPORTED` | RCSB 预览只支持 PDB 或 mmCIF |
| `STRUCTURE_PREVIEW_TOO_LARGE` | 候选结构过大，未加载预览 |
| `STRUCTURE_PREVIEW_TIMEOUT` | 候选结构预览请求超时 |
| `RAW_FILE_WRITE_ERROR` | 写入项目 raw 文件时出错 |
| `PDBQT_FILE_NOT_FOUND` | 没有找到 PDBQT 文件 |
| `PDBQT_PATH_NOT_FILE` | PDBQT 路径不是文件 |
| `PDBQT_EXTENSION_INVALID` | 扩展名不是 `.pdbqt` |
| `PDBQT_FILE_EMPTY` | PDBQT 文件为空 |
| `PDBQT_ROLE_INVALID` | PDBQT 导入类型（受体 / 配体）无效 |
| `PDBQT_SOURCE_UNSAFE` | 源文件不是稳定的普通文件 |
| `PDBQT_IMPORT_ERROR` | 导入 PDBQT 文件时发生错误 |

---

## H. 工具链与自检

| 错误码 | 含义 |
|---|---|
| `BUNDLED_VINA_PACKAGE_INCOMPLETE` | 随附 Vina 的打包检查未通过 |
| `BUNDLED_PYTHON_PACKAGE_INCOMPLETE` | 随附 Python 的文件检查未通过 |
| `TOOLCHAIN_REPAIR_SUGGESTION_ERROR` | 无法读取工具链修复建议 |
| `FRONTEND_TOOLCHAIN_STATUS_ERROR` | 无法读取工具链状态 |
| `FRONTEND_TOOLCHAIN_REPAIR_ERROR` | 无法读取工具链修复建议（前端侧） |
| `FRONTEND_DIAGNOSTIC_ERROR` | 无法运行安装后自检 |
| `CAPABILITY_PROFILE_ERROR` | 无法读取能力画像 |
| `DIAGNOSTIC_ERROR` | 生成诊断报告时出错 |
| `PYTHON_BACKEND_ERROR` | Python 后端返回了非结构化错误（通常是后端没能正常启动） |
| `BACKGROUND_TASK_ERROR` | 后台任务出错，需查看运行日志 |

> `PYTHON_BACKEND_ERROR` 值得特别留意 —— 它是已知白屏问题的触发源，详见 [常见错误与恢复](../part-c/common-errors-and-recovery.md) 里单列的那一节。

---

## I. 结果导出与报告

| 错误码 | 含义 |
|---|---|
| `RESULT_PATH_UNSAFE` | 结果必须使用项目内的相对路径 |
| `RESULT_PDBQT_MISSING` | 没有找到非空的结果 PDBQT |
| `RESULT_SDF_EXPORT_FAILED` | 导出 SDF 时出错（原始结果未被修改） |
| `RESULT_SDF_TOOLCHAIN_UNAVAILABLE` | 无法验证并导出批量结果的 SDF |
| `SDF_EXPORT_OUTPUT_MISSING` | Meeko 没有发布非空的 poses.sdf |
| `FLEXIBLE_RESULT_SDF_UNSUPPORTED` | 暂时无法安全恢复有限柔性结果的拓扑 SDF |
| `MARKDOWN_PREVIEW_TOO_LARGE` | 报告过大，无法预览 |

---

## J. 示例项目

| 错误码 | 含义 |
|---|---|
| `DEMO_TYPE_INVALID` | 未知的示例项目类型 |
| `DEMO_DESTINATION_REQUIRED` | 保存目录不能为空 |
| `DEMO_TEMPLATE_MISSING` | 示例资源未找到 |
| `DEMO_PROJECT_INCOMPLETE` | 示例项目文件不完整 |

> 这一类通常意味着**安装包不完整或被清理过**，属于"该重装"的信号。

---

## 怎么自己查一个没列在这里的错误码

源码里的错误码都是普通字符串常量，可以直接搜：

```text
在后端目录里搜索错误码字符串
   ↓
找到抛出它的位置
   ↓
看它前面的判断条件（那就是触发原因）
   ↓
看它带的 message 文案（那就是给用户看的说明）
```

多数错误码还会在**测试目录**里出现（验证"这个错误确实会在那种情况下被抛出"）。如果某个码只出现在测试里、生产代码路径里没有，说明它不是给用户看的。

---

## 总结

错误码的结构本身就说明了出错环节；先按前缀定位阶段，再对照本页与「常见错误与恢复」处理，比逐条搜索更快。

---

## 相关页面

- 遇到错误怎么办：[常见错误与恢复](../part-c/common-errors-and-recovery.md)
- 工具链缺失：[工具链](../part-c/toolchain.md)
- 结构准备失败：[结构准备 FAQ](../part-c/faq-structure-preparation.md)
- Box 与 maps 报错：[Box 与 Maps FAQ](../part-c/faq-box-and-maps.md)
- 高级协议被拦截：[高级协议的适用范围](../part-c/advanced-protocols.md)
- 结果不一致（不是报错）：[为什么结果不一致](../part-c/why-results-differ.md)

---

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart 源码 `backend/dockstart_core/project.py`，错误对象结构与运行前检查。
2. DockStart 源码 `backend/dockstart_core/preparation.py`，准备阶段错误。
3. DockStart 源码 `backend/dockstart_core/screening.py`，批量筛选与归档错误。
4. DockStart 源码 `backend/dockstart_core/multiple_ligands.py`，多配体共同对接错误。
5. DockStart 源码 `backend/dockstart_core/structure_fetch.py`、`candidate_preview.py`，在线检索与导入错误。
6. DockStart 源码 `backend/dockstart_core/toolchain.py`、`toolchain_repair.py`、`diagnostics.py`，工具链与自检错误。
7. DockStart 源码 `apps/desktop/src-tauri/src/main.rs`，后端失败兜底载荷。
8. DockStart 源码 `backend/tests/`，错误与恢复矩阵测试。

</details>
