import {
  SidebarToggle as Button,
  type SidebarToggleProps as Props,
} from "@wondesign/headless-ui/Sidebar";
import { Tooltip } from "@wondesign/headless-ui/Tooltip";
import { KeyboardGroup } from "@wondesign/texts/Keyboard";
import clsx from "clsx";

import { useSidebar } from "@/core";
import { SidebarToggleIcon } from "./Icon";
import { styles } from "./styles.css";

export interface SidebarToggleProps extends Props {
  disableTooltip?: boolean;
}

export function SidebarToggle({
  children = <SidebarToggleIcon />,
  disableTooltip = false,
  className,
  ...rest
}: Readonly<SidebarToggleProps>) {
  const { side, ariaKeyshortcuts, keyboardShortkey } = useSidebar();

  if (!disableTooltip && keyboardShortkey) {
    return (
      <Tooltip
        floatingOptions={{ placement: side === "left" ? "right" : "left" }}
      >
        <Tooltip.Trigger
          {...rest}
          className={clsx(styles.toggle, className)}
          aria-keyshortcuts={ariaKeyshortcuts}
        >
          {children}
        </Tooltip.Trigger>
        <Tooltip.Content className={styles.tooltip}>
          <Tooltip.Message>
            <KeyboardGroup keys={keyboardShortkey} />
          </Tooltip.Message>
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip>
    );
  }

  return (
    <Button {...rest} className={clsx(styles.toggle, className)}>
      {children}
    </Button>
  );
}
