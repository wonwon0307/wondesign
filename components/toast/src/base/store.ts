import type { BaseToastItem } from "./types";

let toasts: BaseToastItem[] = [];
const empty: BaseToastItem[] = [];
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): BaseToastItem[] {
  return toasts;
}

export function getServerSnapshot(): BaseToastItem[] {
  return empty;
}

export function addToast<T extends BaseToastItem>(toast: T): void {
  toasts = [...toasts, toast];
  notify();
}

export function dismissToast(id: number): void {
  toasts = toasts.map((toast) =>
    toast.id === id ? { ...toast, isOpen: false } : toast,
  );
  notify();
}

export function deleteToast(id: number): void {
  toasts = toasts.filter((toast) => toast.id !== id);
  notify();
}

export function deleteToasts(): void {
  toasts = [];
  notify();
}
