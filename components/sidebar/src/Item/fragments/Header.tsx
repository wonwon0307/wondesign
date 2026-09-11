import clsx from "clsx";

import { useSidebarItem } from "@/contexts/item";
import { useSidebar } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarItemHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: React.ReactNode;
}

export function SidebarItemHeader({
  children,
  className,
  ...rest
}: Readonly<SidebarItemHeaderProps>) {
  // To ensure this is used within a SidebarItem context
  const { collapsedBehavior, hasSubitems } = useSidebarItem();
  const { state } = useSidebar();

  const showHeader =
    state === "expanded" ||
    !hasSubitems ||
    (state === "collapsed" && collapsedBehavior === "hide-children");

  if (showHeader) {
    return (
      <div {...rest} className={clsx(styles.header, className)}>
        {children}
      </div>
    );
  }

  return null;
}
