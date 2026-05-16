import { docsEngine } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

export const source = loader({
  baseUrl: '/docs-engine',
  source: docsEngine.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});
