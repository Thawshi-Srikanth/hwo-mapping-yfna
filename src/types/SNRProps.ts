type SNRProps = {
  stellarRadius: number; // R* in solar radii (Rsun)
  planetaryRadius: number; // RP in Earth radii (REarth)
  telescopeDiameter: number; // D in meters
  systemDistance: number; // Distance from the system in parsecs (pc)
  planetStarDistance: number; // PS in astronomical units (AU)
  snr0: number; // Baseline SNR (SNR0) for the reference system
};

export default SNRProps;
