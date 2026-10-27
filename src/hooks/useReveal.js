import { useEffect } from 'react'

/**
 * Custom hook to add reveal-on-scroll animation to elements
 * Uses IntersectionObserver to trigger visibility
 */
export default function useReveal(ref) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = ref.current
    if (!container) return

    const elements = container.querySelectorAll('.reveal')
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    elements.forEach((el, index) => {
      el.style.transitionDelay = `${index * 90}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ref])
}
