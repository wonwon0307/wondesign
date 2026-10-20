import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

// false on the server and during the hydration render, true afterwards
// (and from the first render in client-only apps)
export function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
