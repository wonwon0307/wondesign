import { useSyncExternalStore } from "react";

import {
  dismissToast,
  dismissToasts,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "./store";
import type { BaseToastItem } from "./types";

export interface UseToastsResult<T extends BaseToastItem> {
  toasts: T[];
  dismissToast: (id: number) => void;
  dismissToasts: () => void;
}

export function useToasts<T extends BaseToastItem>(): UseToastsResult<T> {
  const toasts = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  ) as T[];

  return {
    toasts,
    dismissToast,
    dismissToasts,
  };
}
