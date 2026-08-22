---
title: py-roller v0.8 已发布：引入面向前端和自动化的协议
url_slug: py-roller-0-8-protocol-v1
date: 2026-06-16 22:50:00
tags:
  - 软件项目
  - Python
  - 歌词
  - 自动打轴
categories: 軟件項目
description: py-roller 0.8 引入 protocol v1，为 GUI、批处理和自动化调用提供稳定的 JSON 请求、进度与结果边界。
cover: cover.webp
copyright_author: 簡諧點源
---

`py-roller v0.8.0` 已经更新，可以在 [GitHub 仓库](https://github.com/Harmonese/py-roller/releases/tag/v0.8.0) 查看。这次更新的关键词是引入了 protocol v1，为 GUI、批处理和自动化调用提供稳定的 JSON 请求、进度与结果边界。先前的版本已经能跑 pipeline，也能输出结构化进度。但 `py-roller` 作为 Rolling Pebble 工作站的歌词打轴引擎，需要能让前端界面稳定知道：这个版本支持什么能力、请求应该怎么写、进度事件长什么样、最终结果在哪里、失败时错误如何表达，因此这次更新将机器可读边界正式整理出来。

这个版本已经几乎生产可用，绝大部分涉及环境和自动化流程的 bug 已经被修复。一般用户也可以下载这个版本进行使用，欢迎反馈使用过程中遇到的问题！

## 协议功能

### capabilities

新增的能力查询命令可以输出 JSON：

```bash
py-roller capabilities --output-format json
```

### request JSON

`run` 和 `batch` 现在可以接收请求文件：

```bash
py-roller run --request request.json \
  --progress-format jsonl \
  --output-format json
```

### progress JSONL

进度输出继续使用 JSONL，但这次进入了更明确的 protocol v1 形状。事件中包含 schema version、stage、message、progress、timestamp 等字段。

### final report envelope

最终输出也整理成统一 envelope，这个改动把命令行层和机器调用层分开了。CLI 仍然可以服务终端用户，但内部执行边界会通过 `pyroller.engine` 和协议输出提供给前端或自动化流程。

## 为什么没有 v0.7？

因为一次上传失误导致 v0.7 版本号被错误的占用了，因此不得不跳过这个版本。
