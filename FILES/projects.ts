import type { Project } from '@/types'

// ─── EDIT THIS FILE to add your projects ─────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'nanally-engine',
    title: 'Nanally Engine',
    description:
      'A custom game engine built from scratch. Focused on performance, modularity and developer experience.',
    tags: ['C#', '.NET', 'Game Engine', 'ECS'],
    category: 'engine',
    status: 'wip',
    year: '2024',
    image: '/images/projects/nanally-engine.png', // TODO: add image
    link: '/engine',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'TODO: Project Title',
    description: 'TODO: Add project description.',
    tags: ['TODO'],
    category: 'game',
    status: 'completed',
    year: '2024',
    image: '/images/projects/project-2.png', // TODO: add image
    featured: true,
  },
  {
    id: 'project-3',
    title: 'TODO: Project Title',
    description: 'TODO: Add project description.',
    tags: ['TODO'],
    category: 'tool',
    status: 'completed',
    year: '2023',
    image: '/images/projects/project-3.png', // TODO: add image
    featured: false,
  },
  // Add more projects here...
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export const CATEGORIES = [
  'all',
  'engine',
  'game',
  'tool',
  'web',
  'other',
] as const
