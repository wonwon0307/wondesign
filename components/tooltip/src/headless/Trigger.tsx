import {
  HeadlessButton,
  type HeadlessButtonProps,
} from "@wondesign/buttons/Headless";

import { useTooltip } from "./contexts";

export interface TooltipTriggerProps extends Omit<
  HeadlessButtonProps,
  | "children"
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
  isDisabled = false,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  const context = useTooltip("Trigger");

  const {
    showWithDelay,
    hideWithDelay,
    showImmediate,
    hideImmediate,
    tooltipId,
    triggerRef,
  } = context;

  return (
    <HeadlessButton
      {...rest}
      ref={triggerRef}
      asChild={asChild}
      isDisabled={isDisabled}
      aria-describedby={isDisabled ? undefined : tooltipId}
      onMouseEnter={isDisabled ? undefined : showWithDelay}
      onMouseLeave={isDisabled ? undefined : hideWithDelay}
      onFocus={isDisabled ? undefined : showImmediate}
      onBlur={isDisabled ? undefined : hideImmediate}
    >
      {children}
    </HeadlessButton>
  );
}
