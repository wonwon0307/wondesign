import { useEffect, useId } from "react";

export interface UseScrollLockOptions {
  enabled?: boolean;
  targetRef?: React.RefObject<HTMLElement | null>;
}

const LOCK_ATTRIBUTE = "data-wondesign-scroll-lock";
// 첫 lock 전의 overflow-x, overflow-y 값. 마지막 lock이 풀릴 때 복원한다
// (overflow shorthand로 저장하면 한 쪽만 설정된 값을 잃는다)
const OVERFLOW_X_ATTRIBUTE = "data-wondesign-scroll-lock-overflow-x";
const OVERFLOW_Y_ATTRIBUTE = "data-wondesign-scroll-lock-overflow-y";

export function useScrollLock({
  enabled = false,
  targetRef,
}: UseScrollLockOptions = {}) {
  const id = useId();

  useEffect(() => {
    if (!enabled) return;

    if (targetRef && !targetRef.current) return;

    const target = targetRef?.current ?? document.documentElement;

    const ids = getLockIds(target);

    if (ids.size === 0) {
      // 첫 lock 이면, 기존 overflow 값을 저장하고 숨긴다
      target.setAttribute(OVERFLOW_X_ATTRIBUTE, target.style.overflowX);
      target.setAttribute(OVERFLOW_Y_ATTRIBUTE, target.style.overflowY);
      target.style.overflowX = "hidden";
      target.style.overflowY = "hidden";
    }

    ids.add(id);
    target.setAttribute(LOCK_ATTRIBUTE, [...ids].join(" "));

    return () => {
      const ids = getLockIds(target);
      ids.delete(id);

      if (ids.size > 0) {
        // 다른 hook이 아직 lock을 유지하고 있으면 id만 지운다
        target.setAttribute(LOCK_ATTRIBUTE, [...ids].join(" "));
        return;
      }

      // 마지막 lock이 풀리면 overflow를 복원하고 attribute를 제거한다
      target.style.overflowX = target.getAttribute(OVERFLOW_X_ATTRIBUTE) ?? "";
      target.style.overflowY = target.getAttribute(OVERFLOW_Y_ATTRIBUTE) ?? "";
      target.removeAttribute(LOCK_ATTRIBUTE);
      target.removeAttribute(OVERFLOW_X_ATTRIBUTE);
      target.removeAttribute(OVERFLOW_Y_ATTRIBUTE);
    };
  }, [enabled, targetRef, id]);
}

function getLockIds(target: HTMLElement): Set<string> {
  const value = target.getAttribute(LOCK_ATTRIBUTE);
  return new Set(value ? value.split(" ") : []);
}
