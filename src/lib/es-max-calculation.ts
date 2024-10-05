type Props = {
  telescopeDiameter: number; // D in meters
  planetStarDistance: number; // PS in AU (astronomical units)
};

export const calculateEsMax = (params: Props): number => {
  const { telescopeDiameter, planetStarDistance } = params;

  // Reference constants for comparison
  const referenceTelescopeDiameter = 6; // 6-meter telescope reference
  const maxSeparationAt6m = 15; // ESmax at 6 meters and 1 AU

  // Calculate the maximum separation distance (ESmax) using the formula
  const esMax =
    (maxSeparationAt6m * (telescopeDiameter / referenceTelescopeDiameter)) /
    planetStarDistance;

  return esMax;
};
