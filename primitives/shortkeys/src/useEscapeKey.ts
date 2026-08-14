import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Calls `callback` when the Escape key is pressed.
 *
 * @param callback - Called when Escape is pressed. Stable across renders — no need to wrap in `useCallback`.
 * @param enabled - Whether the listener is active. Defaults to `true`.
 */
export function useEscapeKey(callback: () => void, enabled = true) {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        callbackRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);
}
