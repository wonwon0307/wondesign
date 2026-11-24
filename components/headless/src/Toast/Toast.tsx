import { useEffect, useMemo, useRef } from "react";
import { useOpenState } from "@wondesign/disclosure/open-state";
import { usePresence } from "@wondesign/disclosure/presence";
import { useEscapeKey } from "@wondesign/key-events/escape-key";

import { AsChild } from "@/AsChild/AsChild";
import { mergeRef } from "@/utils";
import { ToastContext, useToastArea } from "./contexts";
import { useTimer } from "./useTimer";

export interface ToastProps extends Omit<
  React.ComponentProps<"div">,
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
  asChild?: boolean;
}

export function Toast({
  children,
  duration = 5000,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  asChild = false,
  inert,
  ref,
  ...rest
}: Readonly<ToastProps>) {
  const { isOpen, hide: dismissToast } = useOpenState({
    controlledOpen,
    setControlledOpen: onOpenChange,
    initialState: defaultOpen,
  });
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { isReady } = useToastArea();
  const isHoveredRef = useRef<boolean>(false);
  const isFocusedRef = useRef<boolean>(false);
  const { isPresent, status } = usePresence(contentRef, isOpen);
  const mergedRef = useMemo(() => mergeRef(ref, contentRef), [ref, contentRef]);
  const { isPaused, resumeTimer, pauseTimer } = useTimer(dismissToast, {
    duration,
    enabled: isOpen && isReady,
  });

  useEscapeKey(dismissToast, {
    // content가 포커스를 가지고 있을 때만 Escape 키로 닫기 활성화
    enabled: isOpen,
    scopeRef: contentRef,
  });

  useEffect(() => {
    if (isOpen && isReady) {
      isHoveredRef.current = false;
      isFocusedRef.current = false;
    }
  }, [isOpen, isReady]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      isPaused,
      isPresent,
      status,
      dismissToast,
      resumeTimer,
      pauseTimer,
      contentRef,
    }),
    [
      isOpen,
      isPaused,
      isPresent,
      status,
      dismissToast,
      resumeTimer,
      pauseTimer,
    ],
  );

  if (!isReady || !isPresent) return null;

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
        ref={mergedRef}
        inert={status === "closing" || inert}
        aria-atomic="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-state={isOpen ? "open" : "closed"}
        data-paused={isPaused || undefined}
      >
        {children}
      </Component>
    </ToastContext.Provider>
  );
}
