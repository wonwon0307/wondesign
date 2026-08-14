import { BASE_KEY_MAP } from "./map";
import type { FullBaseKey, BaseKey } from "@/types/basekey";
import type {
  FullShortkey,
  ParsedShortkey,
  ParsedShortkeyInternal,
  Shortkey,
} from "@/types/shortkeys";

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
  key: FullShortkey,
  platform: "mac" | "windows" = "windows",
): ParsedShortkey {
  const parts = key.split("+");
  const targetKey = parts.pop() as FullBaseKey;
  const isMac = platform === "mac";

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

  return {
    targetKey,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
  };
}

export function parseShortkeyInternal(
  shortkey: Shortkey,
  platform: "mac" | "windows" = "windows",
): ParsedShortkeyInternal {
  const modifierParts = shortkey.split("+");
  modifierParts.pop();

  const invalidModifier = modifierParts.find(
    (part) => !VALID_MODIFIERS.has(part),
  );
  if (invalidModifier) {
    throw new Error(
      `Invalid shortkey: "${invalidModifier}" is not a supported modifier.`,
    );
  }

  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parseShortkey(
    shortkey,
    platform,
  );

  const targetKeyCode = BASE_KEY_MAP[targetKey as BaseKey];
  if (!targetKeyCode) {
    throw new Error(`Invalid shortkey: "${targetKey}" is not a supported key.`);
  }

  return {
    targetKey: targetKey as BaseKey,
    targetKeyCode,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
  };
}
