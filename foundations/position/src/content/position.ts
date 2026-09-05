import type { FloatingOptions, FloatingPlacement } from "@/types";
import { clampToViewport } from "./clamp";
import { getCrossAxisOffset, getMainAxisOffset } from "./offset";

export function getContentPosition(
  finalPlacement: FloatingPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  options: FloatingOptions,
): { x: number; y: number } {
  const { offset = 0, align = "center", padding = 0 } = options;
  const isVertical = finalPlacement === "top" || finalPlacement === "bottom";

  const mainOffset = getMainAxisOffset(
    finalPlacement,
    triggerRect,
    contentRect,
    offset,
  );

  const crossOffset = getCrossAxisOffset(
    align,
    isVertical,
    triggerRect,
    contentRect,
  );

  const x = clampToViewport(
    isVertical ? crossOffset : mainOffset,
    contentRect.width,
    window.innerWidth,
    padding,
  );
  const y = clampToViewport(
    isVertical ? mainOffset : crossOffset,
    contentRect.height,
    window.innerHeight,
    padding,
  );

  return { x, y };
}
