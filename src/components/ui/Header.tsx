import { RiToolsFill } from "react-icons/ri";
import { IoBarChartSharp } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ViewType } from "../../types/viewTypes";
import MusicButton from "./MusicButton";
type Props = {
  onToolsClick: () => void;
  onInfoClick: () => void;
  onChartsClick: () => void;
  setView: (view: ViewType) => void;
  view: ViewType;
  resetCamera: () => void;
};

export default function Header({
  onToolsClick,
  onInfoClick,
  onChartsClick,
  setView,
  view,
  resetCamera,
}: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between w-full px-4 py-3 bg-black/70 backdrop-blur-sm z-20 border-b border-white/10">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToolsClick}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
          aria-label="Open tools panel"
        >
          <RiToolsFill
            className="text-white group-hover:text-blue-400 transition-colors duration-200"
            size={24}
          />
        </button>

        <button
          onClick={onInfoClick}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
          aria-label="Open information panel"
        >
          <IoIosInformationCircleOutline
            className="text-white group-hover:text-blue-400 transition-colors duration-200"
            size={26}
          />
        </button>
      </div>

      <nav>
        <ul className="flex items-center space-x-6 text-sm md:text-base font-medium">
          <li>
            <button
              onClick={() => setView("galaxy")}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                view === "galaxy"
                  ? "bg-white/10 text-blue-400"
                  : "text-white hover:bg-white/5"
              }`}
            >
              Galaxy View
            </button>
          </li>
          <li>
            <button
              onClick={() => setView("hwo")}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                view === "hwo"
                  ? "bg-white/10 text-blue-400"
                  : "text-white hover:bg-white/5"
              }`}
            >
              HWO View
            </button>
          </li>
          <li>
            <button
              onClick={resetCamera}
              className="px-3 py-1 rounded-lg text-white hover:bg-white/5 transition-all duration-200"
            >
              Reset View
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex items-center space-x-3">
        <MusicButton />
        <button
          onClick={onChartsClick}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
          aria-label="Open charts panel"
        >
          <IoBarChartSharp
            className="text-white group-hover:text-blue-400 transition-colors duration-200"
            size={24}
          />
        </button>
      </div>
    </header>
  );
}
