import { useMemo } from "react";

import { AsChild } from "@/AsChild/AsChild";
import { ItemContext, useNavbarList } from "./contexts";

export interface NavbarItemProps
  extends
    Omit<React.HTMLAttributes<HTMLLIElement>, "children">,
    React.RefAttributes<HTMLLIElement> {
  children: React.ReactNode;
  asChild?: boolean;
  isDisabled?: boolean;
}

export function NavbarItem({
  children,
  asChild = false,
  isDisabled = false,
  ...rest
}: Readonly<NavbarItemProps>) {
  useNavbarList();
  const Component = asChild ? AsChild : "li";

  const contextValue = useMemo(
    () => ({ isDisabled: isDisabled }),
    [isDisabled],
  );

  return (
    <ItemContext.Provider value={contextValue}>
      <Component
        {...rest}
        aria-disabled={isDisabled || undefined}
        data-disabled={isDisabled || undefined}
      >
        {children}
      </Component>
    </ItemContext.Provider>
  );
}
