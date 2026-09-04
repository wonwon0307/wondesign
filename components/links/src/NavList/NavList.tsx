import clsx from "clsx";

import { styles } from "./styles.css";

export interface NavListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  vertical?: boolean;
}

export function NavList({
  children,
  vertical,
  "aria-label": ariaLabel = "Navigation",
  className,
  ...rest
}: Readonly<NavListProps>) {
  return (
    <nav aria-label={ariaLabel}>
      <ul
        {...rest}
        className={clsx(
          styles.list({ orientation: vertical ? "vertical" : "horizontal" }),
          className,
        )}
        data-orientation={vertical ? "vertical" : "horizontal"}
      >
        {children}
      </ul>
    </nav>
  );
}
