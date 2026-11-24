import { useContext, useId, useLayoutEffect, useMemo } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { mergeRef } from "@/utils";
import { BackdropContext, ContentContext, useAlertInternal } from "./contexts";

export interface AlertContentProps extends Omit<
  React.ComponentProps<"div">,
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
  inert,
  ref,
  ...rest
}: Readonly<AlertContentProps>) {
  const {
    isOpen,
    isPresent,
    status,
    keepMounted,
    disablePortal,
    wrapperRef,
    titleId,
    messageId,
    setContentId,
    scopeKey,
  } = useAlertInternal();
  const isInsideBackdrop = useContext(BackdropContext) === scopeKey;
  const contentId = useId();
  const mergedRef = useMemo(() => mergeRef(wrapperRef, ref), [wrapperRef, ref]);

  useLayoutEffect(() => {
    setContentId(contentId);

    return () => setContentId(undefined);
  }, [contentId, setContentId]);

  if (!isPresent && !keepMounted) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <Portal disable={disablePortal || isInsideBackdrop}>
      <ContentContext.Provider value={scopeKey}>
        <Component
          {...rest}
          ref={mergedRef}
          id={contentId}
          role="alertdialog"
          tabIndex={-1}
          hidden={!isPresent}
          inert={status === "closing" || inert}
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
