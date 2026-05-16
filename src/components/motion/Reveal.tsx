'use client';

import { useEffect, useRef } from 'react';

import { gsap, registerGsap, ScrollTrigger } from '@/lib/motion/gsap';

export function Reveal({
  children,
  y = 16,
  duration = 0.7,
}: {
  children: React.ReactNode;
  y?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [duration, y]);

  return <div ref={ref}>{children}</div>;
}
