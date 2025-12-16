import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Avatar from "./Avatar"

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT TEXT */}
        <div className="hero-left">
          <span className="pill show">Welcome to Our Studio</span>

          <h1 className="show">
            We Build <br />
            <span>Digital Experiences</span>
          </h1>

          <p className="show">
            High-performance websites, applications & growth solutions
            crafted for modern businesses.
          </p>

          <div className="hero-buttons show">
  <a href="#contact" className="btn-primary">
    Start a Project
  </a>

  <a href="#projects" className="btn-secondary">
    View Work
  </a>
</div>

        </div>

        {/* RIGHT AVATAR */}
        <div className="hero-right">
          <Canvas camera={{ position: [0, 1.5, 4], fov: 35 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Suspense fallback={null}>
              <Avatar />
            </Suspense>
          </Canvas>
        </div>

      </div>
    </section>
  )
}
