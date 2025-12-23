---
title: lrclib-external-save demo 用户指南
date: 2025-11-14 21:13:04
updated: 2025-12-20
tags:
  - 软件项目
  - 用户指南
  - 插件
  - Python
categories: 軟件項目
description: 基于 Python 为 MusicBrainz Picard 开发的歌词插件，在刮削元数据时自动从 lrclib.net 抓取歌词并保存在本地文件夹。
cover: Screenshot.png
copyright_author: 簡諧點源
---
此插件源码发布于 [GitHub](https://github.com/Harmonese/lrclib_lyrics_external_save)，已经提交给 MusicBrainz 官方插件仓库的 PR，目前仍在审核中。

# LRCLIB 歌词外部保存（Picard 插件）

这个 MusicBrainz Picard 插件会在文件保存完成后，从 **LRCLIB** 获取歌词，
并将歌词以**外部伴随文件（sidecar 文件）**的形式保存：

- 同步歌词 → `*.lrc`
- 纯文本歌词 → `*.txt`

伴随文件会保存在与音频文件**相同的文件夹**中，
并且使用与音频文件**相同的基本文件名**。

插件**不会修改音频标签**，也不会将歌词嵌入到音频文件中。

---

## 🚀 功能特性

✔ 获取同步歌词（`syncedLyrics`）或纯文本歌词（`plainLyrics`）
✔ 写入 `.lrc` 或 `.txt` 伴随文件
✔ 在重命名 / 移动文件之后依然有效
✔ 纯保存后的逻辑 → 不会导致崩溃，不会与元数据冲突
✔ 兼容 macOS（禁用 SSL 证书验证以避免证书问题）
✔ 不修改内嵌标签

---

## 🧩 安装方法

1. 下载最新版本的 ZIP 压缩包。
2. 在 Picard 中打开：`选项 → 插件 → 安装插件…`
3. 选择下载的 ZIP 文件。
4. 启用“**LRCLIB Lyrics External Save**”插件。

---

## 🛠 工作原理

1. 你在 Picard 中保存文件。
2. Picard 将文件写入并移动到最终位置。
3. 插件随后执行以下操作：

   - 读取元数据（`title`、`artist`、`album`、`~length`）
   - 请求 `https://lrclib.net/api/get`
   - 在音频文件旁写入 `.lrc` 或 `.txt` 文件

---

## 📄 许可证

MIT License
Copyright (c)
