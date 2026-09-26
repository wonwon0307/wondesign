import { clsx } from "clsx";

import { SidebarBodyContext } from "@/contexts/body";
import { useInternalSidebar } from "@/contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarBodyProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children" | "id"
> {
  children: React.ReactNode;
  scope?: "app" | "page";
  appearance?: "default" | "floating" | "inset";
  keepMounted?: boolean;
}

export function SidebarBody({
  children,
  scope = "app",
  appearance = "default",
  keepMounted = false,
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<SidebarBodyProps>) {
  const { state, contentId, isMobile, side } = useInternalSidebar();

  const Component = scope === "app" ? "aside" : "div";
  const isHidden = state === "closed";
  const defaultLabel = scope === "app" ? "Sidebar" : undefined;

  if (isHidden && !keepMounted) return null;

  return (
    <SidebarBodyContext.Provider value={true}>
      <Component
        {...rest}
        id={contentId}
        inert={isHidden ? true : undefined}
        className={clsx(styles.sidebar({ appearance, state }), className)}
        aria-label={ariaLabel ?? defaultLabel}
        aria-hidden={isHidden ? true : undefined}
        data-appearance={appearance}
        data-device={isMobile ? "mobile" : "desktop"}
        data-side={side}
        data-state={state}
      >
        {children}
      </Component>
    </SidebarBodyContext.Provider>
  );
}
