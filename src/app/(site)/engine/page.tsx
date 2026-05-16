import { Reveal } from '@/components/motion/Reveal';

export default function EnginePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Prism Engine</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          A product-grade engine presentation: features, architecture, and performance — designed like a AAA tool.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border bg-card/40 backdrop-blur-xl p-6">
            <div className="text-sm text-muted-foreground">Rendering</div>
            <div className="mt-2 text-xl font-semibold">Modern pipeline & lighting</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Layered postprocessing, emissive bloom, and cinematic composition.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border bg-card/40 backdrop-blur-xl p-6">
            <div className="text-sm text-muted-foreground">Architecture</div>
            <div className="mt-2 text-xl font-semibold">Modular systems</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Clean boundaries, reusable primitives, and scalable composition.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
