---
title: pylrclib v0.5 已发布：适配 LRCLIB 接口
url_slug: pylrclib-v0-5-released-adapt-to-lrclib-api
date: 2026-05-23 00:40:00
tags:
  - 软件项目
  - 命令行工具
  - Python
  - LRCLIB
categories: 軟件項目
description: pylrclib 0.5 加入 flag 命令，并调整上传流程以适配当前 LRCLIB API 与伴奏曲目标记方式。
cover: cover.webp
copyright_author: 簡諧點源
---

`pylrclib v0.5` 已经更新，可以在 [GitHub 仓库](https://github.com/Harmonese/pylrclib/releases/tag/v0.5.0) 查看。这次更新补上了一个和数据库维护有关的动作：标记错误记录。

## 更新内容

新版本加入：

```bash
pylrclib flag
```

它用于按 LRCLIB id 报告不正确的记录。

这次还调整了上传流程里和 LRCLIB 当前接口有关的行为：

- 不再依赖已经返回 404 的 `/api/get-cached`；
- 伴奏记录使用当前接受的 `[au: instrumental]` synced marker；
- 缺失的可选参数不会再被填成 `duration=0` 发送出去。

本次更新后，LRCLIB API 已经被 `pylrclib` 完整封装完毕。偏好命令行使用的用户可以直接将本工具接入涉及 LRCLIB 的工作流程。