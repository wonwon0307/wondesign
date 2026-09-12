import { CollapsibleContent } from "@wondesign/collapsible";
import clsx from "clsx";

import { useSidebarItem } from "@/contexts/item";
import { useSidebar } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarItemSubitemsProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  children: React.ReactNode;
  as?: "ul" | "div";
}

export function SidebarItemSubitems({
  children,
  as: Component = "div",
  className,
  ...rest
}: Readonly<SidebarItemSubitemsProps>) {
  const { state } = useSidebar();
  const { variant, collapsedBehavior, hasSubitems } = useSidebarItem();

  const isVisible =
    state === "expanded" ||
    (state === "collapsed" && collapsedBehavior === "flatten");

  if (!isVisible || !hasSubitems) {
    return null;
  }

  if (variant === "collapsible" && state === "expanded") {
    return (
      <CollapsibleContent asChild>
        <Component {...rest} className={clsx(styles.subitems, className)}>
          {children}
        </Component>
      </CollapsibleContent>
    );
  }

  return (
    <Component {...rest} className={clsx(styles.subitems, className)}>
      {children}
    </Component>
  );
}
