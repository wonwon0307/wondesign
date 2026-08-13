import { useSyncExternalStore } from "react";

function getPlatform() {
  return /Mac|iPod|iPhone|iPad/.test(globalThis.navigator?.userAgent ?? "")
    ? "mac"
    : "windows";
}

function subscribe() {
  return () => {};
}

/**
 * Client-only platform detection. Falls back to the SSR value of
 * `getPlatform()` (`"windows"`) during hydration so the server- and
 * client-rendered markup match, then syncs to the real platform right after.
 */
export function usePlatform(): "mac" | "windows" {
  return useSyncExternalStore(subscribe, getPlatform, () => "windows");
}
