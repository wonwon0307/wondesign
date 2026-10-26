import { colorWithOpacity } from "@wondesign/tokens";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export interface BadgeProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {
  label: string;
  color?: string;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  bold?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Badge({
  label,
  color = "gray",
  backgroundColor = colorWithOpacity(color, 0.18),
  size = "medium",
  bold = false,
  left,
  right,
  className,
  style,
  ...rest
}: Readonly<BadgeProps>) {
  return (
    <span
      {...rest}
      className={clsx(styles.badge({ size, bold }), className)}
      style={{ ...style, backgroundColor, color }}
    >
      {left}
      {label}
      {right}
    </span>
  );
}
