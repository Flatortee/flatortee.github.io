import 'fumadocs-ui/style.css';
import './globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { LenisProvider } from '@/components/motion/LenisProvider';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
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
              <TopNav />
              <main className="relative min-h-[calc(100vh-96px)]">{children}</main>
              <Footer />
            </SearchProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
