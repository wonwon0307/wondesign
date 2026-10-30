import type { FloatingPlacement, Position } from "./types";

export function getArrowPosition(
  finalPlacement: FloatingPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  contentPosition: Position,
  arrowEl: HTMLElement | null,
): Position {
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

function getMainAxisOffset(
  finalPlacement: FloatingPlacement,
  contentRect: DOMRect,
  arrowWidth: number,
  arrowHeight: number,
) {
  // arrow의 main axis offset는 trigger와 content 사이의 간격을 고려하여 계산한다
  switch (finalPlacement) {
    case "top":
      // arrow가 content의 아래쪽에 위치한다.
      // 따라서, arrow의 main axis offset는 content의 높이에서 arrow의 높이를 뺀 값이다.
      return contentRect.height - arrowHeight / 2;
    case "bottom":
      return 0 - arrowHeight / 2;
    case "left":
      return contentRect.width - arrowWidth / 2;
    case "right":
      return 0 - arrowWidth / 2;
  }
}

function getCrossAxisOffset(
  triggerStart: number,
  triggerSize: number,
  contentStart: number,
  contentSize: number,
  arrowSize: number,
): number {
  const triggerCenter = triggerStart + triggerSize / 2;

  // natural offset는 trigger의 center와 arrow의 center가 일치하는 값
  const naturalOffset = triggerCenter - contentStart - arrowSize / 2;
  // max offset는 arrow가 content의 테두리를 벗어나지 않도록 하는 값
  const maxOffset = contentSize - arrowSize;

  // 최종 offset는 natural offset을 max offset 범위 내로 제한한 값
  return Math.max(0, Math.min(naturalOffset, maxOffset));
}
