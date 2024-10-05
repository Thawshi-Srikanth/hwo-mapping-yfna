import * as React from "react";
import { Range, getTrackBackground } from "react-range";
import MinMaxType from "../../types/MinMaxType";

const TwoThumbsRangeItem: React.FC<{
  rtl: boolean;
  min: number;
  max: number;
  step: number;
  label: string;
  id: string;
  onChange: (value: MinMaxType) => void;
  defaultMin: number;
  defaultMax: number;
}> = ({ rtl, min, max, step, label, id, onChange, defaultMin, defaultMax }) => {
  const [values, setValues] = React.useState([defaultMin, defaultMax]);

  const handleInputChange = (index: number, newValue: string) => {
    const value = Math.max(min, Math.min(max, parseFloat(newValue) || 0)); // Ensure value is within bounds
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange({ min: newValues[0], max: newValues[1] });
  };

  const handleRangeChange = (newValues: number[]) => {
    setValues(newValues);
    onChange({ min: newValues[0], max: newValues[1] }); // Call parent's onChange with new values
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        fontSize: "0.75rem",
        lineHeight: "1rem",
        marginTop: "0.7rem",
        width: "100%",
      }}
    >
      <label htmlFor={id} className="text-white">
        {label}
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Range
          values={values}
          step={step}
          min={min}
          max={max}
          rtl={rtl}
          onChange={handleRangeChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "25px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#548BF4", "#ccc"],
                    min: min,
                    max: max,
                    rtl,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "10px",
                width: "8px",
                borderRadius: "1px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC",
                }}
              />
            </div>
          )}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1px",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          <p
            style={{
              color: "white",
              marginRight: "5px",
            }}
          >
            min:
          </p>
          <input
            type="number"
            value={values[0]}
            min={min}
            max={max}
            step={step}
            onChange={(e) => handleInputChange(0, e.target.value)}
            style={{ width: "60px", fontSize: "0.75rem", lineHeight: "1rem" }}
          />
          <p
            style={{
              color: "white",
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            max:
          </p>
          <input
            type="number"
            value={values[1]}
            min={min}
            max={max}
            step={step}
            onChange={(e) => handleInputChange(1, e.target.value)}
            style={{ width: "60px", fontSize: "0.75rem", lineHeight: "1rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TwoThumbsRangeItem;
