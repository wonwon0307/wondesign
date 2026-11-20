import { Anchor, type AnchorProps } from "@wondesign/headless/Anchor";
import { clsx } from "clsx";

import { useSidebarInternal } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarAnchorProps extends AnchorProps {
  isActive?: boolean;
}

export function SidebarAnchor({
  isActive = false,
  isDisabled = false,
  className,
  ...rest
}: Readonly<SidebarAnchorProps>) {
  const { state, isMobile } = useSidebarInternal();

  return (
    <Anchor
      {...rest}
      isDisabled={isDisabled}
      className={clsx(styles.anchor, className)}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      data-device={isMobile ? "mobile" : "desktop"}
      data-disabled={isDisabled || undefined}
      data-state={state}
    />
  );
}
