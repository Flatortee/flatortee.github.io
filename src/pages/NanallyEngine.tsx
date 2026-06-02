import { memo } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Zap, Layers, Box, Palette, GitBranch } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import SectionReveal from '../components/ui/SectionReveal'

// Module-level constants
const FEATURES = [
  { icon: Cpu, title: 'Deferred Rendering', desc: 'Multi-pass deferred shading pipeline with a G-buffer containing world normals, albedo, roughness, and metallic data.' },
  { icon: Palette, title: 'PBR Materials', desc: 'Physically-based rendering with a Cook-Torrance BRDF, image-based lighting, and support for custom material graphs.' },
  { icon: Layers, title: 'ECS Architecture', desc: 'Cache-friendly archetype-based entity-component system with zero-allocation queries and parallel system execution.' },
  { icon: Box, title: 'Custom ECS', desc: 'Sparse set storage for fast component iteration. Structural changes are batched and applied at sync points.' },
  { icon: Zap, title: 'Hot Reload', desc: 'Real-time shader hot-reloading with error recovery. Edit GLSL and see results in milliseconds without restarting.' },
  { icon: GitBranch, title: 'Scene Graph', desc: 'Hierarchical scene graph with transform inheritance, dirty flags, and frustum culling on the CPU side.' },
] as const

const STATS = [
  { label: 'Draw calls / frame', value: '< 200' },
  { label: 'Lines of C++', value: '42k+' },
  { label: 'Custom shaders', value: '18' },
  { label: 'Avg. frame time', value: '0.8ms' },
] as const

const TIMELINE = [
  { phase: 'v0.1', desc: 'Forward rendering, basic mesh loading, Phong shading' },
  { phase: 'v0.2', desc: 'Deferred pipeline, G-buffer, point lights' },
  { phase: 'v0.3', desc: 'PBR materials, IBL, HDR tone mapping' },
  { phase: 'v0.4', desc: 'Custom ECS, component pools, system scheduling' },
  { phase: 'v0.5', desc: 'Scene graph, transform hierarchy, frustum culling' },
  { phase: 'v1.0', desc: 'Hot reload, editor scaffold, asset pipeline' },
] as const

const TECH = [
  { name: 'C++17', role: 'Core language' },
  { name: 'OpenGL 4.6', role: 'Graphics API' },
  { name: 'GLSL', role: 'Shading language' },
  { name: 'GLFW', role: 'Window/input' },
  { name: 'GLM', role: 'Math library' },
  { name: 'Assimp', role: 'Asset loading' },
  { name: 'stb_image', role: 'Texture loading' },
  { name: 'ImGui', role: 'Debug UI' },
] as const

// Static style objects — no allocation on render
const GRADIENT_TEXT_STYLE = {
  background: 'linear-gradient(135deg, #00ffcc 0%, #0099ff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const

const FEATURE_ICON_STYLE = { background: 'rgba(0,255,204,0.08)' } as const
const FEATURE_ICON_COLOR = { color: '#00ffcc' } as const
const TECH_NAME_COLOR = { color: '#00ffcc' } as const
const TIMELINE_DOT_STYLE = { background: '#080808' } as const
const TIMELINE_PHASE_STYLE = { color: '#00ffcc' } as const

const VIEWPORT = { once: true } as const

export default memo(function NanallyEngine() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Hero */}
        <SectionReveal>
          <div className="mb-16 relative">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,255,204,0.05) 0%, transparent 70%)' }}
            />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-accent-2 font-mono tracking-widest">ENGINE</span>
              <div className="h-[1px] w-12 bg-accent-2/30" aria-hidden="true" />
              <span className="text-xs text-muted font-mono">v1.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Nanally<br />
              <span style={GRADIENT_TEXT_STYLE}>Engine</span>
            </h1>
            <p className="text-muted text-lg max-w-xl leading-relaxed">
              A custom real-time 3D rendering engine built from scratch in C++17 with OpenGL 4.6.
              Designed for learning, experimentation, and pushing rendering boundaries.
            </p>
          </div>
        </SectionReveal>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-surface-2 border border-border rounded-2xl p-5 text-center"
              >
                <div className="text-2xl font-bold font-mono mb-1" style={GRADIENT_TEXT_STYLE}>
                  {s.value}
                </div>
                <p className="text-muted text-xs">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features grid */}
        <section className="mb-20">
          <SectionReveal>
            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-8">Core Systems</p>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group bg-surface-2 border border-border hover:border-[rgba(0,255,204,0.2)] rounded-2xl p-5 transition-all duration-300"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={FEATURE_ICON_STYLE}
                >
                  <f.icon size={18} style={FEATURE_ICON_COLOR} aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2 text-sm">{f.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="mb-20">
          <SectionReveal>
            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-6">Tech Stack</p>
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-surface-2" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-muted font-mono">CMakeLists.txt</span>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {TECH.map((t) => (
                  <div key={t.name} className="flex flex-col">
                    <span className="text-sm font-mono font-medium" style={TECH_NAME_COLOR}>{t.name}</span>
                    <span className="text-xs text-muted">{t.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Development timeline */}
        <section>
          <SectionReveal>
            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-8">Development Timeline</p>
          </SectionReveal>
          <div className="relative pl-6 border-l border-border space-y-6">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <div
                  aria-hidden="true"
                  className="absolute -left-[25px] w-3 h-3 rounded-full border-2 border-accent-2"
                  style={TIMELINE_DOT_STYLE}
                />
                <div className="bg-surface-2 border border-border rounded-xl px-5 py-4">
                  <span className="text-xs font-mono font-semibold mb-1 block" style={TIMELINE_PHASE_STYLE}>
                    {t.phase}
                  </span>
                  <p className="text-sm text-muted">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
})
