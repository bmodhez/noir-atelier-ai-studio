export default function CarSvg() {
  return (
    <>
      {/* Hidden SVG definitions */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="car-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a2a2c" />
            <stop offset="1" stopColor="#0d0d0e" />
          </linearGradient>
          <symbol id="car" viewBox="0 0 600 200">
            <path
              d="M18 146c0-18 22-26 62-32l92-14c28-30 78-48 146-48 70 0 120 20 150 48l72 10c30 4 44 16 44 36v12H18z"
              fill="url(#car-bg)"
              stroke="#c2a068"
              strokeOpacity=".55"
              strokeWidth="1.2"
            />
            <path
              d="M205 96c22-24 62-36 116-36 56 0 92 12 112 36z"
              fill="#050505"
              stroke="#c2a068"
              strokeOpacity=".3"
            />
            <path d="M60 128h480" stroke="#c2a068" strokeOpacity=".35" />
            <circle cx="140" cy="152" r="34" fill="#080808" stroke="#c2a068" strokeOpacity=".7" />
            <circle cx="140" cy="152" r="18" fill="none" stroke="#c2a068" strokeOpacity=".4" />
            <circle cx="472" cy="152" r="34" fill="#080808" stroke="#c2a068" strokeOpacity=".7" />
            <circle cx="472" cy="152" r="18" fill="none" stroke="#c2a068" strokeOpacity=".4" />
          </symbol>
        </defs>
      </svg>
    </>
  )
}

export function HeroCar({ style }) {
  return (
    <svg
      className="hero-car"
      viewBox="0 0 600 200"
      role="img"
      aria-label="Stylised grand tourer silhouette"
      style={style}
    >
      <defs>
        <linearGradient id="beam-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#fff3d6" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="300" cy="190" rx="290" ry="9" fill="#c2a068" opacity=".14" />
      <polygon className="beam" points="578,126 900,70 900,190" fill="url(#beam-grad)" />
      <use href="#car" />
      <g className="spoke">
        <path d="M140 136v32M124 152h32M129 141l22 22M151 141l-22 22" stroke="#c2a068" strokeOpacity=".6" />
      </g>
      <g className="spoke">
        <path d="M472 136v32M456 152h32M461 141l22 22M483 141l-22 22" stroke="#c2a068" strokeOpacity=".6" />
      </g>
    </svg>
  )
}

export function BuildCardSvg({ name, hue }) {
  return (
    <svg viewBox="0 0 600 375" role="img" aria-label={`Concept illustration of ${name}`} className="w-full h-full block transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105">
      <rect width="600" height="375" fill={`hsl(${hue}, 30%, 9%)`} />
      <ellipse cx="380" cy="300" rx="260" ry="60" fill={`hsl(${hue}, 45%, 22%)`} opacity=".5" />
      <use href="#car" x="10" y="130" width="580" height="193" />
    </svg>
  )
}
