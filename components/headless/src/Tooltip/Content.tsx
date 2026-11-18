import { useId, useLayoutEffect, useMemo } from "react";
import { usePresence } from "@wondesign/disclosure/presence";

import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { mergeRef } from "@/utils";
import { ContentContext, useTooltipInternal } from "./contexts";

export interface TooltipContentProps extends Omit<
  React.ComponentProps<"div">,
  "children" | "id" | "role" | "hidden" | "onMouseEnter" | "onMouseLeave"
> {
  children: React.ReactNode;
  asChild?: boolean;
  disablePortal?: boolean;
}

export function TooltipContent({
  children,
  asChild = false,
  disablePortal = false,
  inert,
  ref,
  ...rest
}: Readonly<TooltipContentProps>) {
  const {
    isOpen,
    keepMounted,
    setTooltipId,
    placement,
    floatingRef,
    hideWithDelay,
    clearTimer,
    scopeKey,
  } = useTooltipInternal();
  const tooltipId = useId();
  const { isPresent, status } = usePresence(floatingRef, isOpen);
  const mergedRef = useMemo(
    () => mergeRef(floatingRef, ref),
    [floatingRef, ref],
  );

  useLayoutEffect(() => {
    setTooltipId(tooltipId);

    return () => setTooltipId(undefined);
  }, [tooltipId, setTooltipId]);

  if (!keepMounted && !isPresent) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <ContentContext.Provider value={scopeKey}>
      <Portal disable={disablePortal}>
        <Component
          {...rest}
          id={tooltipId}
          role="tooltip"
          hidden={!isPresent}
          inert={status === "closing" || inert}
          ref={mergedRef}
          onMouseEnter={clearTimer} // 마우스가 trigger를 떠나 content로 들어오면, 타이머를 초기화하여, 사라지지 않도록 해야한다.
          onMouseLeave={hideWithDelay}
          data-state={isOpen ? "open" : "closed"}
          data-placement={placement}
        >
          {children}
        </Component>
      </Portal>
    </ContentContext.Provider>
  );
}
