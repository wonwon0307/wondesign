import type { LightDarkOptions, Mode, Preference } from "./types";

export function resolvePreference(
  raw: string | null,
  { themes, defaultMode, disableSystem }: Omit<LightDarkOptions, "storageKey">,
): Preference {
  let stored: Partial<Record<keyof Preference, unknown>> = {};

  try {
    const parsed: unknown = JSON.parse(raw ?? "{}");
    if (typeof parsed === "object" && parsed !== null) stored = parsed;
  } catch {
    // Malformed value; fall back to defaults
  }

  const mode =
    validateMode(stored.mode) && !(disableSystem && stored.mode === "system")
      ? stored.mode
      : defaultMode;

  return {
    mode,
    lightTheme: pickTheme(stored.lightTheme, themes.light),
    darkTheme: pickTheme(stored.darkTheme, themes.dark),
  };
}

export function resolveConfig(
  config: Omit<LightDarkOptions, "storageKey">,
): Omit<LightDarkOptions, "storageKey"> {
  const light = dedupe(config.themes.light);
  const dark = dedupe(config.themes.dark);

  if (process.env.NODE_ENV !== "production") {
    if (light.length !== config.themes.light.length) {
      console.warn("[WonDesign Theme] light themes contain duplicate values.");
    }
    if (dark.length !== config.themes.dark.length) {
      console.warn("[WonDesign Theme] dark themes contain duplicate values.");
    }
    // Compare against the deduped sides so in-side duplicates don't also trip this
    const combinedSet = new Set([...light, ...dark]);
    if (combinedSet.size !== light.length + dark.length) {
      console.warn(
        "[WonDesign Theme] some themes are duplicated across light and dark themes.",
      );
    }
    if (config.disableSystem && config.defaultMode === "system") {
      console.warn(
        '[WonDesign Theme] defaultMode "system" is not allowed with disableSystem. Using "light" as the default.',
      );
    }
  }

  return {
    themes: { light, dark },
    defaultMode:
      config.disableSystem && config.defaultMode === "system"
        ? "light"
        : config.defaultMode,
    disableSystem: config.disableSystem,
  };
}

function dedupe(values: readonly [string, ...string[]]) {
  return [...new Set(values)] as [string, ...string[]];
}

function validateMode(value: unknown): value is Mode {
  return value === "light" || value === "dark" || value === "system";
}

// The first theme of each side is the default
function pickTheme(value: unknown, options: readonly [string, ...string[]]) {
  return typeof value === "string" && options.includes(value)
    ? value
    : options[0];
}
