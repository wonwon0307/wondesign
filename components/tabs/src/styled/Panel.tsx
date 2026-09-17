import clsx from "clsx";

import { TabPanel as Headless, type TabPanelProps } from "@/headless/Panel";
import { styles } from "./styles.css";

export function TabPanel({ className, ...rest }: Readonly<TabPanelProps>) {
  return <Headless {...rest} className={clsx(styles.panel, className)} />;
}
