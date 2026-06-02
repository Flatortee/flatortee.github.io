import { useEffect, useRef } from 'react'

// Shared IntersectionObserver — one observer for all elements (much cheaper than N observers)
let sharedObserver: IntersectionObserver | null = null
const callbackMap = new WeakMap<Element, () => void>()

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = callbackMap.get(entry.target)
            if (cb) {
              cb()
              sharedObserver?.unobserve(entry.target)
              callbackMap.delete(entry.target)
            }
          }
        }
      },
      { threshold: 0.1 }
    )
  }
  return sharedObserver
}

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = getObserver()
    callbackMap.set(el, () => el.classList.add('revealed'))
    observer.observe(el)

    return () => {
      observer.unobserve(el)
      callbackMap.delete(el)
    }
  }, [])

  return ref
}
