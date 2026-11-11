import { useEffect, useEffectEvent } from "react";

export interface EscapeKeyOptions {
  enabled?: boolean;
  scopeRef?: React.RefObject<HTMLElement | null>;
}

export function useEscapeKey(
  callback: () => void,
  { enabled = true, scopeRef }: EscapeKeyOptions = {},
) {
  const onEscape = useEffectEvent(callback);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.repeat) return;

      // scopeRef가 주어지면, 포커스가 그 안에 있을 때만 반응한다.
      if (scopeRef && !scopeRef.current?.contains(document.activeElement)) {
        return;
      }

      if (event.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, scopeRef]);
}
