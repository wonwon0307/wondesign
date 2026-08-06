import {
  TooltipMessage as Headless,
  type TooltipMessageProps as HeadlessProps,
} from "@wondesign/headless-ui/Tooltip";
import clsx from "clsx";

import { styles } from "./styles.css";

export type TooltipMessageProps = Omit<HeadlessProps, "ctxErrMsg">;

export function TooltipMessage({
  children,
  className,
  ...rest
}: Readonly<TooltipMessageProps>) {
  return (
    <Headless {...rest} className={clsx(styles.text, className)}>
      {children}
    </Headless>
  );
}
