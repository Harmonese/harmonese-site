---
title: Rolling Pebble v0.6 已发布：GitHub 发布、存储清理与完整设置页
url_slug: rolling-pebble-v0-6-release-storage-settings
date: 2026-05-20 17:10:00
tags:
  - 软件项目
  - 歌词
  - Rolling Pebble
categories: 軟件項目
description: Rolling Pebble v0.6 进入 GitHub Releases 阶段，并整理 i18n、存储清理、运行时依赖管理和 Settings 页面。
cover: cover.webp
copyright_author: 簡諧點源
---

`Rolling Pebble v0.6` 已经发布。这次更新是一次面向发布和长期使用的整理。

从这个版本开始，我们把项目推向 GitHub Releases，并继续整理设置页、存储清理、运行时依赖管理和界面国际化。Rolling Pebble 正在从本地实验应用，变成可以被下载、安装和持续维护的项目。

## 核心变化

### 后端到前端的 i18n

这次加入了统一的 backend-to-frontend message i18n 路径，并扩展了 settings、runtime、storage、project、upload 和 utility 流程里的界面翻译。

Rolling Pebble 里很多信息来自后端任务，尤其是运行时安装、检查、清理和自动打轴。如果只有前端静态文案翻译，而后端消息仍然直接吐英文，用户体验会断裂。

### Storage & Cleanup

Settings 里新增了专门的 Storage & Cleanup 区域，覆盖：

- 本地存储位置迁移；
- 存储使用情况摘要；
- 项目自动删除设置；
- 清理预览；
- runtime、model、project 等数据分类。

歌词工作站会长期积累项目、模型、日志和中间产物。没有清理面板，用户迟早会不知道空间去哪了。

### 界面基础组件

0.6 也提炼了一批前端复用组件，包括 modal shell、segmented tabs、panel messages、settings rows、Auto Timing fields 和 settings refresh 处理。

这属于继续还 UI 债。功能越来越多之后，如果每个面板都自己写控件，界面会很快变得不一致。
