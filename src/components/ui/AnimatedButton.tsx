import { motion } from 'framer-motion'
import { ReactNode, memo } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  href?: string
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
}

const BASE =
  'relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 overflow-hidden group'

const VARIANT_CLASSES = {
  primary: 'bg-accent text-bg hover:bg-accent/90',
  ghost: 'text-muted hover:text-white',
  outline: 'border border-border-2 text-white hover:border-accent/50 hover:bg-surface-2',
} as const

// Static whileHover/whileTap to prevent object creation per render
const HOVER = { scale: 1.02 } as const
const TAP = { scale: 0.98 } as const

export default memo(function AnimatedButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  target,
  rel,
}: ButtonProps) {
  const cls = `${BASE} ${VARIANT_CLASSES[variant]} ${className}`

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        // Uses transform (GPU) not margin/width — cheap animation
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/10 transition-transform duration-300 skew-x-12"
        />
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
        whileHover={HOVER}
        whileTap={TAP}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cls}
      whileHover={HOVER}
      whileTap={TAP}
    >
      {content}
    </motion.button>
  )
})
