import type { BaseKey, BindableBaseKey } from "./basekey";
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

export type BindableShortkey =
  | BindableBaseKey
  | `${Modifier}+${BindableBaseKey}`
  | `${Modifier}+${Modifier}+${BindableBaseKey}`;

export type ParsedBindableShortkey = {
  targetKey: BindableBaseKey;
  targetKeyCode: string;
  ctrlKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
  ariaKeyshortcuts: string;
  usesMod: boolean;
};
