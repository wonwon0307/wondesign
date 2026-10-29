import { useEffect, useEffectEvent } from "react";

export interface EscapeKeyOptions {
  enabled?: boolean;
}

export function useEscapeKey(
  callback: () => void,
  { enabled = true }: EscapeKeyOptions = {},
) {
  const onEscape = useEffectEvent(callback);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.repeat) return;

      if (event.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);
}
