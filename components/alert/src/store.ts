import type { AlerterObject } from "./types";

let queue: AlerterObject[] = [];
const resolvers = new Map<number, (value: boolean) => void>();
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function respond(id: number, value: boolean): void {
  const resolve = resolvers.get(id);

  if (!resolve) return;

  resolve(value);

  resolvers.delete(id);
  queue = queue.filter((alert) => alert.id !== id);
  notify();
}

export function enqueue(
  incoming: AlerterObject,
  resolve: (value: boolean) => void,
): void {
  if (globalThis.window === undefined || typeof document === "undefined") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Alert] Alert cannot be shown in a non-browser environment. Ignoring alert...",
      );
    }

    resolve(false);
    return;
  }

  queue.push(incoming);
  resolvers.set(incoming.id, resolve);
  notify();
}

export function dismissAll(): void {
  resolvers.forEach((resolve) => resolve(false));
  resolvers.clear();
  queue = [];
  notify();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): AlerterObject | null {
  return queue[0] ?? null;
}
