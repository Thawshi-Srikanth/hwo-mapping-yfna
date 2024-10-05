import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  TooltipItem,
} from "chart.js";
import { ChartPlanetTypes } from "../../types/ChartTypes";

ChartJS.register(Tooltip, Legend, LinearScale, PointElement);

const DistanceVsRadius: React.FC<ChartPlanetTypes> = React.memo(({ data }) => {
  console.log("Received data:", data);

  const chartData = {
    datasets: [
      {
        label: "Planets",
        data: data.map((planet) => ({
          x: planet.sy_dist, // Distance
          y: planet.pl_rade, // Radius
          planetName: planet.pl_name, // Planet name
        })),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        pointStyle: "circle",
      },
    ],
  };

  console.log("Chart data:", chartData);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Distance (pc)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Radius (ER)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"scatter">) {
            const planet = tooltipItem.raw as {
              planetName: string;
              x: number;
              y: number;
            };
            console.log("Tooltip item:", tooltipItem);
            return `Planet: ${planet.planetName}\nDistance: ${planet.x} pc\nRadius: ${planet.y} ER`;
          },
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
});

export default DistanceVsRadius;
