import { useGLTF, useFBX, useAnimations } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { SkeletonUtils } from "three-stdlib"

/* Remove invalid animation tracks */
function cleanClip(clip, root) {
  clip.tracks = clip.tracks.filter(track => {
    const boneName = track.name.split(".")[0]
    return root.getObjectByName(boneName)
  })
  return clip
}

export default function AvatarTyping({ paused = false }) {
  const group = useRef()

  /* AVATAR */
  const avatarGLB = useGLTF("/models/avatornew.glb")
  const avatar = useMemo(
    () => SkeletonUtils.clone(avatarGLB.scene),
    [avatarGLB.scene]
  )

  /* SETUP */
  const setupGLB = useGLTF("/models/typing_setup.glb")

  /* ANIMATION */
  const typingFBX = useFBX("/animationsn/Typing.fbx")
  const typingClip = useMemo(() => {
    const clip = typingFBX.animations[0]
    clip.name = "typing"
    return cleanClip(clip, avatar)
  }, [typingFBX.animations, avatar])

  const { actions } = useAnimations([typingClip], group)

  useEffect(() => {
    if (!actions?.typing) return
    actions.typing.reset()
    actions.typing.setLoop(THREE.LoopRepeat, Infinity)
    actions.typing.play()
    return () => actions.typing.stop()
  }, [actions])

  useEffect(() => {
    if (actions?.typing) actions.typing.paused = paused
  }, [paused, actions])

  return (
    <group
      ref={group}
      position={[-0.6, -1.05, 0]}   // ✅ LEFT + CENTERED
      scale={1.4}
    >
      {/* SETUP → LEFT */}
      <primitive
        object={setupGLB.scene}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* AVATAR → CORRECT */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <primitive object={avatar} />
      </group>
    </group>
  )
}

useGLTF.preload("/models/avatornew.glb")
useGLTF.preload("/models/typing_setup.glb")
