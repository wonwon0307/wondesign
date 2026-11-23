import { useContext, useEffect, useMemo } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { mergeRef } from "@/utils";
import { ContentContext, usePopoverInternal } from "./contexts";

export interface PopoverTriggerProps extends Omit<
  ButtonProps,
  "children" | "aria-controls" | "aria-haspopup" | "aria-expanded" | "type"
> {
  children: React.ReactNode;
}

export function PopoverTrigger({
  children,
  onClick,
  ref,
  ...rest
}: Readonly<PopoverTriggerProps>) {
  const {
    isOpen,
    isPresent,
    togglePopover,
    keepMounted,
    contentId,
    triggerRef,
    scopeKey,
  } = usePopoverInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;
  const mergedRef = useMemo(() => mergeRef(triggerRef, ref), [triggerRef, ref]);

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] PopoverTrigger should be rendered outside of PopoverContent.",
      );
    }
  }, [isInsideContent]);

  const ariaControls = !keepMounted && !isPresent ? undefined : contentId;

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) togglePopover();
  };

  return (
    <Button
      {...rest}
      ref={mergedRef}
      type="button"
      onClick={finalOnClick}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={ariaControls}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
