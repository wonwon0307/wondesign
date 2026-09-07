import { useCallback, useLayoutEffect, useState } from "react";

import { getArrowPosition } from "./arrow/position";
import { getContentPosition } from "./content/position";
import { finalizePlacement } from "./placement";
import type {
  FloatingOptions,
  FloatingPlacement,
  FloatingPositions,
  Position,
} from "./types";

export function useFloatingPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  floatingRef: React.RefObject<HTMLElement | null>,
  arrowRef: React.RefObject<HTMLElement | null>,
  options: FloatingOptions,
  isOpen: boolean = false,
): FloatingPositions {
  // options는 호출부에서 인라인 객체로 넘어오는 경우가 많다. 참조 안정성에
  // 의존하지 않도록 원시값으로 분해해서 아래 deps에 사용한다.
  const {
    placement: preferredPlacement = "bottom",
    forcePlacement = false,
    align = "center",
    offset = 0,
    padding = 0,
  } = options;

  const [placement, setPlacement] = useState<FloatingPlacement>("bottom");
  const [content, setContent] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [arrow, setArrow] = useState<Position>({
    x: 0,
    y: 0,
  });

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !floatingRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = floatingRef.current.getBoundingClientRect();

    const resolvedOptions: Required<FloatingOptions> = {
      placement: preferredPlacement,
      forcePlacement,
      align,
      offset,
      padding,
    };

    // forcePlacement가 true이면 preferredPlacement를 그대로 사용, 아니면 계산
    const finalPlacement = finalizePlacement(
      triggerRect,
      contentRect,
      resolvedOptions,
    );
    const contentPosition = getContentPosition(
      finalPlacement,
      triggerRect,
      contentRect,
      resolvedOptions,
    );

    const { x: arrowX, y: arrowY } = getArrowPosition(
      finalPlacement,
      triggerRect,
      contentRect,
      contentPosition,
      arrowRef.current,
    );
    setPlacement(finalPlacement);
    setContent(contentPosition);
    setArrow({ x: arrowX, y: arrowY });
  }, [
    triggerRef,
    floatingRef,
    arrowRef,
    preferredPlacement,
    forcePlacement,
    align,
    offset,
    padding,
  ]);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !floatingRef.current) {
      // arrow는 없더라도 floating의 위치를 계산해야 한다
      return;
    }

    // initial position update
    updatePosition();

    // update position on window resize and scroll
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, {
      passive: true,
      capture: true,
    });

    // add trigger, content, and arrow resize observers
    const observer = new ResizeObserver(updatePosition);
    observer.observe(triggerRef.current);
    observer.observe(floatingRef.current);
    if (arrowRef.current) observer.observe(arrowRef.current);

    // cleanup
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, { capture: true });
      observer.disconnect();
    };
  }, [isOpen, triggerRef, floatingRef, arrowRef, updatePosition]);

  return { placement, content, arrow };
}
