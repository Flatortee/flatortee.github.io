import { DocsLayout } from '@/components/docs/DocsLayout'
import { DocHeader, DocTodo, DocBreadcrumb } from '@/components/docs/DocComponents'
import { ENGINE_DOCS_NAV } from '@/lib/docs-nav'
import type { Metadata } from 'next'

// ─── Static params for export ─────────────────────────────────────────────────
// Add all your doc slugs here for static export generation
export function generateStaticParams() {
  return [
    { slug: 'installation' },
    { slug: 'quick-start' },
    { slug: 'architecture' },
    { slug: 'ecs' },
    { slug: 'modules' },
    { slug: 'rendering' },
    { slug: 'physics' },
    { slug: 'input' },
    { slug: 'audio' },
    { slug: 'api' },
    { slug: 'api-components' },
    { slug: 'api-systems' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/-/g, ' ')} — Nanally Engine Docs`,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EngineDocPage({ params }: { params: { slug: string } }) {
  const title = params.slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <DocsLayout nav={ENGINE_DOCS_NAV} title="Nanally Engine Docs" accentColor="blue">
      <DocBreadcrumb
        items={[
          { label: 'Docs' },
          { label: 'Nanally Engine' },
          { label: title },
        ]}
      />
      <DocHeader title={title} />
      {/* TODO: Load MDX from /content/docs-engine/{slug}.mdx */}
      <DocTodo page={`content/docs-engine/${params.slug}.mdx`} />
    </DocsLayout>
  )
}
