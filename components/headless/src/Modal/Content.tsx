import { useContext, useMemo } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { mergeRef } from "@/utils";
import { BackdropContext, ContentContext, useModalInternal } from "./contexts";

export interface ModalContentProps extends Omit<
  React.ComponentProps<"dialog">,
  | "children"
  | "role"
  | "hidden"
  | "tabIndex"
  | "aria-modal"
  | "aria-labelledby"
  | "open"
  | "onClose"
  | "onCancel"
  | "closedby"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ModalContent({
  children,
  asChild = false,
  "aria-label": ariaLabel = "Modal",
  inert,
  ref,
  ...rest
}: Readonly<ModalContentProps>) {
  const {
    isOpen,
    isPresent,
    status,
    keepMounted,
    disablePortal,
    titleId,
    floatingRef,
    scopeKey,
  } = useModalInternal();
  const isInsideBackdrop = useContext(BackdropContext) === scopeKey;
  const mergedRef = useMemo(
    () => mergeRef(floatingRef, ref),
    [floatingRef, ref],
  );

  if (!isPresent && !keepMounted) {
    return null;
  }

  const Component = asChild ? AsChild : "dialog";

  return (
    <Portal disable={disablePortal || isInsideBackdrop}>
      <ContentContext.Provider value={scopeKey}>
        <Component
          {...rest}
          ref={mergedRef}
          role="dialog"
          open={!asChild && isPresent}
          hidden={!isPresent}
          inert={status === "closing" || inert}
          tabIndex={-1}
          aria-modal="true"
          aria-label={titleId ? undefined : ariaLabel}
          aria-labelledby={titleId}
          data-state={isOpen ? "open" : "closed"}
        >
          {children}
        </Component>
      </ContentContext.Provider>
    </Portal>
  );
}
