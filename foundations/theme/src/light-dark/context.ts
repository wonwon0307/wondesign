import { createContext, useContext } from "react";

import type { ColorScheme, Mode, Themes } from "./types";

interface ThemeContextValue {
  // 개발자가 정하는 config
  themes: Themes;
  disableSystem: boolean;
  // 상태
  mode: Mode;
  colorScheme: ColorScheme;
  theme: string;
  lightTheme: string;
  darkTheme: string;
  // 상태 변경
  selectMode: (mode: Mode) => void;
  selectLightTheme: (theme: string) => void;
  selectDarkTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function useLightDark() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "[WonDesign Theme] useLightDark() must be used within a LightDarkProvider",
    );
  }

  return context;
}
