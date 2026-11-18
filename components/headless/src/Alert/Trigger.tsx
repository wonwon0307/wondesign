import { useContext, useEffect, useMemo } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { mergeRef } from "@/utils";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertTriggerProps extends Omit<
  ButtonProps,
  "children" | "type" | "aria-haspopup" | "aria-controls"
> {
  children: React.ReactNode;
}

export function AlertTrigger({
  children,
  onClick,
  ref,
  ...rest
}: Readonly<AlertTriggerProps>) {
  const { isOpen, showAlert, keepMounted, contentId, triggerRef } =
    useAlertInternal();
  const isInsideContent = useContext(ContentContext);
  const mergedRef = useMemo(() => mergeRef(triggerRef, ref), [triggerRef, ref]);

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] AlertTrigger should be rendered outside of AlertContent.",
      );
    }
  }, [isInsideContent]);

  const ariaControls = !isOpen && !keepMounted ? undefined : contentId;

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) showAlert();
  };

  return (
    <Button
      {...rest}
      ref={mergedRef}
      type="button"
      onClick={finalOnClick}
      aria-haspopup="dialog"
      aria-controls={ariaControls}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
