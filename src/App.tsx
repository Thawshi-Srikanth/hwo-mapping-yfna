import { useState } from "react";
import "./App.css";
import Header from "./components/ui/Header";
import ChartSideNav from "./components/ui/ChartsSideBar";
import InfoSideNav from "./components/ui/InfoSideBar";
import ToolsSideNav from "./components/ui/ToolsSideBar";

function App() {
  const [isToolSideBarOpen, setIsToolSideBarOpen] = useState(false);
  const [isInfoSideBarOpen, setIsInfoSideBarOpen] = useState(false);
  const [isChartNavOpen, setIsChartNavOpen] = useState(false);

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
      <ChartSideNav isOpen={isChartNavOpen} toggleSideNav={toggleChartNav} />
    </div>
  );
}

export default App;
