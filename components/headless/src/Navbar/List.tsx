import { useContext, useMemo } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { NavbarContext, NavbarListContext } from "./contexts";

export interface NavbarListProps
  extends
    Omit<React.HTMLAttributes<HTMLUListElement>, "children">,
    React.RefAttributes<HTMLUListElement> {
  children: React.ReactNode;
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
      "[WonDesign Headless] Navbar.List must be used inside the Nav wrapper.",
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
