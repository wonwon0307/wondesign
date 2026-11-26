import { tokens } from "@wondesign/tokens";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export interface DividerProps extends Omit<
  React.ComponentProps<"div">,
  "children" | "role" | "aria-hidden" | "aria-orientation"
> {
  label?: React.ReactNode;
  labelAlign?: "start" | "center" | "end";
  appearance?: "solid" | "dashed" | "dotted";
  color?: string;
  vertical?: boolean;
  bold?: boolean;
}

export function Divider({
  label,
  labelAlign = "center",
  appearance = "solid",
  color = tokens.colors.border,
  vertical = false,
  bold = false,
  className,
  style,
  ...rest
}: Readonly<DividerProps>) {
  const border = `${bold ? "2px" : "1px"} ${appearance} ${color}`;

  return (
    <div
      {...rest}
      aria-hidden={label ? undefined : true}
      className={clsx(
        vertical
          ? styles.vertical({
              withLabel: !!label,
              labelAlign,
            })
          : styles.horizontal({
              withLabel: !!label,
              labelAlign,
            }),
        className,
      )}
      style={
        {
          ...style,
          "--wondesign-divider-line": border,
        } as React.CSSProperties
      }
    >
      {label}
    </div>
  );
}
