'use client';

import { useEffect, useRef } from 'react';

import { gsap, registerGsap } from '@/lib/motion/gsap';

const beats = [
  {
    k: '01',
    title: 'A cinematic first impression',
    desc: 'Typography, glow, glass, and depth — orchestrated like a trailer sequence.',
  },
  {
    k: '02',
    title: 'Motion that feels physical',
    desc: 'Scroll-linked reveals, pinned sequences, and coherent easing — no cheap UI gimmicks.',
  },
  {
    k: '03',
    title: 'Engine-grade systems',
    desc: 'A platform built like software: modular, scalable, and documentation-first.',
  },
];

export function ScrollStory() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const panels = panelsRef.current;
    if (!root || !panels) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced) return;

    registerGsap();

    const panelsEls = Array.from(panels.querySelectorAll<HTMLElement>('[data-panel]'));

    const ctx = gsap.context(() => {
      gsap.set(panelsEls, { opacity: 0, y: 16 });
      gsap.set(panelsEls[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=220%',
          scrub: true,
          pin: true,
        },
      });

      panelsEls.forEach((el, i) => {
        const at = i * 1;
        tl.to(el, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, at);
        tl.to(el, { opacity: i === panelsEls.length - 1 ? 1 : 0, y: i === panelsEls.length - 1 ? 0 : -10, duration: 0.35 }, at + 0.7);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-3xl border bg-card/30 backdrop-blur-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r">
            <div className="text-xs text-muted-foreground">Scroll Story</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              A premium experience,
              <span className="block bg-gradient-to-r from-primary via-cyan-300 to-white bg-clip-text text-transparent">
                synchronized with your scroll.
              </span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              This section is pinned and animated with GSAP ScrollTrigger. It’s the foundation for the full site’s
              storytelling sequences.
            </p>
          </div>

          <div ref={panelsRef} className="relative min-h-[260px] md:min-h-[360px] p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-400/10" />
            <div className="relative grid gap-4">
              {beats.map((b) => (
                <div
                  key={b.k}
                  data-panel
                  className="rounded-2xl border bg-background/30 backdrop-blur-xl p-5"
                >
                  <div className="text-xs text-muted-foreground">{b.k}</div>
                  <div className="mt-1 text-lg font-semibold">{b.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
