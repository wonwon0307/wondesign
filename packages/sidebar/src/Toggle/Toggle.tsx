import {
  HeadlessButton,
  type HeadlessButtonProps,
} from "@wondesign/buttons/Headless";
import { KeyboardGroup } from "@wondesign/code/Keyboard";
import { Tooltip } from "@wondesign/tooltip";
import { clsx } from "clsx";

import { useInternalSidebar } from "@/contexts/sidebar";
import { SidebarToggleIcon } from "./Icon";
import { styles } from "./styles.css";

export interface SidebarToggleProps extends HeadlessButtonProps {
  disableTooltip?: boolean;
}

export function SidebarToggle({
  children = <SidebarToggleIcon />,
  disableTooltip = false,
  className,
  ...rest
}: Readonly<SidebarToggleProps>) {
  const { side, shortkey } = useInternalSidebar();

  if (!disableTooltip && shortkey) {
    return (
      <Tooltip
        placement={side === "left" ? "right" : "left"}
        text={<KeyboardGroup shortkey={shortkey} />}
        asChild
      >
        <Toggle {...rest} className={clsx(styles.toggle, className)}>
          {children}
        </Toggle>
      </Tooltip>
    );
  }

  return (
    <Toggle {...rest} className={clsx(styles.toggle, className)}>
      {children}
    </Toggle>
  );
}

function Toggle({ children, ...rest }: Readonly<HeadlessButtonProps>) {
  const {
    collapse,
    state,
    toggleSidebar,
    side,
    isMobile,
    contentId,
    ariaKeyshortcuts,
  } = useInternalSidebar();

  return (
    <HeadlessButton
      {...rest}
      onClick={toggleSidebar}
      isDisabled={collapse === "disable" && !isMobile}
      aria-controls={contentId}
      aria-expanded={state !== "closed"}
      aria-keyshortcuts={ariaKeyshortcuts}
      data-open={state === "expanded"}
      data-side={side}
      data-state={state}
      data-device={isMobile ? "mobile" : "desktop"}
    >
      {children}
    </HeadlessButton>
  );
}
