---
title: py-roller 已发布：自动滚动歌词生成流水线的起点
url_slug: py-roller-automatic-rolling-lyrics-pipeline
date: 2026-04-09 23:10:00
tags:
  - 软件项目
  - Python
  - 歌词
  - 自动打轴
categories: 軟件項目
description: py-roller 的初始版本把自动滚动歌词生成拆成 splitter、filter、transcriber、parser、aligner 与 writer 六个阶段。
cover: cover.webp
copyright_author: 簡諧點源
---

今天把 `py-roller` 的初始版本已经于 [GitHub](https://github.com/Harmonese/py-roller) 上公布首个版本 [v0.4.0](https://github.com/Harmonese/py-roller/releases/tag/v0.4.0)，命令行工具还被上传于 [PyPI](https://pypi.org/project/py-roller/)，可以直接使用 Python 包管理器下载。

这个项目使用多项音频处理技术，使用歌曲音频和已有的纯文本歌词文件自动制作带时间戳的滚动歌词，最后导出可以继续使用的 LRC 或 ASS 文件。

目前，完整的工作流程分为如下几个阶段：

- `splitter`：从音频中分离人声；
- `filter`：对音频进行降噪、去混响等滤波处理；
- `transcriber`：把音频转成可用于对齐的文本或音素信息；
- `parser`：解析输入歌词；
- `aligner`：把歌词单元与音频识别结果对齐；
- `writer`：写出 LRC 或 ASS 等格式。

这个拆分的好处是，每一步都可以单独理解，也方便之后替换后端。比如转写可以有不同模型，对齐可以有不同策略，输出也不必只限于一种格式。

目前项目主要关注两个输出方向：用于普通带时间轴歌词的 `.lrc` 格式和用于更复杂的卡拉 OK 或字幕展示的 `.ass` 格式。LRC 更接近音乐数据库和播放器的需求，ASS 则更适合视觉展示和后期制作。

项目还处于非常初始的、生产不可用的阶段。如果你对项目感兴趣，可以拉取我们的源码并进行测试或加入开发！
