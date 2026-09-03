import clsx from "clsx";

import { tagMap, type HeadingProps } from "./props";
import { styles } from "./styles.css";

export function Heading({
  level,
  children,
  as,
  weight,
  maxNumLines = 1,
  className,
  style,
  ref,
  ...rest
}: Readonly<HeadingProps>) {
  const Component = as || tagMap[level];
  const clamped = maxNumLines > 0;

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(styles.heading({ level, clamped, weight }), className)}
      style={clamped ? { ...style, WebkitLineClamp: maxNumLines } : style}
    >
      {children}
    </Component>
  );
}
