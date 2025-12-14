import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState, useRef } from "react"
import Avatar from "./Avatar"

export default function Hero() {
  const [phase, setPhase] = useState("wave")

  // Text reveal states
  const [showPill, setShowPill] = useState(false)
  const [showHeadline, setShowHeadline] = useState(false)
  const [showBody, setShowBody] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  // Canvas visibility control
  const heroRef = useRef(null)
  const [showCanvas, setShowCanvas] = useState(true)

  /* ----------------------------------
     HERO TIMELINE (FIXED)
  ---------------------------------- */
  useEffect(() => {
    const waveDuration = 3800 // 👈 ensures wave is clearly visible
    const initialTextDelay = 500
    const staggerInterval = 350

    const waveTimer = setTimeout(() => {
      setPhase("point")
    }, waveDuration)

    const pillTimer = setTimeout(() => {
      setShowPill(true)
    }, waveDuration + initialTextDelay)

    const headlineTimer = setTimeout(() => {
      setShowHeadline(true)
    }, waveDuration + initialTextDelay + staggerInterval)

    const bodyTimer = setTimeout(() => {
      setShowBody(true)
    }, waveDuration + initialTextDelay + staggerInterval * 2)

    const buttonsTimer = setTimeout(() => {
      setShowButtons(true)
    }, waveDuration + initialTextDelay + staggerInterval * 3)

    const idleTimer = setTimeout(() => {
      setPhase("idle")
    }, waveDuration + 3500)

    return () => {
      clearTimeout(waveTimer)
      clearTimeout(pillTimer)
      clearTimeout(headlineTimer)
      clearTimeout(bodyTimer)
      clearTimeout(buttonsTimer)
      clearTimeout(idleTimer)
    }
  }, [])

  /* ----------------------------------
     CANVAS UNMOUNT WHEN HERO LEAVES
  ---------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCanvas(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-container">
        {/* TEXT */}
        <div className="hero-left">
          <span className={`pill ${showPill ? "show" : ""}`}>
            Welcome to Our Studio
          </span>

          <h1 className={showHeadline ? "show" : ""}>
            We Build <br />
            <span>Digital Experiences</span>
          </h1>

          <p className={showBody ? "show" : ""}>
            High-performance websites, applications & growth solutions
            crafted for modern businesses.
          </p>

          <div className={`hero-buttons ${showButtons ? "show" : ""}`}>
            <button className="btn-primary">Start a Project</button>
            <button className="btn-secondary">View Work</button>
          </div>
        </div>

        {/* 3D */}
        <div className="hero-right">
          {showCanvas && (
            <Canvas camera={{ position: [0, 1.5, 4], fov: 35 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <Suspense fallback={null}>
                <Avatar phase={phase} />
              </Suspense>
            </Canvas>
          )}
        </div>
      </div>
    </section>
  )
}
