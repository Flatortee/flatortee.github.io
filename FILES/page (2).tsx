'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Box, GitBranch, Code2, Layers, BookOpen } from 'lucide-react'
import { Footer } from '@/components/layout/Footer'

// ─── Data ─────────────────────────────────────────────────────────────────────
const ENGINE_FEATURES = [
  {
    icon: Cpu,
    title: 'ECS Architecture',
    description:
      'Entity-Component-System design at the core. Clean separation of data and logic. Fully cache-friendly memory layout.',
    accent: 'cyan',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description:
      'Every system is designed with performance in mind from day one. No unnecessary allocations, no hidden overhead.',
    accent: 'blue',
  },
  {
    icon: Box,
    title: 'Modular Design',
    description:
      'Each module is independent. Use only what you need. Extend without touching core systems.',
    accent: 'violet',
  },
  {
    icon: GitBranch,
    title: 'Open Architecture',
    description:
      'No black boxes. Every system is readable, documented and hackable. Full control over the engine behavior.',
    accent: 'cyan',
  },
  {
    icon: Code2,
    title: 'C# Native',
    description:
      'Built in pure C# with .NET. No external dependencies for the core. Clean modern C# patterns throughout.',
    accent: 'blue',
  },
  {
    icon: Layers,
    title: 'Layered Systems',
    description:
      'Rendering, physics, audio, input — each as a self-contained layer. Easy to replace or extend any system.',
    accent: 'violet',
  },
]

const TECH_STACK = [
  { label: 'Language', value: 'C# / .NET' },
  { label: 'Architecture', value: 'ECS' },
  { label: 'Renderer', value: 'Custom (TODO)' },
  { label: 'Status', value: 'v0.1-alpha' },
  { label: 'License', value: 'TODO' },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function EnginePage() {
  return (
    <>
      <div className="min-h-screen">
        <EngineHero />
        <EngineFeatures />
        <EngineTechSpecs />
        <EngineArchDiagram />
        <EngineCTA />
      </div>
      <Footer />
    </>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────
function EngineHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-24 pb-section px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, hsl(210 100% 65% / 0.08) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-[hsl(var(--neon-blue)/0.3)] bg-[hsl(var(--neon-blue)/0.06)]
                           text-xs font-mono text-[hsl(var(--neon-blue))]">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--neon-blue))] animate-pulse" />
            Currently in development — v0.1-alpha
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h1
              className="font-display text-display-xl font-800 leading-none mb-6"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="block text-[hsl(var(--text-primary))]">Nanally</span>
              <span className="block neon-text-blue">Engine</span>
            </motion.h1>

            <motion.p
              className="text-lg text-[hsl(var(--text-secondary))] leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              A custom game engine built from scratch in C#. Designed for 
              developers who want full control — no abstraction layers hiding 
              the real work.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/docs-engine"
                className="group flex items-center gap-2 px-6 py-3 rounded-lg
                           bg-[hsl(var(--neon-blue))] text-black font-semibold text-sm
                           hover:bg-white transition-all duration-200
                           shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)]"
              >
                <BookOpen size={16} />
                Read Docs
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="aspect-video rounded-2xl glass border border-[hsl(var(--neon-blue)/0.15)]
                            flex flex-col items-center justify-center gap-3 bg-[hsl(var(--surface))]">
              {/* TODO: Engine screenshot/demo image */}
              <span className="text-3xl">🖼️</span>
              <p className="font-mono text-xs text-[hsl(var(--text-muted))] text-center px-8">
                TODO: Engine screenshot or diagram<br />
                <span className="text-[hsl(var(--neon-blue)/0.6)]">
                  /public/images/engine/engine-hero.png
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function EngineFeatures() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const accentColors = {
    cyan: 'hsl(var(--neon-cyan))',
    blue: 'hsl(var(--neon-blue))',
    violet: 'hsl(var(--neon-violet))',
  }

  return (
    <section ref={ref} className="py-section max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="mb-16"
      >
        <span className="font-mono text-xs text-[hsl(var(--neon-blue))] tracking-widest uppercase">
          Features
        </span>
      </motion.div>

      <motion.h2
        className="font-display text-display-md text-[hsl(var(--text-primary))] mb-12"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        Built for control.
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ENGINE_FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="glass rounded-2xl border border-[hsl(var(--glass-border))] p-6
                       hover:border-[hsl(var(--neon-blue)/0.2)] transition-all duration-200"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.07 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: `${accentColors[feature.accent as keyof typeof accentColors]}10`,
                border: `1px solid ${accentColors[feature.accent as keyof typeof accentColors]}30`,
              }}
            >
              <feature.icon
                size={18}
                style={{ color: accentColors[feature.accent as keyof typeof accentColors] }}
              />
            </div>
            <h3 className="font-display text-sm font-600 text-[hsl(var(--text-primary))] mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function EngineTechSpecs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-section max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-mono text-xs text-[hsl(var(--neon-blue))] tracking-widest uppercase block mb-6">
            Tech Specs
          </span>
          <h2 className="font-display text-display-md text-[hsl(var(--text-primary))] mb-6">
            Under the hood.
          </h2>
          <p className="text-[hsl(var(--text-secondary))] leading-relaxed">
            Nanally Engine is designed to be transparent. Every system is accessible, 
            every behavior is documented. No surprises.
          </p>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          {TECH_STACK.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between px-5 py-4 rounded-xl
                         glass border border-[hsl(var(--glass-border))]"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.07 }}
            >
              <span className="font-mono text-xs text-[hsl(var(--text-muted))] uppercase tracking-wider">
                {item.label}
              </span>
              <span className="font-display text-sm font-600 text-[hsl(var(--neon-blue))]">
                {item.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function EngineArchDiagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-section max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="mb-12"
      >
        <span className="font-mono text-xs text-[hsl(var(--neon-blue))] tracking-widest uppercase">
          Architecture
        </span>
      </motion.div>

      <motion.div
        className="glass rounded-2xl border border-[hsl(var(--glass-border))]
                   aspect-video flex flex-col items-center justify-center gap-4 p-12"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        {/* TODO: Architecture diagram */}
        <span className="text-3xl">📐</span>
        <p className="font-mono text-xs text-[hsl(var(--text-muted))] text-center max-w-md">
          TODO: Architecture diagram<br />
          <span className="text-[hsl(var(--neon-blue)/0.6)]">
            /public/images/engine/arch-diagram.png
          </span>
          <br /><br />
          <span className="text-[hsl(var(--text-muted)/0.6)]">
            Or create an SVG diagram directly in this component
          </span>
        </p>
      </motion.div>
    </section>
  )
}

function EngineCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-section max-w-7xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-display-md text-[hsl(var(--text-primary))] mb-6">
          Dive deeper.
        </h2>
        <p className="text-[hsl(var(--text-secondary))] max-w-md mx-auto mb-10">
          The documentation covers every system in detail — architecture decisions, 
          API references and implementation guides.
        </p>
        <Link
          href="/docs-engine"
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg
                     bg-[hsl(var(--neon-blue))] text-black font-semibold text-sm
                     hover:bg-white transition-all duration-200
                     shadow-[0_0_24px_hsl(var(--neon-blue)/0.3)]"
        >
          <BookOpen size={16} />
          Open Documentation
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  )
}
