import { memo, useRef, forwardRef } from "react";
import * as THREE from "three";
import { Sphere, Html } from "@react-three/drei";
import { EARTH_POSITION, EARTH_RADIUS } from "../config/planetConfig";
import { useFrame, useThree } from "@react-three/fiber";
import { CAMERA_PLANET_SCALING_FACTOR } from "../config/cameraConfig";

type Props = {
  color: string;
};

const Earth = memo(
  forwardRef<THREE.Mesh, Props>(({ color }, ref) => {
    const localRef = useRef<THREE.Mesh>(null);
    const { camera } = useThree(); // Access the camera from the context
    const vectorPosition = new THREE.Vector3(
      EARTH_POSITION.x,
      EARTH_POSITION.y,
      EARTH_POSITION.z
    );

    useFrame(() => {
      const mesh =
        (ref as React.RefObject<THREE.Mesh>).current || localRef.current;
      if (mesh) {
        // Calculate distance from the camera
        const distance = camera.position.distanceTo(mesh.position);

        // Scale inversely proportional to distance
        // You might want to adjust this formula
        const scale = distance / CAMERA_PLANET_SCALING_FACTOR;

        // Apply the scale factor
        mesh.scale.set(scale, scale, scale);
      }
    });

    return (
      <mesh ref={ref || localRef} position={vectorPosition}>
        <Sphere args={[EARTH_RADIUS, 10, 10]}>
          <meshStandardMaterial
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.5}
            color={color}
          />
        </Sphere>
        <Html
          position={[0, EARTH_RADIUS, 0]} // Position the label slightly above the sphere
          center
        >
          <div className="absolute bottom-0 left-0 z-10 p-1 text-white text-[10px] text-nowrap">
            <p>Earth</p>
          </div>
        </Html>
      </mesh>
    );
  })
);

export default Earth;
