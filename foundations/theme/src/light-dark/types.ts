export type ColorScheme = "light" | "dark";
export type Mode = ColorScheme | "system";

export type Themes = {
  light: readonly [string, ...string[]]; // 최소 하나를 강제
  dark: readonly [string, ...string[]]; // 최소 하나를 강제
};

export interface Preference {
  mode: Mode;
  lightTheme: string;
  darkTheme: string;
}

export interface LightDarkOptions {
  themes: Themes;
  defaultMode: Mode;
  disableSystem: boolean;
  storageKey: string;
}
