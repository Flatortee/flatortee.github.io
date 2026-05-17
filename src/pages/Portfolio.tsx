import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import SectionReveal from '../components/ui/SectionReveal'

interface WorkItem {
  title: string
  category: string
  description: string
  tech: string[]
  year: string
  featured?: boolean
}

const works: WorkItem[] = [
  {
    title: 'Nanally Engine',
    category: 'Game Engine',
    description:
      'A fully custom real-time 3D rendering engine. Deferred shading pipeline, physically-based rendering, and a custom entity-component system.',
    tech: ['C++17', 'OpenGL 4.6', 'GLSL', 'CMake'],
    year: '2024',
    featured: true,
  },
  {
    title: 'Procedural Planet Generator',
    category: 'Tools / Simulation',
    description:
      'GPU-accelerated procedural planet generation with atmosphere scattering, erosion simulation, and real-time terrain LOD.',
    tech: ['C#', 'Compute Shaders', 'Unity'],
    year: '2024',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    category: 'Frontend',
    description:
      'This very site — a premium static portfolio built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    year: '2024',
    featured: true,
  },
  {
    title: 'ECS Framework',
    category: 'Systems',
    description:
      'A minimal, high-performance Entity-Component-System framework in modern C++20 using archetypes and sparse sets.',
    tech: ['C++20', 'Templates', 'SIMD'],
    year: '2023',
  },
  {
    title: 'Shader Playground',
    category: 'Graphics',
    description:
      'Interactive WebGL shader editor with live preview, code sharing, and a library of hand-crafted GLSL effects.',
    tech: ['WebGL', 'GLSL', 'React', 'TypeScript'],
    year: '2023',
  },
  {
    title: 'DevKit CLI',
    category: 'Tools',
    description:
      'A command-line toolkit for game developers — asset pipeline management, build automation, and project scaffolding.',
    tech: ['Rust', 'CLI', 'TOML'],
    year: '2023',
  },
]

export default function Portfolio() {
  const featured = works.filter((w) => w.featured)
  const rest = works.filter((w) => !w.featured)

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <SectionReveal>
          <div className="mb-16">
            <p className="text-xs text-accent font-mono tracking-widest mb-3">PORTFOLIO</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Selected<br />
              <span className="text-gradient">Work</span>
            </h1>
            <p className="text-muted text-lg max-w-lg leading-relaxed">
              A curated selection of projects spanning engine development, systems programming, and frontend engineering.
            </p>
          </div>
        </SectionReveal>

        {/* Featured 3-up */}
        <div className="mb-20">
          <SectionReveal>
            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-8">Featured</p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-surface-2 border border-border hover:border-accent/20 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)' }}
                />
                <span className="inline-block text-xs text-accent font-mono bg-accent/10 px-3 py-1 rounded-full mb-4">
                  {w.category}
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{w.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-5">{w.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {w.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-surface border border-border text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted font-mono">{w.year}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 glass-light rounded-lg text-muted hover:text-white transition-colors" aria-label="GitHub">
                      <Github size={14} />
                    </button>
                    <button className="p-1.5 glass-light rounded-lg text-muted hover:text-white transition-colors" aria-label="External link">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other works — list view */}
        <div>
          <SectionReveal>
            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-8">More Projects</p>
          </SectionReveal>

          <div className="space-y-3">
            {rest.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-surface-2 border border-border hover:border-border-2 rounded-xl px-5 py-4 transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold group-hover:text-accent transition-colors">{w.title}</h3>
                    <span className="text-xs text-accent font-mono">{w.category}</span>
                  </div>
                  <p className="text-muted text-sm">{w.description}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex gap-2">
                    {w.tech.slice(0, 2).map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-surface border border-border text-muted hidden sm:block">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted font-mono">{w.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
