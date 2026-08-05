import { useContext } from "react";

import { AsChild } from "@/core/asChild";
import { Portal } from "@/core/portal";
import { zIndex } from "@/core/zIndex";
import { ContentContext, TooltipContext } from "./_internals/contexts";

export interface TooltipContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "id" | "role" | "aria-hidden" | "onMouseEnter" | "onMouseLeave"
> {
  children: React.ReactNode;
  asChild?: boolean;
  ctxErrMsg?: string;
}

export function TooltipContent({
  children,
  asChild,
  ctxErrMsg = "Tooltip.Content must be used inside the Tooltip wrapper.",
  style,
  ...rest
}: Readonly<TooltipContentProps>) {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error(ctxErrMsg);
  }

  const {
    isOpen,
    tooltipId,
    floatingPosition,
    floatingRef,
    isPortalMode,
    unmountOnHide,
    hideTooltipWithDelay,
    clearTimer,
  } = context;

  if (unmountOnHide && !isOpen) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <Portal isPortalMode={isPortalMode}>
      <ContentContext.Provider value={true}>
        <Component
          {...rest}
          id={tooltipId}
          role="tooltip"
          ref={floatingRef}
          onMouseEnter={clearTimer}
          onMouseLeave={hideTooltipWithDelay}
          style={{
            display: isOpen ? undefined : "none",
            position: "fixed",
            left: floatingPosition.x,
            top: floatingPosition.y,
            zIndex: zIndex.tooltip,
            ...style,
          }}
          aria-hidden={!isOpen}
          data-state={isOpen ? "open" : "closed"}
        >
          {children}
        </Component>
      </ContentContext.Provider>
    </Portal>
  );
}
