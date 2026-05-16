import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseDocsOptions } from '@/lib/docs/base-options';
import { source } from '@/lib/docs-csharp/source';

export default function DocsCsharpLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseDocsOptions('C# Docs')}>
      {children}
    </DocsLayout>
  );
}
