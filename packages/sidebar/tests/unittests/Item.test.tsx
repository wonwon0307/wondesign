import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarItem } from "@/Item/Item/Item";
import { SidebarLink } from "@/Item/fragments/Link";
import { SidebarItemToggle } from "@/Item/fragments/Toggle";
import { SidebarToggle } from "@/Toggle/Toggle";

describe("SidebarItem - corner cases", () => {
  it("renders collapsed item tooltip on the left if sidebar is on the right", () => {
    const { getByTestId } = render(
      <SidebarProvider collapse="icons" side="right">
        <SidebarBody>
          <SidebarNav>
            <SidebarItem href="#" label="Item" icon="test-icon" />
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    const tooltip = getByTestId("tooltip");
    expect(tooltip).toBeTruthy();
    expect(tooltip.dataset.placement).toBe("left");
  });

  it("renders SidebarItemToggle correctly", () => {
    const { getByTestId } = render(
      <SidebarProvider defaultOpen>
        <SidebarBody>
          <SidebarNav>
            <SidebarItem
              href="#"
              label="Link"
              right={<SidebarItemToggle data-testid="sidebar-item-toggle" />}
              defaultOpen
            >
              <SidebarItem href="#child" label="Child Link" />
            </SidebarItem>
          </SidebarNav>
        </SidebarBody>
        <SidebarToggle data-testid="sidebar-toggle" />
      </SidebarProvider>,
    );

    const toggle = getByTestId("sidebar-item-toggle");
    expect(toggle).toBeTruthy();
    expect(toggle.dataset.state).toBe("open");

    fireEvent.click(toggle);
    expect(toggle.dataset.state).toBe("closed");
  });

  it("should warn on console if icon is not provided in collapse-to-icons mode", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <SidebarProvider collapse="icons">
        <SidebarBody>
          <SidebarNav>
            <SidebarLink href="#" label="Link" />
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "SidebarItem: 'icon' prop is required when sidebar collapse is 'icons'.",
      ),
    );

    vi.restoreAllMocks();
  });
});
