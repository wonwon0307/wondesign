import { useEffect, useEffectEvent, useMemo } from "react";

import { useIsApple } from "./isApple";
import { parseBindableShortkey } from "./parse";
import type { BindableShortkey } from "./types/shortkey";

export interface ShortkeyOptions {
  enabled?: boolean;
}

export function useShortkey(
  key: BindableShortkey | null,
  callback: () => void,
  { enabled = true }: ShortkeyOptions = {},
) {
  const onShortkey = useEffectEvent(callback);
  const isApple = useIsApple();
  const parsedKeys = useMemo(
    () => (key ? parseBindableShortkey(key, isApple ?? false) : null),
    [key, isApple],
  );

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
      if (e.repeat) return;
      onShortkey();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [enabled, parsedKeys]);
}
