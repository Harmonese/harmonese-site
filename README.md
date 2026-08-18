# harmonese-site

<div align="center">
  <a href="https://harmonese.cn" target="_blank">
    <b>簡諧點源 Harmonese – Official Portal & Blog</b>
  </a>
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/website?url=https%3A%2F%2Fharmonese.cn&label=harmonese.cn" alt="Website">
  <img src="https://img.shields.io/badge/static%20site-Hexo%20%2B%20Butterfly-blue" alt="Hexo + Butterfly">
  <img src="https://img.shields.io/badge/language-zh--CN-orange" alt="Language: zh-CN">
  <img src="https://img.shields.io/badge/license-CC%20BY--SA%204.0-green" alt="License: CC BY-SA 4.0">
</div>

> **English | [中文说明](#harmonese-site-中文)**

---

## 🪶 Overview

**harmonese-site** is the source code of the official portal and blog for
**簡諧點源（Harmonese）**, a Chinese electronic music duo.

The site is built with **Hexo** and the **Butterfly** theme, and serves as:

- the official announcement board for Harmonese
- a blog platform for individual band members
- an index to external music and open‑source resources

Live site: **https://harmonese.cn**

### Content Categories

The portal organizes posts into several main categories:

- **Band Announcements** – official news, releases, and notices
- **Software Projects** – tools and projects developed by the band, mostly related to the music open‑source community
- **Music Columns** – long‑form articles written by band members
- **Music Short Reviews** – brief recommendations and reviews of tracks

Authors are identified by the signature at the bottom of each article.

---

## 🎧 About Harmonese

**簡諧點源（Harmonese）** is a Chinese electronic music duo founded in 2021 by:

- **聲爆光年** – composition, lyrics, production, vocals
- **概率雲實體** – visual design and cover art

Their music is rooted in **Electronic**, **Synthwave**, and **Trance**, deeply influenced by **Cyberpunk** aesthetics.

### Selected Works

- Albums
  - **[《電子歌劇》 (*Electropera*)](https://harmonese.bandcamp.com/album/-)** – debut studio album, released 2022‑02‑18
  - **[《血紅都會》 (*Crimsonopolis*)](https://harmonese.bandcamp.com/album/--2)** – latest studio album, releasing 2025‑12‑25
- Compilation
  - **[《電子歌劇 (Probabilities)》](https://harmonese.bandcamp.com/album/probabilities)** – remixes, special cuts, and instrumentals, released 2023‑07‑20
- Representative tracks
  - **[《零點 (with luny)》](https://harmonese.bandcamp.com/track/with-luny)**
  - **[《對決》](https://harmonese.bandcamp.com/track/--8)**

---

## 🧩 Tech Stack

- **Static Site Generator:** [Hexo](https://hexo.io/)
- **Theme:** [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)
- **Language:** Chinese (zh‑CN)
- **Deployment:** Cloudflare Pages, automatically built from the `main` branch

> Note: This repository only contains the **site source** (content & configuration).
> Music files and most code projects are hosted on external platforms.

---

## 🛠 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/) (the package manager used by this repository)

Check versions:

```bash
node -v
pnpm -v
git --version
```

### 2. Clone the Repository

```bash
git clone https://github.com/Harmonese/harmonese-site.git
cd harmonese-site
```

The repository root is used for Git operations. The actual Hexo project is in
the `hexo/` subdirectory, so all package-manager and Hexo commands below must
be run from there.

### 3. Install Dependencies

```bash
cd hexo
pnpm install --frozen-lockfile
```

This installs the exact dependency versions recorded in `pnpm-lock.yaml`,
including:

- Hexo CLI & core
- Butterfly theme dependencies
- Any additional plugins configured in `_config.yml`

### 4. Local Development

Start a local server with hot‑reload:

```bash
pnpm server
```

The site will be available at:

- http://localhost:4000

### 5. Build for Production

Generate the static site:

```bash
pnpm build
```

The output is in `hexo/public/`. This directory is ignored by Git and should
not be committed.

Pushing the `main` branch to GitHub triggers the connected Cloudflare Pages
deployment. Hexo's `deploy` command is not used by this repository.

> npm can technically be used inside `hexo/` (`npm install`, `npm run server`,
> `npm run build`), but it does not use `pnpm-lock.yaml` and may resolve different
> dependency versions or create a `package-lock.json`. To keep local and
> Cloudflare builds reproducible, use pnpm and do not mix lockfile formats.

### 6. Embed NetEase Cloud Music

Use the standard MetingJS element directly in Markdown posts:

```html
<meting-js id="28391863" server="netease" type="song"></meting-js>
```

Set `type` to `song`, `album`, or `playlist` as needed. The pinned APlayer and
MetingJS browser assets are loaded explicitly through `_config.butterfly.yml`;
the site does not use the legacy `hexo-tag-aplayer` plugin.

---

## 📚 Content & Resources

This repository does **not** store audio files or full source code for music‑related tools.
Most resources are maintained on public platforms:

- **Music files (CC BY‑SA):**
  - https://harmonese.bandcamp.com
- **Metadata / full discography / recording info / credits:**
  - https://musicbrainz.org/search?query=harmonese&type=artist&method=indexed
- **Lyrics:**
  - plain text on Bandcamp
  - time‑coded lyrics on https://lrclib.net
- **Music‑related code projects (MIT):**
  - https://github.com/harmonese

---

## 🤝 Contributing

This repository is primarily used for the band’s official site, but:

- Issues for **typos, broken links, or technical problems** with the site are welcome.
- Feature requests related to the portal itself can be discussed via GitHub Issues.

Content changes (articles, statements, etc.) are usually managed by the band members themselves.

---

## 📄 License

The content and configuration in this repository are licensed under:

**[Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](LICENSE)**

You are free to:

- **Share** – copy and redistribute the material in any medium or format
- **Adapt** – remix, transform, and build upon the material, including for commercial purposes

Under the following terms:

- **Attribution** – credit “簡諧點源 Harmonese” and link back to https://harmonese.cn
- **ShareAlike** – distribute your contributions under the **same license** (CC BY-SA 4.0)

> Note: External components such as the **Butterfly theme** retain their own licenses.
> Please refer to their respective repositories for details.

---

## 👤 Authors

- **簡諧點源 Harmonese**
  - Website: https://harmonese.cn
  - GitHub: [@Harmonese](https://github.com/Harmonese)

---

# harmonese-site （中文）

<div align="center">
  <a href="https://harmonese.cn" target="_blank">
    <b>簡諧點源 Harmonese – 官方门户与博客</b>
  </a>
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/website?url=https%3A%2F%2Fharmonese.cn&label=harmonese.cn" alt="Website">
  <img src="https://img.shields.io/badge/static%20site-Hexo%20%2B%20Butterfly-blue" alt="Hexo + Butterfly">
  <img src="https://img.shields.io/badge/language-zh--CN-orange" alt="Language: zh-CN">
  <img src="https://img.shields.io/badge/license-CC%20BY--SA%204.0-green" alt="License: CC BY-SA 4.0">
</div>

**harmonese-site** 是 **簡諧點源（Harmonese）** 官方门户网站与博客的源码仓库，
基于 **Hexo** 静态博客框架与 **Butterfly** 主题搭建。

线上地址：**https://harmonese.cn**

---

## 🪶 网站简介

本网站同时作为：

- 簡諧點源乐队的 **官方公告站**
- 乐队成员个人的 **博客与专栏平台**
- 指向各类 **公开数据库 / 托管平台** 的导航页

### 主要分类

- **乐队公告**：乐队相关的公告、通知、新闻等
- **软件项目**：乐队开发的音乐开源社区相关工具与软件
- **音乐专栏**：乐队成员撰写的音乐长文、专题
- **音乐短评**：用于歌曲推荐的简短评论

可通过文章底部的署名识别作者。

---

## 🎧 乐队简介

**簡諧點源（Harmonese）** 是一支中国电子音乐组合，成立于 2021 年，由：

- **聲爆光年** – 作曲、作词、制作及人声担当，是简谐点源音乐的核心创作者
- **概率雲實體** – 负责视觉创意与封面设计，共同构筑简谐点源的视觉美学

音乐核心建立在 **电子（Electronic）**、**合成器浪潮（Synthwave）**、**迷幻舞曲（Trance）** 等流派之上，深受 **赛博朋克（Cyberpunk）** 风格影响。

### 作品与发行

- 专辑
  - **[《電子歌劇》](https://harmonese.bandcamp.com/album/-)** (*Electropera*) – 首张录音室专辑，确立世界观基石，发行于 2022‑02‑18
  - **[《血紅都會》](https://harmonese.bandcamp.com/album/--2)** (*Crimsonopolis*) – 最新录音室专辑，将于 2025‑12‑25 正式发行
- 合辑
  - **[《電子歌劇 (Probabilities)》](https://harmonese.bandcamp.com/album/probabilities)** – 原专辑的延伸合集，包含重混、特殊版本和器乐混音，风格跨越 House、Dubstep、Hardcore 等，发行于 2023‑07‑20
- 代表曲目
  - **[《零點 (with luny)》](https://harmonese.bandcamp.com/track/with-luny)**
  - **[《對決》](https://harmonese.bandcamp.com/track/--8)**

---

## 🧩 技术栈

- **静态博客框架**：[Hexo](https://hexo.io/)
- **主题**：[Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)
- **站点语言**：简体中文（zh‑CN）
- **部署方式**：本地生成静态文件后上传至服务器 / 静态托管平台

> 注意：本仓库仅包含 **网站内容与配置**，
> 不包含歌曲音频文件和大部分软件项目源码。

---

## 🛠 本地开发

### 1. 环境要求

- [Node.js](https://nodejs.org/)（建议使用 LTS 版本）
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/)（本仓库使用的包管理器）

验证版本：

```bash
node -v
pnpm -v
git --version
```

### 2. 克隆仓库

```bash
git clone https://github.com/Harmonese/harmonese-site.git
cd harmonese-site
```

仓库根目录用于执行 Git 操作；真正的 Hexo 项目位于 `hexo/` 子目录中。
下文所有包管理器和 Hexo 命令都应在 `hexo/` 目录执行。

### 3. 安装依赖

```bash
cd hexo
pnpm install --frozen-lockfile
```

该命令会按照 `pnpm-lock.yaml` 中记录的确切版本安装：

- Hexo 相关依赖
- Butterfly 主题依赖
- `_config.yml` 中配置的各类插件

### 4. 本地预览

```bash
pnpm server
```

在浏览器打开：

- http://localhost:4000

### 5. 生成静态文件

```bash
pnpm build
```

生成后的静态文件位于 `hexo/public/`。该目录已被 Git 忽略，不应提交。

将 `main` 分支推送到 GitHub 后，关联的 Cloudflare Pages 项目会自动构建并部署。
本仓库不使用 Hexo 自带的 `deploy` 命令。

> 技术上也可以在 `hexo/` 目录使用 npm，例如 `npm install`、
> `npm run server` 和 `npm run build`。但 npm 不读取 `pnpm-lock.yaml`，可能安装
> 不同的依赖版本或生成 `package-lock.json`。为了让本地与 Cloudflare 构建结果
> 可复现，建议统一使用 pnpm，不要混用两种锁文件。

### 6. 在文章中嵌入网易云音乐

直接在 Markdown 文章中使用标准 MetingJS 元素：

```html
<meting-js id="28391863" server="netease" type="song"></meting-js>
```

`type` 可以设置为 `song`、`album` 或 `playlist`。APlayer 与 MetingJS 的浏览器
资源已在 `_config.butterfly.yml` 中固定版本并显式加载，本站不再使用旧的
`hexo-tag-aplayer` 插件。

---

## 📚 内容与外部资源

本仓库 **不储存**、**不直接提供**：

- 歌曲音频文件
- 歌曲工程文件
- 音乐相关项目的完整源码（除非另行说明）

乐队的大部分信息与资源维护于以下平台：

- **音乐文件（CC BY‑SA 授权）**
  - https://harmonese.bandcamp.com
- **音乐元数据 / 完整发行目录 / 录音信息 / 完整 credits**
  - https://musicbrainz.org/search?query=harmonese&type=artist&method=indexed
- **歌词**
  - 无时间轴歌词：Bandcamp 曲目页面
  - 带时间轴歌词：https://lrclib.net
- **音乐相关项目源代码（MIT 协议）**
  - https://github.com/harmonese

---

## 🤝 参与维护

本仓库主要由乐队成员维护，用于管理官方站点内容与结构。欢迎通过 Issues：

- 反馈 **错别字、排版问题、链接失效** 等
- 反馈 **站点访问与显示问题**

关于乐队作品本身的意见或合作事宜，请优先通过乐队在各平台公开的联系方式进行沟通。

---

## 📄 协议说明

本仓库内容与配置以：

**[知识共享 署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)](LICENSE)** 协议发布。

你可以自由：

- **共享**：以任何媒介或形式复制、转载本仓库内容
- **演绎**：修改、改编或二次创作，包括商业用途

但需遵守：

- **署名**：注明“簡諧點源 Harmonese”并链接至 https://harmonese.cn
- **相同方式共享**：基于本仓库内容的演绎作品须以相同的 CC BY-SA 4.0 协议发布

> 提示：诸如 **Butterfly 主题** 等外部组件仍受其各自开源协议约束，
> 请参考相应项目仓库的 LICENSE 文件。

---

## 👤 作者

- **簡諧點源 Harmonese**
  - 官网：https://harmonese.cn
  - GitHub：[ @Harmonese ](https://github.com/Harmonese)
