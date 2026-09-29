import { clsx } from "clsx";

import { useSidebarBody } from "@/contexts/body";
import { useSidebarInternal } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarFooterProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: React.ReactNode;
  collapsed?: React.ReactNode;
}

export function SidebarFooter({
  children,
  collapsed,
  className,
  ...rest
}: Readonly<SidebarFooterProps>) {
  useSidebarBody();
  const { state } = useSidebarInternal();

  return (
    <div
      {...rest}
      className={clsx(
        styles.section({ variant: "footer", collapsed: state === "collapsed" }),
        className,
      )}
      data-state={state}
    >
      {state === "collapsed" ? collapsed : children}
    </div>
  );
}
