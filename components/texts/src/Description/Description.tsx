import clsx from "clsx";

import type { DescriptionProps } from "./props";
import { styles } from "./styles.css";

export function Description({
  children,
  as = "p",
  ref,
  size = "medium",
  tone = "default",
  wrap,
  maxNumLines = 0,
  fullWidth = false,
  className,
  style,
  ...rest
}: Readonly<DescriptionProps>) {
  const Component = as as React.ElementType;
  const clamped = maxNumLines > 0;

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        styles.description({ size, tone, wrap, fullWidth, clamped }),
        className,
      )}
      style={clamped ? { ...style, WebkitLineClamp: maxNumLines } : style}
    >
      {children}
    </Component>
  );
}
