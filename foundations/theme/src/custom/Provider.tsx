import { useMemo, useSyncExternalStore } from "react";

import { ThemeContext } from "./context";
import { createStore } from "./store";
import type { Themes } from "./types";

export interface ThemeProps {
  children: React.ReactNode;
  themes: Themes;
  defaultTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  themes: themesProp,
  defaultTheme = themesProp[0],
  storageKey = "wondesign-theme",
}: Readonly<ThemeProps>) {
  const themesKey = JSON.stringify(themesProp);
  const themes = useMemo<Themes>(() => JSON.parse(themesKey), [themesKey]);
  const store = useMemo(
    () => createStore(themes, defaultTheme, storageKey),
    [themes, defaultTheme, storageKey],
  );
  const theme = useSyncExternalStore(
    store.subscribe,
    store.getTheme,
    store.getServerTheme,
  );

  const ctxValue = useMemo(
    () => ({ theme, selectTheme: store.save, themes }),
    [theme, store, themes],
  );

  return (
    <ThemeContext.Provider value={ctxValue}>{children}</ThemeContext.Provider>
  );
}
