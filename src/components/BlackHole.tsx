import { forwardRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export const BlackHole = forwardRef<Mesh>((_props, ref) => {
  const { scene } = useGLTF("/elements/blackhole.glb");

  useFrame(() => {
    if (!ref) return;

    if ("current" in ref && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={ref} scale={[0.05, 0.05, 0.05]}>
      <primitive object={scene} />
      <Html
        position={[0, 0.05, 0]} // Position the label slightly above the model
        center
        distanceFactor={1}
      >
        <div className="absolute bottom-0 left-0 z-10 p-1 text-white text-[10px] text-nowrap">
          <p>Sagittarius A*</p>
        </div>
      </Html>
    </mesh>
  );
});

// Don't forget to add this line to handle GLTF files
useGLTF.preload("/elements/blackhole.gl");
