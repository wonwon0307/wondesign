import { BASE_KEY_MAP } from "./map";
import type { BaseKey, BindableBaseKey } from "./types/basekey";
import type {
  ParsedBindableShortkey,
  ParsedShortkey,
  Shortkey,
} from "./types/shortkey";

function isApple() {
  if (typeof navigator !== "undefined") {
    return /Mac|iPhone|iPad|iPod/.test(
      navigator.platform || navigator.userAgent,
    );
  }
  return false;
}

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

export function parseBindableShortkey(
  shortkey: Shortkey,
): ParsedBindableShortkey | null {
  const modifierParts = shortkey.split("+");
  modifierParts.pop();

  const invalidModifier = modifierParts.find(
    (part: string) => !VALID_MODIFIERS.has(part),
  );
  if (invalidModifier) {
    console.warn(
      `Invalid shortkey: "${invalidModifier}" is not a supported modifier.`,
    );

    return null;
  }

  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } =
    parseShortkey(shortkey);

  const targetKeyCode = BASE_KEY_MAP[targetKey as BindableBaseKey];
  if (!targetKeyCode) {
    console.warn(`Invalid shortkey: "${targetKey}" is not a supported key.`);

    return null;
  }

  const parts: string[] = [];
  if (ctrlKey) parts.push("Control");
  if (altKey) parts.push("Alt");
  if (shiftKey) parts.push("Shift");
  if (metaKey) parts.push("Meta");
  parts.push(targetKey);

  const usesMod = modifierParts.includes("Mod");

  return {
    targetKey: targetKey as BindableBaseKey,
    targetKeyCode,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
    ariaKeyshortcuts: parts.join("+"),
    usesMod,
  };
}
