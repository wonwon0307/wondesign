import { useCallback, useLayoutEffect, useState } from "react";

import { computeArrowPosition } from "./_arrow";
import { computeFloatingPosition } from "./_floating";
import { finalizePlacement } from "./_placement";
import type { ArrowPosition, FloatingOptions, FloatingPosition } from "./types";

export function useFloating(
  triggerRef: React.RefObject<HTMLElement | null>,
  floatingRef: React.RefObject<HTMLElement | null>,
  arrowRef: React.RefObject<HTMLElement | null>,
  options: FloatingOptions,
  isOpen: boolean = false,
): { floating: FloatingPosition; arrow: ArrowPosition } {
  const [position, setPosition] = useState<FloatingPosition>({
    x: 0,
    y: 0,
    placement: "bottom",
  });
  const [arrowPosition, setArrowPosition] = useState<ArrowPosition>({
    x: 0,
    y: 0,
  });

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !floatingRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = floatingRef.current.getBoundingClientRect();

    // forcePlacement가 true이면 preferredPlacement를 그대로 사용, 아니면 계산
    const finalPlacement = finalizePlacement(triggerRect, contentRect, options);
    const { x, y } = computeFloatingPosition(
      finalPlacement,
      triggerRect,
      contentRect,
      options,
    );
    setPosition({
      x,
      y,
      placement: finalPlacement,
    });

    const { x: arrowX, y: arrowY } = computeArrowPosition(
      finalPlacement,
      triggerRect,
      contentRect,
      { x, y },
      arrowRef.current,
    );
    setArrowPosition({ x: arrowX, y: arrowY });
  }, [triggerRef, floatingRef, arrowRef, options]);

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

  return { floating: position, arrow: arrowPosition };
}
