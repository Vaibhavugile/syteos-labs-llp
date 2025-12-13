import { useGLTF, useFBX, useAnimations } from "@react-three/drei"
import React, { useEffect, useRef } from "react"
import * as THREE from "three"

// Wrap the component in React.memo to prevent re-rendering when parent state changes 
// (e.g., text states) that don't affect the 'phase' prop.
const Avatar = React.memo(({ phase }) => {
  const group = useRef()

  const { scene } = useGLTF("/models/646d9dcdc8a5f5bddbfac913.glb")

  const bow = useFBX("/animations/Quick Informal Bow.fbx")
  const point = useFBX("/animations/Pointing.fbx") 
  const idle = useFBX("/animations/Happy Idle.fbx")

  bow.animations[0].name = "bow"
  point.animations[0].name = "point"
  idle.animations[0].name = "idle"

  const { actions } = useAnimations(
    [bow.animations[0], point.animations[0], idle.animations[0]],
    group
  )

  useEffect(() => {
    if (!actions) return

    // CRITICAL: Stop the *previous* action and start the *new* one. 
    // We use a small fade to smooth the transition and prevent visual jumps.
    
    // Find the previous action and fade it out
    const previousPhase = Object.keys(actions).find(name => actions[name].weight > 0);
    if (previousPhase && actions[previousPhase]) {
        actions[previousPhase].fadeOut(0.2);
    }
    
    const action = actions[phase]
    if (!action) return

    action.reset()
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(1)

    // Set 'idle' and 'point' to loop
    if (phase === "idle" || phase === "point") {
      action.setLoop(THREE.LoopRepeat, Infinity)
    } else {
      action.setLoop(THREE.LoopOnce, 1)
    }

    action.clampWhenFinished = false
    action.fadeIn(0.2); // Fade in the new action
    action.play()

  }, [phase, actions]) // Only run when phase or actions array changes

  return (
    <group ref={group} position={[0, -1.5, 0]} scale={1.25}>
      <primitive object={scene} />
    </group>
  )
})

export default Avatar;