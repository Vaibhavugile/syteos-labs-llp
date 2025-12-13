// components/services/ServiceStage.jsx
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function ServiceStage() {
  const group = useRef()

  useEffect(() => {
    gsap.fromTo(
      group.current.position,
      { y: -1.5, scale: 0.6 },
      {
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    )
  }, [])

  return (
    <group ref={group}>
      {/* Placeholder geometry (replace later per service) */}
      <mesh>
        <boxGeometry args={[1.6, 1, 0.2]} />
        <meshStandardMaterial color="#6c5ce7" emissive="#6c5ce7" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}
