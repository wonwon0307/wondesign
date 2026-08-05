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

// Centers the arrow on the content's edge that faces the trigger, straddling
// the boundary - half inside the content (blending into its background),
// half poking out. A square rotated 45deg cut exactly in half this way
// renders as a clean triangular point instead of a diamond floating past
// the edge, touching it at only one corner.
function mainAxisArrowOffset(
  finalPlacement: FloatingPlacement,
  contentRect: DOMRect,
  arrowWidth: number,
  arrowHeight: number,
): number {
  switch (finalPlacement) {
    case "top":
      return contentRect.height - arrowHeight / 2;
    case "bottom":
      // `0 -` rather than unary `-` so a zero-sized arrow yields +0, not -0.
      return 0 - arrowHeight / 2;
    case "left":
      return contentRect.width - arrowWidth / 2;
    case "right":
      return 0 - arrowWidth / 2;
  }
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
  const crossOffset = isVertical
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
  const mainOffset = mainAxisArrowOffset(
    finalPlacement,
    contentRect,
    arrowWidth,
    arrowHeight,
  );

  return isVertical
    ? { x: crossOffset, y: mainOffset }
    : { x: mainOffset, y: crossOffset };
}
