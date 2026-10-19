import { readStorage, removeStorage, writeStorage } from "@/core/storage";
import type { Themes } from "./types";

export function createStore(
  themes: Themes,
  defaultTheme: string,
  storageKey: string,
) {
  const themeSet = new Set<string>(themes);
  const listeners = new Set<() => void>();

  if (process.env.NODE_ENV !== "production") {
    if (themeSet.size !== themes.length) {
      console.warn("[WonDesign Theme] themes contains duplicate values.");
    }

    if (!themeSet.has(defaultTheme)) {
      console.warn(
        `[WonDesign Theme] defaultTheme "${defaultTheme}" is not included in themes.` +
          ` Using "${themes[0]}" as the default.`,
      );
    }
  }

  const fallback = themeSet.has(defaultTheme) ? defaultTheme : themes[0];

  function resolve(value: string | null) {
    return value !== null && themeSet.has(value) ? value : fallback;
  }

  let theme = resolve(readStorage(storageKey));

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function onStorage(event: StorageEvent) {
    if (event.storageArea !== localStorage) return;
    // key === null means localStorage.clear() was called
    if (event.key !== null && event.key !== storageKey) return;

    const next = resolve(event.newValue);
    if (next === theme) return;

    theme = next;
    document.documentElement.dataset.theme = theme;
    notify();
  }

  function subscribe(listener: () => void) {
    if (listeners.size === 0) {
      // ThemeScript applies the stored value unvalidated, so clear a stale one
      // (e.g. a removed theme) to avoid a flash on every load
      const saved = readStorage(storageKey);
      if (saved !== null && !themeSet.has(saved)) removeStorage(storageKey);

      document.documentElement.dataset.theme = theme;
      window.addEventListener("storage", onStorage);
    }

    listeners.add(listener);

    return () => {
      listeners.delete(listener);

      if (listeners.size === 0) {
        window.removeEventListener("storage", onStorage);
      }
    };
  }

  function getTheme() {
    return theme;
  }

  function getServerTheme() {
    return fallback;
  }

  function save(newTheme: string) {
    if (!themeSet.has(newTheme)) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[WonDesign Theme] Unknown theme: "${newTheme}".`);
      }
      return;
    }

    theme = newTheme;
    document.documentElement.dataset.theme = theme;
    writeStorage(storageKey, newTheme);
    notify();
  }

  return { subscribe, getTheme, getServerTheme, save };
}
