import { forwardRef } from "react";
import { Html, Sphere } from "@react-three/drei";
import { BLACKHOLE_COLOR } from "../config/blackholeConfig";
import { Mesh } from "three";

export const BlackHole = forwardRef<Mesh>((_props, ref) => (
  <mesh ref={ref} rotation-x={0.35}>
    <Sphere args={[0.05, 20, 20]}>
      <meshStandardMaterial
        emissive={BLACKHOLE_COLOR}
        emissiveIntensity={1}
        roughness={1}
        color={BLACKHOLE_COLOR}
      />
    </Sphere>
    <Html
      position={[0, 0.05, 0]} // Position the label slightly above the sphere
      center
      distanceFactor={1}
    >
      <div className="absolute bottom-0 left-0 z-10 p-1 text-white text-[10px] text-nowrap">
        <p>Sagittarius A*</p>
      </div>
    </Html>
  </mesh>
));
