import type {
  FloatingAlign,
  FloatingOptions,
  FloatingPlacement,
  Position,
} from "./types";

export function getContentPosition(
  finalPlacement: FloatingPlacement,
  triggerRect: DOMRect,
  contentRect: DOMRect,
  { offset, align, padding }: Required<FloatingOptions>,
): Position {
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

  // main axis는 clamp하지 않는다. trigger가 화면 밖으로 나가면 content도 함께 나가야 하고,
  // 양쪽 모두 공간이 부족해도 content가 trigger를 가리면 안 되기 때문이다.
  // viewport 크기는 스크롤바를 제외하기 위해 documentElement의 client 크기를 사용한다.
  const clampedCrossOffset = isVertical
    ? clampToViewport(
        crossOffset,
        contentRect.width,
        document.documentElement.clientWidth,
        padding,
      )
    : clampToViewport(
        crossOffset,
        contentRect.height,
        document.documentElement.clientHeight,
        padding,
      );

  return isVertical
    ? { x: clampedCrossOffset, y: mainOffset }
    : { x: mainOffset, y: clampedCrossOffset };
}

function clampToViewport(
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

function getMainAxisOffset(
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

function getCrossAxisOffset(
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
