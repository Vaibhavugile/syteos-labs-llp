import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import AvatarTyping from "../AvatarTyping"
import "./services.css"

/* Simple inline SVG icons */
const ICONS = {
  web: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  app: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M4 12l6-6 10 10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  marketing: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M4 14l6-6 10 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11-2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
}

const SERVICES = [
  { id: 0, title: "Web Development", desc: "High-performance websites built for scale.", icon: ICONS.web },
  { id: 1, title: "App Development", desc: "Modern mobile & web apps with smooth UX.", icon: ICONS.app },
  { id: 2, title: "UI / UX Design", desc: "User-focused design that converts.", icon: ICONS.design },
  { id: 3, title: "SEO Optimization", desc: "Rank higher and reach the right audience.", icon: ICONS.seo },
  { id: 4, title: "Digital Marketing", desc: "Data-driven growth strategies.", icon: ICONS.marketing },
  { id: 5, title: "Cloud Solutions", desc: "Secure, scalable cloud infrastructure.", icon: ICONS.cloud },
]

export default function Services() {
  const [active, setActive] = useState(1)

  const left = SERVICES.slice(0, 3)
  const right = SERVICES.slice(3, 6)

  return (
    <section className="services" id="services">
      <h2 className="services-title">Our Services</h2>

      <div className="services-container">
        <div className="services-layout">

          {/* LEFT */}
          <div className="side-stack align-right">
            {left.map(s => (
              <button
                key={s.id}
                className={`side-panel ${active === s.id ? "active" : ""}`}
                onClick={() => setActive(s.id)}
              >
                <span className="icon">{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* CENTER */}
          <div className="center-area">
            <div className="avatar-wrap">
            <Canvas camera={{ position: [0, 1.35, 3.6], fov: 35 }}>

                <ambientLight intensity={0.9} />

                <directionalLight
                  position={[5, 6, 5]}
                  intensity={1.2}
                />

                <directionalLight
                  position={[-4, 3, 2]}
                  intensity={0.4}
                />

                <directionalLight
                  position={[0, 5, -6]}
                  intensity={0.3}
                />

                <Suspense fallback={null}>
                  <AvatarTyping />
                </Suspense>
              </Canvas>
            </div>

            <div key={active} className="active-card">
              <div className="icon">{SERVICES[active].icon}</div>
              <h3>{SERVICES[active].title}</h3>
              <p>{SERVICES[active].desc}</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="side-stack align-left">
            {right.map(s => (
              <button
                key={s.id}
                className={`side-panel ${active === s.id ? "active" : ""}`}
                onClick={() => setActive(s.id)}
              >
                <span className="icon">{s.icon}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
