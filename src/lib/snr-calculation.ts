type Props = {
  stellarRadius: number; // R* in Rsun (solar radii)
  planetaryRadius: number; // RP in REarth (Earth radii)
  telescopeDiameter: number; // D in meters
  systemDistance: number; // ES in parsecs (pc)
  planetStarDistance: number; // PS in AU (astronomical units)
  snr0: number; // Baseline SNR (SNR0) for reference system
};

export const calculateSNR = (params: Props): number => {
  const {
    stellarRadius,
    planetaryRadius,
    telescopeDiameter,
    systemDistance,
    planetStarDistance,
    snr0,
  } = params;

  // Reference constants for comparison
  const referenceTelescopeDiameter = 6; // 6-meter telescope reference
  const referenceSystemDistance = 10; // 10 parsecs reference

  // Calculate the SNR using the provided formula
  const snr =
    snr0 *
    Math.pow(
      (stellarRadius *
        planetaryRadius *
        (telescopeDiameter / referenceTelescopeDiameter)) /
        ((systemDistance / referenceSystemDistance) * planetStarDistance),
      2
    );

  return snr;
};

