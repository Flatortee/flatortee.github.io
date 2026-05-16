'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'

export function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-section max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="font-mono text-xs text-[hsl(var(--text-muted))] tracking-widest uppercase block mb-6">
          05 — Let&apos;s Go
        </span>

        <h2 className="font-display text-display-lg text-[hsl(var(--text-primary))] mb-6">
          Ready to explore?
        </h2>

        <p className="text-[hsl(var(--text-secondary))] max-w-md mx-auto mb-10 leading-relaxed">
          Check the portfolio for projects, or dive into the documentation 
          for deep technical content.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/portfolio"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-lg
                       bg-[hsl(var(--neon-cyan))] text-black font-semibold text-sm
                       hover:bg-white transition-all duration-200
                       shadow-[0_0_24px_hsl(var(--neon-cyan)/0.3)]"
          >
            Portfolio
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/docs-engine"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-lg
                       border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))]
                       hover:border-[hsl(var(--neon-blue)/0.4)] hover:text-white
                       transition-all duration-200 text-sm"
          >
            <BookOpen size={16} />
            Documentation
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="mt-16 accent-line"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </section>
  )
}
