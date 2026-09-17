import { render } from "@testing-library/react";

import { TabsProvider } from "@/headless/Provider";
import { Tabs, type TabEntry } from "@/styled/Tabs";
import { TabsList } from "@/styled/List";
import { Tab } from "@/styled/Tab";

describe("StyledTabs", () => {
  const tabs: TabEntry[] = [
    {
      name: "Normal Tab",
      content: <span>This is a normal tab content.</span>,
    },
    {
      name: "Disabled Tab",
      content: <span>This tab is disabled.</span>,
      isDisabled: true,
    },
    {
      name: "Tab with Pre-defined Icon",
      content: <span>This tab has an icon.</span>,
      icon: "chevron-right",
    },
    {
      name: "Tab with Custom Icon",
      content: <span>This tab has a custom icon.</span>,
      icon: <svg>Custom Icon</svg>,
    },
  ];

  it("renders all tabs correctly", () => {
    const { getByText } = render(<Tabs tabs={tabs} aria-label="Test Tabs" />);

    tabs.forEach((tab) => {
      expect(getByText(tab.name)).toBeTruthy();
    });
  });

  it("respects children over icon and iconSide", () => {
    const { getByText, queryByText } = render(
      <TabsProvider>
        <TabsList>
          <Tab tabName="tab" icon="chevron-right" iconSide="left">
            Custom Children
          </Tab>
        </TabsList>
      </TabsProvider>,
    );

    expect(getByText("Custom Children")).toBeTruthy();
    expect(queryByText("tab")).toBeNull();
  });
});
