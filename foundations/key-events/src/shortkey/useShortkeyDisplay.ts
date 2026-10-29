import { useMemo } from "react";

import { parseShortkey } from "./parse";
import { useIsApple } from "./isApple";
import type { BaseKey } from "./types/basekey";
import type { Shortkey } from "./types/shortkey";

const ARIA_KEY_NAMES: Partial<Record<BaseKey, string>> = {
  Return: "Enter",
  "↑": "ArrowUp",
  "↓": "ArrowDown",
  "←": "ArrowLeft",
  "→": "ArrowRight",
};

export interface ShortkeyDisplay {
  keys: string[];
  label: string;
  keyShortcuts: string;
}

export function useShortkeyDisplay(
  shortkey: Shortkey | null,
): ShortkeyDisplay | undefined {
  const isApple = useIsApple();

  const display = useMemo(() => {
    if (!shortkey) return null;

    const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parseShortkey(
      shortkey,
      isApple ?? false,
    );

    const modifiers = isApple
      ? [
          ctrlKey && { glyph: "⌃", label: "Control" },
          altKey && { glyph: "⌥", label: "Option" },
          shiftKey && { glyph: "⇧", label: "Shift" },
          metaKey && { glyph: "⌘", label: "Command" },
        ]
      : [
          metaKey && { glyph: "Win", label: "Windows" },
          ctrlKey && { glyph: "Ctrl", label: "Control" },
          altKey && { glyph: "Alt", label: "Alt" },
          shiftKey && { glyph: "Shift", label: "Shift" },
        ];

    const parts = modifiers.filter(Boolean) as {
      glyph: string;
      label: string;
    }[];

    const ariaParts: string[] = [];
    if (ctrlKey) ariaParts.push("Control");
    if (altKey) ariaParts.push("Alt");
    if (shiftKey) ariaParts.push("Shift");
    if (metaKey) ariaParts.push("Meta");
    ariaParts.push(ARIA_KEY_NAMES[targetKey] ?? targetKey);

    return {
      keys: [...parts.map((part) => part.glyph), targetKey],
      label: [...parts.map((part) => part.label), targetKey].join(" "),
      keyShortcuts: ariaParts.join("+"),
    };
  }, [shortkey, isApple]);

  if (!display) return undefined;
  if (isApple === undefined && display.keys.length > 1) return undefined;

  return display;
}
