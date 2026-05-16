import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { Navbar } from '@/components/layout/Navbar'
import { PageTransition } from '@/components/layout/PageTransition'

// ─── Fonts ───────────────────────────────────────────────────────────────────
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Flatorte — Developer & Engineer',
    template: '%s | Flatorte',
  },
  description: 'Developer portfolio and engineering docs — Flatorte. Creator of Nanally Engine.',
  keywords: ['developer', 'portfolio', 'game engine', 'unity', 'csharp', 'flatorte'],
  authors: [{ name: 'Flatorte' }],
  creator: 'Flatorte',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flatortee.github.io',
    title: 'Flatorte — Developer & Engineer',
    description: 'Developer portfolio and engineering docs',
    siteName: 'Flatorte',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flatorte — Developer & Engineer',
    description: 'Developer portfolio and engineering docs',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
