import { render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarToggle } from "@/Toggle/Toggle";
import { SidebarSwappableToggle } from "@/Toggle/Swappable";

describe("SidebarToggle", () => {
  it("renders tooltip if shortkey is provided and disableTooltip is false", () => {
    const { getByTestId } = render(
      <SidebarProvider shortkey="Ctrl+T">
        <SidebarBody>Sidebar Content</SidebarBody>
        <SidebarToggle disableTooltip={false} />
      </SidebarProvider>,
    );

    const tooltip = getByTestId("tooltip");
    expect(tooltip).toBeTruthy();
    // By default, sidebar is left, so tooltip should appear on the right
    expect(tooltip.dataset.placement).toBe("right");

    // default toggle should be rendered
    expect(getByTestId("icon-sidebar")).toBeTruthy();
    expect(getByTestId("icon-sidebar-arrow")).toBeTruthy();
  });

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

  it("should not render tooltip if disableTooltip is true", () => {
    const { queryByTestId } = render(
      <SidebarProvider shortkey="Ctrl+T">
        <SidebarBody>Sidebar Content</SidebarBody>
        <SidebarToggle disableTooltip={true} />
      </SidebarProvider>,
    );

    const tooltip = queryByTestId("tooltip");
    expect(tooltip).toBeNull();
  });

  it("should render override toggle content if provided", () => {
    const { getByTestId } = render(
      <SidebarProvider shortkey="Ctrl+T">
        <SidebarBody>Sidebar Content</SidebarBody>
        <SidebarToggle>
          <div data-testid="custom-toggle">Custom Toggle</div>
        </SidebarToggle>
      </SidebarProvider>,
    );

    expect(getByTestId("custom-toggle")).toBeTruthy();
  });
});

describe("SidebarSwappableToggle", () => {
  it("renders swappable toggle correctly", () => {
    const { getByTestId } = render(
      <SidebarProvider shortkey="Ctrl+T">
        <SidebarBody>Sidebar Content</SidebarBody>
        <SidebarSwappableToggle>
          <div data-testid="custom-swappable-content">
            Custom Swappable Content
          </div>
        </SidebarSwappableToggle>
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
        <SidebarSwappableToggle toggle={toggleContent}>
          <div data-testid="custom-swappable-content">
            Custom Swappable Content
          </div>
        </SidebarSwappableToggle>
      </SidebarProvider>,
    );

    expect(getByTestId("custom-swappable-toggle")).toBeTruthy();
    expect(getByTestId("custom-swappable-content")).toBeTruthy();
    expect(queryByTestId("icon-sidebar")).toBeFalsy();
    expect(queryByTestId("icon-sidebar-arrow")).toBeFalsy();
  });
});
