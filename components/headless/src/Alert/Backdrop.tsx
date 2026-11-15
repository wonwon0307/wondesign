import { useContext, useEffect } from "react";

import { Portal } from "@/Portal/Portal";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertBackdropProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "hidden">,
    React.RefAttributes<HTMLDivElement> {}

export function AlertBackdrop(props: Readonly<AlertBackdropProps>) {
  const { isOpen, disablePortal, keepMounted } = useAlertInternal();
  const isInsideContent = useContext(ContentContext);

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] AlertBackdrop should be rendered outside of AlertContent.",
      );
    }
  }, [isInsideContent]);

  if (!isOpen && !keepMounted) {
    return null;
  }

  return (
    <Portal disable={disablePortal}>
      <div
        {...props}
        hidden={!isOpen}
        data-state={isOpen ? "open" : "closed"}
      />
    </Portal>
  );
}
