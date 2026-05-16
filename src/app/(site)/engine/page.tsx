'use client';

import { Reveal } from '@/components/motion/Reveal';

const features = [
  {
    num: '01',
    title: 'Advanced Rendering Pipeline',
    desc: 'Multi-layer postprocessing with bloom, tone mapping, and color grading for cinema-quality output.',
    details: ['Emissive bloom', 'HDR rendering', 'Screen-space reflections', 'Dynamic lighting'],
  },
  {
    num: '02',
    title: 'Modular Architecture',
    desc: 'Clean entity-component system with decoupled systems. Built for scalability and rapid iteration.',
    details: ['ECS pattern', 'Plugin system', 'Hot reload ready', 'Multi-threaded'],
  },
  {
    num: '03',
    title: 'Performance First',
    desc: 'Optimized for 60 FPS on modern hardware. Intelligent batching, LOD systems, and memory pooling.',
    details: ['GPU instancing', 'Draw call optimization', 'Memory pooling', 'Async loading'],
  },
  {
    num: '04',
    title: 'Developer Experience',
    desc: 'Powerful tools and clear documentation. In-editor debugging, profiling, and visual feedback systems.',
    details: ['Debug visualization', 'Profiler UI', 'Error reporting', 'Analytics'],
  },
];

export default function EnginePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur-xl mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Prism Engine
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mt-4">
            A modern engine,
            <span className="block bg-gradient-to-r from-cyan-300 via-primary to-cyan-300 bg-clip-text text-transparent">
              engineered for scale.
            </span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
            Prism Engine is a production-grade, modular 3D rendering engine built with performance and developer experience as first-class concerns.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {features.map((f) => (
          <Reveal key={f.num} y={16}>
            <div className="rounded-2xl border bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl p-8 hover:border-primary/30 transition duration-300">
              <div className="text-4xl font-semibold text-primary/20">{f.num}</div>
              <h3 className="mt-3 text-2xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="mt-6 space-y-2">
                {f.details.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal y={16}>
        <div className="mt-16 rounded-3xl border bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 md:border-r border-border/50">
              <h2 className="text-3xl font-semibold tracking-tight">Tech Stack</h2>
              <p className="mt-3 text-muted-foreground max-w-md">
                Built with C#, leveraging modern .NET runtime and advanced graphics APIs.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Graphics API</div>
                  <div className="font-semibold">Vulkan / DX12</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Language</div>
                  <div className="font-semibold">C# (.NET)</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Architecture</div>
                  <div className="font-semibold">ECS + Components</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Target Platforms</div>
                  <div className="font-semibold">Windows, Linux</div>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-6">Rendering Features</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Physically-based materials with real-time editor</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Global illumination & dynamic lighting systems</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Advanced post-processing & visual effects</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>GPU-driven rendering & compute shaders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
