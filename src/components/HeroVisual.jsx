export default function HeroVisual() {
  return (
    <svg
      className="hero-svg"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* GLOW BACKGROUND */}
      <defs>
        <radialGradient id="glow1" cx="0" cy="0" r="1">
          <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="glow2" cx="0" cy="0" r="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* PURPLE GLOW */}
      <circle
        cx="260"
        cy="240"
        r="180"
        fill="url(#glow1)"
      />

      {/* BLUE GLOW */}
      <circle
        cx="360"
        cy="320"
        r="160"
        fill="url(#glow2)"
      />

      {/* TECH RINGS */}
      <circle
        cx="300"
        cy="300"
        r="140"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />
      <circle
        cx="300"
        cy="300"
        r="200"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
    </svg>
  )
}
