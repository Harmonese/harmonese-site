---
title: pylrclibup 已归档：请迁移至 pylrclib
url_slug: pylrclibup-archived
date: 2026-04-13 23:59:59
tags:
  - 软件项目
  - 命令行工具
  - Python
  - 归档
categories: 軟件項目
description: pylrclibup 是 Harmonese 早期维护的 LRCLIB 歌词上传工具，现已归档；新的歌词工具链将集中到 pylrclib 等项目中。
cover: cover.webp
copyright_author: 簡諧點源
---

`pylrclibup` 是我们早期为 [LRCLIB](https://lrclib.net) 工作流开发的本地歌词上传工具。它曾用于整理本地音频、匹配 LRC 文件、标准化歌词内容，并将歌词提交到 LRCLIB。

`pylrclibup` 已不再作为当前推荐工具维护。旧仓库仍可作为开源档案查看：

- GitHub：[Harmonese/pylrclibup](https://github.com/Harmonese/pylrclibup)
- PyPI：[pylrclibup](https://pypi.org/project/pylrclibup/)

如果你正在寻找当前活跃维护的 LRCLIB 相关工具，请优先查看：

- GitHub：[Harmonese/pylrclib](https://github.com/Harmonese/pylrclib)

`pylrclibup` 解决的是一个很具体的早期问题：把本地歌词文件整理好，再辅助上传到 LRCLIB。随着我们自己的歌词工作流继续发展，单独维护一个上传工具会让功能分散，也容易让文档、命令行参数和实际维护状态逐渐脱节。

之后，和 LRCLIB 相关的搜索、下载、清理、发布与工作流封装，已经优先集中到 `pylrclib` 及相关项目中。这样更利于维护，也更接近 Harmonese 现在的真实工作方式。

如果你的旧脚本依赖 `pylrclibup`，短期内可以继续参考仓库中的历史 README 和已发布版本；但不建议在新流程中继续引入它。

迁移时建议先把自己的需求拆开看：

- 只是查找或下载歌词：优先看 `pylrclib`。
- 需要清理、标准化或批量处理 LRC：优先看 `pylrclib` 当前提供的能力。
- 需要完整的歌词工作台：关注 Rolling Pebble。
- 需要生成滚动歌词素材：关注 py-roller。

本站后续不会继续更新 `pylrclibup` 的相关信息。项目最新状态请以 [GitHub 仓库](https://github.com/Harmonese/pylrclibup) 为准。
