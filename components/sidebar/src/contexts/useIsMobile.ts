import { useSyncExternalStore } from "react";

/**
 * 현재 화면의 너비를 측정해서 모바일 화면인지 아닌지를 판단하는 훅.
 */
export function useIsMobile(override?: boolean, breakpoint: number = 768) {
  const isMobile = useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
    () => false,
  );

  return override ?? isMobile;
}
