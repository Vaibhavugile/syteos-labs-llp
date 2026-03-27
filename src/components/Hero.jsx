import { useEffect, useRef, useState } from "react"
import {
  LayoutDashboard,
  Globe,
  AppWindow,
  Smartphone,
  Cloud,
  CheckCircle2
} from "lucide-react"

/* ----------------------------------
   SERVICES DATA
---------------------------------- */

const services = [
  {
    name: "Web Development",
    subtitle: "Enterprise SaaS & web platforms",
    icon: Globe,
    image: "/services/webd.webp",
    features: [
      "Scalable SaaS architecture",
      "High-performance APIs",
      "SEO optimized",
    ],
    stats: [
      { label: "Projects", value: "12 Platforms" },
      { label: "Deployments", value: "148 Deployments" },
      { label: "Uptime", value: "99.98%" },
    ],
  },
  {
    name: "Application Development",
    subtitle: "Custom business software",
    icon: AppWindow,
    image: "/services/appd.webp",
    features: [
      "CRM & ERP systems",
      "Automation dashboards",
      "AI integrations",
    ],
    stats: [
      { label: "Products", value: "8" },
      { label: "Releases", value: "92" },
      { label: "Status", value: "Stable" },
    ],
  },
  {
    name: "iOS Development",
    subtitle: "App Store ready apps",
    icon: Smartphone,
    image: "/services/iosd.webp",
    features: [
      "Swift native apps",
      "App Store deployment",
      "Performance optimized",
    ],
    stats: [
      { label: "Apps", value: "5" },
      { label: "Builds", value: "24" },
      { label: "Rating", value: "4.8★" },
    ],
  },
  {
    name: "Cloud Systems",
    subtitle: "Infra & DevOps automation",
    icon: Cloud,
    image: "/services/cloudd.webp",
    features: [
      "Auto-scaling servers",
      "CI/CD pipelines",
      "Zero-downtime deploys",
    ],
    stats: [
      { label: "Servers", value: "32" },
      { label: "Deploys", value: "410" },
      { label: "Security", value: "Secure" },
    ],
  },
]

export default function Hero() {
  const heroRef = useRef(null)
  const frameRef = useRef(null)

  const [index, setIndex] = useState(0)
  const [flipping, setFlipping] = useState(false)

  /* ------------------------------
     TYPING EFFECT STATE
  ------------------------------ */

  const fullText = "SaaS Products"
  const [typedText, setTypedText] = useState("")
  const [cursor, setCursor] = useState(true)

  /* Typing animation */

  useEffect(() => {
    let i = 0

    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(typing)
    }, 90)

    return () => clearInterval(typing)
  }, [])

  /* Cursor blink */

  useEffect(() => {
    const blink = setInterval(() => {
      setCursor(prev => !prev)
    }, 500)

    return () => clearInterval(blink)
  }, [])

  const service = services[index]
  const Icon = service.icon

  /* ------------------------------
     REVEAL
  ------------------------------ */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heroRef.current.classList.add("reveal")
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  /* ------------------------------
     SWITCH SERVICE
  ------------------------------ */

  const switchService = (newIndex) => {
    if (newIndex === index) return

    setFlipping(true)

    setTimeout(() => {
      setIndex(newIndex)
      setTimeout(() => setFlipping(false), 1800)
    }, 700)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (index + 1) % services.length
      switchService(next)
    }, 7500)

    return () => clearInterval(interval)
  }, [index])

  /* ------------------------------
     3D TILT
  ------------------------------ */

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const onMove = (e) => {
      const rect = frame.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const rotateX = (y / rect.height - 0.5) * -5
      const rotateY = (x / rect.width - 0.5) * 6

      frame.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
      `
    }

    const reset = () => {
      frame.style.transform =
        "perspective(1200px) rotateX(3deg) rotateY(-6deg)"
    }

    frame.addEventListener("mousemove", onMove)
    frame.addEventListener("mouseleave", reset)

    return () => {
      frame.removeEventListener("mousemove", onMove)
      frame.removeEventListener("mouseleave", reset)
    }
  }, [])

  /* ------------------------------
     UI
  ------------------------------ */

  return (
    <section className="hero-v3" ref={heroRef}>
      <div className="grid-lines" />

      <div className="hero-inner">

        {/* LEFT SIDE ANIMATED */}
        <div className="hero-text">

          <h1 className="headline">
            Building Scalable <br />

            <span className="typing">
              {typedText}
              <b className={cursor ? "cursor" : "cursor hidden"}>|</b>
            </span>
          </h1>

          <p className="hero-sub">
            We engineer web platforms, mobile apps,
            and cloud systems used by modern businesses.
          </p>

          <div className="hero-actions hero-buttons">
            <a className="btn-main">Start Project</a>
            <a className="btn-ghost">View Work</a>
          </div>
        </div>

        {/* RIGHT SIDE (UNCHANGED) */}
        <div className="hero-visual">
          <div className="floating-frame" ref={frameRef}>

            <div className={`flip-card ${flipping ? "flipped" : ""}`}>
              <div className="flip-inner">

                <div className="flip-front">

                  <div className="dashboard">

                    <div className="dash-top">
                      <LayoutDashboard size={18} />
                      SYTEOS Labs LLP
                    </div>

                    <div className="dash-body">

                      <div className="sidebar">
                        {services.map((s, i) => {
                          const SIcon = s.icon
                          return (
                            <span
                              key={s.name}
                              className={index === i ? "active" : ""}
                              onClick={() => switchService(i)}
                            >
                              <SIcon size={16} />
                              {s.name}
                            </span>
                          )
                        })}
                      </div>

                      <div className="service-panel">

                        <div className="service-header">
                          <Icon size={22} />
                          <div>
                            <h3>{service.name}</h3>
                            <p>{service.subtitle}</p>
                          </div>
                        </div>

                        <div className="feature-list">
                          {service.features.map((f, i) => (
                            <div key={i} className="feature">
                              <CheckCircle2 size={15} />
                              {f}
                            </div>
                          ))}
                        </div>

                        <div className="metric-strip">
                          {service.stats.map((stat, i) => (
                            <div className="metric-item" key={i}>
                              <span>{stat.label}</span>
                              <strong>{stat.value}</strong>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                <div className="flip-back">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="service-image"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}