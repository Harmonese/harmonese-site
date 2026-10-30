---
title: py-roller v0.10 已发布：重写对齐引擎与 Protocol v2
url_slug: py-roller-v0-10-engine-protocol-v2
date: 2026-10-15 13:47:13
tags:
  - 软件项目
  - Python
  - 歌词
  - 自动打轴
categories: 軟件項目
description: py-roller v0.10 改用 Whisper 发现、重复歌词实例匹配与局部 CTC 打轴，引入 Protocol v2，并移除旧命令与 ASS 导出。
cover: cover.webp
copyright_author: 簡諧點源
---

`py-roller v0.10.0` 已经发布，可以在 [GitHub Releases](https://github.com/Harmonese/py-roller/releases/tag/v0.10.0) 查看。这次更新重写了对齐引擎，也重新整理了命令行和面向 Rolling Pebble 的协议。

这是一次不兼容旧版的更新。使用 protocol v1 或旧命令接入的程序需要迁移，不能直接把 0.10 当成原有接口下的一次小修补。

## 核心变化

### 从歌曲里寻找实际演唱顺序

0.10 用英语 Whisper 发现、考虑重复段落的歌词实例匹配和局部 CTC 打轴，替换了 0.9 的音素/TTS 流水线。纯文本歌词里的排列顺序和重复次数，不再直接被当作歌曲实际的演唱顺序。

一份歌词可能只写一次副歌，录音里却唱了几遍；同一句也可能出现在不同位置。新引擎把寻找这些实际演唱实例作为对齐的一部分，再继续处理局部时间。

这一版固定使用 Whisper large-v3 作为基线，保留已经评估过的加权匹配、证据拼接和保守的 CTC 时间算法。large-v3 在不同歌曲上的表现有好有坏，选择这个基线并不意味着它在所有歌上都优于 v2。

### Protocol v2

新的协议加入请求校验、有序 JSONL 事件、可以修订的完整快照，以及明确的完成、失败和取消状态，供 Rolling Pebble 等调用方接入。最终结果收束为较紧凑的 `alignment.json`。

仓库也提供了 JSON Schema、子进程集成示例和迁移指南。模型适配、任务编排、算法内部实现和外部协议分别整理，减少前端调用直接依赖引擎内部细节的情况。

### 命令行与模型管理

命令行调整为：

```text
py-roller align
py-roller run --request
py-roller doctor
py-roller models list
py-roller models download
```

这里列的是新的命令入口，实际参数请以该版本帮助和仓库说明为准。`doctor` 用于只读检查依赖和模型，模型清单与下载也有了专门的入口。运行前的问题会以结构化错误报告，每次运行的产物独立保存，神经模型计算得到的证据可以按内容标识复用。

旧版 batch、配置与协议栈，以及音素解析器、TTS 时代的组件和 ASS 写出器已经从当前实现中移除，旧 CLI 命令不再支持。

## 当前限制

0.10.0 当前只支持英语和 LRC 输出。重复、重度处理或重叠的人声仍然可能漏掉或对错时间，结果需要审阅。预览是在完整 CTC 处理之后提供的，也不是实时麦克风处理。

Demucs 需要主动选择使用，并且可能移除经过效果处理的人声。是否先做人声分离，仍然要结合具体歌曲判断。

欢迎在 [GitHub Issues](https://github.com/Harmonese/py-roller/issues) 反馈迁移和对齐问题，尤其是重复段落识别、结果缺失和时间异常的具体案例。
