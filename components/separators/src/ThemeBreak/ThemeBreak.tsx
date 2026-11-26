import { tokens } from "@wondesign/tokens";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export interface ThemeBreakProps extends Omit<
  React.ComponentProps<"hr">,
  "children"
> {
  appearance?: "solid" | "dashed" | "dotted";
  color?: string;
  bold?: boolean;
}

export function ThemeBreak({
  appearance = "solid",
  color = tokens.colors.border,
  bold = false,
  className,
  style,
  ...rest
}: Readonly<ThemeBreakProps>) {
  const line = `${bold ? "2px" : "1px"} ${appearance} ${color}`;

  return (
    <hr
      {...rest}
      className={clsx(styles.rule, className)}
      style={
        {
          ...style,
          "--wondesign-theme-break-line": line,
        } as React.CSSProperties
      }
    />
  );
}
