import ExoPlanetType from "../types/ExoPlanetType";
import ToolContextType from "../types/ToolContextType";

// Use self for the worker's global scope
self.onmessage = function (e: MessageEvent) {
  const { planets, toolContext } = e.data as {
    planets: ExoPlanetType[];
    toolContext: ToolContextType;
  };

  const planetFilter = (
    planets: ExoPlanetType[],
    toolContext: ToolContextType | undefined
  ): ExoPlanetType[] => {
    return planets.filter((planet) => {
      const isWithinOrbitalDistance = toolContext?.orbitalDistance
        ? planet.pl_orbsmax >= toolContext.orbitalDistance.min &&
          planet.pl_orbsmax <= toolContext.orbitalDistance.max
        : true;

      const isWithinSystemDistance = toolContext?.systemDistance
        ? planet.sy_dist >= toolContext.systemDistance.min &&
          planet.sy_dist <= toolContext.systemDistance.max
        : true;

      const isWithinPlanetRadius = toolContext?.planetRadius
        ? planet.pl_rade >= toolContext.planetRadius.min &&
          planet.pl_rade <= toolContext.planetRadius.max
        : true;

      const isWithinStellarRadius = toolContext?.stellarRadius
        ? planet.st_rad >= toolContext.stellarRadius.min &&
          planet.st_rad <= toolContext.stellarRadius.max
        : true;

      return (
        isWithinOrbitalDistance &&
        isWithinSystemDistance &&
        isWithinPlanetRadius &&
        isWithinStellarRadius
      );
    });
  };

  try {
    const filteredPlanets = planetFilter(planets, toolContext);

    // Send filtered planets back to the main thread
    self.postMessage(filteredPlanets);
  } catch (error) {
    // Handle errors, if necessary
    console.error("Error in planet filter worker:", error);
  }
};
