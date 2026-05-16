'use client';

import { SiteTransitions } from '@/components/motion/SiteTransitions';

export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <SiteTransitions>{children}</SiteTransitions>;
}
