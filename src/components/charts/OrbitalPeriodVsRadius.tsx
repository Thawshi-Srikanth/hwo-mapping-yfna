import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import ExoPlanetType from "../../types/ExoPlanetType";

// Register required elements with Chart.js
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const OrbitalPeriodVsRadius = ({ data }: { data: ExoPlanetType[] }) => {
  // Filter and format data for short orbital periods (<= 50 days)
  const formattedData = data
    .filter((planet) => planet.pl_orbper && planet.pl_orbper <= 50)
    .map((planet) => ({
      x: planet.pl_orbper,
      y: planet.pl_rade,
      planetName: planet.pl_name,
    }));

  const chartData = {
    datasets: [
      {
        label: "Orbital Period vs Radius (<= 50 days)",
        data: formattedData,
        backgroundColor: "#82ca9d",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Orbital Period (days)",
        },
      },
      y: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Planet Radius (ER)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"scatter">) => {
            const raw = tooltipItem.raw as {
              planetName: string;
              x: number;
              y: number;
            };
            return `${raw.planetName}: Orbital Period: ${raw.x} days, Radius: ${raw.y} ER`;
          },
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default OrbitalPeriodVsRadius;
