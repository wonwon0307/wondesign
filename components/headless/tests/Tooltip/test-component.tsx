import { Tooltip, type TooltipProps } from "@/Tooltip";

export function TestComponent({
  children,
  isDisabled = false,
  disablePortal = false,
  ...rest
}: Readonly<TooltipProps & { isDisabled?: boolean; disablePortal?: boolean }>) {
  return (
    <Tooltip {...rest}>
      <Tooltip.Trigger isDisabled={isDisabled} data-testid="tooltip-trigger">
        Trigger
      </Tooltip.Trigger>
      <Tooltip.Content
        disablePortal={disablePortal}
        data-testid="tooltip-content"
      >
        <span data-testid="tooltip-message">{children}</span>
        <Tooltip.Arrow data-testid="tooltip-arrow">Arrow</Tooltip.Arrow>
      </Tooltip.Content>
    </Tooltip>
  );
}
