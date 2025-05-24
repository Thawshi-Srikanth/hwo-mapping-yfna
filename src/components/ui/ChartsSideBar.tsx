import { useState, createElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch, IoClose, IoDownloadOutline, IoExpand, IoContract } from "react-icons/io5";

import ExoPlanetType from "../../types/ExoPlanetType";
import DiscoveryYearBar from "../charts/DiscoveryYearBar";
import DistanceVsRadius from "../charts/DistanceVsRadius";
import OrbitalPeriodVsRadius from "../charts/OrbitalPeriodVsRadius";
import PlanetRadiusDistribution from "../charts/PlanetaryRadiusDistribution";
import StellarTempVsSemiMajorAxis from "../charts/StellarTempVsSemiMajorAxis";

type Props = {
  isOpen: boolean;
  toggleSideNav: () => void;
  data: ExoPlanetType[] | undefined;
};

type ChartConfig = {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<{ data: ExoPlanetType[] }>;
};

const charts: ChartConfig[] = [
  {
    id: "distance-radius",
    title: "Distance vs Radius",
    description: "Explore the relationship between planetary distances and their radii across different star systems.",
    component: DistanceVsRadius,
  },
  {
    id: "orbital-radius",
    title: "Orbital Period vs Radius",
    description: "Analyze how orbital periods correlate with planet sizes, revealing patterns in planetary system architectures.",
    component: OrbitalPeriodVsRadius,
  },
  {
    id: "radius-distribution",
    title: "Planetary Radius Distribution",
    description: "Visualize the size distribution of discovered exoplanets, highlighting common planetary categories.",
    component: PlanetRadiusDistribution,
  },
  {
    id: "discovery-year",
    title: "Discovery Timeline",
    description: "Track the history of exoplanet discoveries over time, showing technological advances in detection methods.",
    component: DiscoveryYearBar,
  },
  {
    id: "stellar-temp",
    title: "Stellar Temperature Analysis",
    description: "Examine the relationship between host star temperatures and planetary orbital distances.",
    component: StellarTempVsSemiMajorAxis,
  },
];

export default function ChartSideNav({ isOpen, toggleSideNav, data }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedChart, setExpandedChart] = useState<string | null>(null);

  if (!data) return null;

  const filteredCharts = charts.filter((chart) =>
    chart.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chart.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadChartData = (chartId: string) => {
    // Implementation for downloading chart data as CSV
    console.log("Downloading data for chart:", chartId);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed top-0 right-0 h-screen w-full md:w-[60%] lg:w-[50%] 
          bg-gradient-to-bl from-[#0A0A0F] via-[#1A1A2E] to-[#0A0A0F] z-30 
          shadow-2xl border-l border-purple-900/20 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 backdrop-blur-md bg-[#0A0A0F]/90 px-6 py-4 border-b border-purple-900/20">
          <div className="flex justify-between items-center mb-4">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
            >
              Analytics Dashboard
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-purple-900/10 hover:bg-purple-900/20 
                transition-colors duration-200 text-purple-400"
              onClick={toggleSideNav}
              aria-label="Close charts panel"
            >
              <IoClose size={20} />
            </motion.button>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search visualizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/5 border border-purple-900/20 rounded-xl 
                text-purple-200 placeholder-purple-300/30 focus:outline-none focus:border-purple-900/40
                focus:ring-2 focus:ring-purple-900/10 transition-all duration-200"
            />
            <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400/50" size={18} />
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCharts.map((chart) => (
              <motion.div
                key={chart.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-gradient-to-br from-purple-900/5 to-purple-900/10 rounded-xl 
                  shadow-lg overflow-hidden border border-purple-900/20 hover:border-purple-900/30 
                  transition-all duration-300 ${
                    expandedChart === chart.id ? "lg:col-span-2" : ""
                  }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <motion.h3 
                      layout="position"
                      className="text-lg font-semibold text-purple-200"
                    >
                      {chart.title}
                    </motion.h3>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => downloadChartData(chart.id)}
                        className="p-2 rounded-lg bg-purple-900/10 hover:bg-purple-900/20 
                          transition-colors duration-200 text-purple-400"
                        title="Download data"
                      >
                        <IoDownloadOutline size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setExpandedChart(
                          expandedChart === chart.id ? null : chart.id
                        )}
                        className="p-2 rounded-lg bg-purple-900/10 hover:bg-purple-900/20 
                          transition-colors duration-200 text-purple-400"
                        title={expandedChart === chart.id ? "Collapse" : "Expand"}
                      >
                        {expandedChart === chart.id ? (
                          <IoContract size={18} />
                        ) : (
                          <IoExpand size={18} />
                        )}
                      </motion.button>
                    </div>
                  </div>
                  <motion.p 
                    layout="position"
                    className="text-sm text-purple-200/70 mb-4"
                  >
                    {chart.description}
                  </motion.p>
                  <motion.div
                    layout
                    className={`transition-all duration-300 bg-purple-900/5 rounded-lg p-4 ${
                      expandedChart === chart.id ? "h-[600px]" : "h-[300px]"
                    }`}
                  >
                    {createElement(chart.component, { data })}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Gradient */}
        <div className="h-6 bg-gradient-to-t from-[#0A0A0F] to-transparent pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
