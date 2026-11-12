import { showToast } from "./base/api";
import type { InternalOptions, ToastOptions, ToastType } from "./types";

function dispatch(type: ToastType, message: string, options?: ToastOptions) {
  showToast<InternalOptions>(message, {
    type,
    ...options,
  });
}

function defaultToast(message: string, options?: ToastOptions): void {
  dispatch("default", message, options);
}

function info(message: string, options?: ToastOptions): void {
  dispatch("info", message, options);
}

function success(message: string, options?: ToastOptions): void {
  dispatch("success", message, options);
}

function warning(message: string, options?: ToastOptions): void {
  dispatch("warning", message, options);
}

function error(message: string, options?: ToastOptions): void {
  dispatch("error", message, options);
}

export const toast = Object.assign(defaultToast, {
  info,
  success,
  error,
  warning,
});
