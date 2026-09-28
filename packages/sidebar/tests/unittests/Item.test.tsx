import { render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarItem } from "@/Item/Item/Item";
import { SidebarLink } from "@/Item/fragments/Link";

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
