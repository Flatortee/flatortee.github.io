'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Cpu, Zap, Box, GitBranch } from 'lucide-react'

const ENGINE_FEATURES = [
  { icon: Cpu, label: 'ECS Architecture' },
  { icon: Zap, label: 'High Performance' },
  { icon: Box, label: 'Modular Design' },
  { icon: GitBranch, label: 'Open Structure' },
]

export function EngineTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="relative py-section px-6">
      {/* Full-width background block */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative rounded-3xl overflow-hidden border border-[hsl(var(--neon-blue)/0.15)]
                     glass p-12 md:p-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 80% 50%, hsl(210 100% 65% / 0.07) 0%, transparent 70%)',
            }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] opacity-10"
            style={{
              background: 'radial-gradient(circle at top right, hsl(var(--neon-blue)) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.span
                className="inline-block font-mono text-xs text-[hsl(var(--neon-blue))] tracking-widest uppercase mb-6"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 }}
              >
                04 — The Engine
              </motion.span>

              <motion.h2
                className="font-display text-display-lg text-[hsl(var(--text-primary))] mb-6"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                Nanally
                <br />
                <span className="neon-text-blue">Engine</span>
              </motion.h2>

              <motion.p
                className="text-[hsl(var(--text-secondary))] leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                A custom game engine built from scratch in C#. Designed around 
                performance, clean architecture, and full developer control.
                No black boxes. No magic.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/engine"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-lg
                             border border-[hsl(var(--neon-blue)/0.4)] text-[hsl(var(--neon-blue))]
                             hover:bg-[hsl(var(--neon-blue)/0.08)] transition-all duration-200 text-sm"
                >
                  Learn more
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/docs-engine"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                             text-[hsl(var(--text-secondary))] hover:text-white
                             transition-colors text-sm"
                >
                  Documentation →
                </Link>
              </motion.div>
            </div>

            {/* Right — feature pills */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {ENGINE_FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  className="flex items-center gap-3 p-4 rounded-xl
                             bg-[hsl(var(--surface))] border border-[hsl(var(--neon-blue)/0.1)]
                             hover:border-[hsl(var(--neon-blue)/0.3)] transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <feature.icon size={18} className="text-[hsl(var(--neon-blue))] shrink-0" />
                  <span className="text-sm text-[hsl(var(--text-secondary))]">{feature.label}</span>
                </motion.div>
              ))}

              {/* Version badge */}
              <div className="col-span-2 p-4 rounded-xl bg-[hsl(var(--surface))]
                              border border-[hsl(var(--neon-blue)/0.1)] flex items-center justify-between">
                <span className="font-mono text-xs text-[hsl(var(--text-muted))]">Current version</span>
                <span className="font-mono text-sm font-600 neon-text-blue">v0.1-alpha</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
