import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { usePlatform } from "@wondesign/platform";

import type { Shortkey } from "./types/shortkeys";
import { parseShortkeyInternal } from "./utils/parse";

/**
 * Registers a global keyboard shortkey and calls `callback` when it is pressed.
 *
 * Shortkey format: `"Mod+K"`, `"Shift+Alt+S"`, `"/"`.
 * `Mod` resolves to `Cmd` on Mac and `Ctrl` on Windows/Linux.
 *
 * The listener is automatically skipped when focus is inside an `<input>`,
 * `<textarea>`, or `contenteditable` element — unless the shortkey includes
 * `Mod` or `Ctrl`, in which case it is safe to fire regardless.
 *
 * @param key - The shortkey string, e.g. `"Mod+K"` or `"Shift+/"`. Pass `null` to disable entirely.
 * @param callback - Called when the shortkey is matched. Stable across renders — no need to wrap in `useCallback`.
 * @param options - Optional configuration.
 * @returns `ariaKeyshortcuts` — the formatted value for the `aria-keyshortcuts` attribute, or `undefined` when `key` is `null`.
 */
export function useKeyboardShortkey(
  key: Shortkey | null,
  callback: () => void,
  enabled: boolean = true,
) {
  const callbackRef = useRef(callback);
  const platform = usePlatform();
  const parsedKeys = useMemo(
    () => (key ? parseShortkeyInternal(key, platform) : null),
    [key, platform],
  );

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!enabled || !parsedKeys) return;

    const { targetKeyCode, ctrlKey, altKey, shiftKey, metaKey } = parsedKeys;
    const hasCommandModifier = metaKey || ctrlKey;

    const handler = (e: KeyboardEvent) => {
      if (e.code !== targetKeyCode) return;
      if (metaKey !== e.metaKey) return;
      if (ctrlKey !== e.ctrlKey) return;
      if (altKey !== e.altKey) return;
      if (shiftKey !== e.shiftKey) return;

      if (!hasCommandModifier) {
        const active = document.activeElement;
        const tag = active?.tagName.toLowerCase();

        if (
          tag === "input" ||
          tag === "textarea" ||
          tag === "select" ||
          (active as HTMLElement)?.isContentEditable
        )
          return;
      }

      e.preventDefault();
      callbackRef.current();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [enabled, parsedKeys]);
}
