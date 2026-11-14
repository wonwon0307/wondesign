import { useId, useLayoutEffect } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { ContentContext, usePopoverInternal } from "./contexts";

export interface PopoverContentProps extends Omit<
  React.HTMLAttributes<HTMLDialogElement>,
  "children" | "id" | "role" | "open" | "tabIndex" | "aria-labelledby"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function PopoverContent({
  children,
  asChild = false,
  "aria-label": ariaLabel = "Popover Content",
  ...rest
}: Readonly<PopoverContentProps>) {
  const {
    isOpen,
    disablePortal,
    keepMounted,
    placement,
    titleId,
    setContentId,
    floatingRef,
  } = usePopoverInternal();
  const contentId = useId();

  useLayoutEffect(() => {
    setContentId(contentId);
    return () => setContentId(undefined);
  }, [contentId, setContentId]);

  if (!keepMounted && !isOpen) return null;

  const Component = asChild ? AsChild : "dialog";

  return (
    <ContentContext.Provider value={true}>
      <Portal disable={disablePortal}>
        <Component
          {...rest}
          id={contentId}
          ref={floatingRef}
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
