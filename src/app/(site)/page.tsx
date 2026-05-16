import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { ScrollStory } from '@/components/sections/ScrollStory';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ScrollStory />

      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-card/40 backdrop-blur-xl p-6">
            <div className="text-sm text-muted-foreground">Portfolio</div>
            <div className="mt-2 text-xl font-semibold">Awwwards-grade case studies</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Motion-first project cards, cinematic transitions, and interactive previews.
            </p>
          </div>
          <div className="rounded-2xl border bg-card/40 backdrop-blur-xl p-6">
            <div className="text-sm text-muted-foreground">Engine</div>
            <div className="mt-2 text-xl font-semibold">Product-level presentation</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Features, architecture, and performance highlights — styled like a real AAA tool.
            </p>
          </div>
          <div className="rounded-2xl border bg-card/40 backdrop-blur-xl p-6">
            <div className="text-sm text-muted-foreground">Docs</div>
            <div className="mt-2 text-xl font-semibold">Premium documentation system</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Fumadocs + MDX, fast navigation, clean typography, and a static search index for Pages.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
