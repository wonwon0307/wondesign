import { useEffect, useEffectEvent, useRef } from "react";

export interface LongPressOptions {
  enabled?: boolean;
  threshold?: number;
}

export function useLongPress(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  { enabled = true, threshold = 500 }: LongPressOptions = {},
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onLongPress = useEffectEvent(callback);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const clear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const onTouchStart = () => {
      timerRef.current = setTimeout(onLongPress, threshold);
    };

    element.addEventListener("touchstart", onTouchStart);
    element.addEventListener("touchend", clear);
    element.addEventListener("touchmove", clear);
    element.addEventListener("touchcancel", clear);

    return () => {
      clear(); // 타이머 정리
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchend", clear);
      element.removeEventListener("touchmove", clear);
      element.removeEventListener("touchcancel", clear);
    };
  }, [ref, enabled, threshold]);
}
