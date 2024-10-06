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

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const OrbitalPeriodVsRadius = ({ data }: { data: ExoPlanetType[] }) => {
  //TODO: SNR calculated and altering the pint size
  const calculateSNR = (
    planet: ExoPlanetType,
    telescopeDiameter: number = 6
  ) => {
    const SNR0 = 10;
    const { st_rad, pl_rade, sy_dist, pl_orbsmax } = planet;

    if (
      !st_rad ||
      !pl_rade ||
      !sy_dist ||
      !pl_orbsmax ||
      sy_dist <= 0 ||
      pl_orbsmax <= 0
    ) {
      return 0;
    }

    const snr =
      SNR0 *
      Math.pow(
        (st_rad * pl_rade * (telescopeDiameter / 6)) /
          ((sy_dist / 10) * pl_orbsmax),
        2
      );

    return snr;
  };
  const filterRanges = {
    shortOrbitalPeriod: { min: 1, max: 10 },
    mediumOrbitalPeriod: { min: 10, max: 20 },
  };
  // Filter and format data for short orbital periods (<= 50 days)
  const shortOrbitalPeriodData = data
    .filter(
      (planet) =>
        planet.pl_orbper &&
        planet.pl_orbper > filterRanges.shortOrbitalPeriod.min &&
        planet.pl_orbper <= filterRanges.shortOrbitalPeriod.max
    )
    .map((planet) => ({
      x: planet.pl_orbper,
      y: planet.pl_rade,
      snr: calculateSNR(planet),
      planetName: planet.pl_name,
    }));

  // Filter and format data for medium orbital periods (50 < days <= 100)
  const mediumOrbitalPeriodData = data
    .filter(
      (planet) =>
        planet.pl_orbper &&
        planet.pl_orbper > filterRanges.mediumOrbitalPeriod.min &&
        planet.pl_orbper <= filterRanges.mediumOrbitalPeriod.max
    )
    .map((planet) => ({
      x: planet.pl_orbper,
      y: planet.pl_rade,
      snr: calculateSNR(planet),
      planetName: planet.pl_name,
    }));

  const chartData = {
    datasets: [
      {
        label: "Orbital Period vs Radius (<= 50 days)",
        data: shortOrbitalPeriodData,
        backgroundColor: "#82ca9d",
        pointRadius: shortOrbitalPeriodData.map((d) =>
          Math.min(10, Math.max(2, d.snr / 1000))
        ),
      },
      {
        label: "Orbital Period vs Radius (50 < days <= 100)",
        data: mediumOrbitalPeriodData,
        backgroundColor: "#8884d8",
        pointRadius: mediumOrbitalPeriodData.map((d) =>
          Math.min(10, Math.max(2, d.snr / 1000))
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
