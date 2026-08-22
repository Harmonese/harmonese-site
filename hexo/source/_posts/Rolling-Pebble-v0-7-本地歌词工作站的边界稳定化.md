---
title: Rolling Pebble v0.7 已发布：本地歌词工作站的边界稳定化
url_slug: rolling-pebble-v0-7-workstation-boundaries
date: 2026-06-16 23:20:00
tags:
  - 软件项目
  - 歌词
  - Rolling Pebble
  - 自动打轴
categories: 軟件項目
description: Rolling Pebble v0.7 围绕 py-roller protocol v1、OpenAPI、前端 i18n 与运行时任务状态整理本地歌词工作站的边界。
cover: cover.webp
copyright_author: 簡諧點源
---

`Rolling Pebble v0.7` 已经发布。这次更新是一次边界整理版本，实现和 `py-roller` 的配合更新。

## 核心变化

### 对齐 py-roller protocol v1

Rolling Pebble 现在把隔离 Auto Timing 运行时要求提升到：

```text
py-roller>=0.8.3,<0.9
```

后端生成的 Auto Timing 请求会按 py-roller protocol v1 输出 JSON，而不是继续依赖旧的 CLI 参数形状。仓库里也加入了 contract coverage，用来验证 Rolling Pebble 生成的 run 和 batch 请求能被本地 py-roller parser 接受。

### OpenAPI 与前端共享路由

这次也补了后端 OpenAPI contract coverage，覆盖前端会用到的共享 API 路由：

- settings；
- projects；
- Auto Timing；
- jobs；
- runtime；
- storage；
- upload。

Rolling Pebble 是一个本地应用，但本地应用也需要接口边界。前后端如果只靠“现在能跑”来维持，很快就会在重构时互相踩脚。

### 前端和后端模块边界

前端结构继续围绕 `app`、`domain`、`features`、`ui` 和 `shared` 整理；后端则围绕 `api`、`services`、`runtime`、`storage` 和 `adapters` 收束。

### i18n 与运行时消息

Rolling Pebble 的界面现在有前端 i18n 覆盖检查，尤其会卡住中文路径下未翻译的 Auto Timing 和 runtime progress 标签。

### 运行时恢复

0.7 还修复了不完整或损坏 managed virtual environment 后的恢复流程。现在在创建隔离运行时时，如果发现 managed `.venv` 状态不完整，会先重建再安装依赖。

Runtime Check 成功时也会显示更具体的 doctor 结果，而不是只给一个笼统成功提示。
