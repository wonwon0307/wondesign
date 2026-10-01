import { clsx } from "clsx";

import { styles } from "./styles.css";

export interface InlineCodeProps
  extends React.HTMLAttributes<HTMLElement>, React.RefAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function InlineCode({
  children,
  className,
  ...rest
}: Readonly<InlineCodeProps>) {
  return (
    <code {...rest} className={clsx(styles.inlineCode, className)}>
      {children}
    </code>
  );
}
