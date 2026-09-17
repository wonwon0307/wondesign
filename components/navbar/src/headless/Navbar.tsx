import { AsChild } from "@wondesign/composition/asChild";

import { NavbarContext } from "@/contexts/list";

export interface NavbarProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "children">,
    React.RefAttributes<HTMLElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function Navbar({
  children,
  asChild,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...rest
}: Readonly<NavbarProps>) {
  if (process.env.NODE_ENV !== "production" && !ariaLabel && !ariaLabelledBy) {
    console.warn(
      "[WonDesign Navbar] It is strongly recommended to provide either an aria-label or aria-labelledby for the navigation element.",
    );
  }

  const Component = asChild ? AsChild : "nav";

  return (
    <NavbarContext.Provider value={true}>
      <Component
        {...rest}
        aria-label={ariaLabelledBy ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
        role="navigation"
      >
        {children}
      </Component>
    </NavbarContext.Provider>
  );
}
