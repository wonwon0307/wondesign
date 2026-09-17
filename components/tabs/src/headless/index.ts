import { TabsProvider } from "./Provider";
import { TabsList } from "./List";
import { Tab } from "./Tab";
import { TabPanel } from "./Panel";

export const Tabs = Object.assign(TabsProvider, {
  List: TabsList,
  Tab,
  Panel: TabPanel,
});

export { TabsProvider } from "./Provider";
export { TabsList } from "./List";
export { Tab } from "./Tab";
export { TabPanel } from "./Panel";

export type { TabsProps } from "./Provider";
export type { TabsListProps } from "./List";
export type { TabProps } from "./Tab";
export type { TabPanelProps } from "./Panel";
