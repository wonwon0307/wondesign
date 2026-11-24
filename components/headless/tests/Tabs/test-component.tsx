import { TabsProvider, type TabsProps } from "@/Tabs/Provider";
import { TabsList } from "@/Tabs/List";
import { Tab } from "@/Tabs/Tab";
import { TabPanel } from "@/Tabs/Panel";

export function TestComponent({
  keepMounted = false,
  vertical = false,
  switchOnFocus = false,
  loop = false,
  defaultTab = "tab1",
  onTabClick,
  ...rest
}: Omit<TabsProps, "children"> & {
  vertical?: boolean;
  switchOnFocus?: boolean;
  loop?: boolean;
  onTabClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <TabsProvider
      {...rest}
      defaultTab={defaultTab}
      keepMounted={keepMounted}
      switchOnFocus={switchOnFocus}
    >
      <div>
        <TabsList
          vertical={vertical}
          loop={loop}
          aria-label="Tabs List"
          data-testid="list"
        >
          <Tab tabName="tab1" onClick={onTabClick} data-testid="tab1">
            Tab 1
          </Tab>
          <Tab tabName="tab2" data-testid="tab2">
            Tab 2
          </Tab>
        </TabsList>
        <TabPanel tabName="tab1" data-testid="panel1">
          Panel 1
        </TabPanel>
        <TabPanel tabName="tab2" data-testid="panel2">
          Panel 2
        </TabPanel>
      </div>
    </TabsProvider>
  );
}
