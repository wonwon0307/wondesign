import { serialize } from "@/core/script";
import type { Mode, Themes } from "./types";

export interface ScriptProps {
  themes?: Themes;
  defaultMode?: Mode;
  storageKey?: string;
  nonce?: string;
}

const DEFAULT_THEMES: Themes = { light: ["light"], dark: ["dark"] };

/* v8 ignore next */
function applyPreference(
  storageKey: string,
  defaultMode: Mode,
  themes: Themes,
) {
  let stored: { mode?: Mode; lightTheme?: string; darkTheme?: string } = {};

  try {
    stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}") ?? {};
  } catch {
    // localStorage is unavailable or the value is malformed
  }

  // Ignore a stored mode that isn't valid (e.g. edited by hand)
  const modes: unknown[] = ["light", "dark", "system"];
  let colorScheme = modes.includes(stored.mode) ? stored.mode! : defaultMode;

  if (colorScheme === "system") {
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    colorScheme = prefersDark ? "dark" : "light";
  }

  // The first theme of each side is the default, same as the provider
  const options = colorScheme === "dark" ? themes.dark : themes.light;
  const saved = colorScheme === "dark" ? stored.darkTheme : stored.lightTheme;
  const theme = saved && options.includes(saved) ? saved : options[0];
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.dataset.colorScheme = colorScheme;
  root.style.colorScheme = colorScheme;
}

export function LightDarkScript({
  themes = DEFAULT_THEMES,
  defaultMode = "system",
  storageKey = "wondesign-light-dark",
  nonce,
}: Readonly<ScriptProps>) {
  // first-paint flash를 방지하게 해주는 head에 추가할 스크립트
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `(${applyPreference.toString()})(${serialize(storageKey)},${serialize(defaultMode)},${serialize(themes)})`,
      }}
    />
  );
}
