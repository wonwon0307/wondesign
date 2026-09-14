import clsx from "clsx";

import { styles } from "./styles.css";

export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: "small" | "large";
  ref?: React.Ref<HTMLElement>;
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
