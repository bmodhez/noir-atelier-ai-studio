// ─── Build Data ───
export const builds = [
  {
    id: 1,
    name: 'Meridian Coupé',
    category: 'Grand Touring',
    vehicle: 'Concept · long-wheelbase GT coupé',
    description: 'Slate bronze paint, quiet cabin, 20-inch forged wheels set flush.',
    hue: 34,
  },
  {
    id: 2,
    name: 'Apex Ledger',
    category: 'Track-inspired',
    vehicle: 'Concept · lightweight sports saloon',
    description: 'Fixed-back seats, cooling-led aero and a stiffer, flatter stance.',
    hue: 12,
  },
  {
    id: 3,
    name: 'Velvet Hour',
    category: 'Luxury',
    vehicle: 'Concept · flagship executive saloon',
    description: 'Open-pore wood, lambswool floors and a mirror-deep ceramic finish.',
    hue: 42,
  },
  {
    id: 4,
    name: 'Kestrel OEM+',
    category: 'OEM+',
    vehicle: 'Concept · compact performance hatch',
    description: 'Factory-correct upgrades only: brakes, tyres and discreet trim.',
    hue: 25,
  },
  {
    id: 5,
    name: 'Backstreet Nine',
    category: 'Street',
    vehicle: 'Concept · rear-drive coupé',
    description: 'Low, wide and matte, with a clean lip line and bespoke wheels.',
    hue: 5,
  },
]

export const categories = ['All', ...new Set(builds.map((b) => b.category))]

// ─── Expertise Data ───
export const expertiseItems = [
  {
    title: 'Exterior styling',
    description: 'Aero, lip lines, finishes and trim delete, kept in proportion to the original design.',
  },
  {
    title: 'Interior refinement',
    description: 'Hand-stitched trim, tactile controls and acoustic care for a calmer cabin.',
  },
  {
    title: 'Wheels and fitment',
    description: 'Offset, width and tyre choices matched to arch, brake and suspension geometry.',
  },
  {
    title: 'Detailing',
    description: 'Paint correction, ceramic coatings and protection planned around the build.',
  },
  {
    title: 'Performance upgrades',
    description: 'Chassis, brakes and tuning chosen for balance, with road legality in mind.',
  },
]

// ─── Concierge Config ───
export const WEIGHT_MAP = {
  Appearance: [28, 24, 16, 16, 6, 10],
  Comfort: [10, 10, 38, 16, 16, 10],
  Handling: [8, 18, 6, 6, 52, 10],
  Performance: [8, 14, 4, 6, 58, 10],
}

export const ALLOC_CATEGORIES = [
  'Exterior styling',
  'Wheels and fitment',
  'Interior refinement',
  'Detailing and protection',
  'Chassis and performance',
  'Contingency reserve',
]

export const styleOptions = ['OEM+', 'Luxury', 'Track-inspired', 'Street', 'Grand Touring']
export const goalOptions = ['Appearance', 'Comfort', 'Handling', 'Performance']
export const currencyOptions = ['GBP', 'USD', 'EUR', 'INR', 'AED']

// ─── Nav Links ───
export const navLinks = [
  { href: '#expertise', label: 'Expertise' },
  { href: '#approach', label: 'Our Approach' },
  { href: '#builds', label: 'Selected Builds' },
  { href: '#concierge', label: 'AI Build Concierge' },
  { href: '#contact', label: 'Contact' },
]
