import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseDocsOptions } from '@/lib/docs/base-options';
import { source } from '@/lib/docs-engine/source';

export default function DocsEngineLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseDocsOptions('Engine Docs')}>
      {children}
    </DocsLayout>
  );
}
