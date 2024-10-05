import { PLANETARY_SYSTEM_DISTANCE_SCALING_FACTOR } from "../config/galaxyConfig";

export function convertToGalaxyCoordinates(
  ra: number,
  dec: number,
  dist: number,
  solarSystemPos: { x: number; y: number; z: number }
) {
  const raRadians = ra * (Math.PI / 180) + 4.78;
  const decRadians = dec * (Math.PI / 180) + 0.52;

  dist *= PLANETARY_SYSTEM_DISTANCE_SCALING_FACTOR;
  const x =
    dist * Math.cos(decRadians) * Math.cos(raRadians) + solarSystemPos.x;
  const y =
    dist * Math.cos(decRadians) * Math.sin(raRadians) + solarSystemPos.y;
  const z = dist * Math.sin(decRadians) + solarSystemPos.z;

  return { x, y, z };
}
