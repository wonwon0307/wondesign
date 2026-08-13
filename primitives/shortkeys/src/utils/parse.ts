import { BASE_KEY_MAP } from "./map";
import type { BaseKey } from "@/types/basekey";
import type { ParsedShortkey, Shortkey } from "@/types/shortkeys";

const VALID_MODIFIERS = new Set([
  "Ctrl",
  "Control",
  "Alt",
  "Opt",
  "Option",
  "Shift",
  "Meta",
  "Cmd",
  "Command",
  "Win",
  "Windows",
  "Mod",
]);

export function parseShortkey(
  shortkey: Shortkey,
  platform: "mac" | "windows" = "windows",
): ParsedShortkey {
  const parts = shortkey.split("+");
  const targetKey = parts.pop() as BaseKey;
  const isMac = platform === "mac";

  const invalidModifier = parts.find((part) => !VALID_MODIFIERS.has(part));
  if (invalidModifier) {
    throw new Error(
      `Invalid shortkey: "${invalidModifier}" is not a supported modifier.`,
    );
  }

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
    if (isMac) {
      metaKey = true;
    } else {
      ctrlKey = true;
    }
  }

  const targetKeyCode = BASE_KEY_MAP[targetKey];

  if (!targetKeyCode) {
    throw new Error(`Invalid shortkey: "${targetKey}" is not a supported key.`);
  }

  return {
    targetKey,
    targetKeyCode,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
  };
}
