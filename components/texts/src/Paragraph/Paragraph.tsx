import clsx from "clsx";

import type { ParagraphProps } from "./props";
import { styles } from "./styles.css";

export function Paragraph({
  children,
  as = "p",
  ref,
  size = "medium",
  tone = "default",
  maxNumLines = 0,
  className,
  style,
  ...rest
}: Readonly<ParagraphProps>) {
  const Component = as as React.ElementType;
  const clamped = maxNumLines > 0;

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(styles.paragraph({ size, tone, clamped }), className)}
      style={clamped ? { ...style, WebkitLineClamp: maxNumLines } : style}
    >
      {children}
    </Component>
  );
}
