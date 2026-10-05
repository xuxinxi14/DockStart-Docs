---
title: "安装、更新和数据安全"
sidebar_position: 13
sidebar_label: "安装、更新和数据安全"
---

import DocNotes, {DocNote, NoteRef} from '@site/src/components/DocNotes';

# 安装、更新和数据安全

安装时核对来源与哈希；升级前备份整个项目目录；分享文件前检查研究数据和本机路径。

## 安装

Windows 10/11 x64 用户可按 [下载与快速开始](./quick-start-v1-0-4.md) 安装 **v1.0.4 Assisted 试用包**。已有 PDBQT 也能直接使用，普通 Vina 对接无需另外安装 Python、RDKit 或 AutoGrid4。<NoteRef number={1}/>

安装包未签名，Windows 可能提示“未知发布者”。从项目官方 Releases 下载并核对 SHA256；无需关闭安全软件。

## 更新

目前需要手动下载安装新版本。升级前：

1. 关闭正在运行的任务，记下当前版本。
2. 将**整个项目文件夹**复制一份作为备份。
3. 从官方 Releases 下载新包并核对 SHA256，再安装。
4. 重新检测工具链，使用项目副本检查能否正常打开。

更换 Basic / Assisted 构建档位时，先备份项目并卸载原有版本。不要直接用旧版覆盖打开新版本项目。

## 项目文件在哪里

项目保存在创建时选择的目录中：

```text
<你选择的目录>/<项目名>/
├─ project.json
├─ raw/  prepared/  preparation/
├─ configs/  runs/  results/  reports/  maps/
```

移动或备份时一并复制这些文件。归档 ZIP 用于分享实验记录；恢复项目时使用完整项目备份。

设置与诊断报告的位置见页底注释。<NoteRef number={2}/>

## 你的数据会不会联网

对接、结构准备、项目记录和诊断在本机进行。主动使用 RCSB / PubChem 在线结构检索时会联网，诊断报告不会自动上传。

## 分享前检查什么

| 文件 | 检查内容 |
| --- | --- |
| `project.json` 与其他 JSON | 本机用户名、绝对路径 |
| 诊断报告 | 本机工具路径 |
| 归档 ZIP | 研究数据、原记录中的路径 |
| `runs/` | 输入结构和计算结果 |

需要脱敏时，先复制一份再修改。导出归档不会自动删除个人路径信息。

反馈问题时，提供 DockStart 与 Windows 版本、出错步骤、中文错误码，以及检查过的诊断报告或最小复现项目。

## 避免误操作

- 用界面修改项目设置，保留 `project.json` 与运行记录原件。
- 改实验设计时新建一次运行；更换受体后重新准备、审查并生成对应 maps。
- 保留 `preparation/` 与 `maps/` 记录，避免项目找不到绑定文件。
- 任务运行时不要手动清理临时文件。数据保护机制见注释。<NoteRef number={3}/>

## 相关页面

- [项目、版本与可复现性](./projects-versions-reproducibility.md)
- [工具链](./toolchain.md)
- [常见错误与恢复](./common-errors-and-recovery.md)

<DocNotes>

<DocNote number={1} title="安装包与版本状态">

v1.0.4 本次公开下载仅有 Assisted EXE，Basic / MSI 为本地候选。完整安装、升级、卸载和 GUI 发布验收仍待完成，按试用版本使用。Basic 与 Assisted 共用应用身份，不能并行安装。

目前没有自动更新机制；界面的版本号在编译时固定，不会自动检查新版本。项目能否被不同版本读取取决于数据格式兼容性，应先备份再检查。

</DocNote>

<DocNote number={2} title="设置与诊断报告位置">

`dockstart_settings.json` 保存工具路径、默认项目目录和参数。安装版通常在应用配置目录（标识符 `org.dockstart.desktop`）；源码运行或未指定时可能在仓库根目录，也可由环境变量覆盖。

诊断报告默认写到本机应用数据目录下的 `DockStart/diagnostics`，文件名带 UTC 时间戳。分享前检查其中的路径信息。

</DocNote>

<DocNote number={3} title="文件保护与临时文件">

软件使用原子写入、输入快照、哈希校验、冲突检测与数据迁移备份保护记录。损坏的设置不会被静默覆盖；改动已有运行产物可能导致校验失败。

运行中会创建写入探针、暂存文件及后处理临时目录，正常完成后清理。异常退出后出现残留时，先保留日志并检查任务状态。

</DocNote>

</DocNotes>

<details className="guide-references">
<summary id="参考资料">参考资料</summary>

1. DockStart `backend/dockstart_core/settings.py`、`persistence.py`：设置路径与原子写入。
2. DockStart `backend/dockstart_core/diagnostics.py`：诊断报告与隐私说明。
3. DockStart `apps/desktop/src-tauri/src/main.rs`、`tauri.conf.json`：应用配置目录与身份。
4. DockStart `docs/release/release_artifact_profile.md`、`release_checklist.md`：构建档位与验收。

</details>
