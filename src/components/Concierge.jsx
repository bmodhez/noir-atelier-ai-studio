import { useState, useEffect, useRef } from 'react'
import { styleOptions, goalOptions, currencyOptions } from '../data/constants'
import { generateDemoPlan, normalizePlan } from '../utils/planUtils'
import PlanResult from './PlanResult'
import useReveal from '../hooks/useReveal'

export default function Concierge() {
  const [formData, setFormData] = useState({
    vehicle: '',
    year: '',
    budget: '',
    currency: 'INR',
    style: 'OEM+',
    goal: 'Appearance',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [plan, setPlan] = useState(null)
  const [planInput, setPlanInput] = useState(null)
  const [isAiOnline, setIsAiOnline] = useState(false)
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  // Detect if live AI backend is configured & running
  useEffect(() => {
    let cancelled = false
    fetch('/api/health')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && data.aiConfigured) {
          setIsAiOnline(true)
        }
      })
      .catch(() => {
        // Backend offline or no AI key -> demo mode active
      })
    return () => { cancelled = true }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    const v = formData.vehicle.trim()
    const y = formData.year.trim()
    const bd = Number(formData.budget.replace(/[,\s]/g, ''))

    if (v.length < 2) {
      newErrors.vehicle = 'Please enter your vehicle make and model (e.g. Porsche 911, BMW M3).'
    }
    if (y && !(/^\d{4}$/.test(y) && parseInt(y, 10) >= 1950 && parseInt(y, 10) <= 2027)) {
      newErrors.year = 'Please enter a 4-digit year between 1950 and 2027, or leave blank.'
    }
    if (!formData.budget || isNaN(bd) || bd < 500) {
      newErrors.budget = 'Please enter a budget of at least 500.'
    } else if (bd > 100000000) {
      newErrors.budget = 'Budget exceeds maximum allocation limit.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const input = {
      vehicle: formData.vehicle.trim(),
      year: formData.year.trim(),
      budget: Math.round(Number(formData.budget.replace(/[,\s]/g, ''))),
      currency: formData.currency,
      style: formData.style,
      goal: formData.goal,
      notes: formData.notes.trim().slice(0, 400),
    }

    setLoading(true)
    setStatus('Synthesizing bespoke build parameters…')
    let result = null

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (response.ok) {
        const data = await response.json()
        if (data && Array.isArray(data.allocation) && Array.isArray(data.checklist)) {
          result = { ...data, mode: 'live' }
        }
      }
    } catch {
      // Backend unavailable; fallback to offline demo simulation
    }

    if (!result) {
      // Offline personalized demo synthesis
      result = generateDemoPlan(input)
    }

    try {
      normalizePlan(result, input)
      setPlan(result)
      setPlanInput(input)
      setStatus('')
    } catch {
      setStatus('Could not finalize build plan. Please review inputs.')
    }
    setLoading(false)
  }

  const handleReset = () => {
    setPlan(null)
    setPlanInput(null)
    setFormData({
      vehicle: '',
      year: '',
      budget: '',
      currency: 'INR',
      style: 'OEM+',
      goal: 'Appearance',
      notes: '',
    })
    setStatus('')
    setErrors({})
  }

  const inputClasses = (name) =>
    `bg-ink/80 text-ivory border ${
      errors[name] ? 'border-err/90 bg-err/[0.04]' : 'border-line/60 focus:border-bronze'
    } p-3 sm:p-[13px_14px] font-sans font-light text-[15px] sm:text-base w-full focus:outline-none transition-all duration-300 backdrop-blur-sm rounded-none`

  return (
    <section id="concierge" className="py-[clamp(56px,11vw,150px)] section-divider relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-bronze/[0.03] blur-[100px]" />
      </div>

      <div ref={sectionRef} className="max-w-[1240px] mx-auto px-4 sm:px-[clamp(20px,4vw,48px)] relative">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2 reveal">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-6 sm:w-8 h-px bg-bronze" />
            <span className="text-bronze text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-sans">
              AI Automotive Concierge
            </span>
          </div>

          {/* Real-time Demo Mode indicator badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-line/60 bg-char/80 text-[10px] sm:text-[11px] font-sans tracking-[0.1em] text-mute">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAiOnline ? 'bg-emerald-400 animate-pulse' : 'bg-bronze/80'
              }`}
            />
            <span>{isAiOnline ? 'AI Engine: Live Connected' : 'Engine: Demo Mode Active'}</span>
          </div>
        </div>

        <h2 className="text-[clamp(32px,6vw,84px)] font-light leading-[1.02] tracking-[-0.02em] reveal">
          AI Build <span className="font-serif italic font-light tracking-normal bg-gradient-to-r from-bronze to-gold bg-clip-text text-transparent">Concierge.</span>
        </h2>
        <p className="text-mute max-w-[56ch] mt-4 sm:mt-[22px] text-[15px] sm:text-base reveal">
          Enter your vehicle, target budget, and desired styling direction. Receive an instant, meticulously tailored blueprint with budget allocation, engineering checklist, and build phases.
        </p>

        <div className="glass-card p-4 sm:p-6 md:p-[clamp(22px,4vw,48px)] mt-8 sm:mt-12 reveal relative overflow-hidden">
          {/* Corner decorations */}
          <div className="hidden sm:block absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t border-l border-bronze/20 pointer-events-none" />
          <div className="hidden sm:block absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b border-r border-bronze/20 pointer-events-none" />

          {!plan ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 sm:gap-[20px]">
                {/* Vehicle */}
                <div className="flex flex-col gap-1.5 sm:gap-[7px]">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor="vehicle" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Vehicle Make & Model</label>
                    {errors.vehicle && <span className="text-err text-[11px] font-sans">⚠ {errors.vehicle}</span>}
                  </div>
                  <input
                    id="vehicle"
                    name="vehicle"
                    maxLength={60}
                    placeholder="e.g. Porsche 911 GT3 or BMW M340i"
                    autoComplete="off"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className={inputClasses('vehicle')}
                    aria-invalid={!!errors.vehicle}
                  />
                </div>

                {/* Model Year */}
                <div className="flex flex-col gap-1.5 sm:gap-[7px]">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor="year" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Model Year (optional)</label>
                    {errors.year && <span className="text-err text-[11px] font-sans">⚠ {errors.year}</span>}
                  </div>
                  <input
                    id="year"
                    name="year"
                    inputMode="numeric"
                    placeholder="e.g. 2022"
                    value={formData.year}
                    onChange={handleChange}
                    className={inputClasses('year')}
                    aria-invalid={!!errors.year}
                  />
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-1.5 sm:gap-[7px]">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor="budget" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Estimated Budget</label>
                    {errors.budget && <span className="text-err text-[11px] font-sans">⚠ {errors.budget}</span>}
                  </div>
                  <input
                    id="budget"
                    name="budget"
                    inputMode="numeric"
                    placeholder="e.g. 25000"
                    value={formData.budget}
                    onChange={handleChange}
                    className={inputClasses('budget')}
                    aria-invalid={!!errors.budget}
                  />
                </div>

                {/* Currency */}
                <div className="flex flex-col gap-1.5 sm:gap-[7px]">
                  <label htmlFor="currency" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Currency</label>
                  <select id="currency" name="currency" value={formData.currency} onChange={handleChange} className={inputClasses('currency')}>
                    {currencyOptions.map((c) => (
                      <option key={c} value={c} className="bg-ink text-ivory">{c}</option>
                    ))}
                  </select>
                </div>

                {/* Style */}
                <div className="flex flex-col gap-1.5 sm:gap-[7px]">
                  <label htmlFor="style" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Aesthetic Direction</label>
                  <select id="style" name="style" value={formData.style} onChange={handleChange} className={inputClasses('style')}>
                    {styleOptions.map((s) => (
                      <option key={s} value={s} className="bg-ink text-ivory">{s}</option>
                    ))}
                  </select>
                </div>

                {/* Goal */}
                <div className="flex flex-col gap-1.5 sm:gap-[7px]">
                  <label htmlFor="goal" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Engineering Focus</label>
                  <select id="goal" name="goal" value={formData.goal} onChange={handleChange} className={inputClasses('goal')}>
                    {goalOptions.map((g) => (
                      <option key={g} value={g} className="bg-ink text-ivory">{g}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5 sm:gap-[7px] sm:col-span-2">
                  <label htmlFor="notes" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Special Directives & Preferences (optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    maxLength={400}
                    placeholder="e.g. Maintain daily-driver ride quality, satin bronze wheels, keep factory powertrain warranty…"
                    value={formData.notes}
                    onChange={handleChange}
                    className={inputClasses('notes')}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mt-5 sm:mt-7">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium w-full sm:w-auto inline-block border border-bronze bg-bronze text-ink font-medium px-6 sm:px-[34px] py-3.5 sm:py-[15px] font-sans text-[13px] sm:text-[14px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-300 hover:bg-bronze-light hover:border-bronze-light hover:text-ink hover:shadow-[0_0_30px_rgba(194,160,104,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-wait text-center"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="spinner" />
                      Synthesizing Plan...
                    </span>
                  ) : (
                    'Generate Build Blueprint'
                  )}
                </button>
                {status && <span className="text-[13px] sm:text-sm text-mute font-sans" role="status">{status}</span>}
              </div>
            </form>
          ) : (
            <PlanResult plan={plan} input={planInput} onReset={handleReset} />
          )}

          {!plan && (
            <div className="text-mute border border-dashed border-line/40 p-6 sm:p-10 text-center mt-6 sm:mt-9 bg-ink/30 backdrop-blur-sm text-[14px] sm:text-base">
              <div className="text-bronze/50 text-[36px] sm:text-[48px] font-serif italic leading-none mb-2 sm:mb-3">⬡</div>
              Your bespoke blueprint will materialize here once you submit the vehicle specifications above.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
