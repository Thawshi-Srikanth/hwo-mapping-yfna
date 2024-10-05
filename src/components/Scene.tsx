import { useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { BlackHole } from "./BlackHole";
import Earth from "./Earth";

import * as THREE from "three";

type Props = {};

function Scene({}: Props) {
  const gl = useThree((state) => state.gl);
  const groupRef = useRef<THREE.Group>(null);
  const blackHoleRef = useRef<THREE.Mesh>(null);
  const earthRef = useRef<THREE.Mesh>(null);

  // Set the pixel ratio for better scaling
  useLayoutEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
  }, [gl]);

  // Use Web Workers to filter and process planets

  return (
    <group ref={groupRef}>
      <BlackHole ref={blackHoleRef} />
      <Earth ref={earthRef} color={"blue"} />
    </group>
  );
}

export default Scene;
