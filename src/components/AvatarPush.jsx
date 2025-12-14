import { useGLTF, useFBX, useAnimations } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { SkeletonUtils } from "three-stdlib"

function cleanClip(clip, root) {
  clip.tracks = clip.tracks.filter(track => {
    const bone = track.name.split(".")[0]
    return root.getObjectByName(bone)
  })
  return clip
}

export default function AvatarPush({ play }) {
  const group = useRef()

  const gltf = useGLTF("/models/avatornew.glb")
  const scene = useMemo(
    () => SkeletonUtils.clone(gltf.scene),
    [gltf.scene]
  )

  const pushFBX = useFBX("/animationsn/Push.fbx")
  const pushClip = cleanClip(pushFBX.animations[0], scene)
  pushClip.name = "push"

  const { actions } = useAnimations([pushClip], group)

  useEffect(() => {
    if (!actions?.push) return

    if (play) {
      actions.push.reset()
      actions.push.setLoop(THREE.LoopOnce, 1)
      actions.push.clampWhenFinished = true
      actions.push.fadeIn(0.25)
      actions.push.play()
    }
  }, [play, actions])

  return (
    <group ref={group} position={[0, -1.15, 0]} scale={0.95}>
      <primitive object={scene} />
    </group>
  )
}
