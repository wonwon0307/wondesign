import type { BaseKey } from "./basekey";
import type { BaseKeyCode } from "./code";
import type { Modifier } from "./modifiers";

export type Shortkey =
  BaseKey | `${Modifier}+${BaseKey}` | `${Modifier}+${Modifier}+${BaseKey}`;

export interface ParsedShortkey {
  targetKey: BaseKey;
  targetKeyCode: BaseKeyCode;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
}
