import { render } from "@testing-library/react";

import { useTabs } from "@/contexts/tabs";
import { TabsProvider } from "@/headless/Provider";
import { TabsList } from "@/headless/List";
import { Tab } from "@/headless/Tab";
import { TabPanel } from "@/headless/Panel";

describe("Tabs contexts", () => {
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
      "useTabs must be used within a TabsProvider",
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
    ).toThrow("useTabsList must be used within TabsList");
  });
});
