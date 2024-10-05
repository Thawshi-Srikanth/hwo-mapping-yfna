import { useState } from "react";
import "./App.css";
import Header from "./components/ui/Header";
import ChartSideNav from "./components/ui/ChartsSideBar";
import InfoSideNav from "./components/ui/InfoSideBar";

function App() {
  const [isInfoSideBarOpen, setIsInfoSideBarOpen] = useState(false);
  const [isChartNavOpen, setIsChartNavOpen] = useState(false);

  const toggleInfoBarSideBar = () => {
    setIsInfoSideBarOpen(!isInfoSideBarOpen);
  };

  const toggleChartNav = () => {
    setIsChartNavOpen(!isChartNavOpen);
  };
  return (
    <div className="relative h-screen w-screen z-0 overflow-hidden">
      <Header
        onInfoClick={toggleInfoBarSideBar}
        onChartsClick={toggleChartNav}
      />
      <InfoSideNav
        isOpen={isInfoSideBarOpen}
        toggleSideNav={toggleInfoBarSideBar}
      />
      <ChartSideNav isOpen={isChartNavOpen} toggleSideNav={toggleChartNav} />
    </div>
  );
}

export default App;
