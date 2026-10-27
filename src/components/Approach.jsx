import { useRef } from 'react'
import useReveal from '../hooks/useReveal'

export default function Approach() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="approach" className="py-[clamp(56px,11vw,150px)] section-divider ambient-glow relative">
      <div ref={ref} className="max-w-[1240px] mx-auto px-4 sm:px-[clamp(20px,4vw,48px)] grid md:grid-cols-2 grid-cols-1 gap-8 sm:gap-[clamp(32px,7vw,110px)]">
        <h2 className="text-[clamp(32px,6vw,84px)] font-light leading-[1.02] tracking-[-0.02em] reveal">
          Restraint is<br />
          <span className="font-serif italic font-light tracking-normal bg-gradient-to-r from-bronze to-gold bg-clip-text text-transparent">the finish.</span>
        </h2>
        <div className="reveal space-y-4 sm:space-y-5">
          <p className="m-0 text-mute leading-relaxed text-[15px] sm:text-base">
            Most modifications shout. Ours are designed to be noticed slowly: a wheel offset that sits true in the arch, a cabin that feels factory-finished, a chassis that answers a little sooner.
          </p>
          <p className="m-0 text-mute leading-relaxed text-[15px] sm:text-base">
            Every project starts with a conversation about how the car is used, then a single design direction, then a phased plan so nothing is bought in haste or fitted without verification.
          </p>
          <p className="m-0 text-mute leading-relaxed text-[15px] sm:text-base">
            We recommend only what we can fit, test and stand behind.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-bronze to-transparent mt-6 sm:mt-8" />
        </div>
      </div>
    </section>
  )
}
