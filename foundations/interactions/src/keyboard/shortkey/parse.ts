import { parseShortkey as parse } from "@wondesign/shortkeys";

import { BASE_KEY_MAP } from "./map";
import type { BindableBaseKey, BindableShortkey } from "./types";

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

export function parseShortkey(shortkey: BindableShortkey) {
  const modifierParts = shortkey.split("+");
  modifierParts.pop();

  const invalidModifier = modifierParts.find(
    (part: string) => !VALID_MODIFIERS.has(part),
  );
  if (invalidModifier) {
    throw new Error(
      `Invalid shortkey: "${invalidModifier}" is not a supported modifier.`,
    );
  }

  const { targetKey, ctrlKey, altKey, shiftKey, metaKey } = parse(shortkey);

  const targetKeyCode = BASE_KEY_MAP[targetKey as BindableBaseKey];
  if (!targetKeyCode) {
    throw new Error(`Invalid shortkey: "${targetKey}" is not a supported key.`);
  }

  return {
    targetKey: targetKey,
    targetKeyCode,
    ctrlKey,
    altKey,
    shiftKey,
    metaKey,
  };
}
