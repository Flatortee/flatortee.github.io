import { motion } from 'framer-motion'
import { ReactNode, memo } from 'react'

interface SectionRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
}

// Static variant objects defined OUTSIDE component — never recreated
// Avoids object allocation on every render
const VARIANTS = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
} as const

const VIEWPORT = { once: true, margin: '-80px' } as const

// memo() prevents re-render when parent re-renders with same props
export default memo(function SectionReveal({
  children,
  delay = 0,
  className,
  direction = 'up',
}: SectionRevealProps) {
  return (
    <motion.div
      variants={VARIANTS[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
})
