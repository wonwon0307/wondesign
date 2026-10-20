import { serialize } from "@/core/script";

export interface ScriptProps {
  defaultTheme: string;
  storageKey?: string;
  nonce?: string;
}

function applyTheme(storageKey: string, defaultTheme: string) {
  let theme: string | null = null;

  try {
    theme = localStorage.getItem(storageKey);
  } catch {
    // localStorage is unavailable (e.g., private mode)
  }

  document.documentElement.dataset.theme = theme ?? defaultTheme;
}

export function ThemeScript({
  defaultTheme,
  storageKey = "wondesign-theme",
  nonce,
}: Readonly<ScriptProps>) {
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `(${applyTheme.toString()})(${serialize(storageKey)},${serialize(defaultTheme)})`,
      }}
    />
  );
}
