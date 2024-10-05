import { useState } from "react";
import "./App.css";
import Header from "./components/ui/Header";
import ChartSideNav from "./components/ui/ChartsSideBar";

function App() {
  const [isChartNavOpen, setIsChartNavOpen] = useState(false);
  const toggleChartNav = () => {
    setIsChartNavOpen(!isChartNavOpen);
  };
  return (
    <div className="relative h-screen w-screen z-0 overflow-hidden">
      <Header onChartsClick={toggleChartNav} />
      <ChartSideNav isOpen={isChartNavOpen} toggleSideNav={toggleChartNav} />
    </div>
  );
}

export default App;
