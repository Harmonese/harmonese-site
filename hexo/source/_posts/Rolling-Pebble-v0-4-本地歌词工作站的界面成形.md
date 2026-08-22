---
title: Rolling Pebble v0.4 已发布：本地歌词工作站的界面成形
url_slug: rolling-pebble-v0-4-ui-shaping
date: 2026-05-12 23:40:00
tags:
  - 软件项目
  - 歌词
  - Rolling Pebble
categories: 軟件項目
description: Rolling Pebble v0.4 整理启动品牌、设置分区、About 对话框、编辑器元数据选项和 Auto Timing 控件。
cover: cover.webp
copyright_author: 簡諧點源
---

`Rolling Pebble v0.4` 已经发布。这一版本主要是在让本地歌词工作站的界面成形，并将此前分散的原型功能整理成更接近正式应用的结构。

在前期开发中，我们已经把 Auto Timing、项目编辑和设置项陆续接入界面，但应用仍然带着比较明显的实验痕迹。v0.4 的重点不是新增一个孤立功能，而是把这些功能收束到一个更清晰、更容易继续维护的本地工作站界面里。

## 核心变化

### Settings 与 About

设置页被重新分成几个更清楚的区域：

- General；
- Project；
- Lyrics Import；
- Synchronizer & Editor；
- Auto Timing；
- Upload。

About 也从 Settings 中独立出来，放入项目用途、版本、credits、快捷键和权利说明。

我们希望设置页只放真正会影响行为的选项；项目介绍、作者信息和快捷键则交给 About。

### 编辑器元数据

0.4.2/0.4.3 继续整理了编辑器中的 metadata 选项。

现在这个选项更明确地控制是否把 metadata tags 写入 LRC 文本，同时保留元数据编辑区。这样用户可以编辑曲目信息，但不一定要把这些信息直接混进歌词文本区域。

### Auto Timing 设置

Auto Timing 的设置文案、运行时控件和任务默认值也在继续收束。模型下载、处理 preset、命令预览和运行日志都需要能被用户看懂，否则自动打轴会显得像一个黑箱按钮。

## 开发进度

v0.4 还不是最终形态，但它已经把 Rolling Pebble 的应用外壳搭出来了：它正在从几个功能面板拼接成的原型，变成一个面向本地歌词维护流程的工作站。
