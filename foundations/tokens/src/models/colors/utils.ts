import type { ColorTokens } from "./types";

interface ColorWithOpacityOptions {
  colorSpace?: string;
}

interface ColorWithFadeOptions extends ColorWithOpacityOptions {
  base?: string;
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function colorWithFade(
  color: string,
  ratio: number,
  {
    base = "light-dark(#ffffff, #000000)",
    colorSpace = "srgb",
  }: ColorWithFadeOptions = {},
) {
  const percent = clamp(ratio) * 100;

  return `color-mix(in ${colorSpace}, ${color} ${percent}%, ${base})`;
}

export function colorWithOpacity(
  color: string,
  opacity: number,
  { colorSpace }: ColorWithOpacityOptions = {},
) {
  return colorWithFade(color, opacity, { base: "transparent", colorSpace });
}

export function mergeLightDark<T extends ColorTokens>(
  lightColors: T,
  darkColors: T,
): { [K in keyof T]: string } {
  const lightDarkColors = {} as { [K in keyof T]: string };

  for (const key in lightColors) {
    const light = lightColors[key] as string;
    const dark = darkColors[key] as string;

    lightDarkColors[key] = `light-dark(${light}, ${dark})`;
  }

  return lightDarkColors;
}
