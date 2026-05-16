'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TECH_ITEMS = [
  { name: 'C#', category: 'Language', color: 'cyan' },
  { name: 'Unity', category: 'Engine', color: 'blue' },
  { name: 'TypeScript', category: 'Language', color: 'cyan' },
  { name: 'React', category: 'Framework', color: 'blue' },
  { name: 'Next.js', category: 'Framework', color: 'violet' },
  { name: 'HLSL', category: 'Shader', color: 'violet' },
  { name: 'Git', category: 'Tool', color: 'cyan' },
  { name: 'Tailwind', category: 'Styling', color: 'blue' },
  { name: '.NET', category: 'Runtime', color: 'violet' },
] as const

export function TechStackSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="relative py-section max-w-7xl mx-auto px-6">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <span className="font-mono text-xs text-[hsl(var(--neon-cyan))] tracking-widest uppercase">
          02 — Tech Stack
        </span>
      </motion.div>

      <motion.h2
        className="font-display text-display-md text-[hsl(var(--text-primary))] mb-12"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Tools of the trade.
      </motion.h2>

      {/* Tech grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {TECH_ITEMS.map((tech, i) => (
          <TechBadge key={tech.name} tech={tech} index={i} inView={inView} />
        ))}

        {/* Placeholder slot for custom entries */}
        <motion.div
          className="glass rounded-xl border border-dashed border-[hsl(var(--border))] p-4
                     flex flex-col gap-1 opacity-30"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.3 } : {}}
          transition={{ delay: 0.8 }}
        >
          <span className="font-mono text-[10px] text-[hsl(var(--text-muted))] uppercase tracking-widest">···</span>
          <span className="font-display text-sm text-[hsl(var(--text-muted))]">More</span>
        </motion.div>
      </div>
    </section>
  )
}

function TechBadge({
  tech,
  index,
  inView,
}: {
  tech: { name: string; category: string; color: 'cyan' | 'blue' | 'violet' }
  index: number
  inView: boolean
}) {
  const colorMap = {
    cyan: 'hsl(var(--neon-cyan))',
    blue: 'hsl(var(--neon-blue))',
    violet: 'hsl(var(--neon-violet))',
  }

  const borderColorMap = {
    cyan: 'hsl(185 90% 60% / 0.2)',
    blue: 'hsl(210 100% 65% / 0.2)',
    violet: 'hsl(265 85% 68% / 0.2)',
  }

  return (
    <motion.div
      className="glass rounded-xl border p-4 group cursor-default
                 hover:border-opacity-60 transition-all duration-200"
      style={{ borderColor: borderColorMap[tech.color] }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      <div className="font-mono text-[10px] text-[hsl(var(--text-muted))] uppercase tracking-widest mb-1.5">
        {tech.category}
      </div>
      <div
        className="font-display text-sm font-600"
        style={{ color: colorMap[tech.color] }}
      >
        {tech.name}
      </div>
    </motion.div>
  )
}
