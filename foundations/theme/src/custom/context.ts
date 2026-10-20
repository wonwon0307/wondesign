import { createContext, useContext } from "react";

interface ThemeContextValue {
  themes: readonly [string, ...string[]];
  theme: string;
  selectTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "[WonDesign Theme] useTheme() must be used within a ThemeProvider",
    );
  }

  return context;
}
