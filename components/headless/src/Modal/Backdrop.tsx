import { useContext, useEffect } from "react";

import { Portal } from "@/Portal/Portal";
import { ContentContext, useModalInternal } from "./contexts";

export type ModalBackdropProps = Omit<
  React.ComponentProps<"div">,
  "children" | "hidden"
>;

export function ModalBackdrop(props: Readonly<ModalBackdropProps>) {
  const { isOpen, disablePortal, keepMounted, scopeKey } = useModalInternal();
  const isInsideContent = useContext(ContentContext) === scopeKey;

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
