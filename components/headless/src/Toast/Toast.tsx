import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";
import { useEscapeKey } from "@wondesign/key-events/escape-key";

import { AsChild } from "@/AsChild/AsChild";
import { ToastContext, useToastArea } from "./contexts";

export interface ToastProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "children"
  | "hidden"
  | "role"
  | "aria-atomic"
  | "aria-live"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
> {
  children: React.ReactNode;
  duration?: number;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
  keepMounted?: boolean;
  asChild?: boolean;
}

export function Toast({
  children,
  duration = 5000,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  keepMounted = false,
  asChild = false,
  ...rest
}: Readonly<ToastProps>) {
  const { isOpen, hide: dismissToast } = useOpenState({
    controlledOpen,
    setControlledOpen: onOpenChange,
    initialState: defaultOpen,
  });
  const remainingRef = useRef<number>(duration);
  const startedAtRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const dismissRef = useRef(dismissToast);
  const { isReady } = useToastArea();
  const isHoveredRef = useRef<boolean>(false);
  const isFocusedRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    dismissRef.current = dismissToast;
  });

  useEscapeKey(dismissToast, {
    // content가 포커스를 가지고 있을 때만 Escape 키로 닫기 활성화
    enabled: isOpen,
    scopeRef: contentRef,
  });

  const resumeTimer = useCallback(() => {
    if (remainingRef.current <= 0) return;
    if (timerRef.current) return; // 타이머가 이미 실행 중이면, 중복해서 시작하지 않는다.

    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(
      () => dismissRef.current(),
      remainingRef.current,
    );
  }, []);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (startedAtRef.current !== null) {
      remainingRef.current -= Date.now() - startedAtRef.current;
      startedAtRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    remainingRef.current = duration;
    startedAtRef.current = null;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [duration]);

  useEffect(() => {
    if (duration <= 0) return;

    if (isOpen && isReady) {
      isHoveredRef.current = false;
      isFocusedRef.current = false;
      resetTimer();
      resumeTimer();
    }

    return () => {
      resetTimer();
    };
  }, [isOpen, isReady, resetTimer, resumeTimer, duration]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      dismissToast,
      resumeTimer,
      pauseTimer,
      keepMounted,
      contentRef,
    }),
    [isOpen, dismissToast, resumeTimer, pauseTimer, keepMounted],
  );

  if (!isReady) return null;
  if (!isOpen && !keepMounted) return null;

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    pauseTimer();
  };
  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (!isFocusedRef.current) resumeTimer();
  };
  const handleFocus = () => {
    isFocusedRef.current = true;
    pauseTimer();
  };
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    isFocusedRef.current = false;
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (!isHoveredRef.current) resumeTimer();
  };

  const Component = asChild ? AsChild : "div";

  return (
    <ToastContext.Provider value={contextValue}>
      <Component
        {...rest}
        ref={contentRef}
        hidden={!isOpen}
        aria-atomic="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </Component>
    </ToastContext.Provider>
  );
}
