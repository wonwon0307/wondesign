import { useContext, useEffect, useMemo } from "react";

import { Button, type ButtonProps } from "@/Button/Button";
import { mergeRef } from "@/utils";
import { BackdropContext, ContentContext, useModalInternal } from "./contexts";

export interface ModalTriggerProps extends Omit<
  ButtonProps,
  "children" | "type" | "aria-haspopup"
> {
  children: React.ReactNode;
}

export function ModalTrigger({
  children,
  onClick,
  ref,
  ...rest
}: Readonly<ModalTriggerProps>) {
  const { isOpen, openModal, triggerRef, scopeKey } = useModalInternal();
  const isInsideBackdrop = useContext(BackdropContext) === scopeKey;
  const isInsideContent = useContext(ContentContext) === scopeKey;
  const mergedRef = useMemo(() => mergeRef(triggerRef, ref), [triggerRef, ref]);

  useEffect(() => {
    if (
      (isInsideContent || isInsideBackdrop) &&
      process.env.NODE_ENV !== "production"
    ) {
      console.warn(
        "[WonDesign Headless] ModalTrigger should be rendered outside of ModalContent and ModalBackdrop.",
      );
    }
  }, [isInsideContent, isInsideBackdrop]);

  const finalOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) openModal();
  };

  return (
    <Button
      {...rest}
      ref={mergedRef}
      onClick={finalOnClick}
      aria-haspopup="dialog"
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </Button>
  );
}
