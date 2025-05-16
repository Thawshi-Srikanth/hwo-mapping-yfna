import { useContext, useEffect } from "react";
import { useControls, folder, LevaPanel } from "leva";
import ToolContext from "../../context/tools/ToolContext";
import PlanetContext from "../../context/planets/PlanetContext";

const theme = {
  colors: {
    highlight1: "#0066dc",
    highlight2: "#0066dc",
    highlight3: "#0066dc",
    accent1: "#0066dc",
    accent2: "#0066dc",
    accent3: "#0066dc",
    elevation1: "#1a1a1a",
    elevation2: "#2a2a2a",
    elevation3: "#3a3a3a",
    shadowColor: "#00000099",
  },
  fontSizes: {
    root: "11px",
  },
};

export default function LevaControls() {
  const toolContext = useContext(ToolContext);
  const planetContext = useContext(PlanetContext);

  const controls = useControls({
    "HWO Settings": folder({
      telescopeDiameter: {
        value: toolContext?.telescopeDiameter || 6,
        min: 0,
        max: 50,
        step: 0.1,
        label: "Telescope Diameter (m)",
      },
      snr0: {
        value: toolContext?.snr0 || 100,
        min: 0,
        max: 500,
        step: 1,
        label: "SNR₀",
      },
    }),

    "Distance & Size": folder({
      orbitalDistance: {
        value: { min: 0, max: 20000 },
        min: 0,
        max: 20000,
        step: 0.1,
        label: "Orbital Distance (AU)",
      },
      systemDistance: {
        value: { min: 0, max: 9000 },
        min: 0,
        max: 9000,
        step: 0.1,
        label: "Distance from Earth (pc)",
      },
      planetRadius: {
        value: { min: 0, max: 100 },
        min: 0,
        max: 100,
        step: 0.1,
        label: "Planet Radius (R⊕)",
      },
      stellarRadius: {
        value: { min: 0, max: 200 },
        min: 0,
        max: 200,
        step: 0.1,
        label: "Stellar Radius (R☉)",
      },
    }),

    Visualization: folder({
      cleanData: {
        value: planetContext?.isCleanData || false,
        label: "Clean Data (Remove Missing Values)",
      },
      habitableZone: {
        value: toolContext?.isHZActivated || false,
        label: "Show Habitable Zones",
      },
      instantMesh: {
        value: toolContext?.isInstantMesh || false,
        label: "Instant Mesh (Better Performance)",
      },
    }),
  });

  useEffect(() => {
    if (toolContext) {
      toolContext.setTelescopeDiameter(controls.telescopeDiameter);
      toolContext.setSnr0(controls.snr0);
      toolContext.setOrbitalDistance(controls.orbitalDistance);
      toolContext.setSystemDistance(controls.systemDistance);
      toolContext.setPlanetRadius(controls.planetRadius);
      toolContext.setStellarRadius(controls.stellarRadius);
      toolContext.setIsHZActivated(controls.habitableZone);
      toolContext.setIsInstanceMesh(controls.instantMesh);
    }
  }, [
    toolContext,
    controls.telescopeDiameter,
    controls.snr0,
    controls.orbitalDistance,
    controls.systemDistance,
    controls.planetRadius,
    controls.stellarRadius,
    controls.habitableZone,
    controls.instantMesh,
  ]);

  useEffect(() => {
    if (planetContext) {
      planetContext.setIsCleanData(controls.cleanData);
    }
  }, [planetContext, controls.cleanData]);

  return (
    <LevaPanel theme={theme} titleBar={false} fill={true} collapsed={false} />
  );
}
