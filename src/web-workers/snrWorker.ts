import { calculateSNR } from "../lib/snr-calculation";
import ExoPlanetType from "../types/ExoPlanetType";
import ToolContextType from "../types/ToolContextType";
import SNRProps from "../types/SNRProps";

// This function will handle the calculation logic in the worker
self.onmessage = function (e: MessageEvent) {
  const { planets, toolContext } = e.data as {
    planets: ExoPlanetType[];
    toolContext: ToolContextType;
  };

  // Perform the SNR calculation for each planet
  const results = planets.map((planet) => {
    const params: SNRProps = {
      stellarRadius: planet.st_rad,
      planetaryRadius: planet.pl_rade,
      telescopeDiameter: toolContext.telescopeDiameter,
      systemDistance: planet.sy_dist,
      planetStarDistance: planet.pl_orbsmax,
      snr0: toolContext.snr0,
    };
    const snr = calculateSNR(params);
    return { ...planet, snr };
  });

  // Send the results back to the main thread
  try {
    self.postMessage(results);
  } catch (error) {
    console.error("snr worker:", error);
  }
};
