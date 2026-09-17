import { render } from "@testing-library/react";

import { TabsProvider } from "@/headless/Provider";
import { TabsList } from "@/headless/List";
import { Tab } from "@/headless/Tab";
import { TabPanel } from "@/headless/Panel";
import { TestComponent } from "./test-component";

describe("HeadlessTabs - properties", () => {
  it("renders with default properties correctly", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    const list = getByTestId("list");
    const activeTab = getByTestId("tab1");
    const inactiveTab = getByTestId("tab2");
    const activePanel = getByTestId("panel1");

    expect(list.tagName).toBe("DIV");
    expect(list.getAttribute("role")).toBe("tablist");
    expect(list.getAttribute("aria-orientation")).toBe("horizontal");
    expect(list.getAttribute("data-orientation")).toBe("horizontal");
    expect(list.getAttribute("data-disabled")).toBe("false");

    // 기본값은 하나씩만 대표로 확인
    expect(activeTab.tagName).toBe("BUTTON");
    expect(activeTab.getAttribute("role")).toBe("tab");
    expect(activeTab.getAttribute("data-orientation")).toBe("horizontal");
    expect(activeTab.getAttribute("data-value")).toBe("tab1");

    expect(activePanel.tagName).toBe("DIV");
    expect(activePanel.getAttribute("role")).toBe("tabpanel");

    // active 상태
    expect(activeTab.getAttribute("data-state")).toBe("active");
    expect(activeTab.getAttribute("aria-selected")).toBe("true");
    expect(activeTab.getAttribute("tabindex")).toBe("0");
    expect(inactiveTab.getAttribute("data-state")).toBe("inactive");
    expect(inactiveTab.getAttribute("aria-selected")).toBe("false");
    expect(inactiveTab.getAttribute("tabindex")).toBe("-1");

    expect(activePanel.getAttribute("data-state")).toBe("active");
    expect(activePanel.getAttribute("aria-hidden")).toBe("false");
    expect(activePanel.getAttribute("tabindex")).toBe("0");

    // inactive panel should not be in the document
    expect(queryByTestId("panel2")).toBeNull();

    // aria 연결
    expect(activeTab.getAttribute("aria-controls")).toBe(
      activePanel.getAttribute("id"),
    );
    expect(activePanel.getAttribute("aria-labelledby")).toBe(
      activeTab.getAttribute("id"),
    );
  });

  it("handles keepPanelsMounted property correctly", () => {
    const { getByTestId } = render(<TestComponent keepPanelsMounted />);

    const inactivePanel = getByTestId("panel2");

    // inactive panel should still be in the document
    expect(inactivePanel).toBeTruthy();
    expect(inactivePanel.getAttribute("data-state")).toBe("inactive");
    expect(inactivePanel.getAttribute("aria-hidden")).toBe("true");
    expect(inactivePanel.getAttribute("tabindex")).toBe("-1");
  });

  it("handles disabled state correctly", () => {
    const { getByTestId } = render(<TestComponent isDisabled />);

    const list = getByTestId("list");
    const activeTab = getByTestId("tab1");
    const inactiveTab = getByTestId("tab2");

    expect(list.getAttribute("data-disabled")).toBe("true");
    expect(activeTab.getAttribute("aria-disabled")).toBe("true");
    expect(inactiveTab.getAttribute("aria-disabled")).toBe("true");
  });

  it("handles vertical mode correctly", () => {
    const { getByTestId } = render(<TestComponent vertical />);

    const list = getByTestId("list");

    expect(list.getAttribute("aria-orientation")).toBe("vertical");
    expect(list.getAttribute("data-orientation")).toBe("vertical");
  });

  it("falls back to the first tab when defaultTab matches no tab", () => {
    const { getByTestId } = render(<TestComponent defaultTab="tab" />);

    const tab1 = getByTestId("tab1");
    const tab2 = getByTestId("tab2");

    expect(tab1.getAttribute("data-state")).toBe("active");
    expect(tab2.getAttribute("data-state")).toBe("inactive");
  });

  it("handles asChild props correctly for all components", () => {
    const { getByTestId } = render(
      <TabsProvider defaultTab="tab">
        <TabsList asChild aria-label="Tabs List" data-testid="list">
          <span>
            <Tab asChild tabName="tab" data-testid="tab">
              <a>Tab</a>
            </Tab>
          </span>
        </TabsList>
        <TabPanel asChild tabName="tab" data-testid="panel">
          <span>Panel</span>
        </TabPanel>
      </TabsProvider>,
    );

    const list = getByTestId("list");
    const tab = getByTestId("tab");
    const panel = getByTestId("panel");

    expect(list.tagName).toBe("SPAN");
    expect(tab.tagName).toBe("A");
    expect(panel.tagName).toBe("SPAN");
  });
});
