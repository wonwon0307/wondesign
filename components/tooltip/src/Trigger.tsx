import {
  TooltipTrigger as Trigger,
  type TooltipTriggerProps,
} from "@wondesign/headless/Tooltip";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export function TooltipTrigger({
  children,
  className,
  ...rest
}: Readonly<TooltipTriggerProps>) {
  return (
    <Trigger {...rest} className={clsx(styles.trigger, className)}>
      {children}
    </Trigger>
  );
}
