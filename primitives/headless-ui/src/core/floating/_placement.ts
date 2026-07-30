import type { FloatingOptions, FloatingPlacement } from "./types";

const OPPOSITE: Record<FloatingPlacement, FloatingPlacement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

// Remaining space on `side` once the content, offset, and padding are subtracted.
// Positive = fits with that much room to spare; negative = overflows by that much.
function surplus(
  side: FloatingPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  { offset = 0, padding = 0 }: Pick<FloatingOptions, "offset" | "padding">,
): number {
  const needed =
    (side === "top" || side === "bottom"
      ? contentRect.height
      : contentRect.width) +
    offset +
    padding;

  switch (side) {
    case "top":
      return triggerRect.top - needed;
    case "bottom":
      return window.innerHeight - triggerRect.bottom - needed;
    case "left":
      return triggerRect.left - needed;
    case "right":
      return window.innerWidth - triggerRect.right - needed;
  }
}

export function finalizePlacement(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  options: FloatingOptions,
): FloatingPlacement {
  const { placement: preferred = "bottom", forcePlacement = false } = options;

  if (forcePlacement) return preferred;

  const preferredSurplus = surplus(
    preferred,
    triggerRect,
    contentRect,
    options,
  );
  if (preferredSurplus >= 0) return preferred;

  // Preferred side overflows - flip only if the opposite side genuinely has more
  // room, even if it doesn't fully fit either (never flip into a side that's
  // equally or more cramped).
  const opposite = OPPOSITE[preferred];
  const oppositeSurplus = surplus(opposite, triggerRect, contentRect, options);

  return oppositeSurplus > preferredSurplus ? opposite : preferred;
}
