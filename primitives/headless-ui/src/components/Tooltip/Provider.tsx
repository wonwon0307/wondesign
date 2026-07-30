import { useCallback, useEffect, useId, useMemo, useRef } from "react";

import { useOpenState } from "@/core/disclosure";
import { useFloating, type FloatingOptions } from "@/core/floating";
import { useEscapeClose } from "@/core/keyboard";
import { useClickOutside, useLongTouch } from "@/core/pointer";
import { TooltipContext } from "./_internals/contexts";

export interface TooltipProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  inline?: boolean;
  floatingOptions?: FloatingOptions;
  unmountOnHide?: boolean;
  openDelay?: number;
  closeDelay?: number;
  longTouchDelay?: number;
  isDisabled?: boolean;
}

export function TooltipProvider({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  inline = false,
  floatingOptions = {
    placement: "bottom",
    forcePlacement: false,
    align: "center",
    offset: 0,
    padding: 0,
  },
  unmountOnHide = true,
  openDelay = 0,
  closeDelay = 0,
  longTouchDelay = 500,
  isDisabled = false,
}: Readonly<TooltipProps>) {
  const {
    isOpen,
    show: showTooltip,
    hide: hideTooltip,
  } = useOpenState(controlledOpen, onOpenChange);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  const { floating, arrow } = useFloating(
    triggerRef,
    floatingRef,
    arrowRef,
    floatingOptions,
    isOpen,
  );

  useClickOutside(floatingRef, hideTooltip, isOpen, triggerRef);
  useEscapeClose(hideTooltip, isOpen);
  useLongTouch(triggerRef, showTooltip, !isOpen && !isDisabled, longTouchDelay); // 롱터치는 터치 자체에 delay가 있기 때문에, show에 delay를 주지 않는다.

  const showTooltipWithDelay = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(showTooltip, openDelay);
  }, [openDelay, showTooltip]);

  const hideTooltipWithDelay = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(hideTooltip, closeDelay);
  }, [closeDelay, hideTooltip]);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const contextValue = useMemo(
    () => ({
      isDisabled,
      isOpen,
      showTooltip,
      showTooltipWithDelay,
      hideTooltip,
      hideTooltipWithDelay,
      clearTimer,
      isPortalMode: !inline,
      unmountOnHide,
      tooltipId,
      floatingPosition: floating,
      arrowPosition: arrow,
      triggerRef,
      floatingRef,
      arrowRef,
    }),
    [
      isDisabled,
      isOpen,
      showTooltip,
      showTooltipWithDelay,
      hideTooltip,
      hideTooltipWithDelay,
      clearTimer,
      inline,
      unmountOnHide,
      tooltipId,
      floating,
      arrow,
    ],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
    </TooltipContext.Provider>
  );
}
