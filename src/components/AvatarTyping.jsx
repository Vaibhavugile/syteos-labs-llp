// eslint-disable-next-line react-refresh/only-export-components
import { useGLTF, useFBX, useAnimations } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { SkeletonUtils } from "three-stdlib"

/* ---------------------------------------
   REMOVE INVALID ANIMATION TRACKS
--------------------------------------- */
function cleanClip(clip, root) {
  clip.tracks = clip.tracks.filter(track => {
    const boneName = track.name.split(".")[0]
    return root.getObjectByName(boneName)
  })
  return clip
}

export default function AvatarTyping({ paused = false }) {
  const group = useRef()
  const [ready, setReady] = useState(false)

  /* ---------------------------------------
     ONE-FRAME DELAY (CRITICAL FIX)
     Allows WebGL + skeleton to fully init
  --------------------------------------- */
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  /* ---------------------------------------
     LOAD AVATAR (CLONED)
  --------------------------------------- */
  const avatarGLB = useGLTF("/models/avatornew.glb")
  const avatar = useMemo(
    () => SkeletonUtils.clone(avatarGLB.scene),
    [avatarGLB.scene]
  )

  /* ---------------------------------------
     LOAD + CLONE SETUP
  --------------------------------------- */
  const setupGLB = useGLTF("/models/typing_setup.glb")
  const setup = useMemo(
    () => SkeletonUtils.clone(setupGLB.scene),
    [setupGLB.scene]
  )

  /* ---------------------------------------
     LOAD ANIMATION
  --------------------------------------- */
  const typingFBX = useFBX("/animationsn/Typing.fbx")

  const typingClip = useMemo(() => {
    if (!typingFBX.animations?.length || !avatar) return null
    const clip = typingFBX.animations[0].clone()
    clip.name = "typing"
    return cleanClip(clip, avatar)
  }, [typingFBX.animations, avatar])

  const { actions } = useAnimations(
    typingClip ? [typingClip] : [],
    group
  )

  /* ---------------------------------------
     PLAY ANIMATION (HMR SAFE)
  --------------------------------------- */
  useEffect(() => {
    if (!actions?.typing) return

    const action = actions.typing
    action.reset()
    action.setLoop(THREE.LoopRepeat, Infinity)
    action.clampWhenFinished = false
    action.enabled = true
    action.time = 0
    action.paused = false
    action.play()

    return () => {
      if (action && action.isRunning()) {
        action.stop()
      }
    }
  }, [actions])

  /* ---------------------------------------
     PAUSE / RESUME
  --------------------------------------- */
  useEffect(() => {
    if (actions?.typing) {
      actions.typing.paused = paused
    }
  }, [paused, actions])

  /* ---------------------------------------
     GUARD AGAINST HALF LOAD
  --------------------------------------- */
  if (!ready || !avatar || !setup || !typingClip) return null

  return (
    <group
      ref={group}
      position={[-0.6, -1.05, 0]}
      scale={1.4}
    >
      {/* SETUP */}
      <primitive
        object={setup}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* AVATAR */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <primitive object={avatar} />
      </group>
    </group>
  )
}

/* ---------------------------------------
   PRELOAD (REQUIRED)
--------------------------------------- */
useGLTF.preload("/models/avatornew.glb")
useGLTF.preload("/models/typing_setup.glb")
useFBX.preload("/animationsn/Typing.fbx")
