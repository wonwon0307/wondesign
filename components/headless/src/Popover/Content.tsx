import { useId, useLayoutEffect, useMemo } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { mergeRef } from "@/utils";
import { ContentContext, usePopoverInternal } from "./contexts";

export interface PopoverContentProps extends Omit<
  React.ComponentProps<"dialog">,
  | "children"
  | "id"
  | "role"
  | "hidden"
  | "tabIndex"
  | "aria-labelledby"
  | "open"
  | "closedby"
  | "onClose"
  | "onCancel"
> {
  children: React.ReactNode;
  asChild?: boolean;
  disablePortal?: boolean;
}

export function PopoverContent({
  children,
  asChild = false,
  disablePortal = false,
  "aria-label": ariaLabel = "Popover Content",
  ref,
  ...rest
}: Readonly<PopoverContentProps>) {
  const {
    isOpen,
    keepMounted,
    placement,
    titleId,
    setContentId,
    floatingRef,
    scopeKey,
  } = usePopoverInternal();
  const contentId = useId();
  const mergedRef = useMemo(
    () => mergeRef(floatingRef, ref),
    [floatingRef, ref],
  );

  useLayoutEffect(() => {
    setContentId(contentId);
    return () => setContentId(undefined);
  }, [contentId, setContentId]);

  if (!keepMounted && !isOpen) return null;

  const Component = asChild ? AsChild : "dialog";

  return (
    <ContentContext.Provider value={scopeKey}>
      <Portal disable={disablePortal}>
        <Component
          {...rest}
          id={contentId}
          ref={mergedRef}
          role="dialog"
          open={!asChild && isOpen}
          hidden={!isOpen}
          tabIndex={-1}
          aria-label={titleId ? undefined : ariaLabel}
          aria-labelledby={titleId}
          data-state={isOpen ? "open" : "closed"}
          data-placement={placement}
        >
          {children}
        </Component>
      </Portal>
    </ContentContext.Provider>
  );
}
