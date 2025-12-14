import { useGLTF, useFBX, useAnimations } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { SkeletonUtils } from "three-stdlib"

/* Remove invalid tracks (same as Hero avatar) */
function cleanClip(clip, root) {
  clip.tracks = clip.tracks.filter(track => {
    const boneName = track.name.split(".")[0]
    return root.getObjectByName(boneName)
  })
  return clip
}

export default function AvatarPull({ paused }) {
  const group = useRef()

  /* ------------------------------
     LOAD + CLONE AVATAR (CRITICAL)
  ------------------------------ */
  const gltf = useGLTF("/models/avatornew.glb")

  const scene = useMemo(() => {
    return SkeletonUtils.clone(gltf.scene)
  }, [gltf.scene])

  /* ------------------------------
     LOAD ANIMATION
  ------------------------------ */
  const pull = useFBX("/animationsn/Pulling A Rope.fbx")

  const pullClip = cleanClip(pull.animations[0], scene)
  pullClip.name = "pull"

  const { actions } = useAnimations([pullClip], group)

  /* ------------------------------
     PLAY ANIMATION
  ------------------------------ */
  useEffect(() => {
    if (!actions?.pull) return

    const action = actions.pull
    action.reset()
    action.setLoop(THREE.LoopRepeat, Infinity)
    action.clampWhenFinished = false
    action.play()

    return () => action.stop()
  }, [actions])

  /* ------------------------------
     PAUSE / RESUME
  ------------------------------ */
  useEffect(() => {
    if (actions?.pull) {
      actions.pull.paused = paused
    }
  }, [paused, actions])

  return (
    <group
      ref={group}
      position={[0, -1.1, 0]}
      scale={0.95}
    >
      <primitive object={scene} />
    </group>
  )
}
