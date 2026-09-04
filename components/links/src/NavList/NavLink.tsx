import clsx from "clsx";

import { Anchor, type AnchorProps } from "@/Anchor";
import { styles } from "./styles.css";

export interface NavLinkProps extends AnchorProps {
  isActive?: boolean;
}

export function NavLink({
  children,
  isActive = false,
  className,
  ...rest
}: Readonly<NavLinkProps>) {
  return (
    <li>
      <Anchor
        {...rest}
        className={clsx(styles.navLink({ isActive }), className)}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Anchor>
    </li>
  );
}
