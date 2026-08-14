import type { FullBaseKey, BaseKey } from "./basekey";
import type { BaseKeyCode } from "./code";
import type { Modifier } from "./modifiers";

export type Shortkey =
  BaseKey | `${Modifier}+${BaseKey}` | `${Modifier}+${Modifier}+${BaseKey}`;
export type FullShortkey =
  | FullBaseKey
  | `${Modifier}+${FullBaseKey}`
  | `${Modifier}+${Modifier}+${FullBaseKey}`;

export interface ParsedShortkeyInternal {
  targetKey: BaseKey;
  targetKeyCode: BaseKeyCode;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
}

export interface ParsedShortkey {
  targetKey: FullBaseKey;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
}
