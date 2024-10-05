import { PLANETARY_SYSTEM_DISTANCE_SCALING_FACTOR } from "../config/galaxyConfig";

// Function to convert RA, Dec, and distance into Cartesian coordinates
export const convertToCartesian = (
  ra: number,
  dec: number,
  distance: number
) => {
  // Ensure valid input
  if (isNaN(ra) || isNaN(dec) || isNaN(distance)) {
    ra = 0;
    dec = 0;
    distance = 0;
  }
  // Convert RA from hours to radians
  const raRad = ra * 15 * (Math.PI / 180);

  // Convert Dec from degrees to radians
  const decRad = dec * (Math.PI / 180);
  distance *= PLANETARY_SYSTEM_DISTANCE_SCALING_FACTOR;
  // Calculate x, y, z
  const x = distance * Math.cos(decRad) * Math.cos(raRad);
  const y = distance * Math.cos(decRad) * Math.sin(raRad);
  const z = distance * Math.sin(decRad);

  return { x, y, z };
};
