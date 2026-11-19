import { useEffect } from "react";

import { getFocusableElements } from "@/utils";

export type UseAutoFocusOptions<TReturn extends HTMLElement = HTMLElement> = {
  enabled?: boolean;
  initialRef?: React.RefObject<HTMLElement | null>;
  returnRef?: React.RefObject<TReturn | null>;
};

export function useAutoFocus<
  TTarget extends HTMLElement = HTMLDivElement,
  TReturn extends HTMLElement = HTMLElement,
>(
  targetRef: React.RefObject<TTarget | null>,
  { enabled = false, initialRef, returnRef }: UseAutoFocusOptions<TReturn> = {},
) {
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const target = targetRef.current;
    const previousActive = document.activeElement;

    // initialRef가 target 안에 있다면, 그 요소로 Focus 이동
    const initial = initialRef?.current;
    if (initial && targetRef.current.contains(initial)) {
      initial.focus();

      // focus를 받을 수 없는 요소라면, 아래의 기본 동작으로 넘어간다
      if (document.activeElement === initial) {
        return returnFocus;
      }
    }

    const focusables = getFocusableElements(targetRef.current);

    if (focusables.length > 0) {
      // focusable이 있다면, 그 첫번째 요소로 Focus 이동
      focusables[0].focus();
    } else {
      // 없다면, target 요소 자체로 Focus 이동
      targetRef.current.focus();
    }

    return returnFocus;

    // cleanup function: Focus 복귀
    function returnFocus() {
      // 사용자가 이미 target 밖으로 Focus를 옮겼다면, 되돌리지 않는다
      const active = document.activeElement;
      if (active && active !== document.body && !target.contains(active)) {
        return;
      }

      if (returnRef?.current ?? previousActive) {
        (returnRef?.current ?? (previousActive as HTMLElement)).focus();
      }
    }
  }, [enabled, targetRef, initialRef, returnRef]);
}
