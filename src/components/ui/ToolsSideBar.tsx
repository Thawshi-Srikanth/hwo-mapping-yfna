import { useContext } from "react";
import RangeItem from "./RangeItem";
import ToolContext from "../../context/tools/ToolContext";
import TwoThumbsRangeItem from "./ReactDoubleRangeItem";
import MinMaxType from "../../types/MinMaxType";
import PlanetContext from "../../context/planets/PlanetContext";

type Props = {
  isOpen: boolean;
  toggleSideNav: () => void;
};

export default function ToolsSideNav({ isOpen, toggleSideNav }: Props) {
  const toolContext = useContext(ToolContext);
  const planetContext = useContext(PlanetContext);

  const handleTeleDiameterSliderChange = (value: number) => {
    toolContext?.setTelescopeDiameter(value);
  };

  const handleSnr0 = (value: number) => {
    toolContext?.setSnr0(value);
  };

  const handleOrbitalDistance = (value: MinMaxType) => {
    toolContext?.setOrbitalDistance(value);
  };

  const handlePlaneterDistance = (value: MinMaxType) => {
    toolContext?.setSystemDistance(value);
  };

  const handlePlanetRadius = (value: MinMaxType) => {
    toolContext?.setPlanetRadius(value);
  };

  const handleStellarRadius = (value: MinMaxType) => {
    toolContext?.setStellarRadius(value);
  };

  const handleInstantMeshToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    toolContext?.setIsInstanceMesh(event.target.checked);
  };

  const handleCleanDataToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    planetContext?.setIsCleanData(event.target.checked);
  };
  const handleHZToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    toolContext?.setIsHZActivated(event.target.checked);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen sm:w-[80%] md:w-[50%] lg:w-[30%] bg-black/95 backdrop-blur-sm z-30 
      shadow-2xl border-r border-white/10 p-4 text-white flex flex-col gap-4 overflow-y-auto
      transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tools</h2>
        <button
          className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-red-500 hover:text-red-400"
          onClick={toggleSideNav}
          aria-label="Close tools panel"
        >
          <span className="text-lg">×</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors duration-200">
            <input
              type="checkbox"
              id="cleanData"
              onChange={handleCleanDataToggle}
              checked={planetContext?.isCleanData}
              className="w-4 h-4 rounded border-white/20"
            />
            <label htmlFor="cleanData" className="text-sm">
              Clean Data (Remove Missing Values)
            </label>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors duration-200">
            <input
              type="checkbox"
              id="hzActivator"
              onChange={handleHZToggle}
              checked={toolContext?.isHZActivated}
              className="w-4 h-4 rounded border-white/20"
            />
            <label htmlFor="hzActivator" className="text-sm">
              Detect ExoPlanets in Habitable Zones
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <RangeItem
            label="HWO Telescope Diameter (m)"
            min={0}
            max={50}
            id="td"
            onChange={handleTeleDiameterSliderChange}
            defaultValue={toolContext?.telescopeDiameter}
          />
          <RangeItem
            label="SNR0"
            min={0}
            max={500}
            id="snr0"
            onChange={handleSnr0}
            defaultValue={toolContext?.snr0}
          />
          <TwoThumbsRangeItem
            rtl={false}
            min={0}
            max={20000}
            step={0.1}
            label="Orbital Distance (AU)"
            id="od"
            onChange={handleOrbitalDistance}
            defaultMin={0}
            defaultMax={20000}
          />
          <TwoThumbsRangeItem
            rtl={false}
            min={0}
            max={9000}
            step={0.1}
            label="Distance from Earth (pc):"
            id="dfe"
            onChange={handlePlaneterDistance}
            defaultMin={0}
            defaultMax={9000}
          />
          <TwoThumbsRangeItem
            rtl={false}
            min={0}
            max={100}
            step={0.1}
            label="Planet Radius (Earth Radius):"
            id="pr"
            onChange={handlePlanetRadius}
            defaultMin={0}
            defaultMax={100}
          />

          <TwoThumbsRangeItem
            rtl={false}
            min={0}
            max={200}
            step={0.1}
            label="Stellar Radius (Solar Radius):"
            id="sr"
            onChange={handleStellarRadius}
            defaultMin={0}
            defaultMax={200}
          />
        </div>

        <div className="flex items-center space-x-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors duration-200">
          <input
            type="checkbox"
            id="instantMesh"
            onChange={handleInstantMeshToggle}
            checked={toolContext?.isInstantMesh}
            className="w-4 h-4 rounded border-white/20"
          />
          <label htmlFor="instantMesh" className="text-sm">
            Enable Instant Mesh (Better Performance)
          </label>
        </div>
      </div>
    </div>
  );
}
