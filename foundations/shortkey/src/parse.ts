import { isApple } from "./isApple";
import type { BaseKey } from "./types/basekey";
import type { ParsedShortkey, Shortkey } from "./types/shortkey";

export function parseShortkey(shortkey: Shortkey): ParsedShortkey {
  const parts = shortkey.split("+");
  const targetKey = parts.pop() as BaseKey;

  let ctrlKey = parts.includes("Ctrl") || parts.includes("Control");
  const altKey =
    parts.includes("Alt") || parts.includes("Opt") || parts.includes("Option");
  const shiftKey = parts.includes("Shift");

  let metaKey =
    parts.includes("Meta") ||
    parts.includes("Cmd") ||
    parts.includes("Command") ||
    parts.includes("Win") ||
    parts.includes("Windows");

  if (parts.includes("Mod")) {
    if (isApple()) {
      metaKey = true;
    } else {
      ctrlKey = true;
    }
  }

  return {
    targetKey,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
  };
}
