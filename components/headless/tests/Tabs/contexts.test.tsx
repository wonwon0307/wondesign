import { render } from "@testing-library/react";

import { useTabs } from "@/Tabs/contexts";
import { TabsProvider } from "@/Tabs/Provider";
import { TabsList } from "@/Tabs/List";
import { Tab } from "@/Tabs/Tab";
import { TabPanel } from "@/Tabs/Panel";

describe("Tabs - contexts", () => {
  it("handles useTabs hook correctly", () => {
    const TestHookComponent = () => {
      const { activeTab } = useTabs();
      return <div>{activeTab}</div>;
    };

    const { getByText } = render(
      <TabsProvider>
        <TabsList aria-label="Tabs List" data-testid="list">
          <Tab tabName="tab1" data-testid="tab1">
            Tab 1
          </Tab>
        </TabsList>
        <TabPanel tabName="tab1" data-testid="panel1">
          Panel 1
        </TabPanel>
        <TestHookComponent />
      </TabsProvider>,
    );

    expect(getByText("tab1")).toBeTruthy();
  });

  it("throws if TabsList is used outside TabsProvider", () => {
    expect(() => render(<TabsList data-testid="list">List</TabsList>)).toThrow(
      "[WonDesign Headless] useTabs() must be used inside the Tabs Provider.",
    );
  });

  it("throws if Tab is used outside TabsList", () => {
    expect(() =>
      render(
        <TabsProvider>
          <Tab tabName="tab" data-testid="tab">
            Tab
          </Tab>
        </TabsProvider>,
      ),
    ).toThrow(
      "[WonDesign Headless] useTabsList() must be used inside a Tabs.List component.",
    );
  });
});
