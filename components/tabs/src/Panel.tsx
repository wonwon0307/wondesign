import {
  TabPanel as Headless,
  type TabPanelProps as Props,
} from "@wondesign/headless/Tabs";
import { clsx } from "clsx";

import { styles } from "./styles.css";

export type TabPanelProps = Props;

export function TabPanel({ className, ...rest }: Readonly<TabPanelProps>) {
  return <Headless {...rest} className={clsx(styles.panel, className)} />;
}
