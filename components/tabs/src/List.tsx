import {
  TabsList as Headless,
  type TabsListProps as Props,
} from "@wondesign/headless/Tabs";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export type TabsListProps = Props;

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
