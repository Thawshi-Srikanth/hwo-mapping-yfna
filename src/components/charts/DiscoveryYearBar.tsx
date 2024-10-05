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

const DiscoveryYearBar = ({ data }: { data: ExoPlanetType[] }) => {
  const currentYear = new Date().getFullYear();

  // Calculate counts based on discovery years
  const yearCount = data.reduce((acc, planet) => {
    if (planet.disc_year <= currentYear) {
      acc[planet.disc_year] = (acc[planet.disc_year] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const chartData = {
    labels: Object.keys(yearCount).map((year) => year),
    datasets: [
      {
        label: "Number of Discoveries",
        data: Object.keys(yearCount).map((year) => yearCount[parseInt(year)]),
        backgroundColor: "#36a2eb",
        stack: "stacked",
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
