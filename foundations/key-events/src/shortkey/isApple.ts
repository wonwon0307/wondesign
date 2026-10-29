import { useSyncExternalStore } from "react";

const noop = () => () => {};

function isApple() {
  if (typeof navigator !== "undefined") {
    return /Mac|iPhone|iPad|iPod/.test(
      navigator.platform || navigator.userAgent,
    );
  }
  return false;
}

export function useIsApple(): boolean | undefined {
  return useSyncExternalStore(noop, isApple, () => undefined);
}
