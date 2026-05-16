'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/utils'

type GSAPCallback = (gsap: typeof import('gsap').gsap) => gsap.core.Tween | gsap.core.Timeline | void

/**
 * Safe GSAP hook — lazy loads GSAP + ScrollTrigger
 * Respects prefers-reduced-motion
 * Cleans up on unmount
 */
export function useGSAP(callback: GSAPCallback, deps: React.DependencyList = []) {
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    let cancelled = false

    const init = async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      if (cancelled) return

      gsapModule.gsap.registerPlugin(ScrollTrigger)

      const result = callback(gsapModule.gsap)

      cleanupRef.current = () => {
        if (result && 'kill' in result) {
          result.kill()
        }
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    init()

    return () => {
      cancelled = true
      cleanupRef.current?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
