import type { BaseKey, Modifier } from "@wondesign/shortkey";

// exclude keys that this package does not support
export type BindableBaseKey = Exclude<
  BaseKey,
  | "Escape"
  | "Tab"
  | "CapsLock"
  | "Enter"
  | "Return"
  | "Space"
  | "↑"
  | "↓"
  | "←"
  | "→"
  | "Backspace"
  | "Delete"
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"
>;

export type BindableShortkey =
  | BindableBaseKey
  | `${Modifier}+${BindableBaseKey}`
  | `${Modifier}+${Modifier}+${BindableBaseKey}`;

export type ParsedShortkey = {
  targetKey: BindableBaseKey;
  targetKeyCode: string;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
  ariaKeyshortcuts: string;
  usesMod: boolean;
};
