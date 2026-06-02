import { useState, useEffect, useCallback, memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/csharp', label: 'C#' },
  { href: '/nanally-engine', label: 'Nanally Engine' },
  { href: '/projects', label: 'Projects' },
] as const

// Static animation objects — defined outside to prevent recreation
const NAV_INITIAL = { y: -80, opacity: 0 } as const
const NAV_ANIMATE = { y: 0, opacity: 1 } as const
const NAV_TRANSITION = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as number[] } as const

const MOBILE_INITIAL = { opacity: 0, y: -20 } as const
const MOBILE_ANIMATE = { opacity: 1, y: 0 } as const
const MOBILE_EXIT = { opacity: 0, y: -20 } as const
const MOBILE_TRANSITION = { duration: 0.25 } as const

const ACTIVE_INDICATOR_TRANSITION = { type: 'spring', duration: 0.5, bounce: 0.2 } as const

// Memoized NavItem to prevent re-renders when menuOpen changes but links don't
const DesktopNavLink = memo(function DesktopNavLink({
  href,
  label,
  end,
}: {
  href: string
  label: string
  end: boolean
}) {
  return (
    <NavLink
      to={href}
      end={end}
      className={({ isActive }) =>
        `relative px-4 py-2 text-sm rounded-xl transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-muted hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="nav-active"
              className="absolute inset-0 bg-surface-2 rounded-xl border border-border-2"
              transition={ACTIVE_INDICATOR_TRANSITION}
            />
          )}
          <span className="relative z-10">{label}</span>
        </>
      )}
    </NavLink>
  )
})

export default memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Throttle scroll handler — use RAF to batch updates
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), [])

  const navClass = `fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-2xl transition-all duration-500 ${
    scrolled ? 'glass shadow-xl shadow-black/40' : 'bg-transparent border border-transparent'
  }`

  return (
    <>
      <motion.nav
        initial={NAV_INITIAL}
        animate={NAV_ANIMATE}
        transition={NAV_TRANSITION}
        className={navClass}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
              <span className="text-bg text-xs font-bold font-mono" aria-hidden="true">&lt;/&gt;</span>
            </div>
            <span className="text-sm font-semibold tracking-tight hidden sm:block">
              dev<span className="text-accent">.</span>folio
            </span>
          </NavLink>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {LINKS.map((link) => (
              <DesktopNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                end={link.href === '/'}
              />
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-accent text-bg text-sm font-semibold rounded-xl hover:bg-accent/90 transition-colors"
            >
              GitHub
            </a>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-xl glass-light text-white"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {/* Render both — let CSS handle visibility to avoid unmount/remount */}
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={MOBILE_INITIAL}
            animate={MOBILE_ANIMATE}
            exit={MOBILE_EXIT}
            transition={MOBILE_TRANSITION}
            className="fixed top-20 left-4 right-4 z-40 glass rounded-2xl p-4 shadow-2xl"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-surface-2 text-white border border-border-2'
                        : 'text-muted hover:text-white hover:bg-surface-2'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-border mt-2 pt-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-accent text-bg text-sm font-semibold rounded-xl"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})
