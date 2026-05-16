import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { DocMeta, DocPage } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getDocSections(section: 'docs-engine' | 'docs-csharp' | 'docs-unity') {
  const sectionDir = path.join(CONTENT_DIR, section)

  if (!fs.existsSync(sectionDir)) return []

  const files = fs.readdirSync(sectionDir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .sort()

  return files.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, '')
    const filePath = path.join(sectionDir, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      meta: data as DocMeta,
      content,
    }
  })
}

export function getDocBySlug(
  section: 'docs-engine' | 'docs-csharp' | 'docs-unity',
  slug: string
): DocPage | null {
  const filePath = path.join(CONTENT_DIR, section, `${slug}.mdx`)
  const altPath = path.join(CONTENT_DIR, section, `${slug}.md`)

  const resolvedPath = fs.existsSync(filePath) ? filePath : fs.existsSync(altPath) ? altPath : null
  if (!resolvedPath) return null

  const raw = fs.readFileSync(resolvedPath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug: [slug],
    meta: data as DocMeta,
    content,
  }
}

export function getAllDocSlugs(section: 'docs-engine' | 'docs-csharp' | 'docs-unity'): string[] {
  const sectionDir = path.join(CONTENT_DIR, section)
  if (!fs.existsSync(sectionDir)) return []

  return fs.readdirSync(sectionDir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.(mdx|md)$/, ''))
}
