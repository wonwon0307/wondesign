import clsx from "clsx";

import { useSidebarBody } from "@/contexts/body";
import { useSidebar } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarSectionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
}

export function SidebarSection({
  children,
  collapsed,
  className,
  ...rest
}: Readonly<SidebarSectionProps>) {
  useSidebarBody();
  const { state } = useSidebar();

  return (
    <div
      {...rest}
      className={clsx(
        styles.section({ collapsed: state === "collapsed" }),
        className,
      )}
      data-state={state}
    >
      {state === "collapsed" && collapsed}
      {state !== "collapsed" && children}
    </div>
  );
}
