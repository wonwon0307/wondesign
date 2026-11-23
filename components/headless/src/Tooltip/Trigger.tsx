import { useContext, useEffect, useMemo } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { mergeRef } from "@/utils";
import { ContentContext, useTooltipInternal } from "./contexts";

export interface TooltipTriggerProps extends Omit<
  ButtonProps,
  | "children"
  | "type"
  | "aria-describedby"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
> {
  children: React.ReactNode;
}

export function TooltipTrigger({
  children,
  asChild = false,
  ref,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const {
    isOpen,
    isPresent,
    keepMounted,
    showWithDelay,
    hideWithDelay,
    showImmediate,
    hideImmediate,
    tooltipId,
    triggerRef,
    scopeKey,
  } = useTooltipInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;
  const mergedRef = useMemo(() => mergeRef(triggerRef, ref), [triggerRef, ref]);

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] TooltipTrigger should be rendered outside of TooltipContent.",
      );
    }
  }, [isInsideContent]);

  const ariaDescribedBy = !keepMounted && !isPresent ? undefined : tooltipId;

  return (
    <Button
      {...rest}
      type="button"
      ref={mergedRef}
      asChild={asChild}
      aria-describedby={ariaDescribedBy}
      onMouseEnter={showWithDelay}
      onMouseLeave={hideWithDelay}
      onFocus={showImmediate}
      onBlur={hideImmediate}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
