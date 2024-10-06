import { useMemo, useState } from "react";
import ToolContext from "./ToolContext";
import { SNR0 } from "../../config/toolsConfig";
import MinMaxType from "../../types/MinMaxType";
import { Leva, useControls } from "leva";

type Props = {
  children: React.ReactNode;
};

const ToolContextProvider = ({ children }: Props) => {
  //const [telescopeDiameter, setTelescopeDiameter] = useState<number>(0);
  //const [snr0, setSnr0] = useState<number>(SNR0);
  const [systemDistance, setSystemDistance] = useState<MinMaxType | undefined>(
    undefined
  );
  const [orbitalDistance, setOrbitalDistance] = useState<
    MinMaxType | undefined
  >(undefined);
  const [planetRadius, setPlanetRadius] = useState<MinMaxType | undefined>(
    undefined
  );
  const [stellarRadius, setStellarRadius] = useState<MinMaxType | undefined>(
    undefined
  );
  const [exoPlanetType, setExoPlanetType] = useState<string>("");
  const [isHZActivated, setIsHZActivated] = useState<boolean>(false);

  const options = useMemo(() => {
    return {
      telescopeDiameter: {
        label: "Telescope Diameter",
        value: 1,
        min: 0,
        max: 50,
        step: 0.01,
        suffix: " m",
      },
      snr0: {
        label: "SNR 0",
        value: SNR0,
        min: 0,
        max: 50,
        step: 0.01,
        suffix: " m",
      },
    };
  }, []);

  const { telescopeDiameter, snr0 } = useControls(options);

  const contextValue = useMemo(
    () => ({
      telescopeDiameter,
      snr0,
      systemDistance,
      setSystemDistance,
      orbitalDistance,
      setOrbitalDistance,
      planetRadius,
      setPlanetRadius,
      stellarRadius,
      setStellarRadius,
      exoPlanetType,
      setExoPlanetType,
      isHZActivated,
      setIsHZActivated,
    }),
    [
      telescopeDiameter,
      snr0,
      systemDistance,
      orbitalDistance,
      planetRadius,
      stellarRadius,
      exoPlanetType,
      isHZActivated,
    ]
  );

  return (
    <>
      <Leva theme={{ sizes: { rootWidth: "300px" } }} />
      <ToolContext.Provider value={contextValue}>
        {children}
      </ToolContext.Provider>
    </>
  );
};

export default ToolContextProvider;
