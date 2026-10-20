import { serialize } from "@/core/script";
import type { Mode } from "./types";

export interface ScriptProps {
  defaultMode?: Mode;
  storageKey?: string;
  nonce?: string;
}

/* v8 ignore next */
function applyPreference(storageKey: string, defaultMode: Mode) {
  let stored: { mode?: Mode; lightTheme?: string; darkTheme?: string } = {};

  try {
    stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}") ?? {};
  } catch {
    // localStorage is unavailable or the value is malformed
  }

  let colorScheme = stored.mode ?? defaultMode;

  if (colorScheme === "system") {
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    colorScheme = prefersDark ? "dark" : "light";
  }

  const theme = colorScheme === "dark" ? stored.darkTheme : stored.lightTheme;
  const root = document.documentElement;

  if (theme) root.dataset.theme = theme;
  root.dataset.colorScheme = colorScheme;
  root.style.colorScheme = colorScheme;
}

export function LightDarkScript({
  defaultMode = "system",
  storageKey = "wondesign-light-dark",
  nonce,
}: Readonly<ScriptProps>) {
  // first-paint flash를 방지하게 해주는 head에 추가할 스크립트
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `(${applyPreference.toString()})(${serialize(storageKey)},${serialize(defaultMode)})`,
      }}
    />
  );
}
