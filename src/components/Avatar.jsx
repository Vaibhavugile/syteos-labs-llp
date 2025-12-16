import { useGLTF, useFBX, useAnimations } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import { SkeletonUtils } from "three-stdlib"
import * as THREE from "three"

function cleanClip(clip, root) {
  clip.tracks = clip.tracks.filter(track =>
    root.getObjectByName(track.name.split(".")[0])
  )
  return clip
}

export default function Avatar({ onReady }) {
  const group = useRef()
  const readyRef = useRef(false)

  const gltf = useGLTF("/models/avatornew.glb")
  const scene = useMemo(
    () => SkeletonUtils.clone(gltf.scene),
    [gltf.scene]
  )

  const idleFBX = useFBX("/animationsn/Breathing Idle.fbx")
  const idleClip = useMemo(() => {
    if (!idleFBX.animations.length) return null
    const clip = idleFBX.animations[0].clone()
    clip.name = "idle"
    return cleanClip(clip, scene)
  }, [idleFBX.animations, scene])

  const { actions } = useAnimations(
    idleClip ? [idleClip] : [],
    group
  )

  useEffect(() => {
    if (!actions?.idle || readyRef.current) return

    const action = actions.idle
    action.reset()
    action.setLoop(THREE.LoopRepeat, Infinity)
    action.fadeIn(0.4)
    action.play()

    // ✅ MARK READY IMMEDIATELY (NO RAF)
    readyRef.current = true
    onReady?.()

    return () => {
      if (action.isRunning()) action.stop()
    }
  }, [actions, onReady])

  if (!idleClip) return null

  return (
    <group ref={group} position={[0, -1.5, 0]} scale={1.25}>
      <primitive object={scene} />
    </group>
  )
}

/* PRELOAD */
useGLTF.preload("/models/avatornew.glb")
useFBX.preload("/animationsn/Talking.fbx")
