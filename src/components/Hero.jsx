import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Avatar from "./Avatar"

export default function Hero() {
  const heroRef = useRef(null)
  const [avatarReady, setAvatarReady] = useState(false)

  /* ---------------------------------------
     TEXT ENTRANCE (SCROLL INTO VIEW)
  --------------------------------------- */
  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate")
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* ---------------------------------------
     AVATAR FAIL-SAFE (CRITICAL)
     Ensures avatar ALWAYS shows even if
     onReady is delayed by heavy WebGL work
  --------------------------------------- */
  useEffect(() => {
    if (avatarReady) return

    const fallback = setTimeout(() => {
      setAvatarReady(true)
    }, 1500) // 1.5s safety net (dev + slow CPUs)

    return () => clearTimeout(fallback)
  }, [avatarReady])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-container">

        {/* ================= LEFT TEXT ================= */}
        <div className="hero-left">
          <span className="pill">Welcome to Syteos Labs LLP</span>

          <h1>
            We Build <br />
            <span>Digital Experiences</span>
          </h1>

          <p>
            High-performance websites, applications & growth solutions
            crafted for modern businesses.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              Start a Project
            </a>
            <a href="#projects" className="btn-secondary">
              View Work
            </a>
          </div>
        </div>

        {/* ================= RIGHT AVATAR ================= */}
        <div className={`hero-right ${avatarReady ? "show" : ""}`}>
          <Canvas
            camera={{ position: [0, 1.5, 4], fov: 35 }}
            frameloop="always"
            dpr={1}
            gl={{ powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />

            <Suspense fallback={null}>
              <Avatar onReady={() => setAvatarReady(true)} />
            </Suspense>
          </Canvas>
        </div>

      </div>
    </section>
  )
}
