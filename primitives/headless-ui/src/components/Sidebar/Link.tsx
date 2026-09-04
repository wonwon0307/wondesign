import { useSidebar } from "./_internals/contexts";

export interface SidebarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: React.ElementType;
  isActive?: boolean;
  isDisabled?: boolean;
  isExternal?: boolean;
}

export function SidebarLink({
  children,
  as: Component = "a",
  href,
  isActive = false,
  isDisabled = false,
  isExternal = false,
  ...rest
}: Readonly<SidebarLinkProps>) {
  const { state, isMobile } = useSidebar();

  return (
    <Component
      {...rest}
      href={href}
      //isDisabled={isDisabled}
      //isExternal={isExternal}
      target={isExternal ? "_blank" : undefined}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      data-disabled={isDisabled || undefined}
      data-state={state}
      data-device={isMobile ? "mobile" : "desktop"}
    >
      {children}
    </Component>
  );
}
