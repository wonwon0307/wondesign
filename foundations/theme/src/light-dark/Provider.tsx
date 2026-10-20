import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

import { useIsHydrated } from "@/core/hydration";
import { useSystemPreference } from "@/core/system";
import { ThemeContext } from "./context";
import { resolveConfig, resolvePreference } from "./resolve";
import { createStore } from "./store";
import type { LightDarkOptions, Mode, Themes } from "./types";

export interface LightDarkProps extends Partial<LightDarkOptions> {
  children: React.ReactNode;
}

const DEFAULT_THEMES: Themes = { light: ["light"], dark: ["dark"] };

export function LightDarkProvider({
  children,
  themes: themesProp = DEFAULT_THEMES,
  disableSystem = false,
  defaultMode = disableSystem ? "light" : "system",
  storageKey = "wondesign-light-dark",
}: Readonly<LightDarkProps>) {
  // themes가 리렌더링마다 새로생성되지 않도록 안정적인 참조 유지
  const themesKey = JSON.stringify(themesProp);
  const config = useMemo(
    () =>
      resolveConfig({
        themes: JSON.parse(themesKey) as Themes,
        defaultMode,
        disableSystem,
      }),
    [themesKey, defaultMode, disableSystem],
  );
  const serverSnapshot = useMemo(
    () => resolvePreference(null, config),
    [config],
  );

  const store = useMemo(
    () => createStore({ ...config, storageKey }),
    [config, storageKey],
  );
  const hydrated = useIsHydrated();
  const preference = useSyncExternalStore(
    store.subscribe,
    store.getPreference,
    () => serverSnapshot,
  );
  const systemMode = useSystemPreference();
  const colorScheme = useMemo(
    () => (preference.mode === "system" ? systemMode : preference.mode),
    [preference, systemMode],
  );
  const theme =
    colorScheme === "light" ? preference.lightTheme : preference.darkTheme;

  useEffect(() => {
    if (!hydrated) return;

    const root = document.documentElement;

    root.dataset.theme = theme;
    root.dataset.colorScheme = colorScheme;
    root.style.colorScheme = colorScheme;
  }, [hydrated, theme, colorScheme]);

  const selectMode = useCallback(
    (newMode: Mode) => {
      if (disableSystem && newMode === "system") {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[WonDesign Theme] System mode is disabled.");
        }
        return;
      }
      store.savePreference({ ...preference, mode: newMode });
    },
    [disableSystem, preference, store],
  );

  const selectLightTheme = useCallback(
    (lightTheme: string) => {
      if (!config.themes.light.includes(lightTheme)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `[WonDesign Theme] Unknown light theme: "${lightTheme}".`,
          );
        }
        return;
      }

      store.savePreference({ ...preference, lightTheme });
    },
    [config, preference, store],
  );

  const selectDarkTheme = useCallback(
    (darkTheme: string) => {
      if (!config.themes.dark.includes(darkTheme)) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[WonDesign Theme] Unknown dark theme: "${darkTheme}".`);
        }
        return;
      }

      store.savePreference({ ...preference, darkTheme });
    },
    [config, preference, store],
  );

  const ctxValue = useMemo(
    () => ({
      themes: config.themes,
      disableSystem: config.disableSystem,
      mode: preference.mode,
      colorScheme,
      theme,
      lightTheme: preference.lightTheme,
      darkTheme: preference.darkTheme,
      selectMode,
      selectLightTheme,
      selectDarkTheme,
    }),
    [
      config,
      preference,
      colorScheme,
      theme,
      selectMode,
      selectLightTheme,
      selectDarkTheme,
    ],
  );

  return (
    <ThemeContext.Provider value={ctxValue}>{children}</ThemeContext.Provider>
  );
}
