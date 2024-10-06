import { memo, useRef, useState, useEffect, useMemo } from "react";
import ExoPlanetType from "../types/ExoPlanetType";
import * as THREE from "three";
import { convertToGalaxyCoordinates } from "../lib/convet-to-galaxy-cartesian-coordinates";
import { EARTH_POSITION, GLOBAL_PLANET_RADIUS } from "../config/planetConfig";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { CAMERA_PLANET_SCALING_FACTOR } from "../config/cameraConfig";
import ExoPlanetTag from "./ExoPlanetTag";
import vertexShader from "./shaders/vertexShader.glsl";
import fragmentShader from "./shaders/fragmentShader.glsl";

type Props = {
  planets: ExoPlanetType[];
  colors: string[];
  snrValues: number[];
};

const ExoplanetScene = memo(({ planets, colors, snrValues }: Props) => {
  const { camera } = useThree();
  const ref = useRef<THREE.InstancedMesh>(null);
  const tempObject = new THREE.Object3D();
  const [clickedInstanceId, setClickedInstanceId] = useState<number | null>(
    null
  );
  const [clickedPosition, setClickedPosition] = useState<THREE.Vector3 | null>(
    null
  );

  // Memoize emissive colors and intensities
  const { emissiveColors, emissiveIntensities } = useMemo(() => {
    const colorsArray = planets.map((planet, i) =>
      planet.isHabitable
        ? new THREE.Color(0, 0, 1)
        : new THREE.Color(colors[i] || "red")
    );
    const intensitiesArray = planets.map((planet) =>
      planet.isHabitable ? 2 : 1
    );
    return {
      emissiveColors: colorsArray,
      emissiveIntensities: intensitiesArray,
    };
  }, [planets, colors]);

  useEffect(() => {
    if (ref.current) {
      const emissiveColorArray = new Float32Array(planets.length * 3);
      const emissiveIntensityArray = new Float32Array(planets.length);

      planets.forEach((_planet, i) => {
        emissiveColorArray.set(emissiveColors[i].toArray(), i * 3);
        emissiveIntensityArray[i] = emissiveIntensities[i];
      });

      ref.current.geometry.setAttribute(
        "emissiveColor",
        new THREE.InstancedBufferAttribute(emissiveColorArray, 3)
      );
      ref.current.geometry.setAttribute(
        "emissiveIntensity",
        new THREE.InstancedBufferAttribute(emissiveIntensityArray, 1)
      );
    }
  }, [planets, emissiveColors, emissiveIntensities]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (ref.current) {
      planets.forEach((planet, i) => {
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

        let scale = distance / CAMERA_PLANET_SCALING_FACTOR;

        // Pulse effect for habitable planets
        if (planet.isHabitable) {
          const pulse = 1.5 + Math.sin(time * 4) * 0.5; // Pulse using sine wave
          scale *= pulse; // Scale habitable planets dynamically
        }

        tempObject.scale.set(scale, scale, scale);
        tempObject.position.set(
          relativePosition.x,
          relativePosition.y,
          relativePosition.z
        );
        tempObject.updateMatrix();
        if (ref.current) {
          ref.current.setMatrixAt(i, tempObject.matrix);
        }
      });

      ref.current.instanceMatrix.needsUpdate = true;
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "default";
  };

  const handlePointerClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const instanceId = e.instanceId;
    if (instanceId !== undefined) {
      setClickedInstanceId(instanceId);
      const planet = planets[instanceId];
      const relativePosition = convertToGalaxyCoordinates(
        planet.ra,
        planet.dec,
        planet.sy_dist,
        EARTH_POSITION
      );
      setClickedPosition(
        new THREE.Vector3(
          relativePosition.x,
          relativePosition.y,
          relativePosition.z
        )
      );
    }
  };

  return (
    <>
      <instancedMesh
        ref={ref}
        args={[undefined, undefined, planets.length]} // set the instance count
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handlePointerClick}
      >
        <sphereGeometry args={[GLOBAL_PLANET_RADIUS, 10, 10]} />

        <shaderMaterial
          attach="material"
          vertexShader={vertexShader} // Add custom vertex shader
          fragmentShader={fragmentShader} // Add custom fragment shader
        ></shaderMaterial>
      </instancedMesh>

      {planets.map(
        (planet, i) =>
          clickedInstanceId === i && (
            <ExoPlanetTag
              key={i}
              planet={planet}
              snr={snrValues[i]}
              position={clickedPosition}
              onClick={() => {
                setClickedInstanceId(null);
              }}
            />
          )
      )}
    </>
  );
});

export default ExoplanetScene;
