import { render } from "@testing-library/react";

import { Tabs, type TabEntry } from "@/styled/Tabs";

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
});
