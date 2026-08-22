'use strict';

const root = hexo.config.root.endsWith('/')
  ? hexo.config.root
  : `${hexo.config.root}/`;
const assetVersion = 4;

hexo.extend.injector.register(
  'head_end',
  [
    '<script>document.documentElement.classList.add("home-welcome-pending")</script>',
    `<link rel="stylesheet" href="${root}css/home-welcome.css?v=${assetVersion}">`
  ].join('\n'),
  'home'
);

hexo.extend.injector.register(
  'body_end',
  `<script src="${root}js/home-welcome.js?v=${assetVersion}" data-home-root="${root}"></script>`,
  'home'
);
