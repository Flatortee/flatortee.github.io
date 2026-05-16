import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseDocsOptions } from '@/lib/docs/base-options';
import { source } from '@/lib/docs-unity/source';

export default function DocsUnityLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseDocsOptions('Unity Docs')}>
      {children}
    </DocsLayout>
  );
}
