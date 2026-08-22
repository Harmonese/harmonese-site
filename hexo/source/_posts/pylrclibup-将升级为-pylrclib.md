---
title: pylrclibup 将升级为 pylrclib
url_slug: developing-pylrclib
date: 2026-04-12 20:00:00
tags:
  - 软件项目
  - 命令行工具
  - Python
  - LRCLIB
categories: 軟件項目
description: 把 LRCLIB 工作流整理成完整的工具箱
cover: cover.webp
copyright_author: 簡諧點源
---

我们正在整理一个新的 Python 命令行项目：`pylrclib`，用于替代之前的 `pylrclibup`。它将用更完整、更解耦的结构重新实现 `pylrclibup` 的功能，并拥有更强的能力：围绕 LRCLIB，把搜索、下载、上传、检查、清洗这些动作拆成可以组合使用的命令。实现对 LRCLIB API 的完整再封装，并提供用户友好的命令行界面。

## 第一阶段目标

实现以下功能

- `search`：搜索远程歌词记录；
- `down`：下载歌词；
- `up`：上传本地歌词；
- `inspect`：检查本地歌词；
- `cleanse`：清理歌词文本；
- `doctor`：诊断本地环境和目录。

我们之后会在 [GitHub](https://github.com/Harmonese/pylrclib) 实时更新这一项目，这个博客页面也会跟进大版本更新内容。