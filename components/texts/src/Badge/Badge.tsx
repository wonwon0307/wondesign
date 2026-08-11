import { colorWithOpacity } from "@wondesign/tokens";
import clsx from "clsx";

import { styles } from "./styles.css";

export interface BadgeProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  label: string;
  color?: string;
  backgroundColor?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Badge({
  label,
  color = "gray",
  backgroundColor = colorWithOpacity(color, 25),
  left,
  right,
  className,
  style,
  ...rest
}: Readonly<BadgeProps>) {
  return (
    <span
      {...rest}
      className={clsx(styles.badge, className)}
      style={{ ...style, backgroundColor }}
    >
      {left}
      <p className={styles.label} style={{ color }}>
        {label}
      </p>
      {right}
    </span>
  );
}
