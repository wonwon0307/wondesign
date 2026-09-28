import { KeyboardGroup } from "@wondesign/code/Keyboard";
import { Tooltip } from "@wondesign/tooltip";
import { clsx } from "clsx";

import { useSidebarInternal } from "@/contexts/sidebar";
import { HeadlessToggle, type HeadlessToggleProps } from "./Headless";
import { DefaultToggleIcon } from "./Icon";
import { styles } from "./styles.css";

export interface SidebarToggleProps extends HeadlessToggleProps {
  disableTooltip?: boolean;
}

export function SidebarToggle({
  children = <DefaultToggleIcon />,
  disableTooltip = false,
  className,
  ...rest
}: Readonly<SidebarToggleProps>) {
  const { side, shortkey } = useSidebarInternal();

  if (!disableTooltip && shortkey) {
    return (
      <Tooltip
        placement={side === "left" ? "right" : "left"}
        text={<KeyboardGroup shortkey={shortkey} />}
        asChild
      >
        <HeadlessToggle {...rest} className={clsx(styles.toggle, className)}>
          {children}
        </HeadlessToggle>
      </Tooltip>
    );
  }

  return <HeadlessToggle {...rest}>{children}</HeadlessToggle>;
}
