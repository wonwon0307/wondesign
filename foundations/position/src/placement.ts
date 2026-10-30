import type { FloatingOptions, FloatingPlacement } from "./types";

const OPPOSITE: Record<FloatingPlacement, FloatingPlacement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

export function finalizePlacement(
  triggerRect: DOMRect,
  floatingRect: DOMRect,
  options: Required<FloatingOptions>,
): FloatingPlacement {
  const { placement: preferred, forcePlacement } = options;

  // forcePlacement가 true면, 무조건 preferred placement를 사용
  if (forcePlacement) return preferred;

  // preferred에 공간이 충분하다면, preferred 사용
  const preferredSurplus = computeSurplus(
    preferred,
    triggerRect,
    floatingRect,
    options,
  );
  if (preferredSurplus >= 0) return preferred;

  // preferred에 공간이 충분하지 않으면, 반대편에 공간이 충분한지 확인.
  // 양쪽 중 공간이 더 많은 쪽을 사용
  const opposite = OPPOSITE[preferred];
  const oppositeSurplus = computeSurplus(
    opposite,
    triggerRect,
    floatingRect,
    options,
  );

  return oppositeSurplus > preferredSurplus ? opposite : preferred;
}

function computeSurplus(
  side: FloatingPlacement,
  triggerRect: DOMRect,
  floatingRect: DOMRect,
  options: Required<FloatingOptions>,
): number {
  const { offset, padding } = options;
  const needed =
    (side === "top" || side === "bottom"
      ? floatingRect.height
      : floatingRect.width) +
    offset +
    padding;

  // scrollbar 크기를 제외한 viewport를 계산하기 위해
  // window.innerWidth/innerHeight 대신 clientHeight/clientWidth를 사용
  switch (side) {
    case "top":
      return triggerRect.top - needed;
    case "bottom":
      return (
        document.documentElement.clientHeight - triggerRect.bottom - needed
      );
    case "left":
      return triggerRect.left - needed;
    case "right":
      return document.documentElement.clientWidth - triggerRect.right - needed;
  }
}
