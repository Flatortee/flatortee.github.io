import { useEffect, useRef, memo } from 'react'

// CursorGlow — GPU-only via translate3d + will-change
// Optimizations:
// - will-change: transform promotes to compositor layer upfront
// - translate3d instead of translate() for explicit GPU hint
// - Low lerp (0.08) for smooth tracking, no layout properties touched
// - Passive event listener for better scroll/input parallelism
// - Skips rendering on mobile/touch devices (no cursor)
export default memo(function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // No cursor on touch-only devices — skip entirely
    if (window.matchMedia('(hover: none)').matches) return

    const el = glowRef.current
    if (!el) return

    let x = 0, y = 0
    let targetX = 0, targetY = 0
    let rafId: number
    let ticking = false

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      // Don't schedule extra RAFs — the animate loop already runs
    }

    const animate = () => {
      x += (targetX - x) * 0.08
      y += (targetY - y) * 0.08
      // translate3d forces GPU layer; avoids triggering layout
      el.style.transform = `translate3d(${x - 200}px,${y - 200}px,0)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)',
        willChange: 'transform',
        // Paint immediately promoted to compositor layer
        contain: 'strict',
      }}
    />
  )
})
