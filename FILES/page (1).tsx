'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Github, Filter } from 'lucide-react'
import { PROJECTS, CATEGORIES } from '@/lib/projects'
import { Footer } from '@/components/layout/Footer'
import type { Project, ProjectCategory } from '@/types'

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const filtered = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <>
      <div className="min-h-screen pt-24 pb-section">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <motion.span
            className="font-mono text-xs text-[hsl(var(--neon-cyan))] tracking-widest uppercase block mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Portfolio
          </motion.span>

          <motion.h1
            className="font-display text-display-lg text-[hsl(var(--text-primary))] mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            All Projects.
          </motion.h1>

          <motion.p
            className="text-[hsl(var(--text-secondary))] max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A collection of engines, games, tools, and experiments.
          </motion.p>

          {/* Filter bar */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Filter size={14} className="text-[hsl(var(--text-muted))]" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as 'all' | ProjectCategory)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider
                            transition-all duration-200
                            ${activeCategory === cat
                              ? 'bg-[hsl(var(--neon-cyan))] text-black'
                              : 'border border-[hsl(var(--border))] text-[hsl(var(--text-muted))] hover:border-[hsl(var(--neon-cyan)/0.4)] hover:text-white'
                            }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project grid */}
        <div ref={ref} className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((project, i) => (
                <PortfolioCard key={project.id} project={project} index={i} />
              ))}

              {filtered.length === 0 && (
                <div className="col-span-3 text-center py-20 text-[hsl(var(--text-muted))]">
                  <p className="font-mono text-sm">No projects in this category yet.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  )
}

// ─── Portfolio Card ───────────────────────────────────────────────────────────
function PortfolioCard({ project, index }: { project: Project; index: number }) {
  const statusColors = {
    completed: 'text-emerald-400',
    wip: 'text-amber-400',
    archived: 'text-[hsl(var(--text-muted))]',
  }

  return (
    <motion.article
      className="group glass rounded-2xl border border-[hsl(var(--glass-border))] overflow-hidden
                 hover:border-[hsl(var(--neon-cyan)/0.2)] transition-all duration-300"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
    >
      {/* Image */}
      <div className="relative aspect-video bg-[hsl(var(--surface))]">
        {/* TODO placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-mono text-[10px] text-[hsl(var(--text-muted))] text-center px-6">
            TODO: {project.image}
          </p>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-mono ${statusColors[project.status]}`}>
            ● {project.status === 'wip' ? 'WIP' : project.status}
          </span>
        </div>
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-mono text-[hsl(var(--neon-cyan))] 
                             bg-[hsl(var(--neon-cyan)/0.1)] px-2 py-0.5 rounded">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-display text-sm font-600 text-[hsl(var(--text-primary))]">
            {project.title}
          </h3>
          <span className="font-mono text-[10px] text-[hsl(var(--text-muted))] shrink-0">
            {project.year}
          </span>
        </div>

        <p className="text-xs text-[hsl(var(--text-secondary))] leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[9px] font-mono
                         bg-[hsl(var(--surface))] border border-[hsl(var(--border))]
                         text-[hsl(var(--text-muted))]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-[hsl(var(--border))]">
          {project.link && (
            <Link
              href={project.link}
              className="flex items-center gap-1 text-[11px] text-[hsl(var(--neon-cyan))] hover:text-white transition-colors"
            >
              <ExternalLink size={11} /> View
            </Link>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-[hsl(var(--text-muted))] hover:text-white transition-colors"
            >
              <Github size={11} /> Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
