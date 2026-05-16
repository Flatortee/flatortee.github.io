'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const HIGHLIGHTS = [
  { label: 'Focus', value: 'Systems & Architecture' },
  { label: 'Engine', value: 'Nanally Engine' },
  { label: 'Stack', value: 'C# / Unity / Web' },
  { label: 'Status', value: 'Open to work' },
]

export function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="relative py-section max-w-7xl mx-auto px-6">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <span className="font-mono text-xs text-[hsl(var(--neon-cyan))] tracking-widest uppercase">
          01 — About
        </span>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="font-display text-display-md text-[hsl(var(--text-primary))] mb-6">
            Building systems
            <br />
            <span className="text-[hsl(var(--text-secondary))]">that last.</span>
          </h2>

          <div className="space-y-4 text-[hsl(var(--text-secondary))] leading-relaxed">
            <p>
              I&apos;m Flatorte — a developer focused on building clean, performant, 
              and well-architected systems. From game engines to web tooling, I care 
              about the craft behind every line of code.
            </p>
            <p>
              I&apos;m currently working on{' '}
              <span className="text-[hsl(var(--neon-blue))]">Nanally Engine</span>,
              a custom game engine built from the ground up with a focus on performance 
              and developer experience.
            </p>
            <p>
              When I&apos;m not writing engine code, I build tools, games, and document 
              everything I learn.
            </p>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.label}
              className="glass rounded-xl border border-[hsl(var(--glass-border))] p-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              <div className="font-mono text-[10px] text-[hsl(var(--text-muted))] uppercase tracking-widest mb-2">
                {item.label}
              </div>
              <div className="font-display text-sm font-600 text-[hsl(var(--text-primary))]">
                {item.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
