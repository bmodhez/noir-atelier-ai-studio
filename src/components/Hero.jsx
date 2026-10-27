import { useEffect, useRef, useCallback } from 'react'
import { HeroCar } from './CarSvg'

export default function Hero() {
  const heroRef = useRef(null)
  const carRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animFrameRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const handlePointerMove = useCallback((e) => {
    const hero = heroRef.current
    const car = carRef.current
    if (!hero || !car) return
    const r = hero.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    car.style.setProperty('--px', `${x * -28}px`)
    car.style.setProperty('--py', `${y * -12}px`)
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const onScroll = () => {
      const car = carRef.current
      if (car && window.scrollY < window.innerHeight) {
        car.style.setProperty('--sy', `${window.scrollY * 0.16}px`)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.width = heroRef.current?.clientWidth || window.innerWidth
    let H = canvas.height = heroRef.current?.clientHeight || window.innerHeight
    let visible = true
    // Fewer particles on mobile for performance
    const isMobile = W < 640
    const particleCount = isMobile ? 30 : 60

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.8 + 0.3, v: Math.random() * 0.3 + 0.03,
          vx: (Math.random() - 0.5) * 0.15, a: Math.random() * 0.5 + 0.1,
          pulse: Math.random() * Math.PI * 2, pulseSpeed: Math.random() * 0.02 + 0.005,
        })
      }
    }

    const shootingStars = []
    const createShootingStar = () => ({
      x: Math.random() * W, y: Math.random() * H * 0.5,
      length: Math.random() * 80 + 40, speed: Math.random() * 4 + 3,
      angle: (Math.random() * 0.4 + 0.2) * Math.PI, opacity: 1, life: 1,
    })
    let shootTimer = 0

    const handleResize = () => {
      W = canvas.width = heroRef.current?.clientWidth || window.innerWidth
      H = canvas.height = heroRef.current?.clientHeight || window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    let observer
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? true })
      if (heroRef.current) observer.observe(heroRef.current)
    }

    const animate = () => {
      if (visible) {
        ctx.clearRect(0, 0, W, H)
        const particles = particlesRef.current
        // Connect lines (skip on mobile for perf)
        if (!isMobile) {
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < 120) {
                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = `rgba(194, 160, 104, ${0.04 * (1 - dist / 120)})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          }
        }

        particles.forEach((p) => {
          p.y -= p.v
          p.x += p.vx + Math.sin(p.y / 60) * 0.1
          p.pulse += p.pulseSpeed
          const pulseAlpha = p.a + Math.sin(p.pulse) * 0.15
          if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W }
          if (p.x < -4) p.x = W + 4
          if (p.x > W + 4) p.x = -4

          if (!isMobile) {
            const mdx = p.x - mouseRef.current.x
            const mdy = p.y - mouseRef.current.y
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
            if (mDist < 150) {
              const force = (1 - mDist / 150) * 0.3
              p.x += mdx * force * 0.02
              p.y += mdy * force * 0.02
            }
          }

          if (p.r > 1.2) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(194, 160, 104, ${pulseAlpha * 0.08})`
            ctx.fill()
          }
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(226, 196, 140, ${Math.max(0, pulseAlpha)})`
          ctx.fill()
        })

        shootTimer++
        if (shootTimer > 180 && Math.random() < 0.008) {
          shootingStars.push(createShootingStar())
          shootTimer = 0
        }
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i]
          s.life -= 0.012; s.opacity = Math.max(0, s.life)
          s.x += Math.cos(s.angle) * s.speed
          s.y += Math.sin(s.angle) * s.speed
          const tailX = s.x - Math.cos(s.angle) * s.length
          const tailY = s.y - Math.sin(s.angle) * s.length
          const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
          gradient.addColorStop(0, `rgba(194, 160, 104, 0)`)
          gradient.addColorStop(1, `rgba(255, 243, 214, ${s.opacity * 0.7})`)
          ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(s.x, s.y)
          ctx.strokeStyle = gradient; ctx.lineWidth = 1.5; ctx.stroke()
          ctx.beginPath(); ctx.arc(s.x, s.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 243, 214, ${s.opacity})`; ctx.fill()
          if (s.life <= 0) shootingStars.splice(i, 1)
        }
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (observer) observer.disconnect()
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-[100svh] flex flex-col justify-end relative overflow-hidden pt-[80px] sm:pt-[120px] border-0"
      style={{
        background: 'radial-gradient(ellipse 80% 55% at 70% 75%, #3a2d1b 0, transparent 65%), radial-gradient(ellipse 40% 30% at 20% 20%, rgba(194,160,104,0.04) 0%, transparent 70%), linear-gradient(#0b0a09, #12100e 60%, #0b0a09)',
      }}
      aria-labelledby="hero-heading"
      onPointerMove={handlePointerMove}
    >
      <div className="orb orb-1 hidden sm:block" />
      <div className="orb orb-2 hidden sm:block" />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Car — positioned differently on mobile */}
      <div
        ref={carRef}
        className="absolute right-0 sm:right-[5%] bottom-[4%] sm:bottom-[6%] w-[95vw] sm:w-[min(980px,92vw)] overflow-visible opacity-70 sm:opacity-95"
        style={{
          translate: 'var(--px, 0px) calc(var(--py, 0px) + var(--sy, 0px))',
          transition: 'translate 0.5s ease-out',
        }}
      >
        <HeroCar />
      </div>

      <div className="hero-floor absolute left-0 right-0 h-[2px]" style={{ bottom: 'calc(6% - 1px)' }} />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-[clamp(20px,4vw,48px)] relative pb-[clamp(24px,8vh,90px)] w-full">
        <h1 id="hero-heading" className="text-[clamp(36px,9.5vw,142px)] font-light leading-[1.02] tracking-[-0.02em]">
          <span className="block animate-[rise_1.1s_cubic-bezier(0.2,0.7,0.2,1)_both]">
            Built around
          </span>
          <span className="block font-serif italic font-light tracking-normal gradient-text">
            your instinct.
          </span>
        </h1>
        <p className="max-w-[46ch] text-mute mt-4 sm:my-7 text-[15px] sm:text-base animate-[rise_1.1s_cubic-bezier(0.2,0.7,0.2,1)_0.5s_both]">
          A private studio for bespoke automotive styling. We shape stance, surface and cabin around how you actually drive.
        </p>
        <a
          href="#builds"
          className="btn-premium inline-block border border-bronze bg-bronze text-ink font-medium px-5 sm:px-[30px] py-3 sm:py-[15px] font-sans text-[13px] sm:text-[14px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-300 hover:bg-bronze-light hover:border-bronze-light hover:text-ink hover:shadow-[0_0_30px_rgba(194,160,104,0.45)] hover:-translate-y-0.5 active:translate-y-0 animate-[rise_1.1s_cubic-bezier(0.2,0.7,0.2,1)_0.5s_both] mt-4 sm:mt-0"
        >
          Explore builds
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[80px] sm:h-[120px] bg-gradient-to-t from-ink to-transparent pointer-events-none" />
    </section>
  )
}
