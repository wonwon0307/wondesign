import { useEffect, useEffectEvent, useRef } from "react";

export interface ClickOutsideOptions {
  enabled?: boolean;
  excludeRef?: React.RefObject<HTMLElement | null>;
}

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  { enabled = true, excludeRef }: ClickOutsideOptions = {},
) {
  const downRef = useRef<boolean>(false);
  const onPointerUp = useEffectEvent(callback);

  useEffect(() => {
    const activationQuery = (target: Node) => {
      return (
        ref.current?.contains(target) || excludeRef?.current?.contains(target)
      );
    };

    const handleDown = (event: Event) => {
      downRef.current = !activationQuery(event.target as Node);
    };

    const handleUp = (event: Event) => {
      if (downRef.current && !activationQuery(event.target as Node)) {
        onPointerUp();
      }

      // 초기화
      downRef.current = false;
    };

    if (!enabled) return;

    document.addEventListener("pointerdown", handleDown);
    document.addEventListener("pointerup", handleUp);

    return () => {
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
    };
  }, [ref, enabled, excludeRef]);
}
