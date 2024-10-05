import { useContext, useRef, useState } from "react";
import "./App.css";
import Header from "./components/ui/Header";
import ChartSideNav from "./components/ui/ChartsSideBar";
import InfoSideNav from "./components/ui/InfoSideBar";
import ToolsSideNav from "./components/ui/ToolsSideBar";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import SceneBackground from "./components/SceneBackground";
import PlanetContext from "./context/planets/PlanetContext";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import Scene from "./components/Scene";
function App() {
  const [isToolSideBarOpen, setIsToolSideBarOpen] = useState(false);
  const [isInfoSideBarOpen, setIsInfoSideBarOpen] = useState(false);
  const [isChartNavOpen, setIsChartNavOpen] = useState(false);

  const planetContext = useContext(PlanetContext);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const toggleToolBarSideBar = () => {
    setIsToolSideBarOpen(!isToolSideBarOpen);
  };

  const toggleInfoBarSideBar = () => {
    setIsInfoSideBarOpen(!isInfoSideBarOpen);
  };

  const toggleChartNav = () => {
    setIsChartNavOpen(!isChartNavOpen);
  };

  return (
    <div className="relative h-screen w-screen z-0 overflow-hidden">
      <Header
        onToolsClick={toggleToolBarSideBar}
        onInfoClick={toggleInfoBarSideBar}
        onChartsClick={toggleChartNav}
      />
      <ToolsSideNav
        isOpen={isToolSideBarOpen}
        toggleSideNav={toggleToolBarSideBar}
      />
      <InfoSideNav
        isOpen={isInfoSideBarOpen}
        toggleSideNav={toggleInfoBarSideBar}
      />
      <ChartSideNav
        isOpen={isChartNavOpen}
        toggleSideNav={toggleChartNav}
        data={planetContext?.planets}
      />

      {planetContext?.isLoading ? (
        <div className="flex h-full w-full items-center justify-center text-white">
          <p>Loading...</p>
        </div>
      ) : (
        <Canvas gl={{ antialias: false }}>
          <Perf position="bottom-right" />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[1.5, 0.12, 0.2]}
            near={0.001} // Reduce this value to be closer to objects
            far={1000} // Increase this value if objects are farther away
          />
          <OrbitControls
            ref={controlsRef}
            zoomSpeed={0.09}
            panSpeed={0.08}
            rotateSpeed={0.02}
          />
          <SceneBackground texturePath="/images/background/stars_8k.webp" />
          <Scene />
        </Canvas>
      )}
    </div>
  );
}

export default App;
