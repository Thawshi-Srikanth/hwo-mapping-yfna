function calculateHabitableZone(
  stellarRadius: number, // in Solar Radii
  stellarTemperature: number // in Kelvin
): { inner: number; outer: number } {
  const sigma = 5.67e-8; // Stefan-Boltzmann constant in W/m^2/K^4
  const solarLuminosity = 3.828e26; // Solar luminosity in Watts

  // Convert stellar radius from Solar Radii to meters
  const radiusInMeters = stellarRadius * 6.957e8; // Solar radius in meters

  // Calculate stellar luminosity
  const stellarLuminosity =
    4 *
    Math.PI *
    Math.pow(radiusInMeters, 2) *
    sigma *
    Math.pow(stellarTemperature, 4);

  // Calculate habitable zone boundaries
  const inner = 0.95 * Math.sqrt(stellarLuminosity / solarLuminosity); // Convert to AU
  const outer = 1.67 * Math.sqrt(stellarLuminosity / solarLuminosity); // Convert to AU

  return { inner, outer };
}

export function isExoplanetWithinHabitableZone(
  _planetName: string,
  stellarRadius: number, // in Solar Radii
  stellarTemperature: number, // in Kelvin
  distanceFromStar: number // in AU
): boolean {
  let inHZ = false;
  const { inner, outer } = calculateHabitableZone(
    stellarRadius,
    stellarTemperature
  );

  inHZ = distanceFromStar >= inner && distanceFromStar <= outer;

  // if (inHZ)
  //   console.log(
  //     `Is ${planetName}, stellarRadius: ${stellarRadius}, stellarTemperature: ${stellarTemperature}, inner: ${inner}, outer: ${outer}, distance: ${distanceFromStar}, in the habitable zone? ${
  //       inHZ ? "Yes" : "No"
  //     }`
  //   );

  return inHZ;
}
