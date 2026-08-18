'use strict';

const { promises: fs } = require('fs');
const path = require('path');

const includePattern = /<!--\s+md\s+(.+?)\s+-->/g;
const includeDir = path.resolve(hexo.source_dir, '_template');

function parseReference(rawReference) {
  const reference = rawReference.trim();
  const quote = reference[0];

  if ((quote === '"' || quote === "'") && reference.at(-1) === quote) {
    return reference.slice(1, -1);
  }

  return reference;
}

function resolveInclude(reference) {
  if (!reference || reference.includes('\0') || path.isAbsolute(reference)) {
    throw new Error(`Invalid Markdown include path: "${reference}"`);
  }

  const resolvedPath = path.resolve(includeDir, reference);
  const relativePath = path.relative(includeDir, resolvedPath);

  if (
    relativePath === '..'
    || relativePath.startsWith(`..${path.sep}`)
    || path.isAbsolute(relativePath)
  ) {
    throw new Error(`Markdown include escapes source/_template: "${reference}"`);
  }

  return resolvedPath;
}

async function expandIncludes(content, source, stack = []) {
  let expanded = '';
  let lastIndex = 0;

  for (const match of content.matchAll(includePattern)) {
    expanded += content.slice(lastIndex, match.index);

    const reference = parseReference(match[1]);
    const includePath = resolveInclude(reference);

    if (stack.includes(includePath)) {
      const cycle = [...stack, includePath]
        .map(file => path.relative(includeDir, file))
        .join(' -> ');
      throw new Error(`Circular Markdown include in "${source}": ${cycle}`);
    }

    let includedContent;
    try {
      includedContent = await fs.readFile(includePath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Markdown include not found in "${source}": "${reference}"`);
      }
      throw error;
    }

    expanded += await expandIncludes(includedContent, source, [...stack, includePath]);
    lastIndex = match.index + match[0].length;
  }

  return expanded + content.slice(lastIndex);
}

hexo.extend.filter.register('before_post_render', async data => {
  if (typeof data.content !== 'string' || !data.content.includes('<!--')) {
    return data;
  }

  data.content = await expandIncludes(data.content, data.source || 'unknown source');
  return data;
}, 0);
