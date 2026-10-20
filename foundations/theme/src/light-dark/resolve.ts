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

  const fallbackMode =
    disableSystem && defaultMode === "system" ? "light" : defaultMode;
  const mode =
    validateMode(stored.mode) && !(disableSystem && stored.mode === "system")
      ? stored.mode
      : fallbackMode;

  return {
    mode,
    lightTheme: pickTheme(stored.lightTheme, themes.light),
    darkTheme: pickTheme(stored.darkTheme, themes.dark),
  };
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
