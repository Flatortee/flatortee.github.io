'use client';

import { Reveal } from '@/components/motion/Reveal';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const featured = [
  {
    title: 'Interactive Motion System',
    tag: 'Web',
    desc: 'GSAP + ScrollTrigger + Framer Motion — scroll-linked reveals, pinned sequences, cinematic page transitions.',
    href: '#',
  },
  {
    title: 'Premium 3D Hero',
    tag: '3D / WebGL',
    desc: 'R3F with Postprocessing bloom, particle rings, and reactive lighting. GPU-accelerated rendering.',
    href: '#',
  },
  {
    title: 'Fumadocs Platform',
    tag: 'Docs',
    desc: 'Multi-section documentation with MDX, syntax highlighting, static search index. Vercel Docs vibes.',
    href: '#',
  },
];

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur-xl mb-6">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Portfolio Showcase
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mt-4">
            Projects that
            <span className="block bg-gradient-to-r from-primary via-cyan-300 to-white bg-clip-text text-transparent">
              feel premium.
            </span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
            A curated collection of interactive web experiences, 3D implementations, and documentation systems built with modern tools.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.title} y={12 + i * 4}>
            <Link href={p.href}>
              <div className="group h-full rounded-2xl border bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl p-6 transition duration-300 hover:border-primary/50 hover:bg-card/40 cursor-pointer">
                <div className="text-xs font-semibold text-primary uppercase tracking-widest">{p.tag}</div>
                <h3 className="mt-3 text-xl font-semibold group-hover:text-primary transition">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition">
                  View Project <ArrowRight className="h-3 w-3" />
                </div>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal y={16}>
        <div className="mt-20 rounded-3xl border bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                More projects coming soon.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                This portfolio will grow with new implementations, deeper case studies, and interactive experiments as development progresses.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl border bg-background/20 backdrop-blur-xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-400/5" />
              <div className="relative text-center">
                <div className="text-5xl font-semibold text-muted-foreground/30">🚀</div>
                <p className="mt-2 text-sm text-muted-foreground">Interactive projects in progress</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
