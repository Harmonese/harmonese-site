---
title: py-roller v0.5 已发布，暂未做到生产可用
url_slug: py-roller-0-5-not-production-ready
date: 2026-05-12 23:20:00
tags:
  - 软件项目
  - Python
  - 歌词
  - 自动打轴
categories: 軟件項目
description: py-roller 0.5 加入 install、doctor、CPU/CUDA profile、模型缓存与更清晰的音频运行时管理。
cover: cover.webp
copyright_author: 簡諧點源
---

`py-roller 0.5` 是一次比较大的整理。这次更新的重点在于实现了自动打轴工具拥有自己的运行时。自动歌词对齐会牵涉 Torch、Torchaudio、faster-whisper、Transformers、Demucs、librosa，以及 Hugging Face 模型下载。只要其中一环装错，用户看到的就不是“歌词对齐失败”，而是一堆环境错误。因此本次更新实现了对于环境问题的整体优化。

## 核心变化

### install 与 doctor

新版本加入了：

```bash
py-roller install
py-roller doctor
```

`install` 用于安装经过验证的本地音频/转写运行时；`doctor` 用于检查 Python、Torch、Torchaudio、faster-whisper、CTranslate2、Transformers、Demucs、librosa 和代理支持。

我现在更倾向于让工具明确告诉用户“缺什么、坏在哪、怎么修”，而不是等到 pipeline 跑到一半才爆出一个底层库异常。

### CPU 与 CUDA profile

这次提供了 CPU 和 CUDA 12.4 两套安装 profile，并配套约束文件。这样至少在支持范围内，依赖组合不再完全交给随机解析。

音频工具的依赖问题很容易变成玄学：Torch 版本、CUDA 版本、系统平台、Python 版本都可能影响结果。profile 不能消灭所有问题，但可以把默认路径变得更窄、更可诊断。

### 本地模型仓库

`py-roller` 现在有自己的转写模型缓存目录，默认位于本地缓存中。也可以通过参数指定模型路径或只使用本地文件：

```bash
py-roller run --transcriber-model-path /path/to/model
py-roller run --transcriber-local-files-only
```

这对网络环境不稳定的机器很重要。模型下载失败不应该每次都把整条流水线拖死；能预先准备、能复用、能离线运行，才适合真正放进工作流。

### Hugging Face 下载控制

这次也加入了几个下载相关参数，包括 XET、代理、etag timeout、download timeout 和 worker 数量。

这些参数看上去有点“工程味”，但实际很必要。模型文件很大，下载链路又容易受到网络环境影响。如果没有这些控制项，用户只能看到下载卡住，却不知道该切代理、关 XET，还是调超时。

### 重复歌词对齐

自动打轴里一个常见问题是重复段落：副歌重复、歌词省略、同一句出现多次。如果对齐器只按最简单的线性匹配走，很容易把后半首歌对错。

这次加入了 repetition-aware aligner 模式：

```bash
--aligner-repetition none|few|full
```

它可以让重复歌词的处理更显式。

## 开发进度

`py-roller v0.5` 仍然缺少很多核心测试，距离可以稳定工作的歌词自动打轴器还有一定距离。

接下来我们会继续处理两类问题：一类是让 pipeline 本身更稳，另一类是让它更容易被图形界面或其他自动化流程读取进度。自动打轴跑起来时间不短，外部界面需要知道它到底是在下载模型、分离人声，还是已经卡住了。
