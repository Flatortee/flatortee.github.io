import { motion } from 'framer-motion'
import { ReactNode, memo } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

// Static objects outside component — zero allocations on render
const VARIANTS = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
} as const

const TRANSITION = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as number[] } as const

export default memo(function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={VARIANTS}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={TRANSITION}
    >
      {children}
    </motion.div>
  )
})
