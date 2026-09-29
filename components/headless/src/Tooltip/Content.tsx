import { AsChild } from "@/AsChild/AsChild";
import { Portal } from "@/Portal/Portal";
import { ContentContext, useTooltipInternal } from "./contexts";

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
  ...rest
}: Readonly<TooltipContentProps>) {
  const {
    isOpen,
    keepMounted,
    tooltipId,
    floatingRef,
    hideWithDelay,
    clearTimer,
  } = useTooltipInternal();

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
          aria-hidden={!isOpen}
          data-state={isOpen ? "open" : "closed"}
        >
          {children}
        </Component>
      </Portal>
    </ContentContext.Provider>
  );
}
