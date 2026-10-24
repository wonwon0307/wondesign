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
    showWithDelay,
    hideWithDelay,
    showImmediate,
    hideImmediate,
    tooltipId,
    triggerRef,
  } = context;

  return (
    <Button
      {...rest}
      ref={triggerRef}
      asChild={asChild}
      aria-describedby={tooltipId}
      onMouseEnter={showWithDelay}
      onMouseLeave={hideWithDelay}
      onFocus={showImmediate}
      onBlur={hideImmediate}
    >
      {children}
    </Button>
  );
}
