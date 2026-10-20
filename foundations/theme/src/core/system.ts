import { useSyncExternalStore } from "react";

const QUERY = "(prefers-color-scheme: dark)";

function getMQL() {
  if (
    globalThis.window === undefined ||
    typeof globalThis.matchMedia !== "function"
  ) {
    return null;
  }

  return globalThis.matchMedia(QUERY);
}

function subscribe(onChange: () => void) {
  const mql = getMQL();
  if (!mql) return () => {};

  mql.addEventListener("change", onChange);

  return () => {
    mql.removeEventListener("change", onChange);
  };
}

function getSnapshot(): "dark" | "light" {
  return getMQL()?.matches ? "dark" : "light";
}

export function useSystemPreference(): "dark" | "light" {
  return useSyncExternalStore(subscribe, getSnapshot, () => "light");
}
