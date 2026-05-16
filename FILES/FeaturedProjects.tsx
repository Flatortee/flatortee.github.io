'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { FEATURED_PROJECTS } from '@/lib/projects'
import type { Project } from '@/types'

export function FeaturedProjects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="relative py-section max-w-7xl mx-auto px-6">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="mb-16"
      >
        <span className="font-mono text-xs text-[hsl(var(--neon-cyan))] tracking-widest uppercase">
          03 — Featured Projects
        </span>
      </motion.div>

      <div className="flex items-end justify-between mb-12">
        <motion.h2
          className="font-display text-display-md text-[hsl(var(--text-primary))]"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Selected work.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-sm text-[hsl(var(--text-secondary))]
                       hover:text-[hsl(var(--neon-cyan))] transition-colors group"
          >
            View all
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project
  index: number
  inView: boolean
}) {
  const statusColors = {
    completed: 'text-emerald-400',
    wip: 'text-amber-400',
    archived: 'text-[hsl(var(--text-muted))]',
  }

  const statusLabels = {
    completed: 'Completed',
    wip: 'In Progress',
    archived: 'Archived',
  }

  return (
    <motion.article
      className="group glass rounded-2xl border border-[hsl(var(--glass-border))]
                 overflow-hidden hover:border-[hsl(var(--neon-cyan)/0.2)]
                 transition-all duration-300 hover:shadow-[0_0_24px_hsl(var(--neon-cyan)/0.06)]"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Image area */}
      <div className="relative aspect-video bg-[hsl(var(--surface))] overflow-hidden">
        {/* TODO: Replace with actual project image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="text-2xl">🖼️</span>
          <p className="font-mono text-[10px] text-[hsl(var(--text-muted))] text-center px-4">
            TODO: {project.image}
          </p>
        </div>

        {/* Uncomment when image ready: */}
        {/* <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        /> */}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[hsl(var(--neon-cyan)/0.04)] opacity-0
                        group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-mono ${statusColors[project.status]}`}>
            ● {statusLabels[project.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-base font-600 text-[hsl(var(--text-primary))]
                         group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-[hsl(var(--text-muted))] shrink-0">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono
                         bg-[hsl(var(--surface))] border border-[hsl(var(--border))]
                         text-[hsl(var(--text-muted))]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-[hsl(var(--border))]">
          {project.link && (
            <Link
              href={project.link}
              className="flex items-center gap-1.5 text-xs text-[hsl(var(--neon-cyan))]
                         hover:text-white transition-colors"
            >
              <ExternalLink size={12} />
              View
            </Link>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[hsl(var(--text-muted))]
                         hover:text-white transition-colors"
            >
              <Github size={12} />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
