import type { Direction } from "./types";

export function resolveDirection(
  key: string,
  orientation: "horizontal" | "vertical",
): Direction | undefined {
  const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
  const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

  if (key === nextKey) return "next";
  if (key === prevKey) return "prev";
  if (key === "Home") return "first";
  if (key === "End") return "last";
  return undefined;
}

export function resolveNextIndex(
  direction: Direction,
  currentIndex: number,
  itemCount: number,
  loop: boolean,
): number {
  switch (direction) {
    case "first":
      return 0;
    case "last":
      return itemCount - 1;
    case "next": {
      const nextIndex = currentIndex + 1;
      if (nextIndex < itemCount) return nextIndex;
      return loop ? 0 : itemCount - 1;
    }
    case "prev": {
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) return prevIndex;
      return loop ? itemCount - 1 : 0;
    }
  }
}
