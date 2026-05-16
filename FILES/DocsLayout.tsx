'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DocNavItem {
  title: string
  href: string
  children?: DocNavItem[]
}

interface DocsLayoutProps {
  children: React.ReactNode
  nav: DocNavItem[]
  title: string
  accentColor?: 'cyan' | 'blue' | 'violet'
}

export function DocsLayout({ children, nav, title, accentColor = 'blue' }: DocsLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')

  const accentVar = {
    cyan: 'hsl(var(--neon-cyan))',
    blue: 'hsl(var(--neon-blue))',
    violet: 'hsl(var(--neon-violet))',
  }[accentColor]

  const filteredNav = search
    ? nav.map((section) => ({
        ...section,
        children: section.children?.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((section) => (section.children?.length ?? 0) > 0 || section.title.toLowerCase().includes(search.toLowerCase()))
    : nav

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen pt-16 flex">
      {/* ── Sidebar ── */}
      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-16 left-0 bottom-0 z-30 w-72 flex flex-col',
          'border-r border-[hsl(var(--border))] bg-[hsl(var(--surface))]',
          'transition-transform duration-300 ease-out',
          'lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Sidebar header */}
        <div className="px-5 py-5 border-b border-[hsl(var(--border))]">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: accentVar, boxShadow: `0 0 6px ${accentVar}` }}
            />
            <span className="font-display text-sm font-600 text-[hsl(var(--text-primary))]">
              {title}
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--text-muted))]" />
            <input
              type="text"
              placeholder="Search docs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg
                         bg-[hsl(var(--background))] border border-[hsl(var(--border))]
                         text-[hsl(var(--text-secondary))] placeholder:text-[hsl(var(--text-muted))]
                         focus:outline-none focus:border-[hsl(var(--neon-blue)/0.4)]
                         transition-colors"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" data-lenis-prevent>
          {filteredNav.map((section) => (
            <NavSection
              key={section.title}
              section={section}
              pathname={pathname}
              accentVar={accentVar}
            />
          ))}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="sticky top-16 z-20 lg:hidden flex items-center gap-3 px-4 py-3
                        bg-[hsl(var(--background))] border-b border-[hsl(var(--border))]">
          <button
            className="p-1.5 rounded text-[hsl(var(--text-muted))] hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
          <span className="font-mono text-xs text-[hsl(var(--text-muted))]">
            {title}
          </span>
        </div>

        {/* Content area */}
        <article className="max-w-3xl mx-auto px-6 lg:px-12 py-12">
          {children}
        </article>
      </div>
    </div>
  )
}

// ─── Nav section ──────────────────────────────────────────────────────────────
function NavSection({
  section,
  pathname,
  accentVar,
}: {
  section: DocNavItem
  pathname: string
  accentVar: string
}) {
  const [open, setOpen] = useState(true)
  const hasChildren = section.children && section.children.length > 0

  return (
    <div className="mb-4">
      {hasChildren ? (
        <button
          className="w-full flex items-center justify-between px-3 py-1.5
                     font-mono text-[10px] uppercase tracking-widest
                     text-[hsl(var(--text-muted))] hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {section.title}
          <ChevronRight
            size={12}
            className={cn('transition-transform duration-200', open && 'rotate-90')}
          />
        </button>
      ) : (
        <NavLink href={section.href} active={pathname === section.href} accentVar={accentVar}>
          {section.title}
        </NavLink>
      )}

      <AnimatePresence initial={false}>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-2"
          >
            {section.children!.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={pathname === item.href}
                accentVar={accentVar}
              >
                {item.title}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavLink({
  href,
  active,
  accentVar,
  children,
}: {
  href: string
  active: boolean
  accentVar: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-all duration-150',
        active
          ? 'text-[hsl(var(--text-primary))] bg-[hsl(var(--glass))]'
          : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--glass))]'
      )}
    >
      {active && (
        <span
          className="w-1 h-1 rounded-full shrink-0"
          style={{ background: accentVar }}
        />
      )}
      {children}
    </Link>
  )
}
