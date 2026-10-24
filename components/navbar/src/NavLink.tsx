import { Anchor, type AnchorProps } from "@wondesign/headless/Anchor";
import { clsx } from "clsx";

import { useNavbarInternal } from "./contexts";
import { styles } from "./styles.css";

export interface NavLinkProps extends Omit<AnchorProps, "aria-current"> {
  children: React.ReactNode;
  isActive?: boolean;
}

export function NavLink({
  children,
  isActive = false,
  className,
  ...rest
}: Readonly<NavLinkProps>) {
  const { asChild, orientation } = useNavbarInternal();

  if (asChild) {
    return (
      <Anchor
        {...rest}
        aria-current={isActive ? "page" : undefined}
        data-active={isActive || undefined}
        data-orientation={orientation}
        className={clsx(styles.link({ isActive }), className)}
      >
        {children}
      </Anchor>
    );
  }

  return (
    <li>
      <Anchor
        {...rest}
        aria-current={isActive ? "page" : undefined}
        data-active={isActive || undefined}
        data-orientation={orientation}
        className={clsx(styles.link({ isActive }), className)}
      >
        {children}
      </Anchor>
    </li>
  );
}
