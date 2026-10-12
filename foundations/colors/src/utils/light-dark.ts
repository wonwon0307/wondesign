import type { SemanticColors } from "../types";

export function mergeLightDark<T extends SemanticColors>(
  lightColors: T,
  darkColors: T,
): { [K in keyof T]: string } {
  const lightDarkColors = {} as { [K in keyof T]: string };

  for (const key in lightColors) {
    lightDarkColors[key] =
      `light-dark(${lightColors[key]}, ${darkColors[key]})`;
  }

  return lightDarkColors;
}
