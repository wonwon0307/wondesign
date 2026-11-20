import { clsx } from "clsx";

import { useSidebarBody } from "@/contexts/body";
import { useSidebarInternal } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
}

export function SidebarHeader({
  children,
  collapsed,
  className,
  ...rest
}: Readonly<SidebarHeaderProps>) {
  useSidebarBody();
  const { state } = useSidebarInternal();

  return (
    <div
      {...rest}
      className={clsx(
        styles.section({ variant: "header", collapsed: state === "collapsed" }),
        className,
      )}
      data-state={state}
    >
      {state === "collapsed" ? collapsed : children}
    </div>
  );
}
