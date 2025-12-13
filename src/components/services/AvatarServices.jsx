// components/services/AvatarServices.jsx
import { useFBX, useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function AvatarServices({ phase, onActionComplete }) {
  const group = useRef()

  const { scene } = useGLTF("/models/646d9dcdc8a5f5bddbfac913.glb")

  const idle = useFBX("/animations/Breathing Idle.fbx")
  const point = useFBX("/animations/Pointing.fbx")
  const talk = useFBX("/animations/Talking.fbx")
  const agree = useFBX("/animations/Agreeing.fbx")
  const handshake = useFBX("/animations/Shaking Hands.fbx")

  idle.animations[0].name = "idle"
  point.animations[0].name = "point"
  talk.animations[0].name = "talk"
  agree.animations[0].name = "agree"
  handshake.animations[0].name = "handshake"

  const { actions, mixer } = useAnimations(
    [
      idle.animations[0],
      point.animations[0],
      talk.animations[0],
      agree.animations[0],
      handshake.animations[0],
    ],
    group
  )

  useEffect(() => {
    if (!actions || !phase) return

    Object.values(actions).forEach(action => action.fadeOut(0.2))

    const action = actions[phase]
    if (!action) return

    action.reset()
    action.setEffectiveWeight(1)
    action.setEffectiveTimeScale(1)

    if (phase === "idle") {
      action.setLoop(THREE.LoopRepeat, Infinity)
    } else {
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
    }

    action.fadeIn(0.2)
    action.play()

    const handleFinish = () => {
      onActionComplete?.()
    }

    mixer.addEventListener("finished", handleFinish)

    return () => {
      mixer.removeEventListener("finished", handleFinish)
    }
  }, [phase, actions, mixer, onActionComplete])

  return (
    <group ref={group} position={[0, -1.5, 0]} scale={1.25}>
      <primitive object={scene} />
    </group>
  )
}
