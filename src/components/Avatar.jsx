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

export default function Avatar() {
  const group = useRef()

  const gltf = useGLTF("/models/avatornew.glb")
  const scene = useMemo(
    () => SkeletonUtils.clone(gltf.scene),
    [gltf.scene]
  )

  const idleFBX = useFBX("/animationsn/Talking.fbx")
  const idleClip = useMemo(() => {
    const clip = idleFBX.animations[0]
    clip.name = "idle"
    return cleanClip(clip, scene)
  }, [idleFBX, scene])

  const { actions } = useAnimations([idleClip], group)

  useEffect(() => {
    if (!actions?.idle) return
    actions.idle.reset()
    actions.idle.setLoop(THREE.LoopRepeat, Infinity)
    actions.idle.fadeIn(0.5)
    actions.idle.play()
  }, [actions])

  return (
    <group ref={group} position={[0, -1.5, 0]} scale={1.25}>
      <primitive object={scene} />
    </group>
  )
}
