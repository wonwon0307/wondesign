import {
  useEffect,
  useEffectEvent,
  useMemo,
  useSyncExternalStore,
} from "react";

import { parseBindableShortkey } from "./parse";
import type { BindableShortkey } from "./types/shortkey";

const noopSubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export interface ShortkeyOptions {
  enabled?: boolean;
}

export function useShortkey(
  key: BindableShortkey | null,
  callback: () => void,
  { enabled = true }: ShortkeyOptions = {},
) {
  const onShortkey = useEffectEvent(callback);
  const parsedKeys = useMemo(
    () => (key ? parseBindableShortkey(key) : null),
    [key],
  );
  const hydrated = useHydrated();

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

      if (e.repeat) return;

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
      onShortkey();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [enabled, parsedKeys]);

  if (!parsedKeys) return undefined;
  if (parsedKeys.usesMod && !hydrated) return undefined;

  return { ariaKeyshortcuts: parsedKeys.ariaKeyshortcuts };
}
