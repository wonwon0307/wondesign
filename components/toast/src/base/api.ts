import { addToast } from "./store";
import type { BaseToastOptions } from "./types";

let counter = 0;

export function showToast<T extends BaseToastOptions>(
  message: string,
  options?: T,
): void {
  if (globalThis.window === undefined || typeof document === "undefined") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Toast] A Toast cannot be shown in a non-browser environment. Ignoring toast...",
      );
    }
    return;
  }

  const { duration = 5000, ...rest } = options ?? {};

  if (duration < 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Toast] The duration for a Toast must be 0 (infinite) or greater. Ignoring toast...",
      );
    }
    return;
  }

  addToast({
    ...rest,
    id: counter++,
    message,
    duration,
  });
}
