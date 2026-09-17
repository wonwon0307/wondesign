import { useEffect } from "react";

import { resolveDirection, resolveNextIndex } from "./utils";
import type { UseArrowNavigationOptions } from "./types";

/**
 * Wires up arrow key focus navigation (WAI-ARIA APG "roving tabindex"
 * pattern) for a group of items sharing a container, self-managing its own
 * `keydown` listener — nothing needs to be spread onto the items themselves.
 *
 * On a handled key it moves DOM focus to the target item via `.focus()` —
 * it does not change any selection state, so pair it with the consuming
 * component's own `onFocus`/`onClick` handling if focus should also select.
 *
 * @param targetRef - Ref to the container that receives the (bubbled) `keydown` events, e.g. the tablist element.
 * @param options.itemSelector - Selector used to collect navigable items within the container.
 * @param options.enabled - Whether the listener is active. Defaults to `true`.
 * @param options.orientation - Arrow key axis. `"horizontal"` uses Left/Right, `"vertical"` uses Up/Down. Home/End always jump to the first/last item. Defaults to `"horizontal"`.
 * @param options.loop - Wrap around at the ends instead of stopping at the first/last item. Defaults to `false`.
 */
export function useArrowNavigation(
  targetRef: React.RefObject<HTMLElement | null>,
  {
    itemSelector,
    enabled = true,
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
