import dynamic from 'next/dynamic';

export const HeroCanvas = dynamic(() => import('./HeroCanvasClient'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />, // keeps layout stable
});
