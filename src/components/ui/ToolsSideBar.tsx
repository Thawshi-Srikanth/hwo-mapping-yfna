import RangeItem from "./RangeItem";

type Props = {
  isOpen: boolean;
  toggleSideNav: () => void;
};

export default function ToolsSideNav({ isOpen, toggleSideNav }: Props) {
  const handleTeleDiameterSliderChange = (value: number) => {
    console.log(value);
  };

  const handleSnr0 = (value: number) => {
    console.log(value);
  };
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

      <RangeItem
        label="HWO Telescope Diameter (m) :"
        min={0}
        max={50}
        id="td"
        onChange={handleTeleDiameterSliderChange}
        defaultValue={0}
      />
      <RangeItem
        label="SNR0 :"
        min={0}
        max={500}
        id="snr0"
        onChange={handleSnr0}
        defaultValue={0}
      />
    </div>
  );
}
