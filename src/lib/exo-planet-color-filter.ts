import {
  SNR_UNRELIABLE,
  COLOR_UNRELIABLE,
  SNR_MARGINAL_LOW,
  SNR_MARGINAL_HIGH,
  COLOR_MARGINAL_LOW,
  SNR_CLEAR_LOW,
  COLOR_MARGINAL_HIGH,
  SNR_CLEAR_HIGH,
  COLOR_CLEAR_HIGH,
  COLOR_VERY_STRONG,
  SNR_VERY_STRONG,
  COLOR_CLEAR_LOW,
} from "../config/toolsConfig";

export const getPlanetColorBySNR = (snr: number): string => {
  if (snr < SNR_UNRELIABLE) {
    return COLOR_UNRELIABLE;
  } else if (snr >= SNR_MARGINAL_LOW && snr < SNR_MARGINAL_HIGH) {
    return COLOR_MARGINAL_LOW;
  } else if (snr >= SNR_MARGINAL_HIGH && snr < SNR_CLEAR_LOW) {
    return COLOR_MARGINAL_HIGH;
  } else if (snr >= SNR_CLEAR_LOW && snr < SNR_CLEAR_HIGH) {
    return COLOR_CLEAR_LOW;
  } else if (snr >= SNR_CLEAR_HIGH && snr < SNR_VERY_STRONG) {
    return COLOR_CLEAR_HIGH;
  } else {
    return COLOR_VERY_STRONG;
  }
};
