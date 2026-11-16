import { useContext, useEffect } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { ContentContext, useModalInternal } from "./contexts";

export interface ModalTriggerProps extends Omit<
  ButtonProps,
  "children" | "onClick" | "type" | "ref" | "aria-haspopup"
> {
  children: React.ReactNode;
}

export function ModalTrigger({
  children,
  ...rest
}: Readonly<ModalTriggerProps>) {
  const { isOpen, openModal, triggerRef } = useModalInternal();
  const isInsideContent = useContext(ContentContext);

  useEffect(() => {
    if (isInsideContent && process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Headless] ModalTrigger should be rendered outside of ModalContent.",
      );
    }
  }, [isInsideContent]);

  return (
    <Button
      {...rest}
      ref={triggerRef}
      type="button"
      onClick={openModal}
      aria-haspopup="dialog"
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
