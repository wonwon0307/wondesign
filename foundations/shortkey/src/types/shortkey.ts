import type { BaseKey } from "./basekey";
import type { Modifier } from "./modifier";

export type Shortkey =
  BaseKey | `${Modifier}+${BaseKey}` | `${Modifier}+${Modifier}+${BaseKey}`;

export interface ParsedShortkey {
  targetKey: BaseKey;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
}
