import { useEffect } from "react";

import type { UseArrowNavigationOptions, Direction } from "./types";

export function useArrowNavigation(
  targetRef: React.RefObject<HTMLElement | null>,
  {
    itemSelector,
    enabled = false,
    orientation = "horizontal",
    loop = false,
  }: UseArrowNavigationOptions,
) {
  useEffect(() => {
    const target = targetRef.current;
    if (!enabled || !target) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = resolveDirection(event.key, orientation);
      // 유효한 키가 아니면 무시
      if (!direction) return;

      const items = Array.from(
        target.querySelectorAll<HTMLElement>(itemSelector),
      );
      // item이 없으면 무시
      if (items.length === 0) return;

      const currentIndex = items.indexOf(event.target as HTMLElement);
      // 현재 포커스된 item의 인덱스를 찾지 못하면 무시
      if (currentIndex === -1) return;

      event.preventDefault();

      const nextIndex = resolveNextIndex(
        direction,
        currentIndex,
        items.length,
        loop,
      );
      items[nextIndex]?.focus();
    };

    target.addEventListener("keydown", handleKeyDown);
    return () => target.removeEventListener("keydown", handleKeyDown);
  }, [targetRef, itemSelector, enabled, orientation, loop]);
}

function resolveDirection(
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

function resolveNextIndex(
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
