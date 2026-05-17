import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  href?: string
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  target,
  rel,
}: ButtonProps) {
  const base =
    'relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden group'

  const variants = {
    primary: 'bg-accent text-bg hover:bg-accent/90',
    ghost: 'text-muted hover:text-white',
    outline: 'border border-border-2 text-white hover:border-accent/50 hover:bg-surface-2',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/10 transition-transform duration-300 skew-x-12" />
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={cls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}
