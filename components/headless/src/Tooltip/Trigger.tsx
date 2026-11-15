import { useContext, useEffect } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, useTooltipInternal } from "./contexts";

export interface TooltipTriggerProps extends Omit<
  ButtonProps,
  | "children"
  | "type"
  | "ref"
  | "aria-describedby"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
  | "onTouchStart"
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchCancel"
> {
  children: React.ReactNode;
}

export function TooltipTrigger({
  children,
  asChild = false,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const context = useTooltipInternal();
  const isInsideContent = useContext(ContentContext);

  const {
    isOpen,
    keepMounted,
    showWithDelay,
    hideWithDelay,
    showImmediate,
    hideImmediate,
    tooltipId,
    triggerRef,
  } = context;

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] TooltipTrigger should be rendered outside of TooltipContent.",
      );
    }
  }, [isInsideContent]);

  const ariaDescribedBy = !keepMounted && !isOpen ? undefined : tooltipId;

  return (
    <Button
      {...rest}
      type="button"
      ref={triggerRef}
      asChild={asChild}
      aria-describedby={ariaDescribedBy}
      onMouseEnter={showWithDelay}
      onMouseLeave={hideWithDelay}
      onFocus={showImmediate}
      onBlur={hideImmediate}
    >
      {children}
    </Button>
  );
}
