---
title: pylrclibup 已发布：一个面向 LRCLIB 上传流程的小工具
url_slug: pylrclibup-lrclib-upload-workflow
date: 2025-12-08 22:20:00
tags:
  - 软件项目
  - 命令行工具
  - Python
  - LRCLIB
categories: 軟件項目
description: pylrclibup 是一个用于整理本地歌词并上传到 LRCLIB 的 Python 命令行工具。
cover: cover.webp
copyright_author: 簡諧點源
---

我们先前公布的小工具 `pylrclibup` 已经于 [GitHub](https://github.com/Harmonese/pylrclibup) 上公布首个版本 [v0.5.6](https://github.com/Harmonese/pylrclibup/releases/tag/v0.5.6)，命令行工具还被上传于 [PyPI](https://pypi.org/project/pylrclibup/)，可以直接使用 Python 包管理器下载。

## 它解决什么问题

LRCLIB 是一个开放的歌词数据库，很适合保存带时间轴的 LRC 歌词。但如果本地目录里同时有音频、歌词、下载残留文件和各种命名习惯不一致的文件，上传之前往往要先做一遍清理。

`pylrclibup` 主要处理这些事情：

- 扫描本地音频文件与 LRC 文件；
- 根据曲名、艺术家、文件名做 LRC 匹配；
- 清理 LRC 中的重复行、署名行和不统一的文本格式；
- 在上传前预览歌词内容；
- 遇到网络或 LRCLIB proof-of-work 流程时自动重试；
- 在需要时把处理完成的音频和歌词移动到指定目录。

## 几种常用方式

最简单的情况是在一个目录里直接运行：

```bash
pylrclibup
```

如果歌词是从其他地方下载来的，也可以让它把 LRC 移到音乐目录并改成对应文件名：

```bash
pylrclibup -d "/music/tracks" "/downloads/lyrics"
```

还有一种匹配模式：

```bash
pylrclibup -m
```

这个模式会让 LRC 跟随音频、重命名并清洗内容，适合一批歌曲已经在本地整理好，但歌词文件还比较散乱的情况。

## YAML 元数据

这次版本里也加入了 YAML 元数据支持。这样即使手边没有完整音频文件，也可以用一个 YAML 文件描述曲目，然后让工具用这些信息去匹配和上传歌词。

例如：

```yaml
track: "Song Title"
artist: "Artist Name"
album: "Album Name"
duration: 180
lrc_file: "Song Title.lrc"
```

## 双语界面

`pylrclibup` 现在支持英文和中文界面，可以自动根据系统语言选择，也可以手动指定：

```bash
pylrclibup --lang zh_CN
```

## 接下来

目前 `pylrclibup` 还是一个偏上传场景的工具。如果你也在维护本地 LRC 或往 LRCLIB 提交歌词，可以先把它当成一个专注上传流程的小助手来用。

未来可能会将 `pylrclibup` 升级为 LRCLIB API 的完整 Python 封装，并会用更模块化的方式重新实现其功能。