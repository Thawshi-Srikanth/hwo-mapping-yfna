import { Html } from "@react-three/drei";
import { GLOBAL_PLANET_RADIUS } from "../config/planetConfig";
import ExoPlanetType from "../types/ExoPlanetType";

type Props = {
  planet: ExoPlanetType;
  onClick: () => void;
  snr: number;
};

function ExoPlanetTag({ planet, onClick, snr }: Props) {
  return (
    <Html
      position={[0, GLOBAL_PLANET_RADIUS, 0]} // Position the label slightly above the sphere
      center
    >
      <div className="absolute bottom-0 left-0 z-10 p-1 bg-black text-[12px] text-nowrap">
        <div className="flex flex-row justify-between text-[15px]">
          <h5 className="underline text-white">{planet.pl_name}</h5>
          <h2
            className="text-red-600 hover:cursor-pointer hover:text-red-500"
            onClick={onClick}
          >
            X
          </h2>
        </div>

        <p className="text-yellow-400">
          Host Start: <span className="text-white">{planet.hostname}</span>
        </p>
        <p className="text-yellow-400">
          Orbital Distance:{" "}
          <span className="text-white">{planet.pl_orbsmax} au</span>
        </p>
        <p className="text-yellow-400">
          Distance from Earth:{" "}
          <span className="text-white">{planet.sy_dist} pc</span>
        </p>
        <p className="text-yellow-400">
          Planet Radius:{" "}
          <span className="text-white">{planet.pl_rade} Earth Radius</span>
        </p>
        <p className="text-yellow-400">
          Stellar Radius:{" "}
          <span className="text-white">{planet.st_rad} Solar Radius</span>
        </p>
        <p className="text-yellow-400">
          SNR: <span className="text-white">{snr.toFixed(3)}</span>
        </p>
        <p className="text-yellow-400">
          Star Spectral Type:{" "}
          <span className="text-white">{planet.st_spectype}</span>
        </p>
      </div>
    </Html>
  );
}

export default ExoPlanetTag;
