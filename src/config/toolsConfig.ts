export const SNR0 = 100;

export const COLOR_UNRELIABLE = "darkred"; // SNR < 3
export const COLOR_MARGINAL_LOW = "red"; // SNR 3 to 5
export const COLOR_MARGINAL_HIGH = "orange"; // SNR 5 to 10
export const COLOR_CLEAR_LOW = "yellow"; // SNR 10 to 20
export const COLOR_CLEAR_HIGH = "green"; // SNR 20 to 50
export const COLOR_VERY_STRONG = "lightgreen"; // SNR > 50

// SNR categories
export const SNR_UNRELIABLE = 3; // SNR < 3: Unreliable detection, indistinguishable from noise.
export const SNR_MARGINAL_LOW = 3; // SNR 3 to 5: Marginal detection, might need follow-up to confirm.
export const SNR_MARGINAL_HIGH = 5; // SNR 5 to 10: Minimum threshold for confident detection.
export const SNR_CLEAR_LOW = 10; // SNR 10 to 20: Clear detection with good confidence.
export const SNR_CLEAR_HIGH = 20; // SNR 20 to 50: High-confidence detection, enabling precise measurements.
export const SNR_VERY_STRONG = 50;
