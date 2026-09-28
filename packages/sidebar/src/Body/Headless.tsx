import { SidebarBodyContext } from "@/contexts/body";
import { useSidebarInternal } from "@/contexts/sidebar";

export interface HeadlessBodyProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "id">,
    React.RefAttributes<HTMLDivElement> {
  children: React.ReactNode;
  scope?: "app" | "page";
  keepMounted?: boolean;
}

export function HeadlessBody({
  children,
  scope = "app",
  keepMounted = false,
  "aria-label": ariaLabel,
  ...rest
}: Readonly<HeadlessBodyProps>) {
  const { state, contentId, isMobile, side } = useSidebarInternal();

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
        aria-label={ariaLabel ?? defaultLabel}
        aria-hidden={isHidden ? true : undefined}
        data-device={isMobile ? "mobile" : "desktop"}
        data-side={side}
        data-state={state}
      >
        {children}
      </Component>
    </SidebarBodyContext.Provider>
  );
}
