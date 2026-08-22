---
title: py-roller v0.6 已发布：添加多语言支持
url_slug: py-roller-0-6-i18n
date: 2026-05-17 23:30:00
tags:
  - 软件项目
  - Python
  - 歌词
  - 自动打轴
categories: 軟件項目
description: py-roller 0.6 加入多语言 CLI 输出，并清理了大量硬编码提示与翻译格式问题。
cover: cover.webp
copyright_author: 簡諧點源
---

`py-roller 0.6` 已经更新，可以在 [GitHub 仓库](https://github.com/Harmonese/py-roller/releases/tag/v0.6.0) 查看。这次更新主要处理的是多语言界面和可维护性。

这次加入了多语言 i18n 支持，覆盖：

- 简体中文；
- 繁体中文台湾；
- 繁体中文香港；
- 日语；
- 韩语；
- 波兰语；
- 葡萄牙语；
- 斯洛伐克语。

显示语言可以从 `LANG`、`LC_ALL`、`LANGUAGE` 自动检测，也可以通过 `PYROLLER_LANG` 指定。

我特别整理了中文 locale 的脚本变体识别，例如 `zh-Hant`、`zh-HK`、`zh-TW` 等写法，避免系统语言明明是中文，命令行却仍然掉回英文。

`py-roller` 的项目定位具有二重性：一方面，它是一个可以独立使用的歌词自动打轴工具；另一方面，它是我们正在开发的歌词工作站 `Rolling Pebble` 的自动歌词打轴后端引擎，而 `Rolling Pebble` 继承自 `magic-akari/lrc-maker`，需要满足后者的多语言支持功能，因此 `py-roller` 也进行了一定适配。

需要注意的是，除了中文和英文之外的语言的翻译均来自大语言模型输出，因此很有可能存在翻译前后不一致/精准度较低等问题，我们欢迎对应语言的使用者提交 Issues 或者 PR。

这个版本也同时修复了 pipeline 运行中的问题，并收紧了 Python 版本支持范围，现在这一工具在不同的环境下安装成功率有了显著提升。
