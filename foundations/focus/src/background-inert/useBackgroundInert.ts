import { useEffect, useId } from "react";

export interface UseBackgroundInertOptions {
  enabled?: boolean;
}

const INERT_ATTRIBUTE = "data-wondesign-inert";

export function useBackgroundInert(
  containerRef: React.RefObject<HTMLElement | null>,
  { enabled = false }: UseBackgroundInertOptions = {},
) {
  const id = useId();

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const inertElements: HTMLElement[] = [];
    const outsideElements = getOutsideElements(containerRef.current);
    for (const element of outsideElements) {
      // 이 hook과 상관없이 이미 inert인 요소는 건드리지 않는다
      if (
        element.hasAttribute("inert") &&
        !element.hasAttribute(INERT_ATTRIBUTE)
      ) {
        continue;
      }

      const ids = getInertIds(element);
      ids.add(id);
      element.setAttribute(INERT_ATTRIBUTE, [...ids].join(" "));
      element.setAttribute("inert", "");
      inertElements.push(element);
    }

    return () => {
      inertElements.forEach((element) => {
        const ids = getInertIds(element);
        ids.delete(id);

        // 다른 hook이 아직 inert로 유지하고 있으면 id만 지운다
        if (ids.size > 0) {
          element.setAttribute(INERT_ATTRIBUTE, [...ids].join(" "));
          return;
        }

        element.removeAttribute(INERT_ATTRIBUTE);
        element.removeAttribute("inert");
      });
    };
  }, [enabled, containerRef, id]);
}

function getOutsideElements(element: HTMLElement): HTMLElement[] {
  const elements: HTMLElement[] = [];
  let current: HTMLElement | null = element;

  while (current !== null && current !== document.body) {
    const parent: HTMLElement | null = current.parentElement;
    if (parent) {
      for (const sibling of Array.from(parent.children)) {
        if (sibling !== current && sibling instanceof HTMLElement) {
          elements.push(sibling);
        }
      }
    }
    current = parent;
  }

  return elements;
}

function getInertIds(element: HTMLElement): Set<string> {
  const value = element.getAttribute(INERT_ATTRIBUTE);
  return new Set(value ? value.split(" ") : []);
}
