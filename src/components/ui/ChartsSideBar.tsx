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

export default function ChartSideNav({ isOpen, toggleSideNav, data }: Props) {
  if (!data) {
    return null;
  }
  return (
    <div
      className={`absolute top-0 right-0 h-screen xs:w-full md:w-[50%] lg:w-[60%] bg-black z-20 p-2
      text-white flex flex-col gap-3 overflow-y-scroll transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex  flex-row justify-end">
        <div
          className="cursor-pointer fixed z-50 text-red-500 hover:text-red-800"
          onClick={toggleSideNav}
        >
          X
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="w-full bg-transparent shadow-md rounded-sm p-4">
          <h2 className="text-xl font-semibold mb-2  text-white">
            Distance vs Radius
          </h2>
          <div className="h-[300px] min-h-[300px]">
            <DistanceVsRadius data={data} />
          </div>
        </div>
        <div className="w-full bg-transparent shadow-md rounded-sm p-4">
          <h2 className="text-xl font-semibold mb-2  text-white">
            Orbital Period vs Radius
          </h2>
          <div className="h-[300px] min-h-[300px]">
            <OrbitalPeriodVsRadius data={data} />
          </div>
        </div>
        <div className="w-full bg-transparent shadow-md rounded-sm p-4">
          <h2 className="text-xl font-semibold mb-2  text-white">
            Planetary Radius Distribution
          </h2>
          <div className="h-[300px] min-h-[300px]">
            <PlanetRadiusDistribution data={data} />
          </div>
        </div>
        <div className="w-full bg-transparent shadow-md rounded-sm p-4">
          <h2 className="text-xl font-semibold mb-2  text-white">
            Distance Year Distribution
          </h2>
          <div className="h-[300px] min-h-[300px]">
            <DiscoveryYearBar data={data} />
          </div>
        </div>

        <div className="w-full bg-transparent shadow-md rounded-sm p-4">
          <h2 className="text-xl font-semibold mb-2  text-white">
            Stellar temperature vs Semi Major Axis
          </h2>
          <div className="h-[300px] min-h-[300px]">
            <StellarTempVsSemiMajorAxis data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
