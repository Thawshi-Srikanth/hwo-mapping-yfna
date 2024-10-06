import { memo, useContext, useRef } from "react";
import ExoPlanetType from "../types/ExoPlanetType";
import * as THREE from "three";
import { convertToGalaxyCoordinates } from "../lib/convet-to-galaxy-cartesian-coordinates";
import { EARTH_POSITION, GLOBAL_PLANET_RADIUS } from "../config/planetConfig";
import { useFrame, useThree } from "@react-three/fiber";
import { CAMERA_PLANET_SCALING_FACTOR } from "../config/cameraConfig";
import ToolContext from "../context/tools/ToolContext";
import { Sphere } from "@react-three/drei";

type Props = {
  planets: ExoPlanetType[];
  colors: string[];
  snrValues: number[];
};

const ExoplanetScene = memo(({ planets, colors, snrValues }: Props) => {
  const { camera } = useThree(); // Access the camera from the context
  const toolContext = useContext(ToolContext);
  const ref = useRef<THREE.InstancedMesh>(null);
  const tempObject = new THREE.Object3D();

  useFrame(() => {
    planets.forEach((planet, i) => {
      if (ref.current) {
        const relativePosition = convertToGalaxyCoordinates(
          planet.ra,
          planet.dec,
          planet.sy_dist,
          EARTH_POSITION
        );

        const distance = camera.position.distanceTo(
          new THREE.Vector3(
            relativePosition.x,
            relativePosition.y,
            relativePosition.z
          )
        );

        const scale = distance / CAMERA_PLANET_SCALING_FACTOR;
        tempObject.scale.set(scale, scale, scale);
        tempObject.position.set(
          relativePosition.x,
          relativePosition.y,
          relativePosition.z
        );
        tempObject.updateMatrix();
        ref.current.setMatrixAt(i, tempObject.matrix);
      }
    });

    if (ref.current) {
      ref.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, planets.length]} // set the instance count
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "default";
      }}
    >
      <sphereGeometry args={[GLOBAL_PLANET_RADIUS, 10, 10]} />
      {planets.map((planet, i) => (
        <meshStandardMaterial
          key={i}
          emissive={colors[i] || "red"}
          emissiveIntensity={1}
          roughness={0.1}
          color={colors[i] || "red"}
        />
      ))}
    </instancedMesh>
  );
});

export default ExoplanetScene;
