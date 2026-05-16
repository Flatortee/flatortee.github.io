import { Reveal } from '@/components/motion/Reveal';

const projects = [
  {
    title: 'Cinematic Engine Site',
    tag: 'Web + Motion',
    desc: 'ScrollTrigger-driven storytelling + premium UI polish.',
  },
  {
    title: 'R3F Hero Experience',
    tag: '3D / WebGL',
    desc: 'Interactive hero scene with postprocessing bloom & depth.',
  },
  {
    title: 'Docs Platform',
    tag: 'Fumadocs',
    desc: 'Multi-section docs with MDX, sidebar nav, and static search.',
  },
];

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Portfolio</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          A living system of interactive experiments, product-grade builds, and cinematic UI.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <Reveal key={p.title}>
            <div className="group rounded-2xl border bg-card/40 backdrop-blur-xl p-6 transition hover:border-primary/50">
              <div className="text-xs text-muted-foreground">{p.tag}</div>
              <div className="mt-2 text-xl font-semibold">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
