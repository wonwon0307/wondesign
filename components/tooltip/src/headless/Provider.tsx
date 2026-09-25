import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import { useOpenState } from "@wondesign/interactions/disclosure";
import { useEscapeKey } from "@wondesign/interactions/keyboard";
import { useClickOutside, useLongTouch } from "@wondesign/interactions/pointer";
import { useFloatingPosition, type FloatingOptions } from "@wondesign/position";

import { TooltipContext } from "./contexts";

export interface HeadlessTooltipProps extends FloatingOptions {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  keepMounted?: boolean;
  showDelay?: number;
  hideDelay?: number;
}

export function TooltipProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  keepMounted = false,
  showDelay = 300,
  hideDelay = 0,
  placement: userPlacement = "bottom",
  forcePlacement = false,
  align = "center",
  offset = 4,
  padding = 8,
}: Readonly<HeadlessTooltipProps>) {
  const {
    isOpen,
    show: showImmediate,
    hide: hideImmediate,
  } = useOpenState(controlledOpen, onOpenChange);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  useClickOutside(floatingRef, hideImmediate, isOpen, triggerRef);
  // 롱터치는 터치 자체에 delay가 있기 때문에, show에 delay를 주지 않는다.
  useLongTouch(triggerRef, showImmediate, !isOpen);
  useEscapeKey(hideImmediate, isOpen);
  const { content, arrow } = useFloatingPosition(
    triggerRef,
    floatingRef,
    arrowRef,
    {
      placement: userPlacement,
      forcePlacement,
      align,
      offset,
      padding,
    },
    isOpen,
  );

  const showWithDelay = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(showImmediate, showDelay);
  }, [showImmediate, showDelay]);

  const hideWithDelay = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(hideImmediate, hideDelay);
  }, [hideImmediate, hideDelay]);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  // 컴포넌트가 언마운트될 때 타이머 정리.
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      keepMounted,
      showImmediate,
      showWithDelay,
      hideImmediate,
      hideWithDelay,
      clearTimer,
      tooltipId,
      triggerRef,
      floatingRef,
      arrowRef,
      content,
      arrow,
    }),
    [
      isOpen,
      keepMounted,
      showImmediate,
      showWithDelay,
      hideImmediate,
      hideWithDelay,
      clearTimer,
      tooltipId,
      content,
      arrow,
    ],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  );
}
