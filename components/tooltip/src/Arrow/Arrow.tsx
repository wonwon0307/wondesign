import {
  TooltipArrow as Headless,
  type TooltipArrowProps,
} from "@wondesign/headless-ui/Tooltip";

export function TooltipArrow({
  children,
  ...rest
}: Readonly<Omit<TooltipArrowProps, "ctxErrMsg">>) {
  return <Headless {...rest}>{children}</Headless>;
}
