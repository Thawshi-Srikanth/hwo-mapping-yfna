import { createContext } from "react";
import ExoPlanetType from "../../types/ExoPlanetType";

interface PlanetContextType {
  planets: ExoPlanetType[];
  isLoading: boolean;
  isCleanData: boolean;
  setIsCleanData: (value: boolean) => void;
}

const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export default PlanetContext;
