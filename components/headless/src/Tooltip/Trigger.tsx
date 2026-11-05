import { Button, type ButtonProps } from "@/Button/Button";
import { useTooltipInternal } from "./contexts";

export interface TooltipTriggerProps extends Omit<
  ButtonProps,
  | "children"
  | "ref"
  | "aria-describedby"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onFocus"
  | "onBlur"
  | "onTouchStart"
  | "onTouchEnd"
  | "onTouchMove"
  | "onTouchCancel"
> {
  children: React.ReactNode;
}

export function TooltipTrigger({
  children,
  asChild = false,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const context = useTooltipInternal();

  const {
    isOpen,
    keepMounted,
    showWithDelay,
    hideWithDelay,
    showImmediate,
    hideImmediate,
    tooltipId,
    triggerRef,
  } = context;

  const ariaDescribedBy = !keepMounted && !isOpen ? undefined : tooltipId;

  return (
    <Button
      {...rest}
      ref={triggerRef}
      asChild={asChild}
      aria-describedby={ariaDescribedBy}
      onMouseEnter={showWithDelay}
      onMouseLeave={hideWithDelay}
      onFocus={showImmediate}
      onBlur={hideImmediate}
    >
      {children}
    </Button>
  );
}
