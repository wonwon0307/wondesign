import {
  CollapsibleToggle,
  type CollapsibleToggleProps,
} from "@wondesign/collapsible";
import { clsx } from "clsx";

import { useSidebarItem } from "@/contexts/item";
import { useSidebar } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarItemToggleProps extends CollapsibleToggleProps {
  stretch?: boolean;
}

export function SidebarItemToggle({
  stretch = false,
  className,
  ...rest
}: Readonly<SidebarItemToggleProps>) {
  const { variant } = useSidebarItem();
  const { state } = useSidebar();

  if (variant !== "collapsible") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[WonDesign Sidebar] Invalid usage of SidebarItemToggle. Use it when SidebarItem is collapsible.",
      );
    }
    return null;
  }

  if (state !== "expanded") {
    return null;
  }

  return (
    <CollapsibleToggle
      {...rest}
      className={clsx(styles.baseInteractive({ stretch }), className)}
    />
  );
}
