import { useMemo } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { mergeRef } from "@/utils";
import { ContentContext, useModalInternal } from "./contexts";

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
  ref,
  ...rest
}: Readonly<ModalContentProps>) {
  const { isOpen, keepMounted, disablePortal, titleId, floatingRef, scopeKey } =
    useModalInternal();
  const mergedRef = useMemo(
    () => mergeRef(floatingRef, ref),
    [floatingRef, ref],
  );

  if (!isOpen && !keepMounted) {
    return null;
  }

  const Component = asChild ? AsChild : "dialog";

  return (
    <Portal disable={disablePortal}>
      <ContentContext.Provider value={scopeKey}>
        <Component
          {...rest}
          ref={mergedRef}
          role="dialog"
          open={!asChild && isOpen}
          hidden={!isOpen}
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
