import { DocsLayout } from '@/components/docs/DocsLayout'
import { DocHeader, DocTodo, DocBreadcrumb } from '@/components/docs/DocComponents'
import { ENGINE_DOCS_NAV } from '@/lib/docs-nav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nanally Engine — Documentation',
  description: 'Official documentation for Nanally Engine.',
}

export default function EngineDocsIndex() {
  return (
    <DocsLayout nav={ENGINE_DOCS_NAV} title="Nanally Engine Docs" accentColor="blue">
      <DocBreadcrumb items={[{ label: 'Docs' }, { label: 'Nanally Engine' }, { label: 'Introduction' }]} />
      <DocHeader
        title="Nanally Engine"
        description="Welcome to the official documentation for Nanally Engine — a custom game engine built in C#."
        badge="v0.1-alpha"
      />

      {/* 
        TODO: Add your MDX content here.
        
        You can either:
        1. Write content directly below as JSX/TSX
        2. Load from /content/docs-engine/index.mdx using next-mdx-remote
        
        Example sections to add:
        - What is Nanally Engine?
        - Why build a custom engine?
        - Core concepts overview
        - How to navigate these docs
      */}
      <DocTodo page="content/docs-engine/index.mdx" />
    </DocsLayout>
  )
}
