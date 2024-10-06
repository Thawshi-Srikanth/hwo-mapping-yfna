/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useRef, useState, useEffect } from "react";
import ExoPlanetType from "../types/ExoPlanetType";
import * as THREE from "three";
import { convertToGalaxyCoordinates } from "../lib/convet-to-galaxy-cartesian-coordinates";
import { EARTH_POSITION, GLOBAL_PLANET_RADIUS } from "../config/planetConfig";
import { useFrame, useThree } from "@react-three/fiber";
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

  // Create arrays for colors and intensities
  const emissiveColors = planets.map((planet, i) => {
    if (planet.isHabitable) {
      return new THREE.Color(0, 0, 1); // Blue color for habitable planets
    } else {
      return new THREE.Color(colors[i] || "red"); // Default color
    }
  });

  const emissiveIntensities = planets.map((planet) =>
    planet.isHabitable ? 2 : 1
  );

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
        ref.current.setMatrixAt(i, tempObject.matrix);
      }
    });

    if (ref.current) {
      ref.current.instanceMatrix.needsUpdate = true;
    }
  });

  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    const instanceId = e.instanceId;
    if (instanceId !== undefined) {
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = "default";
  };

  const handlePointerClick = (e: any) => {
    e.stopPropagation();
    const instanceId = e.instanceId;
    if (instanceId !== undefined) {
      setClickedInstanceId(instanceId);
      console.log("Clicked planet:", planets[instanceId]);
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

        {/* Custom ShaderMaterial for dynamic emissive color and intensity */}
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
