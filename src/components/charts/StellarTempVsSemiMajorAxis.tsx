import { useState, useEffect } from "react";
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

  useEffect(() => {
    const mappedData = data.map((planet) => ({
      x: planet.pl_orbsmax,
      y: planet.st_teff,
      z: 0, // Placeholder for SNR or other value
    }));
    setHabitableData(mappedData);
  }, [data]);

  const chartData = {
    datasets: [
      {
        label: "Planets",
        data: habitableData,
        backgroundColor: "rgba(130, 202, 157, 0.7)",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "Semi-Major Axis (AU)" } },
      y: { title: { display: true, text: "Stellar Temperature (K)" } },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<"scatter">[]) => {
            const [tooltipItem] = tooltipItems;
            const planet = habitableData[tooltipItem.dataIndex];
            return planet ? `SNR: ${planet.z.toFixed(2)}` : "";
          },
          label: (tooltipItem: TooltipItem<"scatter">) => {
            const raw = tooltipItem.raw as { x: number; y: number };
            return `Semi-Major Axis: ${raw.x} AU, Stellar Temperature: ${raw.y} K`;
          },
        },
      },
      legend: { display: true },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default StellarTempVsSemiMajorAxis;
