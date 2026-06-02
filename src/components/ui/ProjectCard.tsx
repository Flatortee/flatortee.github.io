import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { memo } from 'react'

export interface Project {
  title: string
  description: string
  tags: string[]
  href?: string
  year: string
  accent?: string
}

interface ProjectCardProps {
  project: Project
  index?: number
}

// Static objects — never reallocated
const VIEWPORT = { once: true, margin: '-60px' } as const
const ARROW_HOVER = { rotate: 45 } as const
const ARROW_TRANSITION = { duration: 0.2 } as const

// ProjectCard optimizations:
// - Static viewport object (no new object each render)
// - memo() prevents re-render when list parent re-renders
// - Glow is CSS opacity toggle (GPU-only, no layout trigger)
// - whileHover y:-4 uses transform — compositor only
// - transition delay based on index only computed once
export default memo(function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative bg-surface-2 border border-border hover:border-border-2 rounded-2xl p-6 overflow-hidden transition-colors duration-300 cursor-pointer"
    >
      {/* GPU layer: opacity change only — no layout recompute */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${project.accent ?? 'rgba(200,255,0,0.04)'} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs text-muted font-mono">{project.year}</span>
          <motion.div
            className="text-muted group-hover:text-accent transition-colors"
            whileHover={ARROW_HOVER}
            transition={ARROW_TRANSITION}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-surface border border-border text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
})
