import { AsChild } from "@wondesign/composition/asChild";
import { Portal } from "@wondesign/composition/portal";

import { ContentContext, useTooltip } from "./contexts";

export interface TooltipContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "id" | "role" | "aria-hidden" | "onMouseEnter" | "onMouseLeave"
> {
  children: React.ReactNode;
  asChild?: boolean;
  disablePortal?: boolean;
}

export function TooltipContent({
  children,
  asChild,
  disablePortal = false,
  style,
  ...rest
}: Readonly<TooltipContentProps>) {
  const {
    isOpen,
    keepMounted,
    tooltipId,
    content,
    floatingRef,
    hideWithDelay,
    clearTimer,
  } = useTooltip("Content");

  if (!keepMounted && !isOpen) {
    return null;
  }

  const Component = asChild ? AsChild : "div";

  return (
    <ContentContext.Provider value={true}>
      <Portal disable={disablePortal}>
        <Component
          {...rest}
          id={tooltipId}
          role="tooltip"
          ref={floatingRef}
          onMouseEnter={clearTimer} // 마우스가 trigger를 떠나 content로 들어오면, 타이머를 초기화하여, 사라지지 않도록 해야한다.
          onMouseLeave={hideWithDelay}
          style={
            {
              ...style,
              "--wds-tooltip-content-x": `${content.x}px`,
              "--wds-tooltip-content-y": `${content.y}px`,
            } as React.CSSProperties
          }
          aria-hidden={!isOpen}
          data-state={isOpen ? "open" : "closed"}
        >
          {children}
        </Component>
      </Portal>
    </ContentContext.Provider>
  );
}
