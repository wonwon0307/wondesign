import { clsx } from "clsx";

import { SidebarNavContext, useSidebarBody } from "@/contexts/body";
import { styles } from "./styles.css";

export interface SidebarNavProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

export function SidebarNav({
  children,
  "aria-label": ariaLabel = "Sidebar Navigation",
  className,
  ...rest
}: Readonly<SidebarNavProps>) {
  useSidebarBody();

  return (
    <SidebarNavContext.Provider value={true}>
      <nav
        {...rest}
        className={clsx(styles.nav, className)}
        aria-label={ariaLabel}
        data-orientation="vertical"
      >
        {children}
      </nav>
    </SidebarNavContext.Provider>
  );
}
