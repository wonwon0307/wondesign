import { useContext, useEffect } from "react";

import { Portal } from "@/Portal/Portal";
import { ContentContext, useAlertInternal } from "./contexts";

export type AlertBackdropProps = Omit<
  React.ComponentProps<"div">,
  "children" | "hidden"
>;

export function AlertBackdrop(props: Readonly<AlertBackdropProps>) {
  const { isOpen, disablePortal, keepMounted, scopeKey } = useAlertInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;

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
