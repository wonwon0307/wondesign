import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { ContentContext, useModalInternal } from "./contexts";

export interface ModalContentProps extends Omit<
  React.HTMLAttributes<HTMLDialogElement>,
  "children" | "role" | "hidden" | "tabIndex" | "aria-modal" | "aria-labelledby"
> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ModalContent({
  children,
  asChild = false,
  "aria-label": ariaLabel = "Modal",
  ...rest
}: Readonly<ModalContentProps>) {
  const { isOpen, keepMounted, disablePortal, titleId, floatingRef } =
    useModalInternal();

  if (!isOpen && !keepMounted) {
    return null;
  }

  const Component = asChild ? AsChild : "dialog";

  return (
    <Portal disable={disablePortal}>
      <ContentContext.Provider value={true}>
        <Component
          {...rest}
          ref={floatingRef}
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
