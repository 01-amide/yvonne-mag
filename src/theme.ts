// For places where JS needs a real hex value (math, canvas, confetti arrays).
// Everywhere else, use the CSS variables in index.css.
export const palette = {
  bg: "#140b1f",
  bgDeep: "#0c0614",
  surface: "#1e1230",
  accent: "#a678f0",
  accentDeep: "#7a4bd1",
  accentLight: "#c4a2f7",
  gold: "#e2c27a",
  rec: "#ff3b4e",
  text: "#f3ecfb",
} as const;

export const confettiColors = [
  palette.accent,
  palette.accentLight,
  palette.accentDeep,
  palette.gold,
  "#e8a0f0",
  "#c9a0ff",
];