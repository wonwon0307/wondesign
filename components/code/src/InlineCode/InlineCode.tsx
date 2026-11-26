import { clsx } from "clsx";

import { styles } from "./styles.css";

export interface InlineCodeProps extends React.ComponentProps<"code"> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
}

export function InlineCode({
  children,
  size = "medium",
  className,
  ...rest
}: Readonly<InlineCodeProps>) {
  return (
    <code {...rest} className={clsx(styles.inlineCode({ size }), className)}>
      {children}
    </code>
  );
}
