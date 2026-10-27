import { WEIGHT_MAP, ALLOC_CATEGORIES } from '../data/constants'

/**
 * Format money with Intl
 */
export function formatMoney(amount, currency) {
  try {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${Math.round(amount)}`
  }
}

/**
 * Allocate budget across categories
 */
export function allocateBudget(percentages, budget) {
  const amounts = percentages.map((p) => Math.round((budget * p) / 100))
  amounts[amounts.length - 1] += budget - amounts.reduce((a, b) => a + b, 0)
  return amounts
}

/**
 * Generate demo (offline) plan
 */
export function generateDemoPlan(input) {
  const weights = WEIGHT_MAP[input.goal] || [25, 20, 20, 15, 10, 10]
  const style = input.style || 'OEM+'
  const vehicle = input.vehicle || 'Bespoke Commission'
  const yearStr = input.year ? ` (${input.year})` : ''

  // Bespoke concept naming based on goal and style
  const conceptTitles = {
    'OEM+': {
      Appearance: 'Purist Stance & Factory Contour',
      Comfort: 'Discrete Executive Cabin & NVH Dampening',
      Handling: 'Factory GT Dynamics & Dialled Fitment',
      Performance: 'Subtle Power & OEM Big Brake Integration',
    },
    'Luxury': {
      Appearance: 'Satin Noir & Polished Bronze Accents',
      Comfort: 'Open-Pore Wood & Tailored Leather Haven',
      Handling: 'Air-Ride Leveling & Compliant Stance',
      Performance: 'Smooth High-Output Grand Tourer Tune',
    },
    'Track-inspired': {
      Appearance: 'Aerodynamic Splitters & Carbon Winglets',
      Comfort: 'Lightweight Fixed-Back Seating & Harness Bar',
      Handling: 'Corner-Balanced Coilover & Uniball Articulation',
      Performance: 'Cooling-Led Ducts & Track-Spec Brake System',
    },
    'Street': {
      Appearance: 'Aggressive Arch Fitment & Matte Shadow Trim',
      Comfort: 'Audio Upgrade & Dynamic Sound Insulation',
      Handling: 'Lowered Centre of Gravity & Stiffened Swaybars',
      Performance: 'Free-Flow Valved Exhaust & Throttle Map',
    },
    'Grand Touring': {
      Appearance: 'Long-Distance Aero Line & Forged Touring Wheels',
      Comfort: 'Acoustic Laminated Damping & Ergonomic Seats',
      Handling: 'Adaptive Damper Calibration & High-Speed Stability',
      Performance: 'Broad Torque Powerband & High-Speed Cooling',
    },
  }

  const concept = conceptTitles[style]?.[input.goal] || `${style} Atelier Edition`

  // Style-specific checklist items
  const styleChecklists = {
    'OEM+': [
      { item: `Comprehensive health check & diagnostic baseline on ${vehicle}${yearStr}`, complexity: 'Low' },
      { item: 'Precision hub-centric forged wheels matching factory offset guidelines', complexity: 'Medium' },
      { item: 'OEM GT-spec suspension bushes and subtle ride-height recalibration', complexity: 'Medium' },
      { item: 'De-chromed matte or bronze badge & window surround trim refinement', complexity: 'Low' },
      { item: 'Subtle intake resonator delete & discreet high-flow panel filter', complexity: 'Low' },
      { item: 'Multi-stage paint correction and 5-year ceramic quartz protection', complexity: 'Low' },
    ],
    'Track-inspired': [
      { item: `Structural inspection & baseline corner weights measurement for ${vehicle}`, complexity: 'Medium' },
      { item: 'Monoblock forged lightweight wheels with track-focused semi-slick tyres', complexity: 'Medium' },
      { item: '2-way adjustable coilovers with independent bump & rebound valving', complexity: 'High' },
      { item: 'Braided stainless brake lines, high-temp fluid and 2-piece floating discs', complexity: 'Medium' },
      { item: 'Functional carbon fibre front splitter & rear diffuser optimization', complexity: 'High' },
      { item: 'Transmission & differential supplementary cooling kit integration', complexity: 'High' },
    ],
    'Luxury': [
      { item: `Acoustic survey & full cabin strip for multi-layer vibration dampening`, complexity: 'Medium' },
      { item: 'Bespoke forged multi-spoke wheels with floating self-leveling centre caps', complexity: 'Medium' },
      { item: 'Hand-stitched semi-aniline leather or Alcantara re-trim on touchpoints', complexity: 'High' },
      { item: 'Tailored deep-pile lambswool mats and bespoke ambient lighting accents', complexity: 'Low' },
      { item: 'Precision ceramic window tinting with 99% infrared thermal rejection', complexity: 'Low' },
      { item: 'Self-healing Paint Protection Film (PPF) applied across entire front clip', complexity: 'Medium' },
    ],
    'Street': [
      { item: `Arch clearance & damper travel laser-scan verification on ${vehicle}`, complexity: 'Low' },
      { item: 'Staggered concave forged wheels set flush with outer fender lip', complexity: 'Medium' },
      { item: 'Adjustable sport springs or digital air suspension with height memory', complexity: 'High' },
      { item: 'Valved stainless cat-back exhaust with bespoke satin bronze tips', complexity: 'Medium' },
      { item: 'Custom front chin spoiler, side skirt extensions and roof spoiler', complexity: 'Medium' },
      { item: 'Graphene coating application for ultra-hydrophobic wet-look gloss', complexity: 'Low' },
    ],
    'Grand Touring': [
      { item: `High-speed aerodynamic balance and chassis alignment audit on ${vehicle}`, complexity: 'Low' },
      { item: 'Lightweight flow-formed touring wheels with high-load rated tyres', complexity: 'Medium' },
      { item: 'Comfort-valved active dampers with adaptive highway cruise compliance', complexity: 'High' },
      { item: 'Extended range acoustic insulation across bulkhead, arches and boot floor', complexity: 'Medium' },
      { item: 'High-output auxiliary lighting and ceramic-treated aerodynamic glass', complexity: 'Low' },
      { item: 'Full ceramic exterior & interior leather protection treatment', complexity: 'Low' },
    ],
  }

  const checklist = styleChecklists[style] || [
    { item: `Inspect and verify factory tolerances for ${vehicle}`, complexity: 'Low' },
    { item: 'Wheel and tyre package matched to arch and brake clearance', complexity: 'Medium' },
    { item: 'Suspension and chassis tuning from an accredited atelier partner', complexity: 'High' },
    { item: 'Exterior trim and finish refinements in the specified aesthetic', complexity: 'Medium' },
    { item: 'Full protective coating and comprehensive road testing sign-off', complexity: 'Low' },
  ]

  return {
    mode: 'demo',
    concept: `${concept} — ${vehicle}`,
    summary: `A bespoke ${style.toLowerCase()} blueprint calibrated for your ${vehicle}${yearStr}, prioritising ${input.goal.toLowerCase()}. Every modification is orchestrated for restraint, balance, and mechanical integrity.${input.notes ? ` Custom brief incorporated: "${input.notes}".` : ''}`,
    categories: ALLOC_CATEGORIES.slice(0, 5),
    checklist,
    allocation: ALLOC_CATEGORIES.map((cat, i) => ({
      category: cat,
      percent: weights[i],
    })),
    complexity: input.goal === 'Performance' || input.goal === 'Handling' || style === 'Track-inspired' ? 'High' : 'Medium',
    checks: [
      `Exact wheel offset & backspacing clearance against ${vehicle} suspension struts and calipers`,
      `Verification that electronic stability (ESC) and ADAS sensors remain within calibrated threshold`,
      'Local roadworthiness compliance, noise decibel limits, and insurance underwriter notification',
      'Availability and lead-time confirmation for genuine specification hardware',
    ],
    phases: [
      { name: 'Phase 1: Baseline Audit', work: `Complete diagnostic evaluation, dyno/geometry baseline, and component orders for ${vehicle}` },
      { name: 'Phase 2: Stance & Dynamics', work: 'Suspension fitting, wheel offset verification, brake system integration, and laser alignment' },
      { name: 'Phase 3: Surface & Cabin', work: 'Exterior styling refinements, interior upholstery touchpoints, and acoustic treatment' },
      { name: 'Phase 4: Detailing & Delivery', work: 'Multi-stage paint correction, ceramic/PPF application, road test calibration and handover dossier' },
    ],
    safety: 'All modifications must preserve primary road safety and adhere to vehicle inspection standards in your jurisdiction. Notify your motor insurer before driving on public roads.',
  }
}

/**
 * Normalize AI response percentages to sum to 100
 */
export function normalizePlan(plan, input) {
  const total = plan.allocation.reduce((a, x) => a + (+x.percent || 0), 0) || 1
  plan.allocation = plan.allocation.map((x) => ({
    category: String(x.category),
    percent: ((+x.percent || 0) * 100) / total,
  }))
  plan.amounts = allocateBudget(
    plan.allocation.map((x) => x.percent),
    input.budget
  )
  return plan
}

/**
 * Convert plan to plain text for copying
 */
export function planToText(plan, input) {
  return [
    `NOIR ATELIER build plan (${plan.mode === 'live' ? 'live AI' : 'demo output'}) — ${plan.concept}`,
    `${input.vehicle}${input.year ? ' ' + input.year : ''} · ${input.style} · ${input.goal} · ${input.budget} ${input.currency}`,
    '',
    plan.summary,
    '',
    'Checklist:',
    ...plan.checklist.map((c, i) => `${i + 1}. ${c.item} (${c.complexity})`),
    '',
    'Budget estimate:',
    ...plan.allocation.map((x, i) => `- ${x.category}: ${formatMoney(plan.amounts[i], input.currency)}`),
    '',
    'Verify with a professional:',
    ...plan.checks.map((x) => '- ' + x),
    '',
    'Phases:',
    ...plan.phases.map((x) => `${x.name}: ${x.work}`),
    '',
    'Safety: ' + plan.safety,
    'Estimates only. Not a quote.',
  ].join('\n')
}
