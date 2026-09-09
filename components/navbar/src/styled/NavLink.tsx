import clsx from "clsx";

import { NavbarLink } from "@/headless/Link";
import { NavbarItem } from "@/headless/Item";
import { styles } from "./styles.css";

export interface NavLinkProps extends React.AriaAttributes {
  children: React.ReactNode;
  href?: string;
  as?: React.ElementType;
  isActive?: boolean;
  isDisabled?: boolean;
  openInNewTab?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function NavLink({
  children,
  isActive = false,
  isDisabled = false,
  className,
  ...rest
}: Readonly<NavLinkProps>) {
  return (
    <NavbarItem isDisabled={isDisabled}>
      <NavbarLink
        {...rest}
        isActive={isActive}
        className={clsx(styles.link({ isActive }), className)}
      >
        {children}
      </NavbarLink>
    </NavbarItem>
  );
}
