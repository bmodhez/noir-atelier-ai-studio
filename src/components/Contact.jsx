import { useState, useRef } from 'react'
import useReveal from '../hooks/useReveal'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', vehicle: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [refId, setRefId] = useState('')
  const ref = useRef(null)
  useReveal(ref)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (formData.vehicle.trim().length < 2) {
      newErrors.vehicle = 'Please enter your vehicle make & model (e.g. Porsche 911, BMW M3).'
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Please describe your project (minimum 10 characters).'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      setRefId(`NA-${Math.floor(100000 + Math.random() * 900000)}`)
      setSubmitted(true)
    }
  }

  const handleCopy = async () => {
    const text = `NOIR ATELIER COMMISSION INQUIRY [Ref: ${refId}]\nName: ${formData.name}\nEmail: ${formData.email}\nVehicle: ${formData.vehicle}\nProject Brief: ${formData.message}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      alert('Copy failed.')
    }
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', vehicle: '', message: '' })
    setErrors({})
    setSubmitted(false)
    setCopied(false)
  }

  const inputClasses = (name) =>
    `bg-ink/80 text-ivory border ${
      errors[name] ? 'border-err/90 bg-err/[0.04]' : 'border-line/60 focus:border-bronze'
    } p-3 sm:p-[13px_14px] font-sans font-light text-[15px] sm:text-base w-full focus:outline-none transition-all duration-300 backdrop-blur-sm rounded-none`

  return (
    <section id="contact" className="py-[clamp(56px,11vw,150px)] section-divider relative">
      <div ref={ref} className="max-w-[1240px] mx-auto px-4 sm:px-[clamp(20px,4vw,48px)] grid md:grid-cols-2 grid-cols-1 gap-8 sm:gap-[clamp(32px,7vw,110px)]">
        <div className="reveal">
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="w-6 sm:w-8 h-px bg-bronze" />
            <span className="text-bronze text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">Get in Touch</span>
          </div>
          <h2 className="text-[clamp(32px,6vw,84px)] font-light leading-[1.02] tracking-[-0.02em]">
            Start a <span className="font-serif italic font-light tracking-normal bg-gradient-to-r from-bronze to-gold bg-clip-text text-transparent">project.</span>
          </h2>
          <p className="text-mute max-w-[56ch] mt-4 sm:mt-[22px] leading-relaxed text-[15px] sm:text-base">
            Tell us about the vehicle and the intended transformation. Every commission begins with a detailed styling and mechanical consultation.
          </p>
          <div className="mt-8 hidden md:flex items-center gap-4">
            <div className="w-2 h-2 border border-bronze/40 rotate-45" />
            <div className="w-2 h-2 border border-bronze/25 rotate-45" />
            <div className="w-2 h-2 border border-bronze/15 rotate-45" />
          </div>
        </div>

        {submitted ? (
          /* Luxury Success Message Card */
          <div className="reveal glass-card p-6 sm:p-9 border border-bronze/50 bg-char/90 animate-[fadeIn_0.5s_ease-out_both] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-bronze/60 bg-bronze/10 text-bronze text-[11px] sm:text-[12px] tracking-[0.14em] uppercase font-sans mb-4 sm:mb-6 shadow-[0_0_20px_rgba(194,160,104,0.15)]">
                <span className="w-2 h-2 rounded-full bg-bronze animate-ping" />
                <span>✓ Inquiry Registered · Studio Notified</span>
              </div>

              <h3 className="font-serif italic font-light text-[28px] sm:text-[36px] text-ivory mb-2">
                Thank you, {formData.name}.
              </h3>
              <p className="text-mute text-[14px] sm:text-[15px] leading-relaxed mb-6">
                Your commission inquiry for the <span className="text-ivory font-normal">{formData.vehicle}</span> has been logged. Our design director will review your build brief and reach out via <span className="text-ivory font-normal">{formData.email}</span> within 24 hours.
              </p>

              {/* Inquiry Summary Dossier */}
              <div className="bg-ink/70 border border-line/60 p-4 sm:p-5 text-[13px] sm:text-sm space-y-2.5 mb-6">
                <div className="flex justify-between items-center border-b border-line/30 pb-2">
                  <span className="text-mute text-[11px] uppercase tracking-[0.1em]">Reference Dossier</span>
                  <span className="text-bronze font-mono font-medium">{refId}</span>
                </div>
                <div className="flex justify-between items-center text-mute">
                  <span>Vehicle</span>
                  <span className="text-ivory font-medium">{formData.vehicle}</span>
                </div>
                <div className="flex justify-between items-center text-mute">
                  <span>Contact</span>
                  <span className="text-ivory">{formData.email}</span>
                </div>
                <div className="text-mute pt-1">
                  <span className="block text-[11px] uppercase tracking-[0.08em] mb-1">Project Brief</span>
                  <p className="text-ivory/90 italic m-0 text-[13px] bg-char/50 p-2.5 border border-line/40">
                    "{formData.message}"
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                className="btn-premium flex-1 border border-bronze bg-bronze text-ink font-medium px-5 py-3.5 font-sans text-[13px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-300 hover:bg-bronze-light hover:border-bronze-light hover:text-ink hover:shadow-[0_0_30px_rgba(194,160,104,0.45)] text-center"
                onClick={handleCopy}
              >
                {copied ? '✓ Dossier Copied' : 'Copy Inquiry Dossier'}
              </button>
              <button
                type="button"
                className="btn-premium flex-1 border border-line hover:border-bronze bg-transparent text-ivory font-medium px-5 py-3.5 font-sans text-[13px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-300 hover:bg-bronze hover:text-ink text-center"
                onClick={handleReset}
              >
                Send Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Contact Form with Validation */
          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-4 sm:gap-[20px] reveal glass-card p-5 sm:p-8">
            <div className="flex flex-col gap-1.5 sm:gap-[7px]">
              <div className="flex justify-between items-baseline">
                <label htmlFor="contact-name" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Your Name</label>
                {errors.name && <span className="text-err text-[11px] tracking-normal font-sans">⚠ {errors.name}</span>}
              </div>
              <input
                id="contact-name"
                name="name"
                placeholder="e.g. Jonathan Vance"
                maxLength={80}
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses('name')}
                aria-invalid={!!errors.name}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-[7px]">
              <div className="flex justify-between items-baseline">
                <label htmlFor="contact-email" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Email Address</label>
                {errors.email && <span className="text-err text-[11px] tracking-normal font-sans">⚠ {errors.email}</span>}
              </div>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="e.g. client@domain.com"
                maxLength={120}
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses('email')}
                aria-invalid={!!errors.email}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-[7px]">
              <div className="flex justify-between items-baseline">
                <label htmlFor="contact-vehicle" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Vehicle Make & Model</label>
                {errors.vehicle && <span className="text-err text-[11px] tracking-normal font-sans">⚠ {errors.vehicle}</span>}
              </div>
              <input
                id="contact-vehicle"
                name="vehicle"
                placeholder="e.g. 2023 Porsche 911 GT3 Touring"
                maxLength={80}
                value={formData.vehicle}
                onChange={handleChange}
                className={inputClasses('vehicle')}
                aria-invalid={!!errors.vehicle}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-[7px]">
              <div className="flex justify-between items-baseline">
                <label htmlFor="contact-message" className="text-[12px] sm:text-[13px] tracking-[0.06em] text-mute">Project Details</label>
                {errors.message && <span className="text-err text-[11px] tracking-normal font-sans">⚠ {errors.message}</span>}
              </div>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                maxLength={800}
                placeholder="Describe your vision, aesthetic goals, planned timeline, or performance priorities…"
                value={formData.message}
                onChange={handleChange}
                className={inputClasses('message')}
                aria-invalid={!!errors.message}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-premium w-full sm:w-auto inline-block border border-bronze bg-bronze text-ink font-medium px-6 sm:px-[34px] py-3.5 sm:py-[15px] font-sans text-[13px] sm:text-[14px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-300 hover:bg-bronze-light hover:border-bronze-light hover:text-ink hover:shadow-[0_0_30px_rgba(194,160,104,0.45)] hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                Send Atelier Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
