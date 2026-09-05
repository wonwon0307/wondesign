import type { FloatingPlacement } from "@/types";
import { getCrossAxisOffset, getMainAxisOffset } from "./offset";

export function getArrowPosition(
  finalPlacement: FloatingPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  contentPosition: { x: number; y: number },
  arrowEl: HTMLElement | null,
): { x: number; y: number } {
  if (!arrowEl) return { x: 0, y: 0 };

  // getBoundingClientRect는 CSS transform(rotate/scale/skew)
  // 이후의 bounding box를 반영하기 때문에
  // 정확한 arrow의 크기를 얻기 위해서 offsetWidth와 offsetHeight를 사용한다.
  const arrowWidth = arrowEl.offsetWidth;
  const arrowHeight = arrowEl.offsetHeight;

  const isVertical = finalPlacement === "top" || finalPlacement === "bottom";
  const crossOffset = isVertical
    ? getCrossAxisOffset(
        triggerRect.left,
        triggerRect.width,
        contentPosition.x,
        contentRect.width,
        arrowWidth,
      )
    : getCrossAxisOffset(
        triggerRect.top,
        triggerRect.height,
        contentPosition.y,
        contentRect.height,
        arrowHeight,
      );
  const mainOffset = getMainAxisOffset(
    finalPlacement,
    contentRect,
    arrowWidth,
    arrowHeight,
  );

  return isVertical
    ? { x: crossOffset, y: mainOffset }
    : { x: mainOffset, y: crossOffset };
}
