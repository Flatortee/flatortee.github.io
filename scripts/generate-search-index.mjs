import { mkdir, writeFile } from 'node:fs/promises';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { initSimpleSearch } from 'fumadocs-core/search/server';

function scanDocsFolder(dir, baseUrl, keywords) {
  const items = [];

  function walk(folderPath, urlPath) {
    try {
      const files = readdirSync(folderPath, { withFileTypes: true });
      files.forEach((file) => {
        if (file.isDirectory()) {
          walk(join(folderPath, file.name), `${urlPath}/${file.name}`);
        } else if (file.name.endsWith('.mdx') || file.name.endsWith('.md')) {
          const filePath = join(folderPath, file.name);
          const content = readFileSync(filePath, 'utf-8');
          const slug = file.name.replace(/\.(mdx?|md)$/, '');
          const url = `${baseUrl}/${slug === 'index' ? '' : slug}`.replace(/\/+/g, '/');

          // Extract title from frontmatter or filename
          const titleMatch = content.match(/^---[\s\S]*?title:\s*['"]?([^'"\n]+)/m);
          const title = titleMatch?.[1] || slug.replace(/-/g, ' ');

          items.push({
            title,
            description: '',
            content: content.split('---').slice(2).join('---').trim(),
            url,
            keywords,
          });
        }
      });
    } catch (err) {
      console.warn(`Warning: Could not read ${dir}`, err.message);
    }
  }

  walk(dir, baseUrl);
  return items;
}

const indexes = [
  ...scanDocsFolder('content/docs-engine', '/docs-engine', 'engine'),
  ...scanDocsFolder('content/docs-csharp', '/docs-csharp', 'csharp'),
  ...scanDocsFolder('content/docs-unity', '/docs-unity', 'unity'),
];

const search = initSimpleSearch({
  indexes,
});

const exported = await search.export();

await mkdir('public', { recursive: true });
await writeFile('public/search-index.json', JSON.stringify(exported));

console.log(`Generated search index with ${indexes.length} pages`);
