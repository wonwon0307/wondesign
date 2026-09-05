import type {
  FloatingAlign,
  FloatingOptions,
  FloatingPlacement,
} from "./types";

// Where the cross axis starts, given how the content should align to the trigger.
function alignOffset(
  align: FloatingAlign,
  triggerStart: number,
  triggerSize: number,
  contentSize: number,
): number {
  switch (align) {
    case "start":
      return triggerStart;
    case "end":
      return triggerStart + triggerSize - contentSize;
    case "center":
      return triggerStart + (triggerSize - contentSize) / 2;
  }
}

// Where the main axis starts, given which side the content is placed on.
function mainAxisOffset(
  finalPlacement: FloatingPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  offset: number,
): number {
  switch (finalPlacement) {
    case "top":
      return triggerRect.top - contentRect.height - offset;
    case "bottom":
      return triggerRect.bottom + offset;
    case "left":
      return triggerRect.left - contentRect.width - offset;
    case "right":
      return triggerRect.right + offset;
  }
}

// Keeps a coordinate within [padding, viewportSize - contentSize - padding]. If the
// content is too big to fit at all (max < min), pins to `padding` rather than
// letting it render off-screen.
function clampToViewport(
  value: number,
  contentSize: number,
  viewportSize: number,
  padding: number,
): number {
  const min = padding;
  const max = viewportSize - contentSize - padding;
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}

export function computeFloatingPosition(
  finalPlacement: FloatingPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  {
    offset = 0,
    align = "center",
    padding = 0,
  }: Pick<FloatingOptions, "offset" | "align" | "padding">,
): { x: number; y: number } {
  const isVertical = finalPlacement === "top" || finalPlacement === "bottom";

  const main = mainAxisOffset(finalPlacement, triggerRect, contentRect, offset);

  const cross = isVertical
    ? alignOffset(align, triggerRect.left, triggerRect.width, contentRect.width)
    : alignOffset(
        align,
        triggerRect.top,
        triggerRect.height,
        contentRect.height,
      );

  const x = clampToViewport(
    isVertical ? cross : main,
    contentRect.width,
    window.innerWidth,
    padding,
  );
  const y = clampToViewport(
    isVertical ? main : cross,
    contentRect.height,
    window.innerHeight,
    padding,
  );

  return { x, y };
}
