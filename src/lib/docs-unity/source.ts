import { docsUnity } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';

export const source = loader({
  baseUrl: '/docs-unity',
  source: docsUnity.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});
