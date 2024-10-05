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

// Register required elements with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PlanetRadiusDistributionChartJS = ({
  data,
}: {
  data: ExoPlanetType[];
}) => {
  // Organize data by radius buckets
  const radiusBuckets = data.reduce((acc, planet) => {
    const radius = Math.floor(planet.pl_rade || 0);
    acc[radius] = (acc[radius] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Prepare chartData labels
  const labels = Array.from(
    new Set(data.map((planet) => Math.floor(planet.pl_rade || 0)))
  ).sort((a, b) => a - b);

  // Prepare data for Chart.js
  const chartData = {
    labels: labels.map((radius) => `${radius} AU`),
    datasets: [
      {
        label: "Planet Count",
        data: labels.map((radius) => radiusBuckets[radius] || 0),
        backgroundColor: "#82ca9d",
        stack: "stacked",
        hidden: false,
      },
    ],
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
