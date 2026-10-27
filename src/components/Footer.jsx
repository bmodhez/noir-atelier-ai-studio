import { useRef } from 'react'
import useReveal from '../hooks/useReveal'

export default function Footer() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <footer className="section-divider text-mute text-sm relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] h-[150px] sm:h-[200px] bg-bronze/[0.03] blur-[80px] pointer-events-none" />

      <div ref={ref} className="max-w-[1240px] mx-auto px-4 sm:px-[clamp(20px,4vw,48px)]">
        {/* Main footer content — stack on mobile, row on larger */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-8 sm:gap-10 pt-12 sm:pt-[70px] pb-8 sm:pb-10">
          {/* Tagline */}
          <div className="font-serif italic font-light text-[clamp(26px,4vw,48px)] leading-[1.1] max-w-[20ch] reveal">
            <span className="bg-gradient-to-r from-ivory via-bronze to-ivory bg-clip-text text-transparent">
              Built around your instinct.
            </span>
          </div>

          {/* Navigation links */}
          <ul className="list-none p-0 m-0 grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-2 reveal">
            {[
              { href: '#expertise', label: 'Expertise' },
              { href: '#approach', label: 'Our Approach' },
              { href: '#builds', label: 'Selected Builds' },
              { href: '#concierge', label: 'AI Build Concierge' },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-ivory transition-colors duration-300 relative group text-[14px] sm:text-sm">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-bronze transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Contact info */}
          <ul className="list-none p-0 m-0 grid gap-2 reveal">
            <li className="flex items-center gap-2 text-[13px] sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze/40 shrink-0" />
              studio@example.com
            </li>
            <li className="flex items-center gap-2 text-[13px] sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze/40 shrink-0" />
              +00 0000 000000
            </li>
            <li className="flex items-center gap-2 text-[13px] sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze/40 shrink-0" />
              Address placeholder
            </li>
          </ul>
        </div>

        <small className="block mt-2 sm:mt-4 border-t border-line/50 pt-5 sm:pt-[22px] pb-8 sm:pb-10 text-mute/70 text-[11px] sm:text-xs leading-relaxed">
          NOIR ATELIER is a fictional concept studio. All projects, contact details and cost figures are illustrative. Not a real business, quote or offer.
        </small>
      </div>
    </footer>
  )
}
