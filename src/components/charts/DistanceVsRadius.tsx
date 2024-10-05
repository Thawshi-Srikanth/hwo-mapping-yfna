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

const discoveryMethods = [
  { method: "Transit", color: "#8884d8b3", shape: "circle" },
  { method: "Radial Velocity", color: "#ff6384b3", shape: "triangle" },
  { method: "Transit Timing Variations", color: "#36a2ebb3", shape: "rect" },
  { method: "Imaging", color: "#ffce56b3", shape: "star" },
  {
    method: "Orbital Brightness Modulation",
    color: "#4bc0c0b3",
    shape: "cross",
  },
  { method: "Solar System", color: "#9966ffb3", shape: "rectRot" },
];

const DistanceVsRadius: React.FC<ChartPlanetTypes> = React.memo(({ data }) => {
  // to spread out the chart
  const filteredData = data.filter(
    (planet) => planet.sy_dist <= 3000 && planet.pl_rade <= 40
  );

  const chartData = {
    datasets: discoveryMethods.map((dm) => ({
      label: dm.method,
      data: filteredData
        .filter((planet) => planet.discoverymethod === dm.method)
        .map((planet) => ({
          x: planet.sy_dist, // Distances
          y: planet.pl_rade, // Radius
          planetName: planet.pl_name, // Planet name
        })),
      backgroundColor: dm.color,
      pointStyle: dm.shape,
    })),
  };

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
