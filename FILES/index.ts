// ─── Project types ────────────────────────────────────────────────────────────
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  status: 'completed' | 'wip' | 'archived'
  year: string
  image: string       // path under /public/images/projects/
  link?: string
  github?: string
  featured?: boolean
}

export type ProjectCategory =
  | 'engine'
  | 'game'
  | 'tool'
  | 'web'
  | 'other'

// ─── Tech stack ───────────────────────────────────────────────────────────────
export interface TechItem {
  name: string
  icon?: string
  category: 'language' | 'engine' | 'tool' | 'framework'
}

// ─── Doc meta ─────────────────────────────────────────────────────────────────
export interface DocMeta {
  title: string
  description?: string
  order?: number
  section?: string
  tags?: string[]
}

export interface DocPage {
  slug: string[]
  meta: DocMeta
  content: string
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// ─── Engine feature ───────────────────────────────────────────────────────────
export interface EngineFeature {
  title: string
  description: string
  icon: string
  highlight?: boolean
}
