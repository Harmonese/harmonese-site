---
title: pylrclib 已发布：完整的 LRCLIB 命令行工具
url_slug: pylrclib-released-complete-lrclib-cli
date: 2026-04-13 23:30:00
tags:
  - 软件项目
  - 命令行工具
  - Python
  - LRCLIB
categories: 軟件項目
description: pylrclib 0.4 将 LRCLIB 相关操作整理成 search、down、up、inspect、cleanse 与 doctor 等命令。
cover: cover.webp
copyright_author: 簡諧點源
---

`pylrclibup` 的升级版 `pylrclib` 已经于 [GitHub](https://github.com/Harmonese/pylrclib) 上公布首个版本 [v0.4.0](https://github.com/Harmonese/pylrclib/releases/tag/v0.4.0)，命令行工具还被上传于 [PyPI](https://pypi.org/project/pylrclib-cli/)，可以直接使用 Python 包管理器下载。

相较于 `pylrclibup`，这个工具的重点是把原先容易混在一起的动作拆成一组明确的命令。搜索、下载、上传、检查、清洗、诊断，各自有自己的入口，也能复用同一套交互逻辑。相较于 `pylrclibup`，它的实现更加解耦、自由度更高，也能实现更多的功能。目前正在逐渐实现一个完整的 LRCLIB 命令行工具。

## 常用命令

这次重建后，`pylrclib` 已经有了这些核心命令：

- `pylrclib search`：远程搜索 LRCLIB 记录，并预览候选结果；
- `pylrclib down`：下载歌词，支持通过 LRCLIB id 获取指定记录；
- `pylrclib up`：上传本地歌词；
- `pylrclib inspect`：检查本地歌词文件与元数据；
- `pylrclib cleanse`：清理 LRC 内容；
- `pylrclib doctor`：检查本地环境和工作目录状态。

这些命令共享同一套选择、确认和预览行为。也就是说，搜索和下载不再是上传流程里的附属动作，而是可以独立使用的日常工具。

## 如何使用

由于命令行操作、技术实现细节等会随版本迭代，本站点不会给出详细的使用与操作指导。具体使用目前可以查看 `pylrclib` 的 [README.md](https://github.com/Harmonese/pylrclib/blob/main/README.md) 文件。

随着 `pylrclib` 的更新，它将会逐渐覆盖所有的 `pylrclibup` 功能，后者将进入归档阶段，不再进行活跃的维护。

`pylrclib v0.4.0` 接下来会继续补文档、补测试并完善功能，也会继续打磨中文环境下的使用体验。
