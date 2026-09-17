import {
  TabsProvider,
  type TabsProps as ProviderProps,
} from "@/headless/Provider";
import { TabsList } from "./List";
import { Tab } from "./Tab";
import { TabPanel } from "./Panel";
import { styles } from "./styles.css";

export type TabEntry = {
  name: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  isDisabled?: boolean;
};

export interface TabsProps extends Omit<ProviderProps, "children"> {
  tabs: TabEntry[];
  vertical?: boolean;
  loop?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Tabs({
  tabs,
  vertical = false,
  loop = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...rest
}: Readonly<TabsProps>) {
  return (
    <TabsProvider {...rest}>
      <div className={styles.container({ vertical })}>
        <TabsList
          vertical={vertical}
          loop={loop}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              tabName={tab.name}
              icon={tab.icon}
              isDisabled={tab.isDisabled}
            />
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabPanel key={tab.name} tabName={tab.name} asChild>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </TabsProvider>
  );
}
