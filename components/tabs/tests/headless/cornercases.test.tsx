import { render } from "@testing-library/react";

import { TabsProvider } from "@/headless/Provider";
import { TabsList } from "@/headless/List";
import { Tab } from "@/headless/Tab";

describe("HeadlessTabs - corner cases", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {});

  beforeEach(() => {
    vi.mocked(console.warn).mockClear();
  });

  it("warns when neither aria-label nor aria-labelledby is provided for the TabsList", () => {
    render(
      <TabsProvider>
        <TabsList data-testid="list">List</TabsList>
      </TabsProvider>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "It is strongly recommended to provide either an aria-label or aria-labelledby",
      ),
    );
  });

  it("warns when there are no enabled tabs", () => {
    render(
      <TabsProvider>
        <TabsList aria-label="Tabs List" data-testid="list">
          List
        </TabsList>
      </TabsProvider>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("No enabled tabs found"),
    );
  });

  it("does not warn when there are no enabled tabs because the provider itself is disabled", () => {
    render(
      <TabsProvider isDisabled>
        <TabsList aria-label="Tabs List" data-testid="list">
          <Tab tabName="tab1" data-testid="tab1">
            Tab 1
          </Tab>
        </TabsList>
      </TabsProvider>,
    );

    expect(console.warn).not.toHaveBeenCalledWith(
      expect.stringContaining("No enabled tabs found"),
    );
  });

  it("falls back to the first enabled tab when the active tab is individually disabled", () => {
    const { getByTestId } = render(
      <TabsProvider defaultTab="tab2">
        <TabsList aria-label="Tabs List" data-testid="list">
          <Tab tabName="tab1" data-testid="tab1">
            Tab 1
          </Tab>
          <Tab tabName="tab2" isDisabled data-testid="tab2">
            Tab 2
          </Tab>
        </TabsList>
      </TabsProvider>,
    );

    const tab1 = getByTestId("tab1");
    const tab2 = getByTestId("tab2");

    expect(tab1.getAttribute("data-state")).toBe("active");
    expect(tab2.getAttribute("data-state")).toBe("inactive");
  });

  it("does not throw when the container ref never attaches (asChild renders nothing)", () => {
    // AsChild requires a single valid React element as its child; given
    // invalid children it warns and renders null, so TabsList's ref is never
    // attached to a DOM node when the fallback effect runs.
    expect(() =>
      render(
        <TabsProvider>
          <TabsList asChild aria-label="Tabs List">
            {"not a valid element"}
          </TabsList>
        </TabsProvider>,
      ),
    ).not.toThrow();
  });

  it("does not call updateActiveTab when the first enabled tab has no data-value", () => {
    // TAB_ITEM_SELECTOR matches any role="tab" element, not just our own Tab
    // component — a hand-rolled one bypasses the data-value it always sets.
    const cb = vi.fn();

    render(
      <TabsProvider defaultTab="tab" onTabChange={cb}>
        <TabsList aria-label="Tabs List">
          <button role="tab" data-testid="raw-tab">
            Raw Tab
          </button>
        </TabsList>
      </TabsProvider>,
    );

    expect(cb).not.toHaveBeenCalled();
  });
});
