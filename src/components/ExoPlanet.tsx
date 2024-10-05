import { memo, useRef, useState } from "react";
import ExoPlanetType from "../types/ExoPlanetType";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";
import { convertToGalaxyCoordinates } from "../lib/convet-to-galaxy-cartesian-coordinates";
import { EARTH_POSITION, GLOBAL_PLANET_RADIUS } from "../config/planetConfig";
import { useFrame, useThree } from "@react-three/fiber";
import { CAMERA_PLANET_SCALING_FACTOR } from "../config/cameraConfig";

type Props = {
  planet: ExoPlanetType;
  color: string;
  snrValue: number;
};

const ExoPlanet = memo(({ planet, color = "red" }: Props) => {
  const [isPlanetTagVisible, setIsPlanetTagVisible] = useState<boolean>(false);
  const { camera } = useThree(); // Access the camera from the context

  const relativePosition = convertToGalaxyCoordinates(
    planet.ra,
    planet.dec,
    planet.sy_dist,
    EARTH_POSITION
  );
  const ref = useRef<THREE.Mesh>(null);

  const vectorPosition = new THREE.Vector3(
    relativePosition.x,
    relativePosition.y,
    relativePosition.z
  );

  useFrame(() => {
    if (ref.current) {
      // Calculate distance from the camera
      const distance = camera.position.distanceTo(ref.current.position);
      // Scale inversely proportional to distance
      // You might want to adjust this formula
      const scale = distance / CAMERA_PLANET_SCALING_FACTOR;
      // Apply the scale factor
      ref.current.scale.set(scale, scale, scale);
    }
  });

  const planetOnClick = () => {
    setIsPlanetTagVisible(!isPlanetTagVisible);
  };

  // Change cursor on hover
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  return (
    <mesh
      ref={ref}
      position={vectorPosition}
      onClick={planetOnClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Sphere args={[GLOBAL_PLANET_RADIUS, 10, 10]}>
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={1}
          roughness={0.1}
          color={color}
        />
      </Sphere>
    </mesh>
  );
});

export default ExoPlanet;
