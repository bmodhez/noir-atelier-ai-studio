import { formatMoney } from '../utils/planUtils'

export default function PlanResult({ plan, input, onReset }) {
  const handleCopy = async () => {
    const { planToText } = await import('../utils/planUtils')
    const text = planToText(plan, input)
    try { await navigator.clipboard.writeText(text); alert('Plan copied!') }
    catch {
      const ta = document.createElement('textarea'); ta.value = text
      document.body.appendChild(ta); ta.select()
      try { document.execCommand('copy'); alert('Copied!') } catch { alert('Copy failed.') }
      ta.remove()
    }
  }

  const SectionHeading = ({ children }) => (
    <h4 className="font-sans font-normal text-[12px] sm:text-[13px] tracking-[0.14em] text-bronze mt-6 sm:mt-8 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
      <span className="w-4 sm:w-6 h-px bg-bronze shrink-0" />
      {children}
    </h4>
  )

  return (
    <div className="animate-[fadeIn_0.6s_ease-out_both]" aria-live="polite">
      {/* Engine Status Banner — Clear Demo Mode vs Live AI labeling */}
      <div className="mb-4 sm:mb-6">
        {plan.mode === 'live' ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-bronze bg-bronze/10 text-bronze text-[11px] sm:text-[12px] tracking-[0.14em] uppercase font-sans shadow-[0_0_15px_rgba(194,160,104,0.15)]">
            <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
            <span>● LIVE AI-GENERATED BLUEPRINT</span>
          </div>
        ) : (
          <div className="border border-bronze/40 bg-char/90 p-3 sm:p-4 text-[12px] sm:text-[13px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-bronze-light font-medium tracking-[0.08em] uppercase">
              <span className="w-2 h-2 rounded-full bg-bronze/80" />
              <span>⚡ DEMO MODE — CURATED OFFLINE BLUEPRINT</span>
            </div>
            <span className="text-mute/80 text-[11px] sm:text-[12px] tracking-normal">
              Real AI API is not connected. Generated using atelier baseline heuristics.
            </span>
          </div>
        )}
      </div>

      {/* Concept */}
      <h3 className="font-serif italic font-light text-[clamp(28px,5vw,64px)] leading-[1.05] mt-3 sm:mt-4 mb-2 tracking-normal bg-gradient-to-r from-ivory to-bronze bg-clip-text text-transparent">
        {plan.concept}
      </h3>
      <p className="text-mute max-w-[56ch] leading-relaxed text-[14px] sm:text-base">{plan.summary}</p>

      {/* Meta info — stacked on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-mute text-[12px] sm:text-sm mt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-bronze/50" />
          Complexity: {plan.complexity}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-bronze/50" />
          Currency: {input.currency}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-bronze/50" />
          Estimates only
        </span>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-line to-transparent my-6 sm:my-8" />

      {/* Categories */}
      <SectionHeading>MODIFICATION CATEGORIES</SectionHeading>
      <ul className="m-0 pl-4 sm:pl-5 text-mute space-y-1.5 sm:space-y-2 text-[14px] sm:text-base">
        {(plan.categories || []).map((cat, i) => (
          <li key={i} className="animate-[fadeIn_0.4s_ease-out_both]" style={{ animationDelay: `${i * 80}ms` }}>{cat}</li>
        ))}
      </ul>

      {/* Checklist */}
      <SectionHeading>PRIORITISED CHECKLIST</SectionHeading>
      <ol className="m-0 pl-4 sm:pl-5 text-mute space-y-2 sm:space-y-3 text-[14px] sm:text-base">
        {plan.checklist.map((item, i) => (
          <li key={i} className="animate-[fadeIn_0.4s_ease-out_both]" style={{ animationDelay: `${i * 100}ms` }}>
            <span className="text-ivory font-normal">{item.item}</span>
            <span className={`ml-1 sm:ml-2 text-[10px] sm:text-[11px] tracking-[0.08em] px-1.5 sm:px-2 py-0.5 border inline-block mt-1 sm:mt-0 ${
              item.complexity === 'High' ? 'border-err/40 text-err/80' :
              item.complexity === 'Medium' ? 'border-bronze/40 text-bronze/80' :
              'border-mute/40 text-mute/80'
            }`}>
              {item.complexity}
            </span>
          </li>
        ))}
      </ol>

      {/* Budget allocation — responsive grid */}
      <SectionHeading>BUDGET ALLOCATION (ESTIMATE)</SectionHeading>
      <div className="grid gap-3 sm:gap-3">
        {plan.allocation.map((alloc, i) => (
          <div key={i} className="animate-[fadeIn_0.4s_ease-out_both]" style={{ animationDelay: `${i * 100}ms` }}>
            {/* Mobile: stacked layout */}
            <div className="flex justify-between items-baseline text-[13px] sm:text-sm mb-1">
              <span className="text-ivory/80 truncate pr-2">{alloc.category}</span>
              <span className="text-mute whitespace-nowrap text-[12px] sm:text-sm">
                {formatMoney(plan.amounts[i], input.currency)} ({Math.round(alloc.percent)}%)
              </span>
            </div>
            <div className="relative h-[4px] sm:h-[6px] bg-line/30 rounded-full overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-bronze to-gold rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(2, alloc.percent)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Checks */}
      <SectionHeading>VERIFY WITH A PROFESSIONAL</SectionHeading>
      <ul className="m-0 pl-0 text-mute space-y-2 text-[14px] sm:text-base">
        {(plan.checks || []).map((check, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-bronze mt-1 sm:mt-1.5 text-[8px] shrink-0">◆</span>
            <span>{check}</span>
          </li>
        ))}
      </ul>

      {/* Phases */}
      <SectionHeading>PHASED PLAN</SectionHeading>
      <div className="space-y-3 sm:space-y-4 pl-3 sm:pl-4 border-l border-line/50">
        {(plan.phases || []).map((phase, i) => (
          <div key={i} className="relative pl-4 sm:pl-5 animate-[fadeIn_0.4s_ease-out_both]" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-bronze" />
            <span className="text-ivory font-normal text-[14px] sm:text-base">{phase.name}</span>
            <p className="m-0 text-mute text-[13px] sm:text-sm mt-0.5 sm:mt-1">{phase.work}</p>
          </div>
        ))}
      </div>

      {/* Safety */}
      <div className="border-l-2 border-bronze/50 pl-3 sm:pl-[18px] py-2 sm:py-3 text-mute text-[13px] sm:text-[15px] mt-6 sm:mt-8 bg-ink/30 p-3 sm:p-4">
        <span className="text-bronze text-[10px] sm:text-[11px] tracking-[0.12em] block mb-1 sm:mb-2">⚠ SAFETY & LEGAL</span>
        {plan.safety} Figures are estimates, not quotes.
      </div>

      {/* Actions — stack on mobile */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mt-6 sm:mt-8">
        <button type="button" className="btn-premium inline-block border border-bronze bg-bronze text-ink font-medium px-5 sm:px-[30px] py-3 sm:py-[15px] font-sans text-[13px] sm:text-[14px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-300 hover:bg-bronze-light hover:border-bronze-light hover:text-ink hover:shadow-[0_0_30px_rgba(194,160,104,0.45)] hover:-translate-y-0.5 active:translate-y-0 text-center" onClick={handleCopy}>
          Copy plan
        </button>
        <button type="button" className="btn-premium inline-block border border-bronze bg-transparent text-ivory font-medium px-5 sm:px-[30px] py-3 sm:py-[15px] font-sans text-[13px] sm:text-[14px] tracking-[0.14em] uppercase cursor-pointer transition-all duration-300 hover:bg-bronze hover:text-ink hover:shadow-[0_0_25px_rgba(194,160,104,0.35)] hover:-translate-y-0.5 active:translate-y-0 text-center" onClick={onReset}>
          Start another build
        </button>
      </div>
    </div>
  )
}
