import { useEffect, useEffectEvent, useRef } from "react";

export interface LongPressOptions {
  enabled?: boolean;
  threshold?: number;
  moveTolerance?: number;
}

export function useLongPress(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  {
    enabled = true,
    threshold = 500,
    moveTolerance = 10,
  }: LongPressOptions = {},
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onLongPress = useEffectEvent(callback);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    let start: { x: number; y: number } | null = null;

    const clear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      start = null;
    };

    const onTouchStart = (event: TouchEvent) => {
      clear();

      // 두 손가락 이상(핀치 등)은 길게 누르기로 보지 않는다.
      if (event.touches.length > 1) return;

      const touch = event.touches[0];
      if (touch) start = { x: touch.clientX, y: touch.clientY };
      timerRef.current = setTimeout(onLongPress, threshold);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!start || !touch) return;

      const distance = Math.hypot(
        touch.clientX - start.x,
        touch.clientY - start.y,
      );
      if (distance > moveTolerance) clear();
    };

    element.addEventListener("touchstart", onTouchStart, { passive: true });
    element.addEventListener("touchend", clear);
    element.addEventListener("touchmove", onTouchMove, { passive: true });
    element.addEventListener("touchcancel", clear);

    return () => {
      clear(); // 타이머 정리
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchend", clear);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchcancel", clear);
    };
  }, [ref, enabled, threshold, moveTolerance]);
}
