---
title: Rolling Pebble v0.5 已发布：自动打轴器功能就绪
url_slug: rolling-pebble-v0-5-isolated-auto-timing-runtime
date: 2026-05-13 23:10:00
tags:
  - 软件项目
  - 歌词
  - Rolling Pebble
  - 自动打轴
categories: 軟件項目
description: Rolling Pebble v0.5 将 Auto Timing 移入隔离的 py-roller 运行时，让本地歌词工作站开始管理自己的自动打轴环境。
cover: cover.webp
copyright_author: 簡諧點源
---

`Rolling Pebble v0.5` 已经发布。这次更新主要处理 Auto Timing 的运行时问题，也就是让自动打轴不再依赖用户系统中偶然存在的命令行环境。

Rolling Pebble 的定位是一个本地歌词工作站：导入项目、整理歌词、编辑时间轴、运行自动打轴、检查结果，再把文件导出或继续接入上传流程。自动打轴依赖 `py-roller`。因此，我们在 v0.5 中把 Auto Timing 移到了隔离运行时里。

## 核心变化

### 独立的 py-roller 虚拟环境

从这个版本开始，Auto Timing 会使用 Rolling Pebble 数据目录下的独立 virtual environment。

这意味着运行时安装、修复和升级不会直接修改 Rolling Pebble 后端自己的 `.venv`，也不会依赖用户系统里刚好装了哪个版本的 `py-roller`。

生成命令时，Rolling Pebble 会调用运行时里的 Python：

```bash
python -m pyroller.cli.main
```

这样比直接调用 PATH 上的 `py-roller` 更稳定，也更容易诊断。

### 运行时任务状态

Auto Timing 这类任务跑起来不会很短，界面必须知道它是不是还在工作。因此这次加入了运行时 job 的 liveness metadata，包括：

- PID；
- 已运行时间；
- 最近输出时间；
- 返回码。

在 POSIX 系统上，也加入了基于 process group 的任务取消。这样用户取消任务时，不只是前端按钮变灰，而是尽量把底层子进程一起处理掉。

## 开发进度

把 py-roller 放进隔离运行时以后，Rolling Pebble 不再只是“带按钮的命令行前端”。它开始承担本地工作站该承担的责任：管理依赖、显示状态、修复环境、保护用户项目。

接下来我们会继续整理设置界面、存储清理和国际化，让这个工作站更像一个可以长期使用的应用，而不是一次实验性的 WebUI。
