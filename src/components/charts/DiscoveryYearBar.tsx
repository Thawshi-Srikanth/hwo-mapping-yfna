import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ExoPlanetType from "../../types/ExoPlanetType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

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

const DiscoveryYearBar = ({ data }: { data: ExoPlanetType[] }) => {
  const currentYear = new Date().getFullYear();

  const yearCount = data.reduce((acc, planet) => {
    if (planet.disc_year <= currentYear) {
      acc[planet.disc_year] = acc[planet.disc_year] || {};
      acc[planet.disc_year][planet.discoverymethod] =
        (acc[planet.disc_year][planet.discoverymethod] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, Record<string, number>>);

  const chartData = {
    labels: Object.keys(yearCount),
    datasets: discoveryMethods.map(({ method, color }) => ({
      label: method,
      data: Object.keys(yearCount).map(
        (year) => yearCount[parseInt(year)][method] || 0
      ),
      backgroundColor: color,
      stack: "stacked",
    })),
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Discovery Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Discoveries",
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
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default DiscoveryYearBar;
