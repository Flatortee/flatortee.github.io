import { NavLink } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/csharp', label: 'C#' },
  { href: '/nanally-engine', label: 'Nanally Engine' },
  { href: '/projects', label: 'Projects' },
]

const socials = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-32">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
                <span className="text-bg text-xs font-bold font-mono">&lt;/&gt;</span>
              </div>
              <span className="text-sm font-semibold">
                dev<span className="text-accent">.</span>folio
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Building premium digital experiences.<br />
              Code, engines, and everything in between.
            </p>
          </div>

          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className="text-sm text-muted hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-4">Connect</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 glass-light rounded-xl flex items-center justify-center text-muted hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} Portfolio. Crafted with precision.
          </p>
          <p className="text-muted text-xs font-mono">
            Built with React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
