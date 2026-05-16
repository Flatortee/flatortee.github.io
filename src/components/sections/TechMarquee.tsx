'use client';

import { motion } from 'framer-motion';

const tech = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',
  'shadcn/ui',
  'GSAP',
  'ScrollTrigger',
  'Framer Motion',
  'Lenis',
  'Three.js',
  'R3F',
  'Drei',
  'Postprocessing',
  'Fumadocs',
];

export function TechMarquee() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-2xl border bg-card/30 backdrop-blur-xl overflow-hidden">
        <div className="px-5 py-3 text-xs text-muted-foreground border-b">Core Stack</div>
        <div className="relative">
          <motion.div
            className="flex gap-3 whitespace-nowrap px-5 py-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
          >
            {[...tech, ...tech].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="inline-flex items-center rounded-full border bg-background/30 px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
