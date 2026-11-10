import { useId, useLayoutEffect } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { ContentContext, useAlertInternal } from "./contexts";

export interface AlertContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "children"
  | "role"
  | "id"
  | "tabIndex"
  | "hidden"
  | "aria-modal"
  | "aria-labelledby"
  | "aria-describedby"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function AlertContent({
  children,
  asChild = false,
  "aria-label": ariaLabel = "Alert",
  ...rest
}: Readonly<AlertContentProps>) {
  const {
    isOpen,
    disablePortal,
    keepMounted,
    wrapperRef,
    titleId,
    messageId,
    setContentId,
  } = useAlertInternal();
  const contentId = useId();

  useLayoutEffect(() => {
    setContentId(contentId);

    return () => setContentId(undefined);
  }, [contentId, setContentId]);

  if (!isOpen && !keepMounted) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <Portal disable={disablePortal}>
      <ContentContext.Provider value={true}>
        <Component
          {...rest}
          ref={wrapperRef}
          id={contentId}
          role="alertdialog"
          tabIndex={-1}
          hidden={!isOpen}
          aria-modal="true"
          aria-label={titleId ? undefined : ariaLabel}
          aria-labelledby={titleId}
          aria-describedby={messageId}
          data-state={isOpen ? "open" : "closed"}
        >
          {children}
        </Component>
      </ContentContext.Provider>
    </Portal>
  );
}
