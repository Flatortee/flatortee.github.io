import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import SectionReveal from '../components/ui/SectionReveal'

interface Project {
  title: string
  description: string
  tags: string[]
  category: string
  year: string
  accent: string
}

const allProjects: Project[] = [
  {
    title: 'Nanally Engine',
    description: 'Custom real-time 3D rendering engine with deferred shading, PBR materials, and a fully custom ECS.',
    tags: ['C++', 'OpenGL', 'GLSL'],
    category: 'Engine',
    year: '2024',
    accent: 'rgba(0,255,204,0.06)',
  },
  {
    title: 'Procedural World Generator',
    description: 'GPU-accelerated voxel terrain with biome blending, cave systems, and real-time LOD streaming.',
    tags: ['C#', 'Unity', 'Compute Shaders'],
    category: 'Game Dev',
    year: '2024',
    accent: 'rgba(200,255,0,0.05)',
  },
  {
    title: 'Portfolio Website',
    description: 'This very site — premium static portfolio with Framer Motion animations and WebGL background.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    category: 'Web',
    year: '2024',
    accent: 'rgba(200,255,0,0.04)',
  },
  {
    title: 'Custom ECS Framework',
    description: 'High-performance entity-component system in C# with archetype storage and zero-allocation queries.',
    tags: ['C#', '.NET 8', 'Unsafe Code'],
    category: 'Systems',
    year: '2023',
    accent: 'rgba(200,255,0,0.04)',
  },
  {
    title: 'Shader Playground',
    description: 'Interactive WebGL shader editor with live preview, code sharing, and a GLSL effect library.',
    tags: ['WebGL', 'GLSL', 'React'],
    category: 'Web',
    year: '2023',
    accent: 'rgba(0,255,204,0.04)',
  },
  {
    title: 'AI Behavior Trees',
    description: 'Visual behavior tree editor with runtime execution, blackboard memory, and parallel composites.',
    tags: ['C#', 'Unity', 'Editor Tools'],
    category: 'Game Dev',
    year: '2023',
    accent: 'rgba(200,255,0,0.04)',
  },
  {
    title: 'DevKit CLI',
    description: 'Command-line toolkit for game developers — asset pipeline, build automation, project scaffolding.',
    tags: ['Rust', 'CLI', 'TOML'],
    category: 'Tools',
    year: '2023',
    accent: 'rgba(200,255,0,0.03)',
  },
  {
    title: 'Atmosphere Renderer',
    description: 'Realtime atmospheric scattering using Rayleigh and Mie scattering models on the GPU.',
    tags: ['C++', 'GLSL', 'OpenGL'],
    category: 'Engine',
    year: '2023',
    accent: 'rgba(0,255,204,0.05)',
  },
  {
    title: 'React UI Kit',
    description: 'A minimal design system with 30+ accessible components, Storybook documentation, and Tailwind integration.',
    tags: ['React', 'TypeScript', 'Storybook'],
    category: 'Web',
    year: '2022',
    accent: 'rgba(200,255,0,0.04)',
  },
]

const categories = ['All', 'Engine', 'Game Dev', 'Web', 'Systems', 'Tools']

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? allProjects : allProjects.filter((p) => p.category === active)

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <SectionReveal>
          <div className="mb-12">
            <p className="text-xs text-accent font-mono tracking-widest mb-3">PROJECTS</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              All<br />
              <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-muted text-lg max-w-lg leading-relaxed">
              Every project I've shipped — engines, tools, games, and web apps.
            </p>
          </div>
        </SectionReveal>

        {/* Filters */}
        <SectionReveal>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? 'bg-accent text-bg'
                    : 'bg-surface-2 border border-border text-muted hover:text-white hover:border-border-2'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </SectionReveal>

        {/* Projects count */}
        <SectionReveal>
          <p className="text-xs text-muted font-mono mb-6">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} — {active}
          </p>
        </SectionReveal>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-surface-2 border border-border hover:border-border-2 rounded-2xl p-6 overflow-hidden transition-colors duration-300"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${p.accent} 0%, transparent 60%)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-accent font-mono">{p.category}</span>
                      <span className="text-xs text-muted font-mono">{p.year}</span>
                    </div>
                    <motion.div
                      className="text-muted group-hover:text-accent transition-colors"
                      whileHover={{ rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight size={16} />
                    </motion.div>
                  </div>

                  <h3 className="font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-3">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full bg-surface border border-border text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  )
}
