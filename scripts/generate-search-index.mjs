import { mkdir, writeFile } from 'node:fs/promises';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { initSimpleSearch } from 'fumadocs-core/search/server';

import { docsEngine, docsCsharp, docsUnity } from '../collections/server.js';

async function buildIndexes({ baseUrl, docs, keywords }) {
  const source = loader({
    baseUrl,
    source: docs.toFumadocsSource(),
    plugins: [lucideIconsPlugin()],
  });

  const pages = source.getPages();

  return Promise.all(
    pages.map(async (page) => {
      const content = await page.data.getText('processed');

      return {
        title: page.data.title,
        description: page.data.description ?? '',
        content,
        url: page.url,
        keywords,
      };
    })
  );
}

const indexes = [
  ...(await buildIndexes({ baseUrl: '/docs-engine', docs: docsEngine, keywords: 'engine' })),
  ...(await buildIndexes({ baseUrl: '/docs-csharp', docs: docsCsharp, keywords: 'csharp' })),
  ...(await buildIndexes({ baseUrl: '/docs-unity', docs: docsUnity, keywords: 'unity' })),
];

const search = initSimpleSearch({
  indexes,
});

const exported = await search.export();

await mkdir('public', { recursive: true });
await writeFile('public/search-index.json', JSON.stringify(exported));

console.log(`Generated search index with ${indexes.length} pages`);
