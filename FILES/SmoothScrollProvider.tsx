'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import type Lenis from '@studio-freight/lenis'

// ─── Context ─────────────────────────────────────────────────────────────────
const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext)
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const initLenis = async () => {
      const { default: LenisClass } = await import('@studio-freight/lenis')

      const lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      lenisRef.current = lenis

      // RAF loop
      let animFrame: number
      const raf = (time: number) => {
        lenis.raf(time)
        animFrame = requestAnimationFrame(raf)
      }
      animFrame = requestAnimationFrame(raf)

      return () => {
        cancelAnimationFrame(animFrame)
        lenis.destroy()
        lenisRef.current = null
      }
    }

    const cleanup = initLenis()
    return () => {
      cleanup.then((fn) => fn?.())
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  )
}
