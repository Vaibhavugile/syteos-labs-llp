import { useGLTF, useFBX, useAnimations } from "@react-three/drei"
import React, { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { SkeletonUtils } from "three-stdlib"

/* ----------------------------------
   Remove animation tracks that
   don't exist on the avatar
---------------------------------- */
function cleanClip(clip, root) {
  clip.tracks = clip.tracks.filter(track => {
    const boneName = track.name.split(".")[0]
    return root.getObjectByName(boneName)
  })
  return clip
}

const Avatar = React.memo(({ phase }) => {
  const group = useRef()

  /* ----------------------------------
     LOAD & CLONE AVATAR (CRITICAL)
  ---------------------------------- */
  const gltf = useGLTF("/models/avatornew.glb")

  const scene = useMemo(() => {
    return SkeletonUtils.clone(gltf.scene)
  }, [gltf.scene])

  /* ----------------------------------
     LOAD ANIMATIONS
  ---------------------------------- */
  const waveFBX = useFBX("/animationsn/Waving new.fbx")
  const pointFBX = useFBX("/animationsn/Pointing.fbx")
  const idleFBX = useFBX("/animationsn/Breathing Idle.fbx")

  const waveClip = cleanClip(waveFBX.animations[0], scene)
  const pointClip = cleanClip(pointFBX.animations[0], scene)
  const idleClip = cleanClip(idleFBX.animations[0], scene)

  waveClip.name = "wave"
  pointClip.name = "point"
  idleClip.name = "idle"

  const { actions } = useAnimations(
    [waveClip, pointClip, idleClip],
    group
  )

  /* ----------------------------------
     PREMIUM SMOOTH BLENDING LOGIC
  ---------------------------------- */
  useEffect(() => {
    if (!actions || !actions[phase]) return

    const next = actions[phase]

    // Find currently running animation
    const current = Object.values(actions).find(
      action => action.isRunning() && action !== next
    )

    next.enabled = true
    next.setEffectiveTimeScale(1)
    next.setEffectiveWeight(1)

    // Loop rules
    if (phase === "idle" || phase === "point") {
      next.setLoop(THREE.LoopRepeat, Infinity)
    } else {
      next.setLoop(THREE.LoopOnce, 1)
    }

    // Keep last pose when finished
    next.clampWhenFinished = true

    if (current) {
      // 🔥 TRUE CROSSFADE (NO SNAP)
      next.reset()
      next.crossFadeFrom(current, 0.6, true)
      next.play()
    } else {
      // First animation
      next.reset().fadeIn(0.6).play()
    }

  }, [phase, actions])

  return (
    <group
      ref={group}
      position={[0, -1.5, 0]}
      scale={1.25}
    >
      <primitive object={scene} />
    </group>
  )
})

export default Avatar
