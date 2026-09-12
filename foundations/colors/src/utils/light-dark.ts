import type { SemanticColors } from "../types";

export function convertToLightDark(
  lightColors: SemanticColors,
  darkColors: SemanticColors,
): SemanticColors {
  const lightDarkColors: Record<string, string> = {};

  for (const key in lightColors) {
    const lightValue = lightColors[key as keyof SemanticColors];
    const darkValue = darkColors[key as keyof SemanticColors];

    lightDarkColors[key] = `light-dark(${lightValue}, ${darkValue})`;
  }

  return lightDarkColors as unknown as SemanticColors;
}
