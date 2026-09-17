import { TabsProvider, type TabsProps } from "@/headless/Provider";
import { TabsList } from "@/headless/List";
import { Tab } from "@/headless/Tab";
import { TabPanel } from "@/headless/Panel";

export function TestComponent({
  keepPanelsMounted = false,
  vertical = false,
  switchOnFocus = false,
  loop = false,
  defaultTab = "tab1",
  ...rest
}: Omit<TabsProps, "children"> & {
  vertical?: boolean;
  switchOnFocus?: boolean;
  loop?: boolean;
}) {
  return (
    <TabsProvider
      {...rest}
      defaultTab={defaultTab}
      keepPanelsMounted={keepPanelsMounted}
      switchOnFocus={switchOnFocus}
    >
      <div>
        <TabsList
          vertical={vertical}
          loop={loop}
          aria-label="Tabs List"
          data-testid="list"
        >
          <Tab tabName="tab1" data-testid="tab1">
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
