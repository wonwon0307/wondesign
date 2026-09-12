import { parseShortkey as parse } from "@wondesign/shortkey";

import { BASE_KEY_MAP } from "./map";
import type {
  BindableBaseKey,
  BindableShortkey,
  ParsedShortkey,
} from "./types";

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
  shortkey: BindableShortkey,
): ParsedShortkey | null {
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

  const usesMod = modifierParts.includes("Mod");

  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parse(shortkey);

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
