// components/services/Services.jsx

import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import AvatarServices from "./AvatarServices"
import ServiceStage from "./ServiceStage"
import ServiceCard from "./ServiceCard"
import "./services.css"

const SERVICES = [
  { id: "web", title: "Web Development", phase: "point" },
  { id: "app", title: "App Development", phase: "talk" },
  { id: "uiux", title: "UI / UX Design", phase: "talk" },
  { id: "marketing", title: "Digital Marketing", phase: "agree" },
  { id: "cta", title: "Let’s Work Together", phase: "handshake" },
]

export default function Services() {
  const servicesRef = useRef(null)
  const [showCanvas, setShowCanvas] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const [settled, setSettled] = useState([])

  const activeService = SERVICES[activeIndex]

  /* ----------------------------------
     CANVAS VISIBILITY CONTROL
  ---------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCanvas(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (servicesRef.current) observer.observe(servicesRef.current)

    return () => observer.disconnect()
  }, [])

  /* ----------------------------------
     SERVICE PROGRESSION
  ---------------------------------- */
  const handleAvatarDone = () => {
    setSettled(prev => [...prev, activeService])

    setActiveIndex(i =>
      i < SERVICES.length - 1 ? i + 1 : i
    )
  }

  return (
    <section className="services-section" ref={servicesRef}>
      {/* LEFT — SETTLED SERVICES */}
      <div className="services-left">
        {settled.map((service, index) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            index={index}
          />
        ))}
      </div>

      {/* RIGHT — ACTIVE CANVAS */}
      <div className="services-right">
        {showCanvas && (
          <Canvas camera={{ position: [0, 1.5, 4], fov: 35 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />

            <Suspense fallback={null}>
              <AvatarServices
                phase={activeService.phase}
                onActionComplete={handleAvatarDone}
              />

              {/* Center animated service */}
              <ServiceStage key={activeService.id} />
            </Suspense>
          </Canvas>
        )}
      </div>
    </section>
  )
}
