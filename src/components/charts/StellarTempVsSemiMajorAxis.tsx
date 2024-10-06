import { useState, useEffect, useMemo, useContext } from "react";
import {
  Chart as ChartJS,
  ScatterController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  TooltipItem,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import ExoPlanetType from "../../types/ExoPlanetType";
import { calculateSNR } from "../../lib/snr-calculation";
import ToolContext from "../../context/tools/ToolContext";

// Register required components with Chart.js
ChartJS.register(
  ScatterController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

const StellarTempVsSemiMajorAxis = ({ data }: { data: ExoPlanetType[] }) => {
  const [habitableData, setHabitableData] = useState<
    { x: number; y: number; z: number }[]
  >([]);
  const toolContext = useContext(ToolContext);

  const filteredData = useMemo(() => {
    const calculateSNRForData = (planet: ExoPlanetType): number => {
      if (
        !planet.st_rad ||
        !planet.pl_rade ||
        !planet.sy_dist ||
        !planet.pl_orbsmax ||
        !toolContext ||
        planet.sy_dist <= 0 ||
        planet.pl_orbsmax <= 0 ||
        toolContext.snr0 <= 0 ||
        toolContext.telescopeDiameter <= 0
      ) {
        return 0;
      }
      // 6 meters, can also be made dynamic if needed
      const params = {
        stellarRadius: planet.st_rad,
        planetaryRadius: planet.pl_rade,
        telescopeDiameter: toolContext.telescopeDiameter,
        systemDistance: planet.sy_dist,
        planetStarDistance: planet.pl_orbsmax,
        snr0: toolContext.snr0, // Now dynamically taken from the ToolContext
      };
      return calculateSNR(params);
    };

    const SNR_THRESHOLD = 20;
    const TEMPERATURE_RANGE = [2000, 7500];
    const DISTANCE_RANGE = [0.5, 1.5]; // AU

    const habitablePlanets = data
      .filter((planet) => {
        const snr = calculateSNRForData(planet);
        return (
          snr > SNR_THRESHOLD &&
          planet.st_teff >= TEMPERATURE_RANGE[0] &&
          planet.st_teff <= TEMPERATURE_RANGE[1] &&
          planet.pl_orbsmax >= DISTANCE_RANGE[0] &&
          planet.pl_orbsmax <= DISTANCE_RANGE[1]
        );
      })
      .map((planet) => ({
        x: planet.pl_orbsmax,
        y: planet.st_teff,
        z: calculateSNRForData(planet),
      }));

    return habitablePlanets;
  }, [toolContext, data]); // Recalculate if snr0 changes

  useEffect(() => {
    setHabitableData(filteredData);
  }, [filteredData]);

  // Prepare chart data
  const chartData = {
    datasets: [
      {
        label: "Habitable Planets",
        data: habitableData,
        backgroundColor: "rgba(130, 202, 157, 0.7)",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  // Options for Chart.js
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Semi-Major Axis (AU)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Stellar Temperature (K)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<"scatter">[]) => {
            const [tooltipItem] = tooltipItems;
            const planet = habitableData[tooltipItem.dataIndex];
            const planetLast = habitableData[habitableData.length - 1];
            return planet
              ? `SNR: ${planet.z.toFixed(2)} - ${planetLast.z.toFixed(2)}`
              : "";
          },
          label: (tooltipItem: TooltipItem<"scatter">) => {
            const raw = tooltipItem.raw as {
              x: number;
              y: number;
            };
            return `Semi-Major Axis: ${raw.x} AU, Stellar Temperature: ${raw.y} K`;
          },
        },
      },
      legend: {
        display: true,
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default StellarTempVsSemiMajorAxis;
