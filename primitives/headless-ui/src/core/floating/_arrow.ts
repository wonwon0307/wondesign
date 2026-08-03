import type { FloatingPlacement } from "./types";

// Centers the arrow on the trigger, clamped so it never slides past the content's own edges.
function clampArrowOffset(
  triggerStart: number,
  triggerSize: number,
  contentStart: number,
  contentSize: number,
  arrowSize: number,
): number {
  const natural = triggerStart + triggerSize / 2 - contentStart - arrowSize / 2;
  return Math.max(0, Math.min(natural, contentSize - arrowSize));
}

export function computeArrowPosition(
  finalPlacement: FloatingPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  // The content's newly computed position, not its current on-screen position -
  // contentRect.left/top would reflect where the box currently is, one frame
  // behind the position it's about to be moved to this same update.
  contentPosition: { x: number; y: number },
  arrowEl: HTMLElement | null,
): { x: number; y: number } {
  if (!arrowEl) return { x: 0, y: 0 };

  // offsetWidth/offsetHeight, not getBoundingClientRect - the latter reflects the
  // element's bounding box *after* any CSS transform (rotate/scale/skew), which
  // would throw off the size reported for a visually transformed arrow.
  const arrowWidth = arrowEl.offsetWidth;
  const arrowHeight = arrowEl.offsetHeight;

  const isVertical = finalPlacement === "top" || finalPlacement === "bottom";
  const offset = isVertical
    ? clampArrowOffset(
        triggerRect.left,
        triggerRect.width,
        contentPosition.x,
        contentRect.width,
        arrowWidth,
      )
    : clampArrowOffset(
        triggerRect.top,
        triggerRect.height,
        contentPosition.y,
        contentRect.height,
        arrowHeight,
      );

  return isVertical ? { x: offset, y: 0 } : { x: 0, y: offset };
}
