import clsx from "clsx";

import { styles } from "./styles.css";

export interface InlineCodeProps
  extends React.HTMLAttributes<HTMLElement>, React.RefAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: "small" | "large";
}

export function InlineCode({
  size = "small",
  children,
  className,
  ...rest
}: Readonly<InlineCodeProps>) {
  return (
    <code {...rest} className={clsx(styles.inlineCode({ size }), className)}>
      {children}
    </code>
  );
}
