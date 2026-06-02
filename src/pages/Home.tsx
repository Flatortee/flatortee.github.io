import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Code2, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import ShaderBackground from '../components/ui/ShaderBackground'
import AnimatedButton from '../components/ui/AnimatedButton'
import SectionReveal from '../components/ui/SectionReveal'
import ProjectCard, { type Project } from '../components/ui/ProjectCard'

// Module-level constants — zero cost on re-render (never recreated)
const FEATURED_PROJECTS: Project[] = [
  {
    title: 'Nanally Engine',
    description: 'A custom real-time 3D rendering engine built from scratch in C++. Features deferred shading, PBR materials, and a fully custom ECS.',
    tags: ['C++', 'OpenGL', 'GLSL', 'ECS'],
    year: '2024',
    accent: 'rgba(0,255,204,0.06)',
  },
  {
    title: 'Procedural World Gen',
    description: 'Infinite voxel world generation using layered noise, biome blending, and GPU-accelerated chunk streaming.',
    tags: ['C#', 'Unity', 'Compute Shaders'],
    year: '2024',
    accent: 'rgba(200,255,0,0.05)',
  },
  {
    title: 'DevTools Suite',
    description: 'A collection of developer productivity tools including a regex tester, JSON formatter, and color palette generator.',
    tags: ['React', 'TypeScript', 'Vite'],
    year: '2023',
    accent: 'rgba(200,255,0,0.04)',
  },
]

const FEATURES = [
  {
    icon: Code2,
    title: 'Systems Programming',
    desc: 'Low-level C++ and C# for performance-critical applications and game engines.',
  },
  {
    icon: Layers,
    title: 'Engine Development',
    desc: 'Custom rendering pipelines, ECS architectures, and real-time graphics.',
  },
  {
    icon: Zap,
    title: 'Frontend Craft',
    desc: 'Premium web experiences with React, TypeScript, and fluid animations.',
  },
]

// Static animation objects
const BADGE_ANIM = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } } as const
const H1_ANIM = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const } } as const
const P_ANIM = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.3 } } as const
const BTNS_ANIM = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.45 } } as const
const SCROLL_ANIM = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.2 } } as const
const SCROLL_LINE_ANIM = { animate: { y: [0, 6, 0] }, transition: { duration: 1.5, repeat: Infinity } } as const

const GRID_BG = {
  backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
  backgroundSize: '64px 64px',
} as const

export default memo(function Home() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ShaderBackground />

        {/* Grid overlay — purely visual, pointer-events-none */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={GRID_BG}
        />

        {/* Accent glow — GPU layer via will-change */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div {...BADGE_ANIM}
            className="inline-flex items-center gap-2 glass-light px-4 py-2 rounded-full text-xs text-accent font-mono mb-8 border border-accent/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            Available for work · Open to opportunities
          </motion.div>

          {/* Headline */}
          <motion.h1 {...H1_ANIM}
            className="font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight mb-6"
          >
            <span className="text-gradient-white">CRAFTING</span>
            <br />
            <span className="text-gradient glow-text">DIGITAL</span>
            <br />
            <span className="text-gradient-white">WORLDS</span>
          </motion.h1>

          <motion.p {...P_ANIM}
            className="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Developer & creative engineer building custom engines,
            immersive tools, and premium interfaces — from low-level
            systems to polished frontends.
          </motion.p>

          <motion.div {...BTNS_ANIM}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <AnimatedButton href="#projects" variant="primary">
              View Work <ArrowRight size={16} aria-hidden="true" />
            </AnimatedButton>
            <AnimatedButton
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              GitHub
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div {...SCROLL_ANIM}
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={SCROLL_LINE_ANIM.animate}
            transition={SCROLL_LINE_ANIM.transition}
            className="w-[1px] h-8 bg-gradient-to-b from-accent to-transparent"
          />
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.1}>
              <div className="group bg-surface-2 border border-border hover:border-accent/20 rounded-2xl p-6 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <f.icon size={20} className="text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-6 pb-24">
        <SectionReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs text-accent font-mono tracking-widest mb-2">SELECTED WORK</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors group"
            >
              All projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED_PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
          >
            View all projects <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <SectionReveal>
          <div className="relative bg-surface-2 border border-border rounded-3xl p-12 overflow-hidden text-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.05) 0%, transparent 60%)' }}
            />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
              Let's build something <span className="text-gradient">remarkable</span>
            </h2>
            <p className="text-muted mb-8 relative z-10">
              Open to freelance, collaboration, and full-time opportunities.
            </p>
            <div className="flex items-center justify-center gap-4 relative z-10">
              <AnimatedButton href="mailto:hello@example.com" variant="primary">
                Get in touch
              </AnimatedButton>
              <Link to="/portfolio" className="text-sm text-muted hover:text-accent transition-colors">
                View portfolio →
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>
    </PageTransition>
  )
})
