---
title: 我们正在开发 pylrclibup：一个围绕歌词数据库 LRCLIB 上传流程的命令行工具
url_slug: developing-pylrclibup
date: 2025-11-24 20:30:00
tags:
  - 软件项目
  - 命令行工具
  - Python
  - LRCLIB
categories: 軟件項目
description: 面向流媒体歌词上传者等 LRCLIB 用户，把本地歌词上传到 LRCLIB 前后的重复动作整理成工具。
cover: cover.webp
copyright_author: 簡諧點源
---

最近在整理本地歌词和 LRCLIB 上传流程时，我们基于 LRCLIB API 开始写一个新的命令行工具：`pylrclibup`。它现在还很早期，其目前功能是把“本地音频 + LRC 文件 → 检查 → 整理 → 上传到 LRCLIB”这套流程自动化，可以嵌入一些自建流媒体库、数据库维护、学术研究等场景在处理歌词时的工作流。

它可以用自动化流程替代这些重复动作：

- 找到音频对应的 LRC；
- 确认曲名、艺术家、专辑和时长；
- 把歌词文件移动到正确位置；
- 改成和音频一致的文件名；
- 清掉不适合提交到数据库的多余行；
- 最后再提交到 LRCLIB。

目前它还不是一个完整封装的 LRCLIB API 歌词工具。它目前只能解决在歌词文件散乱时，使用一个命令将它们整理到可以提交的状态的问题。