import { useRef, useLayoutEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { BlackHole } from "./BlackHole";
import Earth from "./Earth";
import ExoPlanet from "./ExoPlanet";
import * as THREE from "three";
import ExoPlanetType from "../types/ExoPlanetType";

type Props = {
  exoPlanets: ExoPlanetType[] | undefined;
};

function Scene({ exoPlanets }: Props) {
  const gl = useThree((state) => state.gl);
  const groupRef = useRef<THREE.Group>(null);
  const blackHoleRef = useRef<THREE.Mesh>(null);
  const earthRef = useRef<THREE.Mesh>(null);

  // Set the pixel ratio for better scaling
  useLayoutEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
  }, [gl]);

  // Memoized rendering of exoplanets based on calculated data
  const allExoPlanets = useMemo(() => {
    return exoPlanets?.map((planet, index) => {
      return (
        <ExoPlanet
          key={index}
          planet={planet}
          color={"darkred"}
          snrValue={planet.snr}
        />
      );
    });
  }, [exoPlanets]);

  return (
    <group ref={groupRef}>
      <BlackHole ref={blackHoleRef} />
      <Earth ref={earthRef} color={"blue"} />
      {allExoPlanets}
    </group>
  );
}

export default Scene;
