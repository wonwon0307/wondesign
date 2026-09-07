import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

import { parseShortkey } from "./shortkey/parse";
import type { BindableShortkey } from "./shortkey/types";

const noopSubscribe = () => () => {};

/**
 * `false` on the server and during the hydration render, `true` afterwards.
 * Lets a value that differs between server and client be withheld until the
 * client has taken over, without tripping a hydration mismatch.
 */
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

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
 * @returns An object `{ ariaKeyshortcuts }` holding the formatted string for the
 *          `aria-keyshortcuts` attribute, or `undefined` when `key` is `null`.
 *          For `Mod`-based shortkeys the value resolves per platform (`Meta` on
 *          Apple, `Control` elsewhere), so it is `undefined` on the server and
 *          during hydration and only becomes available once mounted on the client.
 */
export function useShortkey(
  key: BindableShortkey | null,
  callback: () => void,
  enabled: boolean = true,
) {
  const callbackRef = useRef(callback);
  const parsedKeys = useMemo(() => (key ? parseShortkey(key) : null), [key]);
  const hydrated = useHydrated();

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

  if (!parsedKeys) return undefined;
  if (parsedKeys.usesMod && !hydrated) return undefined;

  return { ariaKeyshortcuts: parsedKeys.ariaKeyshortcuts };
}
