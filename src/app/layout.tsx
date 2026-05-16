import './globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { LenisProvider } from '@/components/motion/LenisProvider';
import { BackgroundFX } from '@/components/layout/BackgroundFX';
import { SearchProvider } from '@/components/search/SearchProvider';

export const metadata: Metadata = {
  title: {
    default: 'Flatortee // Next-Gen Developer Platform',
    template: '%s — Flatortee',
  },
  description: 'A cinematic, immersive developer platform: engine, portfolio, and premium docs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise bg-aurora">
        <ThemeProvider>
          <LenisProvider>
            <SearchProvider>
              <BackgroundFX />
              {children}
            </SearchProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
