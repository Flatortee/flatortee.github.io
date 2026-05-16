'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { prefersReducedMotion } from '@/lib/utils'

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroSection() {
  const mouse = useMousePosition()
  const heroRef = useRef<HTMLElement>(null)
  const reduced = typeof window !== 'undefined' ? prefersReducedMotion() : false

  // Subtle parallax on background gradient following mouse
  const gradientStyle = !reduced
    ? {
        background: `radial-gradient(
          ellipse 80% 60% at ${50 + mouse.normalizedX * 8}% ${40 + mouse.normalizedY * 6}%,
          hsl(210 100% 65% / 0.07) 0%,
          hsl(185 90% 60% / 0.04) 35%,
          transparent 70%
        )`,
      }
    : {}

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={gradientStyle}
      />
      {/* Corner glow — top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, hsl(185 90% 60% / 0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          {/* Left — text */}
          <motion.div
            className="flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                               border border-[hsl(var(--neon-cyan)/0.3)] bg-[hsl(var(--neon-cyan)/0.05)]
                               text-xs font-mono text-[hsl(var(--neon-cyan))]">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--neon-cyan))] animate-pulse" />
                Available for projects
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-display-xl font-800 leading-none text-[hsl(var(--text-primary))] mb-6"
            >
              <span className="block">Building</span>
              <span className="block neon-text-cyan">immersive</span>
              <span className="block">experiences.</span>
            </motion.h1>

            {/* Sub heading */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-[hsl(var(--text-secondary))] max-w-md leading-relaxed mb-10"
            >
              Developer & engineer. Creator of{' '}
              <Link
                href="/engine"
                className="text-[hsl(var(--neon-blue))] hover:text-[hsl(var(--neon-cyan))] transition-colors"
              >
                Nanally Engine
              </Link>
              . Focused on performance, architecture and clean systems.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg
                           bg-[hsl(var(--neon-cyan))] text-black font-semibold text-sm
                           hover:bg-white transition-all duration-200
                           shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)]
                           hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.5)]"
              >
                View Portfolio
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/engine"
                className="flex items-center gap-2 px-6 py-3 rounded-lg
                           border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))]
                           hover:border-[hsl(var(--neon-blue)/0.4)] hover:text-white
                           transition-all duration-200 text-sm font-medium"
              >
                Nanally Engine
              </Link>
            </motion.div>

            {/* Separator */}
            <motion.div variants={itemVariants} className="mt-14 accent-line" />
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(210 100% 65% / 0.12) 0%, transparent 70%)',
              }}
            />

            {/* Image container */}
            <div className="relative w-full aspect-square max-w-[520px] rounded-2xl overflow-hidden
                            border border-[hsl(var(--glass-border))] glass">
              {/* TODO: Replace with your actual hero image */}
              {/* Place your image at: public/images/hero/hero-main.png */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4
                              bg-[hsl(var(--surface))]">
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-[hsl(var(--border))]
                                flex items-center justify-center">
                  <span className="font-mono text-2xl text-[hsl(var(--text-muted))]">📷</span>
                </div>
                <p className="font-mono text-xs text-[hsl(var(--text-muted))] text-center px-8">
                  TODO: hero image<br />
                  <span className="text-[hsl(var(--neon-cyan)/0.6)]">
                    /public/images/hero/hero-main.png
                  </span>
                </p>
              </div>

              {/* Uncomment when image is ready: */}
              {/* <Image
                src="/images/hero/hero-main.png"
                alt="Flatorte — Developer"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 520px"
              /> */}

              {/* Corner decoration */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[hsl(var(--neon-cyan)/0.5)]" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[hsl(var(--neon-cyan)/0.5)]" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[hsl(var(--neon-cyan)/0.5)]" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[hsl(var(--neon-cyan)/0.5)]" />
            </div>

            {/* Floating stat cards */}
            <HeroStatCard
              className="absolute -bottom-4 -left-4 lg:-left-8"
              label="Projects shipped"
              value="12+"
              accent="cyan"
            />
            <HeroStatCard
              className="absolute -top-4 -right-4 lg:-right-8"
              label="Nanally Engine"
              value="v0.1"
              accent="blue"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="font-mono text-xs text-[hsl(var(--text-muted))] tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} className="text-[hsl(var(--text-muted))]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function HeroStatCard({
  label,
  value,
  accent,
  className,
}: {
  label: string
  value: string
  accent: 'cyan' | 'blue'
  className?: string
}) {
  return (
    <motion.div
      className={`glass rounded-xl border border-[hsl(var(--glass-border))] px-4 py-3 ${className ?? ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <div
        className={`font-display text-xl font-bold ${
          accent === 'cyan' ? 'neon-text-cyan' : 'neon-text-blue'
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-[hsl(var(--text-muted))]">{label}</div>
    </motion.div>
  )
}
