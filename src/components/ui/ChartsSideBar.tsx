// import DistanceVsRadius from "../charts/DistanceVsRadius";

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

export default function ChartSideNav({
  isOpen,
  toggleSideNav,
  data,
}: Props) {
  if (!data) {
    return null;
  }
  
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full md:w-[60%] lg:w-[50%] bg-black/95 backdrop-blur-sm z-30 
      shadow-2xl border-l border-white/10 p-4 text-white flex flex-col gap-4 overflow-y-auto
      transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-row justify-between items-center mb-4 sticky top-0 bg-black/95 py-2">
        <h2 className="text-xl font-semibold">Charts & Analytics</h2>
        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-red-500 hover:text-red-400"
          onClick={toggleSideNav}
          aria-label="Close charts panel"
        >
          <span className="text-lg">×</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg shadow-lg p-4 hover:bg-white/10 transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4 text-white">Distance vs Radius</h3>
          <div className="h-[300px]">
            <DistanceVsRadius data={data} />
          </div>
        </div>

        <div className="bg-white/5 rounded-lg shadow-lg p-4 hover:bg-white/10 transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4 text-white">Orbital Period vs Radius</h3>
          <div className="h-[300px]">
            <OrbitalPeriodVsRadius data={data} />
          </div>
        </div>

        <div className="bg-white/5 rounded-lg shadow-lg p-4 hover:bg-white/10 transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4 text-white">Planetary Radius Distribution</h3>
          <div className="h-[300px]">
            <PlanetRadiusDistribution data={data} />
          </div>
        </div>

        <div className="bg-white/5 rounded-lg shadow-lg p-4 hover:bg-white/10 transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4 text-white">Discovery Year Distribution</h3>
          <div className="h-[300px]">
            <DiscoveryYearBar data={data} />
          </div>
        </div>

        <div className="bg-white/5 rounded-lg shadow-lg p-4 hover:bg-white/10 transition-colors duration-200 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-white">Stellar Temperature vs Semi-Major Axis</h3>
          <div className="h-[300px]">
            <StellarTempVsSemiMajorAxis data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
