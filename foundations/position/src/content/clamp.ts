export function clampToViewport(
  value: number,
  contentSize: number,
  viewportSize: number,
  padding: number,
): number {
  // Keeps a coordinate within [padding, viewportSize - contentSize - padding]
  // If the content is too big to fit, it pins to `padding`
  // rather than letting it render off-screen.
  const min = padding;
  const max = viewportSize - contentSize - padding;
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}
