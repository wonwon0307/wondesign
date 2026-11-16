import { useContext, useEffect } from "react";

import { Portal } from "@/Portal/Portal";
import { ContentContext, useModalInternal } from "./contexts";

export interface ModalBackdropProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "hidden">,
    React.RefAttributes<HTMLDivElement> {}

export function ModalBackdrop(props: Readonly<ModalBackdropProps>) {
  const { isOpen, disablePortal, keepMounted } = useModalInternal();
  const isInsideContent = useContext(ContentContext);

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] ModalBackdrop should be rendered outside of ModalContent.",
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
