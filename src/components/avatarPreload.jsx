import { useGLTF, useFBX } from "@react-three/drei"

/* AVATAR */
useGLTF.preload("/models/avatornew.glb")
useGLTF.preload("/models/typing_setup.glb")

/* ANIMATIONS */
useFBX.preload("/animationsn/Waving new.fbx")
useFBX.preload("/animationsn/Pointing.fbx")
useFBX.preload("/animationsn/Talking.fbx")
useFBX.preload("/animationsn/Talking On A Cell Phone.fbx")
useFBX.preload("/animationsn/Pulling A Rope.fbx")
useFBX.preload("/animationsn/Typing.fbx")
