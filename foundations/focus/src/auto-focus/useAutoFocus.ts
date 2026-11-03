import { useEffect, useRef } from "react";

import { getFocusableElements } from "@/utils";

export type UseAutoFocusOptions<TReturn extends HTMLElement = HTMLElement> = {
  enabled?: boolean;
  returnRef?: React.RefObject<TReturn | null>;
};

export function useAutoFocus<
  TTarget extends HTMLElement = HTMLDivElement,
  TReturn extends HTMLElement = HTMLElement,
>(
  targetRef: React.RefObject<TTarget | null>,
  { enabled = false, returnRef }: UseAutoFocusOptions<TReturn> = {},
) {
  const returnFocusRef = useRef<TReturn | null>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    if (returnRef) {
      returnFocusRef.current = returnRef.current;
    } else {
      returnFocusRef.current = document.activeElement as TReturn;
    }

    const focusables = getFocusableElements(targetRef.current);

    if (focusables.length > 0) {
      // focusable이 있다면, 그 첫번째 요소로 Focus 이동
      focusables[0].focus();
    } else {
      // 없다면, target 요소 자체로 Focus 이동
      targetRef.current.focus();
    }

    // cleanup function: Focus 복귀
    return () => {
      if (returnFocusRef.current) {
        returnFocusRef.current.focus();
      }
    };
  }, [enabled, targetRef, returnRef]);
}
