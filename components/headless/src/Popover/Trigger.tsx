import { useContext } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, usePopoverInternal } from "./contexts";

export interface PopoverTriggerProps extends Omit<
  ButtonProps,
  | "children"
  | "onClick"
  | "aria-controls"
  | "aria-haspopup"
  | "aria-expanded"
  | "ref"
  | "type"
> {
  children: React.ReactNode;
}

export function PopoverTrigger({
  children,
  ...rest
}: Readonly<PopoverTriggerProps>) {
  const { isOpen, togglePopover, keepMounted, contentId, triggerRef } =
    usePopoverInternal();
  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "[WonDesign Headless] PopoverTrigger should be rendered outside of PopoverContent.",
    );
  }

  const ariaControls = !keepMounted && !isOpen ? undefined : contentId;

  return (
    <Button
      {...rest}
      ref={triggerRef}
      type="button"
      onClick={togglePopover}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={ariaControls}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
