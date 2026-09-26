import { Children, isValidElement, useContext, useMemo } from "react";
import { CollapsibleProvider } from "@wondesign/collapsible";
import { clsx } from "clsx";

import { useSidebarNav } from "@/contexts/body";
import { SidebarItemContext } from "@/contexts/item";
import { SidebarItemSubitems } from "./Subitems";
import { styles } from "./styles.css";

export interface SidebarItemWrapperProps extends React.HTMLAttributes<HTMLElement> {
  as?: "li" | "div" | "auto-detect";
  variant?: "collapsible" | "flat";
  collapsedBehavior?: "hide" | "hide-children" | "flatten";
  defaultOpen?: boolean;
}

function hasSubitemsContent(children: React.ReactNode) {
  return Children.toArray(children).some(
    (child) =>
      isValidElement(child) &&
      child.type === SidebarItemSubitems &&
      Children.count((child.props as { children?: React.ReactNode }).children) >
        0,
  );
}

export function SidebarItemWrapper({
  as = "div",
  variant = "collapsible",
  collapsedBehavior = "hide",
  defaultOpen = false,
  className,
  ...rest
}: Readonly<SidebarItemWrapperProps>) {
  useSidebarNav();
  const isNested = useContext(SidebarItemContext) !== undefined;

  const hasSubitems = hasSubitemsContent(rest.children);

  const contextValue = useMemo(
    () => ({
      variant,
      collapsedBehavior,
      hasSubitems,
    }),
    [variant, collapsedBehavior, hasSubitems],
  );

  const detected = isNested ? "li" : "div";
  const Component = as === "auto-detect" ? detected : as;

  if (variant === "collapsible" && hasSubitems) {
    return (
      <CollapsibleProvider defaultOpen={defaultOpen} keepMounted>
        <SidebarItemContext.Provider value={contextValue}>
          <Component {...rest} className={clsx(styles.wrapper, className)} />
        </SidebarItemContext.Provider>
      </CollapsibleProvider>
    );
  }

  return (
    <SidebarItemContext.Provider value={contextValue}>
      <Component {...rest} className={clsx(styles.wrapper, className)} />
    </SidebarItemContext.Provider>
  );
}
