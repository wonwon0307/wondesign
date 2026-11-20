import { render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarToggle } from "@/Toggle/Toggle";
import { SwappableToggle } from "@/Toggle/Swappable";

describe("SidebarToggle - corner cases", () => {
  it("renders tooltip on the left if sidebar is on the right", () => {
    const { getByTestId } = render(
      <SidebarProvider shortkey="Ctrl+T" side="right">
        <SidebarBody>Sidebar Content</SidebarBody>
        <SidebarToggle disableTooltip={false} />
      </SidebarProvider>,
    );

    const tooltip = getByTestId("tooltip");
    expect(tooltip).toBeTruthy();
    expect(tooltip.dataset.placement).toBe("left");
  });
});

describe("SidebarSwappableToggle", () => {
  it("renders swappable toggle correctly", () => {
    const { getByTestId } = render(
      <SidebarProvider shortkey="Ctrl+T">
        <SidebarBody>Sidebar Content</SidebarBody>
        <SwappableToggle>
          <div data-testid="custom-swappable-content">
            Custom Swappable Content
          </div>
        </SwappableToggle>
      </SidebarProvider>,
    );

    expect(getByTestId("custom-swappable-content")).toBeTruthy();
    expect(getByTestId("icon-sidebar")).toBeTruthy();
    expect(getByTestId("icon-sidebar-arrow")).toBeTruthy();
  });

  it("renders swappable toggle with custom toggle", () => {
    const toggleContent = (
      <div data-testid="custom-swappable-toggle">Custom Swappable Toggle</div>
    );

    const { getByTestId, queryByTestId } = render(
      <SidebarProvider shortkey="Ctrl+T">
        <SidebarBody>Sidebar Content</SidebarBody>
        <SwappableToggle toggle={toggleContent}>
          <div data-testid="custom-swappable-content">
            Custom Swappable Content
          </div>
        </SwappableToggle>
      </SidebarProvider>,
    );

    expect(getByTestId("custom-swappable-toggle")).toBeTruthy();
    expect(getByTestId("custom-swappable-content")).toBeTruthy();
    expect(queryByTestId("icon-sidebar")).toBeFalsy();
    expect(queryByTestId("icon-sidebar-arrow")).toBeFalsy();
  });
});
