import { useContext } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertTriggerProps extends Omit<
  ButtonProps,
  "children" | "ref" | "type" | "onClick" | "aria-haspopup" | "aria-controls"
> {
  children: React.ReactNode;
}

export function AlertTrigger({
  children,
  ...rest
}: Readonly<AlertTriggerProps>) {
  const { isOpen, showAlert, contentId, triggerRef } = useAlertInternal();
  const isInsideContent = useContext(ContentContext);

  if (isInsideContent && process.env.NODE_ENV !== "production") {
    console.warn(
      "[WonDesign Headless] AlertTrigger should be rendered outside of AlertContent.",
    );
  }

  return (
    <Button
      {...rest}
      ref={triggerRef}
      type="button"
      onClick={showAlert}
      aria-haspopup="dialog"
      aria-controls={contentId}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
