import type { FloatingAlign, FloatingPlacement } from "@/types";

export function getCrossAxisOffset(
  align: FloatingAlign,
  isVertical: boolean,
  triggerRect: DOMRect,
  contentRect: DOMRect,
): number {
  // content의 시작점을 align에 맞게 offset을 주려면
  // start인 경우 trigger의 시작점에 단순히 맞추면 되고,
  // end인 경우 trigger의 끝점 - content의 길이만큼,
  // center인 경우 trigger의 시작점 + (trigger의 길이 - content의 길이) / 2
  if (isVertical) {
    switch (align) {
      case "start":
        return triggerRect.left;
      case "end":
        return triggerRect.right - contentRect.width;
      case "center":
        return triggerRect.left + (triggerRect.width - contentRect.width) / 2;
    }
  }

  switch (align) {
    case "start":
      return triggerRect.top;
    case "end":
      return triggerRect.bottom - contentRect.height;
    case "center":
      return triggerRect.top + (triggerRect.height - contentRect.height) / 2;
  }
}

export function getMainAxisOffset(
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
