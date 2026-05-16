import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[hsl(var(--border))] mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / name */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded border border-[hsl(var(--neon-cyan)/0.4)] flex items-center justify-center">
              <span className="font-mono text-[10px] font-bold text-[hsl(var(--neon-cyan))]">F</span>
            </div>
            <span className="font-display text-sm text-[hsl(var(--text-muted))]">
              Flatorte © {year}
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-[hsl(var(--text-muted))]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <Link href="/engine" className="hover:text-white transition-colors">Engine</Link>
            <Link href="/docs-engine" className="hover:text-white transition-colors">Docs</Link>
          </nav>

          {/* GitHub */}
          <a
            href="https://github.com/flatortee"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[hsl(var(--text-muted))] hover:text-white transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>

        {/* Accent line */}
        <div className="accent-line mt-8 opacity-40" />
      </div>
    </footer>
  )
}
