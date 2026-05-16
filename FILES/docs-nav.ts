import type { DocNavItem } from '@/components/docs/DocsLayout'

export const ENGINE_DOCS_NAV: DocNavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs-engine',
    children: [
      { title: 'Introduction', href: '/docs-engine' },
      { title: 'Installation', href: '/docs-engine/installation' },
      { title: 'Quick Start', href: '/docs-engine/quick-start' },
    ],
  },
  {
    title: 'Architecture',
    href: '/docs-engine/architecture',
    children: [
      { title: 'Overview', href: '/docs-engine/architecture' },
      { title: 'ECS System', href: '/docs-engine/ecs' },
      { title: 'Module System', href: '/docs-engine/modules' },
    ],
  },
  {
    title: 'Systems',
    href: '/docs-engine/systems',
    children: [
      { title: 'Rendering', href: '/docs-engine/rendering' },
      { title: 'Physics', href: '/docs-engine/physics' },
      { title: 'Input', href: '/docs-engine/input' },
      { title: 'Audio', href: '/docs-engine/audio' },
    ],
  },
  {
    title: 'API Reference',
    href: '/docs-engine/api',
    children: [
      { title: 'Core API', href: '/docs-engine/api' },
      { title: 'Components', href: '/docs-engine/api-components' },
      { title: 'Systems', href: '/docs-engine/api-systems' },
    ],
  },
]

export const CSHARP_DOCS_NAV: DocNavItem[] = [
  {
    title: 'Fundamentals',
    href: '/docs-csharp',
    children: [
      { title: 'Introduction', href: '/docs-csharp' },
      { title: 'Types & Variables', href: '/docs-csharp/types' },
      { title: 'Control Flow', href: '/docs-csharp/control-flow' },
    ],
  },
  {
    title: 'OOP',
    href: '/docs-csharp/oop',
    children: [
      { title: 'Classes', href: '/docs-csharp/classes' },
      { title: 'Interfaces', href: '/docs-csharp/interfaces' },
      { title: 'Generics', href: '/docs-csharp/generics' },
    ],
  },
  {
    title: 'Advanced',
    href: '/docs-csharp/advanced',
    children: [
      { title: 'Async / Await', href: '/docs-csharp/async' },
      { title: 'LINQ', href: '/docs-csharp/linq' },
      { title: 'Memory Management', href: '/docs-csharp/memory' },
      { title: 'Unsafe Code', href: '/docs-csharp/unsafe' },
    ],
  },
  {
    title: 'Patterns',
    href: '/docs-csharp/patterns',
    children: [
      { title: 'Design Patterns', href: '/docs-csharp/patterns' },
      { title: 'ECS Pattern', href: '/docs-csharp/ecs-pattern' },
    ],
  },
]

export const UNITY_DOCS_NAV: DocNavItem[] = [
  {
    title: 'Basics',
    href: '/docs-unity',
    children: [
      { title: 'Introduction', href: '/docs-unity' },
      { title: 'Setup', href: '/docs-unity/setup' },
      { title: 'Scene Hierarchy', href: '/docs-unity/scene' },
    ],
  },
  {
    title: 'Scripting',
    href: '/docs-unity/scripting',
    children: [
      { title: 'MonoBehaviour', href: '/docs-unity/monobehaviour' },
      { title: 'Lifecycle', href: '/docs-unity/lifecycle' },
      { title: 'Coroutines', href: '/docs-unity/coroutines' },
    ],
  },
  {
    title: 'Graphics',
    href: '/docs-unity/graphics',
    children: [
      { title: 'Shaders Basics', href: '/docs-unity/shaders' },
      { title: 'URP Overview', href: '/docs-unity/urp' },
      { title: 'Post Processing', href: '/docs-unity/post-processing' },
    ],
  },
  {
    title: 'Optimization',
    href: '/docs-unity/optimization',
    children: [
      { title: 'Profiling', href: '/docs-unity/profiling' },
      { title: 'Object Pooling', href: '/docs-unity/pooling' },
      { title: 'Batching', href: '/docs-unity/batching' },
    ],
  },
]
