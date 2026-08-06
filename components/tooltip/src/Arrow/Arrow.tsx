import {
  TooltipArrow as Headless,
  type TooltipArrowProps as HeadlessProps,
} from "@wondesign/headless-ui/Tooltip";

export type TooltipArrowProps = Omit<HeadlessProps, "ctxErrMsg">;

export function TooltipArrow({
  children,
  ...rest
}: Readonly<TooltipArrowProps>) {
  return <Headless {...rest}>{children}</Headless>;
}
