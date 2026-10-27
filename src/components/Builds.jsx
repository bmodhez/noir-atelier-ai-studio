import { useState, useRef, useCallback } from 'react'
import { builds, categories } from '../data/constants'
import { BuildCardSvg } from './CarSvg'
import useReveal from '../hooks/useReveal'

export default function Builds() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef(null)
  useReveal(ref)

  const filteredBuilds = activeCategory === 'All'
    ? builds
    : builds.filter((b) => b.category === activeCategory)

  // 3D tilt effect
  const handlePointerMove = useCallback((e) => {
    const figure = e.target.closest('.card-figure')
    if (!figure) return
    const r = figure.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    figure.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }, [])

  const handlePointerOut = useCallback((e) => {
    const figure = e.target.closest('.card-figure')
    if (figure && !figure.contains(e.relatedTarget)) {
      figure.style.transform = ''
    }
  }, [])

  return (
    <section id="builds" className="py-[clamp(56px,11vw,150px)] section-divider ambient-glow relative">
      <div ref={ref} className="max-w-[1240px] mx-auto px-[clamp(16px,4vw,48px)]">
        <h2 className="text-[clamp(32px,6vw,84px)] font-light leading-[1.02] tracking-[-0.02em] reveal">
          Selected <span className="font-serif italic font-light tracking-normal bg-gradient-to-r from-bronze to-gold bg-clip-text text-transparent">builds.</span>
        </h2>
        <p className="text-mute max-w-[56ch] mt-4 sm:mt-[22px] text-[15px] sm:text-base reveal">
          Every project below is a fictional concept created for this showcase. None are real client cars.
        </p>

        {/* Filter chips — scrollable on mobile */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 my-6 sm:my-9 reveal" role="group" aria-label="Filter builds">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn-premium bg-transparent border px-3 sm:px-[18px] py-2 sm:py-[9px] font-sans font-normal text-[12px] sm:text-[13px] tracking-[0.08em] cursor-pointer transition-all duration-[350ms] ${
                activeCategory === cat
                  ? 'border-bronze text-ivory shadow-[0_0_15px_rgba(194,160,104,0.15)]'
                  : 'border-line text-mute hover:border-bronze/50 hover:text-ivory'
              }`}
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Build cards grid — 1col mobile, 2col tablet, 3col desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 sm:gap-7"
          aria-live="polite"
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
        >
          {filteredBuilds.length === 0 ? (
            <div className="text-mute border border-dashed border-line p-8 sm:p-10 text-center col-span-full text-sm sm:text-base">
              No builds in this category yet.
            </div>
          ) : (
            filteredBuilds.map((build, index) => (
              <article
                key={build.id}
                className="group animate-[fadeUp_0.8s_cubic-bezier(0.2,0.7,0.2,1)_both]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <figure className="card-figure m-0 aspect-[16/10] overflow-hidden border border-line/60 relative transition-all duration-[350ms] ease-out will-change-transform hover:border-bronze/30 hover:shadow-[0_8px_40px_rgba(194,160,104,0.08)]">
                  <BuildCardSvg name={build.name} hue={build.hue} />
                  <span className="absolute left-2 sm:left-3 top-2 sm:top-3 text-[10px] sm:text-[11px] tracking-[0.12em] bg-ink/80 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 border border-line/50">
                    FICTIONAL CONCEPT
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </figure>
                <h3 className="font-serif italic font-light text-[26px] sm:text-[32px] mt-3 sm:mt-[18px] mb-1 tracking-normal leading-[1.02] group-hover:text-gold transition-colors duration-300">
                  {build.name}
                </h3>
                <div className="text-[12px] sm:text-[13px] text-bronze mb-1">
                  {build.category} · {build.vehicle}
                </div>
                <p className="m-0 text-mute text-[14px] sm:text-[15px] leading-relaxed">{build.description}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
