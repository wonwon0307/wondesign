import { useMemo } from "react";
import { AsChild } from "@wondesign/headless/AsChild";
import { clsx } from "clsx";

import { NavbarContext } from "./contexts";
import { styles } from "./styles.css";

type ListProps = Omit<
  React.HTMLAttributes<HTMLUListElement>,
  "children" | "role"
> & {
  asChild?: false;
  ref?: React.Ref<HTMLUListElement>;
};

type AsChildProps = Omit<
  Omit<React.HTMLAttributes<HTMLElement>, "children" | "role">,
  "children" | "role"
> & {
  asChild: true;
};

export type NavbarProps = React.AriaAttributes & {
  children: React.ReactNode;
  vertical?: boolean;
} & (ListProps | AsChildProps);

export function Navbar({
  children,
  asChild = false,
  vertical = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  ...rest
}: Readonly<NavbarProps>) {
  if (process.env.NODE_ENV !== "production" && !ariaLabel && !ariaLabelledBy) {
    console.warn(
      "[WonDesign Navbar] It is strongly recommended to provide either an aria-label or aria-labelledby for the navigation element.",
    );
  }

  const orientation: "vertical" | "horizontal" = vertical
    ? "vertical"
    : "horizontal";

  const contextValue = useMemo(
    () => ({ asChild, orientation }),
    [asChild, orientation],
  );

  if (asChild) {
    return (
      <NavbarContext.Provider value={contextValue}>
        <AsChild
          {...rest}
          role="navigation"
          aria-label={ariaLabelledBy ? undefined : ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data-orientation={orientation}
          className={clsx(
            styles.list({ orientation: vertical ? "vertical" : "horizontal" }),
            className,
          )}
        >
          {children}
        </AsChild>
      </NavbarContext.Provider>
    );
  }

  return (
    <NavbarContext.Provider value={contextValue}>
      <nav
        aria-label={ariaLabelledBy ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        <ul
          {...rest}
          data-orientation={orientation}
          className={clsx(
            styles.list({ orientation: vertical ? "vertical" : "horizontal" }),
            className,
          )}
        >
          {children}
        </ul>
      </nav>
    </NavbarContext.Provider>
  );
}
