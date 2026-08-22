---
title: pylrclib v0.6 已发布：标记、数据库转储与更完整的 LRCLIB 工作流
url_slug: pylrclib-v0-6-released-flag-dumps-lrclib-workflow
date: 2026-05-24 22:30:00
tags:
  - 软件项目
  - 命令行工具
  - Python
  - LRCLIB
categories: 軟件項目
description: pylrclib 0.6 加入 dumps，并让 LRCLIB API 错误和数据库转储下载流程更适合长期维护。
cover: cover.webp
copyright_author: 簡諧點源
---

`pylrclib v0.5` 已经更新，可以在 [GitHub 仓库](https://github.com/Harmonese/pylrclib/releases/tag/v0.6.0) 查看。这个版本继续把 LRCLIB 相关流程补齐：在已有搜索、下载、上传和错误记录反馈之外，增加了公开数据库转储的能力。

## 新增功能

### dumps 命令
这次新增的命令是：

```bash
pylrclib dumps
```

它可以列出 LRCLIB 的公开数据库转储，输出 dump 元数据，也可以下载指定转储。

这个功能面向的不是单首歌，而是更大范围的数据处理。比如想研究已有歌词覆盖情况、检查某些艺术家的记录，或者在本地做批量分析时，数据库转储会比逐条 API 请求更合适。

下载时现在会先写入临时文件，再替换最终目标文件。这样即使网络中断，也不容易留下一个看起来像完整文件、实际只下载了一半的结果。

### 更清楚的 LRCLIB API 错误

这次也整理了 LRCLIB API 错误。HTTP 失败时，工具会尽量保留状态码、API 错误名称、消息和响应文本。

这些改动都偏“工具和真实服务对齐”。命令行工具最怕接口稍微变化就只给一个模糊失败；现在至少能把服务端返回的信息更完整地带出来。
