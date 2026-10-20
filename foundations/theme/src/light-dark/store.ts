import { readStorage, writeStorage } from "@/core/storage";
import { resolvePreference } from "./resolve";
import type { LightDarkOptions, Preference } from "./types";

const IS_DEV = process.env.NODE_ENV !== "production";

export function createStore({ storageKey, ...config }: LightDarkOptions) {
  let preference: Preference = resolvePreference(
    readStorage(storageKey),
    config,
  );
  const listeners = new Set<() => void>();

  if (IS_DEV) {
    if (new Set(config.themes.light).size !== config.themes.light.length) {
      console.warn("[WonDesign Theme] light themes contain duplicate values.");
    }
    if (new Set(config.themes.dark).size !== config.themes.dark.length) {
      console.warn("[WonDesign Theme] dark themes contain duplicate values.");
    }
    if (config.disableSystem && config.defaultMode === "system") {
      console.warn(
        '[WonDesign Theme] defaultMode "system" is not allowed with disableSystem. Using "light" as the default.',
      );
    }
  }

  function update(next: Preference) {
    if (
      next.mode === preference.mode &&
      next.lightTheme === preference.lightTheme &&
      next.darkTheme === preference.darkTheme
    ) {
      return;
    }

    preference = next;
    listeners.forEach((listener) => listener());
  }

  function onStorage(event: StorageEvent) {
    if (event.storageArea !== localStorage) return;
    // key === null means localStorage.clear() was called
    if (event.key !== null && event.key !== storageKey) return;

    update(resolvePreference(event.newValue, config));
  }

  function subscribe(listener: () => void) {
    if (listeners.size === 0) {
      // LightDarkScript applies the stored value unvalidated, so overwrite a
      // stale one (e.g. a removed theme) with its normalized form
      const raw = readStorage(storageKey);
      const toWrite = JSON.stringify(preference);

      if (raw !== null && raw !== toWrite) {
        writeStorage(storageKey, toWrite);
      }

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

  function savePreference(next: Preference) {
    const toWrite = JSON.stringify(next);
    writeStorage(storageKey, toWrite);
    update(next);
  }

  function getPreference() {
    return preference;
  }

  return {
    subscribe,
    savePreference,
    getPreference,
  };
}
