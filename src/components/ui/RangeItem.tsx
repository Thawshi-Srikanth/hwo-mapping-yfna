import { useState, useEffect } from "react";

type Props = {
  label: string;
  min: number;
  max: number;
  id: string;
  onChange: (value: number) => void;
  defaultValue: number | undefined;
};

export default function RangeItem({
  label,
  min,
  max,
  id,
  onChange,
  defaultValue,
}: Props) {
  const [value, setValue] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseFloat(e.target.value);

    // Ensure the input value is within the valid range
    if (isNaN(newValue)) {
      newValue = min;
    } else if (newValue < min) {
      newValue = min;
    } else if (newValue > max) {
      newValue = max;
    }

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-1 justify-start w-full text-xs">
      <label htmlFor={id} className="text-white">
        {label}
      </label>
      <div className="flex flex-row gap-1 items-center">
        <p>{min}</p>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="flex-grow w-full"
        />
        <p>{max}</p>
      </div>
      {/* Centered input and styled for 10% width */}
      <div className="flex justify-center w-full">
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="w-1/10 text-center mt-1 text-black"
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}
