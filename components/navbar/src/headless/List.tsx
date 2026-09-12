import { useContext, useMemo } from "react";
import { AsChild } from "@wondesign/composition/asChild";

import { NavbarContext, NavbarListContext } from "@/contexts/list";

export interface NavbarListProps extends Omit<
  React.HTMLAttributes<HTMLUListElement>,
  "children"
> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLUListElement>;
  asChild?: boolean;
  vertical?: boolean;
  // loop?: boolean;
}

export function NavbarList({
  children,
  asChild = false,
  vertical = false,
  role = "list",
  ...rest
}: Readonly<NavbarListProps>) {
  const isInsideProvider = useContext(NavbarContext);

  if (!isInsideProvider) {
    throw new Error(
      "[WonDesign Navbar] Navbar.List must be used inside the Nav wrapper.",
    );
  }

  const orientation: "vertical" | "horizontal" = vertical
    ? "vertical"
    : "horizontal";
  const Component = asChild ? AsChild : "ul";

  const contextValue = useMemo(() => ({ orientation }), [orientation]);

  return (
    <NavbarListContext.Provider value={contextValue}>
      <Component {...rest} role={role} data-orientation={orientation}>
        {children}
      </Component>
    </NavbarListContext.Provider>
  );
}
