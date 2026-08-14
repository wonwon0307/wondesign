import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider, SidebarProviderProps } from "@/core";
import { Sidebar } from "@/Sidebar";
import { SidebarToggle } from "@/Toggle";

function TestComponent({ children, ...rest }: Readonly<SidebarProviderProps>) {
  return (
    <SidebarProvider {...rest}>
      <Sidebar data-testid="sidebar">{children}</Sidebar>
      <SidebarToggle data-testid="sidebar-toggle">Toggle</SidebarToggle>
    </SidebarProvider>
  );
}

describe("SidebarToggle", () => {
  it("renders and handles toggle correctly", () => {
    const { getByTestId } = render(
      <TestComponent>Sidebar Contents</TestComponent>,
    );

    const toggle = getByTestId("sidebar-toggle");
    const sidebar = getByTestId("sidebar");

    expect(sidebar.dataset.state).toBe("closed");

    fireEvent.click(toggle);
    expect(sidebar.dataset.state).toBe("expanded");

    fireEvent.click(toggle);
    expect(sidebar.dataset.state).toBe("closed");
  });

  it("handles keyboard shortkey and tooltip correctly", () => {
    const { getByTestId, getByText } = render(
      <TestComponent keyboardShortkey="Mod+B">Sidebar Contents</TestComponent>,
    );

    // check aria-keyshortcuts attribute
    expect(
      getByTestId("sidebar-toggle").getAttribute("aria-keyshortcuts"),
    ).toBe("Control+B");
    expect(getByTestId("tooltip-right")).toBeTruthy();

    // Check keyboard shortcut
    fireEvent.keyDown(document, { code: "KeyB", ctrlKey: true });
    const sidebar = getByTestId("sidebar");
    expect(sidebar.dataset.state).toBe("expanded");

    fireEvent.keyDown(document, { code: "KeyB", ctrlKey: true });
    expect(sidebar.dataset.state).toBe("closed");

    // Check tooltip content
    // no need to hover, because tooltip is mocked
    expect(getByText("Ctrl")).toBeTruthy();
    expect(getByText("B")).toBeTruthy();
  });

  it("renders tooltip correctly when side is right", () => {
    const { getByTestId } = render(
      <TestComponent keyboardShortkey="Mod+B" side="right">
        Sidebar Contents
      </TestComponent>,
    );

    expect(getByTestId("tooltip-left")).toBeTruthy();
  });

  it("doesn't render tooltip when keyboardShortkey is not set", () => {
    const { queryByText } = render(
      <TestComponent keyboardShortkey={null}>Sidebar Contents</TestComponent>,
    );

    // Coverage purpose
    expect(queryByText("Control+B")).toBeNull();
  });

  it("doesn't render tooltip when disableTooltip is true", () => {
    const { queryByText } = render(
      <SidebarProvider>
        <Sidebar data-testid="sidebar">Body</Sidebar>
        <SidebarToggle data-testid="sidebar-toggle" disableTooltip>
          Toggle
        </SidebarToggle>
      </SidebarProvider>,
    );

    // Coverage purpose
    expect(queryByText("Control+B")).toBeNull();
  });

  it("renders SidebarToggleIcon correctly", () => {
    const { getByTestId } = render(
      <SidebarProvider>
        <Sidebar data-testid="sidebar">Body</Sidebar>
        <SidebarToggle />
      </SidebarProvider>,
    );

    expect(getByTestId("icon-sidebar")).toBeTruthy();
    expect(getByTestId("icon-sidebar-arrow")).toBeTruthy();
  });
});
