import { useState } from "react";
import Accordion, { AccordionItem } from "./Accordian";

type Props = {
  isOpen: boolean;
  toggleSideNav: () => void;
};

export default function InfoSideNav({ isOpen, toggleSideNav }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div
      className={`absolute top-0 left-0 h-screen sm:w-[80%] md:w-[50%] lg:w-[20%] bg-black bg-opacity-55 z-20 p-2
         text-white flex flex-col gap-3 overflow-y-scroll transform transition-transform duration-300 ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         }`}
    >
      <div className="flex flex-row justify-end">
        <div
          className="cursor-pointer text-lg p-2 bg-black text-red-500 hover:text-red-800"
          onClick={toggleSideNav}
        >
          X
        </div>
      </div>
      <Accordion value={selected} onChange={setSelected}>
        <AccordionItem value="item1" trigger="HWO?">
          <p>
            NASA is advancing its search for life in the universe with plans for
            its next major astrophysics mission, expected to launch in the
            2040s. Known as the Habitable Worlds Observatory (HWO), this mission
            aims to find and study habitable planets beyond the solar system.
            Building on previous concepts (LUVOIR and HabEx), HWO will focus on
            directly imaging at least 25 potentially habitable planets and
            analyzing their atmospheres for biosignatures like oxygen and
            methane. The observatory will also offer groundbreaking capabilities
            for studying the universe with unmatched sensitivity, enhancing our
            understanding of galaxy evolution and cosmic structures.
          </p>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
