import {
  HeadlessAnchor,
  type HeadlessAnchorProps,
} from "@wondesign/links/Headless";
import { clsx } from "clsx";

import { useSidebarItem } from "@/contexts/item";
import { useSidebar } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarLinkProps extends HeadlessAnchorProps {
  isActive?: boolean;
  stretch?: boolean;
}

export function SidebarLink({
  isActive = false,
  isDisabled = false,
  stretch = false,
  className,
  ...rest
}: Readonly<SidebarLinkProps>) {
  // To ensure this is used within a SidebarItem context
  useSidebarItem();
  const { state, isMobile } = useSidebar();

  return (
    <HeadlessAnchor
      {...rest}
      isDisabled={isDisabled}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      data-device={isMobile ? "mobile" : "desktop"}
      data-disabled={isDisabled || undefined}
      data-state={state}
      className={clsx(styles.baseInteractive({ stretch }), className)}
    />
  );
}
