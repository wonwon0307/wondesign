import clsx from "clsx";

import { Navbar as Headless } from "@/headless/Navbar";
import { NavbarList } from "@/headless/List";
import { styles } from "./styles.css";

export interface NavbarProps extends React.AriaAttributes {
  children: React.ReactNode;
  vertical?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Navbar({
  children,
  vertical = false,
  className,
  style,
  ...rest
}: Readonly<NavbarProps>) {
  return (
    <Headless {...rest}>
      <NavbarList
        vertical={vertical}
        className={clsx(
          styles.list({ orientation: vertical ? "vertical" : "horizontal" }),
          className,
        )}
        style={style}
      >
        {children}
      </NavbarList>
    </Headless>
  );
}
