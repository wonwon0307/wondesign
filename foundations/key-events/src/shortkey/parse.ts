import { BASE_KEY_MAP } from "./map";
import type { BaseKey, BindableBaseKey } from "./types/basekey";
import type {
  ParsedBindableShortkey,
  ParsedShortkey,
  Shortkey,
} from "./types/shortkey";

export function parseShortkey(
  shortkey: Shortkey,
  isApple: boolean,
): ParsedShortkey {
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
    if (isApple) {
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
  isApple: boolean,
): ParsedBindableShortkey | null {
  const modifierParts = shortkey.split("+");
  modifierParts.pop();

  const invalidModifier = modifierParts.find(
    (part: string) => !VALID_MODIFIERS.has(part),
  );
  if (invalidModifier !== undefined) {
    console.warn(
      `[WonDesign Key-Events] Invalid shortkey "${shortkey}": "${invalidModifier}" is not a supported modifier.`,
    );

    return null;
  }

  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parseShortkey(
    shortkey,
    isApple,
  );

  const targetKeyCode = BASE_KEY_MAP[targetKey as BindableBaseKey];
  if (!targetKeyCode) {
    console.warn(
      `[WonDesign Key-Events] Invalid shortkey "${shortkey}": "${targetKey}" is not a supported key.`,
    );

    return null;
  }

  return {
    targetKey: targetKey as BindableBaseKey,
    targetKeyCode,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
  };
}
