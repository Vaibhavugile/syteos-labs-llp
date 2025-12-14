import { useGLTF, useFBX, useAnimations } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import { SkeletonUtils } from "three-stdlib"
import { LoopRepeat } from "three"

function cleanClip(clip, root) {
  clip.tracks = clip.tracks.filter(track => {
    const bone = track.name.split(".")[0]
    return root.getObjectByName(bone)
  })
  return clip
}

export default function AvatarCall() {
  const group = useRef()

  const gltf = useGLTF("/models/avatornew.glb")

  const scene = useMemo(
    () => SkeletonUtils.clone(gltf.scene),
    [gltf.scene]
  )

  const callFBX = useFBX("/animationsn/Talking On A Cell Phone.fbx")
  const callClip = cleanClip(callFBX.animations[0], scene)
  callClip.name = "call"

  const { actions } = useAnimations([callClip], group)

  useEffect(() => {
    if (!actions?.call) return

    const action = actions.call
    action.reset()
    action.setLoop(LoopRepeat, Infinity)
    action.fadeIn(0.4)
    action.play()

    return () => action.fadeOut(0.3)
  }, [actions])

  return (
    <group
      ref={group}
      position={[0, -1.0, 0]}
      scale={1.02}
    >
      <primitive object={scene} />
    </group>
  )
}

/* PRELOAD (SAFE) */
useGLTF.preload("/models/avatornew.glb")
useFBX.preload("/animationsn/Talking On A Cell Phone.fbx")
