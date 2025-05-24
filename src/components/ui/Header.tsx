import { IoBarChartSharp, IoTelescope } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoRefreshOutline } from "react-icons/io5";
import { ViewType } from "../../types/viewTypes";
import MusicButton from "./MusicButton";
import { motion } from "framer-motion";
import { useState } from "react";
import { GiGalaxy } from "react-icons/gi";

type Props = {
  onInfoClick: () => void;
  onChartsClick: () => void;
  setView: (view: ViewType) => void;
  view: ViewType;
  resetCamera: () => void;
};

export default function Header({
  onInfoClick,
  onChartsClick,
  setView,
  view,
  resetCamera,
}: Props) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 
        w-auto rounded-2xl bg-[#0A0A0F]/90 backdrop-blur-md
        shadow-[0_0_30px_rgba(88,28,135,0.15)] border border-purple-900/20"
    >
      <nav className="flex items-center justify-center p-2">
        <ul className="flex items-center space-x-1">
          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={onInfoClick}
              className="relative p-3 rounded-xl bg-purple-900/5 hover:bg-purple-900/20 
                group transition-all duration-200"
              onMouseEnter={() => setShowTooltip("info")}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <IoIosInformationCircleOutline
                className="text-purple-300 group-hover:text-purple-200 transition-colors duration-200"
                size={24}
              />
              {showTooltip === "info" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                    px-3 py-1.5 text-xs text-purple-200 bg-[#1A1A2E] rounded-lg 
                    shadow-lg border border-purple-900/20 whitespace-nowrap"
                >
                  Information
                </motion.div>
              )}
            </button>
          </motion.li>

          <div className="w-px h-8 bg-purple-900/20 mx-2" />

          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => setView("galaxy")}
              className={`relative p-3 rounded-xl transition-all duration-200 ${
                view === "galaxy"
                  ? "bg-purple-900/30 shadow-lg shadow-purple-900/20"
                  : "bg-purple-900/5 hover:bg-purple-900/20"
              }`}
            >
              <GiGalaxy
                className={`transition-colors duration-200 ${
                  view === "galaxy" ? "text-purple-200" : "text-purple-300"
                }`}
                size={24}
              />
            </button>
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => setView("hwo")}
              className={`relative p-3 rounded-xl transition-all duration-200 ${
                view === "hwo"
                  ? "bg-purple-900/30 shadow-lg shadow-purple-900/20"
                  : "bg-purple-900/5 hover:bg-purple-900/20"
              }`}
            >
              <IoTelescope
                className={`transition-colors duration-200 ${
                  view === "hwo" ? "text-purple-200" : "text-purple-300"
                }`}
                size={24}
              />
            </button>
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={resetCamera}
              className="relative p-3 rounded-xl bg-purple-900/5 hover:bg-purple-900/20 
                group transition-all duration-200"
            >
              <IoRefreshOutline
                className="text-purple-300 group-hover:text-purple-200 transition-colors duration-200"
                size={24}
              />
            </button>
          </motion.li>

          <div className="w-px h-8 bg-purple-900/20 mx-2" />

          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <MusicButton />
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={onChartsClick}
              className="relative p-3 rounded-xl bg-purple-900/5 hover:bg-purple-900/20 
                group transition-all duration-200"
              onMouseEnter={() => setShowTooltip("charts")}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <IoBarChartSharp
                className="text-purple-300 group-hover:text-purple-200 transition-colors duration-200"
                size={24}
              />
              {showTooltip === "charts" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full right-0 mb-2 
                    px-3 py-1.5 text-xs text-purple-200 bg-[#1A1A2E] rounded-lg 
                    shadow-lg border border-purple-900/20 whitespace-nowrap"
                >
                  Analytics
                </motion.div>
              )}
            </button>
          </motion.li>
        </ul>
      </nav>
    </motion.header>
  );
}
