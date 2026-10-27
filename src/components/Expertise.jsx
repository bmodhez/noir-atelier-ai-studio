import { useRef, useCallback, useState, useEffect } from 'react'
import { expertiseItems } from '../data/constants'
import useReveal from '../hooks/useReveal'

const stats = [
  { value: 150, suffix: '+', label: 'Builds Completed' },
  { value: 12, suffix: '', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span className="stat-number text-[clamp(28px,5vw,56px)] font-light text-ivory leading-none">
      {count}{suffix}
    </span>
  )
}

export default function Expertise() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)
  useReveal(ref)

  useEffect(() => {
    if (!statsRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const handlePointerMove = useCallback((e) => {
    const article = e.target.closest('.expertise-card')
    if (!article) return
    const r = article.getBoundingClientRect()
    article.style.setProperty('--mx', `${e.clientX - r.left}px`)
    article.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])

  return (
    <section id="expertise" className="py-[clamp(56px,11vw,150px)] section-divider relative">
      <div ref={ref} className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)]">
        <h2 className="text-[clamp(32px,6vw,84px)] font-light leading-[1.02] tracking-[-0.02em] reveal">
          What we <span className="font-serif italic font-light tracking-normal bg-gradient-to-r from-bronze to-gold bg-clip-text text-transparent">refine.</span>
        </h2>

        {/* Animated stats — responsive grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 mb-10 sm:mb-14 reveal"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={statsVisible} />
              <div className="text-mute text-[11px] sm:text-sm mt-1 sm:mt-2 tracking-[0.06em]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Expertise cards — single col on mobile, auto-fit on larger */}
        <div
          className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-px bg-line/50 border border-line/50 mt-6 sm:mt-8"
          onPointerMove={handlePointerMove}
        >
          {expertiseItems.map((item, index) => (
            <article
              key={index}
              className="expertise-card glass-card p-6 sm:p-[36px_30px_40px] reveal relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Decorative number */}
              <span className="text-bronze/20 text-[40px] sm:text-[64px] font-serif italic leading-none absolute top-3 right-4 sm:top-4 sm:right-6 select-none pointer-events-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif italic font-light text-[24px] sm:text-[30px] mb-2 sm:mb-3 tracking-normal leading-[1.02] relative">
                {item.title}
              </h3>
              <p className="m-0 text-mute text-[14px] sm:text-[15px] leading-relaxed relative">{item.description}</p>
              <div className="w-8 h-px bg-bronze/30 mt-4 sm:mt-6" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
