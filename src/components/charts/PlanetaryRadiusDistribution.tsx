import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ExoPlanetType from "../../types/ExoPlanetType";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

const PlanetRadiusDistributionChartJS = ({
  data,
}: {
  data: ExoPlanetType[];
}) => {
  const labels = Array.from(
    new Set(data.map((planet) => Math.floor(planet.pl_rade || 0)))
  ).sort((a, b) => a - b);

  const chartData = {
    labels: labels.map((radius) => `${radius} AU`),
    datasets: discoveryMethods.map((method) => ({
      label: method.method,
      data: labels.map(
        (radius) =>
          data.filter(
            (planet) =>
              Math.floor(planet.pl_rade || 0) === radius &&
              planet.discoverymethod === method.method
          ).length
      ),
      backgroundColor: method.color,
      stack: "stacked",
      hidden: false,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Radius (AU)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Planet Count",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default PlanetRadiusDistributionChartJS;
