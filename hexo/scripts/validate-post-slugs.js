'use strict';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

hexo.extend.filter.register('before_generate', () => {
  const posts = hexo.locals.get('posts');
  const slugs = new Map();
  const errors = [];

  posts.forEach(post => {
    const source = post.source || post.title || '(unknown post)';
    const slug = typeof post.url_slug === 'string' ? post.url_slug.trim() : '';

    if (!slug) {
      errors.push(`${source}: missing slug`);
      return;
    }

    if (!slugPattern.test(slug)) {
      errors.push(`${source}: invalid slug "${slug}"`);
      return;
    }

    if (slugs.has(slug)) {
      errors.push(`${source}: duplicate slug "${slug}" (also used by ${slugs.get(slug)})`);
      return;
    }

    slugs.set(slug, source);
  });

  if (errors.length > 0) {
    throw new Error(`Post slug validation failed:\n- ${errors.join('\n- ')}`);
  }
});
