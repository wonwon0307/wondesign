import { useSyncExternalStore } from "react";

import {
  deleteToast,
  deleteToasts,
  dismissToast,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "./store";
import type { BaseToastItem } from "./types";

export interface UseToastsResult<T extends BaseToastItem> {
  toasts: T[];
  deleteToast: (id: number) => void;
  deleteToasts: () => void;
  dismissToast: (id: number) => void;
}

export function useToasts<T extends BaseToastItem>(): UseToastsResult<T> {
  const toasts = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  ) as T[];

  return {
    toasts,
    deleteToast,
    deleteToasts,
    dismissToast,
  };
}
