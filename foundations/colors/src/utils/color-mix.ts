function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function colorWithFade(
  color: string,
  ratio: number,
  base: string = "light-dark(#ffffff, #000000)",
) {
  const percent = clamp(ratio) * 100;

  return `color-mix(in srgb, ${color} ${percent}%, ${base})`;
}

export function colorWithOpacity(color: string, opacity: number) {
  return colorWithFade(color, opacity, "transparent");
}
