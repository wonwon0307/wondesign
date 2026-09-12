import { HeadlessTooltip, type HeadlessTooltipProps } from "@/headless";

export function TestComponent({
  children,
  isDisabled = false,
  disablePortal = false,
  ...rest
}: Readonly<
  HeadlessTooltipProps & { isDisabled?: boolean; disablePortal?: boolean }
>) {
  return (
    <HeadlessTooltip showDelay={300} hideDelay={700} {...rest}>
      <HeadlessTooltip.Trigger
        isDisabled={isDisabled}
        data-testid="tooltip-trigger"
      >
        Trigger
      </HeadlessTooltip.Trigger>
      <HeadlessTooltip.Content
        disablePortal={disablePortal}
        data-testid="tooltip-content"
      >
        <span data-testid="tooltip-message">{children}</span>
        <HeadlessTooltip.Arrow data-testid="tooltip-arrow">
          Arrow
        </HeadlessTooltip.Arrow>
      </HeadlessTooltip.Content>
    </HeadlessTooltip>
  );
}
