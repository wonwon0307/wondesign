import type { BaseToastItem, BaseToastOptions } from "./base/types";

export type ToastType = "info" | "success" | "warning" | "error" | "default";
export type ToastPosition = "top" | "top-right" | "bottom" | "bottom-right";

export interface ToastAction {
  variant: "primary" | "secondary" | "destructive";
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ToastOptions extends BaseToastOptions {
  position?: ToastPosition;
  description?: string;
  action?: ToastAction;
}

export interface InternalOptions extends ToastOptions {
  type: ToastType;
}

export interface ToastItem extends BaseToastItem {
  type: ToastType;
  position?: ToastPosition;
  description?: string;
  action?: ToastAction;
}

export interface ToastItemProps {
  toast: ToastItem;
  dismissToast: () => void;
}
