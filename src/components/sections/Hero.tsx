'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { HeroCanvas } from '@/components/scene/HeroCanvas';
import { Reveal } from '@/components/motion/Reveal';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-24 md:pb-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_rgba(121,40,202,0.9)]" />
                Next-Gen Interactive Developer Platform
              </div>

              <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight">
                Cinematic UI.
                <span className="block bg-gradient-to-r from-primary via-cyan-300 to-white bg-clip-text text-transparent">
                  Engine-grade storytelling.
                </span>
              </h1>

              <p className="mt-4 text-muted-foreground max-w-xl">
                A futuristic, AAA-polished platform for portfolio, engine presentation, and premium documentation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/portfolio">Explore Portfolio</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/docs-engine">Read the Docs</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/20 via-transparent to-cyan-400/20 blur-2xl" />
            <div className="relative h-[360px] md:h-[420px] rounded-3xl border bg-card/30 backdrop-blur-xl overflow-hidden">
              <HeroCanvas />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="rounded-2xl border bg-background/40 backdrop-blur-xl p-4">
                  <div className="text-xs text-muted-foreground">Interactive R3F Hero</div>
                  <div className="mt-1 text-sm">
                    Postprocessing bloom • Float fields • Mouse-reactive motion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
