import clsx from "clsx";

import { styles } from "./styles.css";

export interface KeyboardProps extends React.HTMLAttributes<HTMLElement> {
  size?: "small" | "large";
  children: string;
}

export function Keyboard({
  size = "small",
  children,
  className,
  ...rest
}: Readonly<KeyboardProps>) {
  return (
    <kbd {...rest} className={clsx(styles.keyboard({ size }), className)}>
      {children}
    </kbd>
  );
}
