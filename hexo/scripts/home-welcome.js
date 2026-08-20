'use strict';

const root = hexo.config.root.endsWith('/')
  ? hexo.config.root
  : `${hexo.config.root}/`;

hexo.extend.injector.register(
  'head_end',
  `<link rel="stylesheet" href="${root}css/home-welcome.css">`,
  'home'
);

hexo.extend.injector.register(
  'body_end',
  `<script src="${root}js/home-welcome.js" data-home-root="${root}"></script>`,
  'home'
);
