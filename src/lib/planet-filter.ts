import ExoPlanetType from "../types/ExoPlanetType";
import ToolContextType from "../types/ToolContextType";

export const planetFilter = (
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

    // Return true only if both orbitalDistance and systemDistance conditions are met (or no filter is applied)
    return (
      isWithinOrbitalDistance &&
      isWithinSystemDistance &&
      isWithinPlanetRadius &&
      isWithinStellarRadius
    );
  });
};
