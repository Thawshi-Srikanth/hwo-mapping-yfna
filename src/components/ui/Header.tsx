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
    <div className="absolute top-0 right-0 flex flex-row justify-between w-screen h-[10%] p-2 text-white z-20">
      <div className="flex flex-row gap-2">
        <RiToolsFill
          color="white"
          size={30}
          onClick={onToolsClick}
          className="hover:cursor-pointer hover:bg-slate-700"
        />
        <IoIosInformationCircleOutline
          color="white"
          size={30}
          onClick={onInfoClick}
          className="hover:cursor-pointer hover:bg-slate-700"
        />
      </div>
      <ul className="flex flex-row gap-3 text-sm md:text-md">
        <li
          className={`cursor-pointer ${
            view === "galaxy" ? "underline" : ""
          } hover:underline`}
          onClick={() => setView("galaxy")}
        >
          Galaxy View
        </li>
        <li
          className={`cursor-pointer ${
            view === "hwo" ? "underline" : ""
          } hover:underline`}
          onClick={() => setView("hwo")}
        >
          HWO View
        </li>
        <li
          className={`cursor-pointer hover:underline`}
          onClick={() => resetCamera()}
        >
          Reload
        </li>
      </ul>
      <div className="cursor-pointer flex flex-row gap-2">
        <MusicButton />
        <IoBarChartSharp
          color="white"
          size={25}
          onClick={onChartsClick}
          className="hover:cursor-pointer hover:bg-slate-700"
        />
      </div>
    </div>
  );
}
