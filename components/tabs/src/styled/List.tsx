import clsx from "clsx";

import { TabsList as Headless, type TabsListProps } from "@/headless/List";
import { styles } from "./styles.css";

export function TabsList({
  children,
  vertical,
  className,
  ...rest
}: Readonly<TabsListProps>) {
  return (
    <Headless
      {...rest}
      vertical={vertical}
      className={clsx(styles.list({ vertical }), className)}
    >
      {children}
    </Headless>
  );
}
