import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Module-level singleton — one Lenis for the whole app lifetime
let lenisInstance: Lenis | null = null
let rafId: number | null = null

function startRaf() {
  if (rafId !== null) return
  function raf(time: number) {
    lenisInstance?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
}

function stopRaf() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

export function useLenis() {
  // Track mount count to only destroy on the last unmount
  const mountCountRef = useRef(0)

  useEffect(() => {
    mountCountRef.current++

    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.2,
        // Precomputed easing — avoids recalculating pow each frame
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        // Sync with Framer Motion's requestAnimationFrame loop
        autoRaf: false,
      })
      startRaf()
    }

    return () => {
      mountCountRef.current--
      if (mountCountRef.current === 0) {
        stopRaf()
        lenisInstance?.destroy()
        lenisInstance = null
      }
    }
  }, [])

  return lenisInstance
}

export function scrollTo(target: string | number) {
  lenisInstance?.scrollTo(target, { duration: 1.4 })
}

export function getLenis() {
  return lenisInstance
}
