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
  | "aria-busy"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function AlertContent({
  children,
  asChild = false,
  ...rest
}: Readonly<AlertContentProps>) {
  const {
    isOpen,
    disablePortal,
    keepMounted,
    isPending,
    wrapperRef,
    contentId,
    titleId,
    messageId,
  } = useAlertInternal();

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
          aria-label={titleId ? undefined : "Alert"}
          aria-labelledby={titleId}
          aria-describedby={messageId}
          aria-busy={isPending || undefined}
          data-state={isOpen ? "open" : "closed"}
          data-pending={isPending || undefined}
        >
          {children}
        </Component>
      </ContentContext.Provider>
    </Portal>
  );
}
