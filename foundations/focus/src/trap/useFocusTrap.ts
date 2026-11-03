import { useEffect } from "react";

import { getFocusableElements } from "@/utils";

export type UseFocusTrapOptions = {
  enabled?: boolean;
};

export function useFocusTrap<TTarget extends HTMLElement = HTMLDivElement>(
  targetRef: React.RefObject<TTarget | null>,
  { enabled = false }: UseFocusTrapOptions = {},
) {
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const handler = (event: KeyboardEvent) => {
      if (
        event.key !== "Tab" ||
        !targetRef.current?.contains(document.activeElement)
      ) {
        return;
      }

      const focusables = getFocusableElements(targetRef.current);

      if (focusables.length === 0) {
        event.preventDefault();
        targetRef.current.focus();
        return;
      }

      const firstElement = focusables[0];
      const lastElement = focusables.at(-1);
      const activeElement = document.activeElement as HTMLElement;

      // Tab 순서에 없는 요소(container 자체, tabindex="-1" 등)에 focus가 있으면
      // 브라우저 기본 동작이 trap 밖으로 나갈 수 있으므로 직접 이동시킨다
      if (!focusables.includes(activeElement)) {
        event.preventDefault();

        if (event.shiftKey) {
          const previous = [...focusables]
            .reverse()
            .find(
              (element) =>
                element.compareDocumentPosition(activeElement) &
                Node.DOCUMENT_POSITION_FOLLOWING,
            );
          (previous ?? lastElement)?.focus();
        } else {
          const next = focusables.find(
            (element) =>
              activeElement.compareDocumentPosition(element) &
              Node.DOCUMENT_POSITION_FOLLOWING,
          );
          (next ?? firstElement).focus();
        }
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }

      // 나머지는 기본 동작으로 처리가 된다
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [enabled, targetRef]);
}
