'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Nav items ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Engine', href: '/engine' },
] as const

const DOCS_LINKS = [
  { label: 'Engine Docs', href: '/docs-engine' },
  { label: 'C# Docs', href: '/docs-csharp' },
  { label: 'Unity Docs', href: '/docs-unity' },
] as const

// ─── Navbar ──────────────────────────────────────────────────────────────────
export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
    setDocsOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-[hsl(var(--glass-border))]'
            : 'bg-transparent'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-[hsl(var(--neon-cyan)/0.4)] flex items-center justify-center
                            group-hover:border-[hsl(var(--neon-cyan)/0.8)] transition-colors duration-200
                            group-hover:shadow-[0_0_12px_hsl(var(--neon-cyan)/0.3)]">
              <span className="font-mono text-xs font-bold text-[hsl(var(--neon-cyan))]">F</span>
            </div>
            <span className="font-display font-700 text-sm tracking-wider text-[hsl(var(--text-primary))]
                           group-hover:text-white transition-colors duration-200">
              FLATORTE
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} active={pathname === link.href}>
                {link.label}
              </NavLink>
            ))}

            {/* Docs dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDocsOpen(true)}
              onMouseLeave={() => setDocsOpen(false)}
            >
              <button
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]',
                  docsOpen && 'text-[hsl(var(--text-primary))]'
                )}
              >
                Docs
              </button>

              <AnimatePresence>
                {docsOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-1 w-48 glass rounded-lg border border-[hsl(var(--glass-border))] overflow-hidden"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    {DOCS_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'flex items-center gap-2 px-4 py-3 text-sm transition-colors duration-150',
                          'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]',
                          'hover:bg-[hsl(var(--glass))]',
                          pathname === link.href && 'text-[hsl(var(--neon-cyan))]'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GitHub CTA */}
            <a
              href="https://github.com/flatortee"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                         border border-[hsl(var(--neon-cyan)/0.3)] rounded-md
                         text-[hsl(var(--neon-cyan))] hover:bg-[hsl(var(--neon-cyan)/0.08)]
                         hover:border-[hsl(var(--neon-cyan)/0.6)] transition-all duration-200
                         hover:shadow-[0_0_12px_hsl(var(--neon-cyan)/0.2)]"
            >
              GitHub
              <ExternalLink size={12} />
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[hsl(var(--text-secondary))] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              className="absolute top-16 left-0 right-0 glass border-b border-[hsl(var(--glass-border))] p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-3 rounded-md text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'text-[hsl(var(--neon-cyan))] bg-[hsl(var(--neon-cyan)/0.08)]'
                        : 'text-[hsl(var(--text-secondary))] hover:text-white hover:bg-[hsl(var(--glass))]'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="my-2 border-t border-[hsl(var(--border))]" />
                <p className="px-4 py-1 text-xs font-mono text-[hsl(var(--text-muted))] uppercase tracking-widest">
                  Documentation
                </p>
                {DOCS_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-3 rounded-md text-sm transition-colors',
                      pathname === link.href
                        ? 'text-[hsl(var(--neon-cyan))]'
                        : 'text-[hsl(var(--text-secondary))] hover:text-white hover:bg-[hsl(var(--glass))]'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── NavLink helper ──────────────────────────────────────────────────────────
function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
        active
          ? 'text-[hsl(var(--text-primary))]'
          : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]'
      )}
    >
      {active && (
        <motion.span
          className="absolute inset-0 rounded-md bg-[hsl(var(--glass))] border border-[hsl(var(--glass-border))]"
          layoutId="nav-active"
          transition={{ duration: 0.2 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Link>
  )
}
