import {
  TooltipMessage as Headless,
  type TooltipMessageProps,
} from "@wondesign/headless-ui/Tooltip";
import clsx from "clsx";

import { styles } from "./styles.css";

export function TooltipMessage({
  children,
  className,
  ...rest
}: Readonly<Omit<TooltipMessageProps, "ctxErrMsg">>) {
  return (
    <Headless {...rest} className={clsx(styles.text, className)}>
      {children}
    </Headless>
  );
}
