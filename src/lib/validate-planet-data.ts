function validateCelestialCoordinates(
  ra: number,
  dec: number,
  sy_dist: number
): boolean {
  return (
    ra !== null &&
    dec !== null &&
    sy_dist !== null &&
    ra >= 0 &&
    ra <= 360 &&
    dec >= -90 &&
    dec <= 90 &&
    sy_dist >= 0
  );
}

export default validateCelestialCoordinates;
