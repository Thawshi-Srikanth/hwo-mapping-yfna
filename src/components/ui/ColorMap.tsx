import {
  COLOR_CLEAR_HIGH,
  COLOR_CLEAR_LOW,
  COLOR_MARGINAL_HIGH,
  COLOR_MARGINAL_LOW,
  COLOR_UNRELIABLE,
  COLOR_VERY_STRONG,
} from "../../config/toolsConfig";

type Props = {};

export default function ColorMap({}: Props) {
  return (
    <div className="absolute flex flex-row justify-center items-center bottom-5 left-auto z-30 w-screen text-white p-1">
      <ul className="flex flex-row gap-2 text-xs  p-1 bg-black hover:text-sm">
        <li>
          <p>
            <span
              style={{
                backgroundColor: COLOR_UNRELIABLE,
                borderRadius: "50%",
                display: "inline-block",
                height: "0.8em",
                width: "0.8em",
                marginRight: "0.2em",
              }}
            ></span>
            snr {"<"} 3
          </p>
        </li>
        <li>
          <p>
            <span
              style={{
                backgroundColor: COLOR_MARGINAL_LOW,
                borderRadius: "50%",
                display: "inline-block",
                height: "0.8em",
                width: "0.8em",
                marginRight: "0.2em",
              }}
            ></span>
            3 {">="} snr {"<"} 5
          </p>
        </li>
        <li>
          <p>
            <span
              style={{
                backgroundColor: COLOR_MARGINAL_HIGH,
                borderRadius: "50%",
                display: "inline-block",
                height: "0.8em",
                width: "0.8em",
                marginRight: "0.2em",
              }}
            ></span>
            5 {">="} snr {"<"} 10
          </p>
        </li>
        <li>
          <p>
            <span
              style={{
                backgroundColor: COLOR_CLEAR_LOW,
                borderRadius: "50%",
                display: "inline-block",
                height: "0.8em",
                width: "0.8em",
                marginRight: "0.2em",
              }}
            ></span>
            10 {">="} snr {"<"} 20
          </p>
        </li>
        <li>
          <p>
            <span
              style={{
                backgroundColor: COLOR_CLEAR_HIGH,
                borderRadius: "50%",
                display: "inline-block",
                height: "0.8em",
                width: "0.8em",
                marginRight: "0.2em",
              }}
            ></span>
            20 {">="} snr {"<"} 50
          </p>
        </li>
        <li>
          <p>
            <span
              style={{
                backgroundColor: COLOR_VERY_STRONG,
                borderRadius: "50%",
                display: "inline-block",
                height: "0.8em",
                width: "0.8em",
                marginRight: "0.2em",
              }}
            ></span>
            snr {">="} 50
          </p>
        </li>
      </ul>
    </div>
  );
}
