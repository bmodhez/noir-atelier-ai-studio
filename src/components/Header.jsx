import { useState, useEffect } from 'react'
import { navLinks } from '../data/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-ink/[0.94] backdrop-blur-[10px] border-b border-line'
            : 'bg-gradient-to-b from-ink to-ink/0'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-[clamp(20px,4vw,48px)] flex items-center justify-between h-[56px] sm:h-[68px]">
          {/* Logo — left */}
          <a
            href="#top"
            className="font-sans font-normal text-[13px] sm:text-[15px] tracking-[0.28em] sm:tracking-[0.34em] text-ivory hover:text-bronze transition-colors z-40 shrink-0"
            aria-label="Noir Atelier home"
            onClick={handleLinkClick}
          >
            NOIR ATELIER
          </a>

          {/* Desktop nav links — center/right, hidden on mobile */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex gap-6 lg:gap-[34px] list-none m-0 p-0 text-[14px] tracking-[0.06em]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-mute hover:text-ivory transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger — far right, hidden on desktop */}
          <button
            className="md:hidden bg-transparent border border-line text-ivory px-4 py-2 font-sans text-[13px] tracking-[0.08em] cursor-pointer hover:border-bronze hover:text-bronze transition-colors z-40"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay menu — separate from header to prevent backdrop-filter stacking context bugs */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed inset-x-0 top-[56px] sm:top-[68px] bottom-0 bg-ink/[0.98] backdrop-blur-2xl z-30 transition-all duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <nav aria-label="Mobile navigation" className="h-full flex flex-col px-6 pt-8 pb-10 overflow-y-auto">
          <ul className="list-none m-0 p-0 flex flex-col gap-0">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className={menuOpen ? 'animate-[fadeIn_0.3s_ease-out_both]' : ''}
                style={menuOpen ? { animationDelay: `${i * 60}ms` } : {}}
              >
                <a
                  href={link.href}
                  className="block py-4 text-[20px] text-ivory/80 hover:text-bronze transition-colors duration-200 border-b border-line/20 tracking-[0.02em]"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom branding */}
          <div className="mt-auto pt-8 border-t border-line/20">
            <p className="text-mute/40 text-[11px] tracking-[0.2em] uppercase m-0">
              AI Automotive Build Studio
            </p>
            <div className="flex gap-3 mt-4">
              <span className="w-2 h-2 border border-bronze/30 rotate-45" />
              <span className="w-2 h-2 border border-bronze/20 rotate-45" />
              <span className="w-2 h-2 border border-bronze/10 rotate-45" />
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
