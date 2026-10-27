import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Approach from './components/Approach'
import Expertise from './components/Expertise'
import Builds from './components/Builds'
import Concierge from './components/Concierge'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProgressBar from './components/ProgressBar'
import CarSvg from './components/CarSvg'

function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 })
  const [visible, setVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect touch-only devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    setIsTouchDevice(isTouch)
    if (isTouch) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerleave', handleLeave)
    document.addEventListener('pointerenter', handleEnter)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerleave', handleLeave)
      document.removeEventListener('pointerenter', handleEnter)
    }
  }, [visible])

  if (isTouchDevice) return null

  return (
    <div
      className="cursor-glow"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
      }}
    />
  )
}

export default function App() {
  return (
    <>
      <CursorGlow />
      <ProgressBar />
      <CarSvg />
      <Header />
      <main id="top">
        <Hero />
        <Approach />
        <Expertise />
        <Builds />
        <Concierge />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
