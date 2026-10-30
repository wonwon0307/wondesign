import { fireEvent, render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarItem } from "@/Item/Item/Item";
import { SidebarGroup } from "@/Item/Group/Group";
import { SidebarSeparator } from "@/Item/Separator/Separator";
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

describe("SidebarSeparator", () => {
  it("renders inside a div when placed directly in SidebarNav", () => {
    const { getByTestId } = render(
      <SidebarProvider defaultOpen>
        <SidebarBody>
          <SidebarNav>
            <SidebarSeparator data-testid="separator" />
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    const wrapper = getByTestId("separator").parentElement;
    expect(wrapper?.tagName).toBe("DIV");
  });

  it("renders inside an li when placed in a SidebarGroup", () => {
    const { getByTestId } = render(
      <SidebarProvider defaultOpen>
        <SidebarBody>
          <SidebarNav>
            <SidebarGroup label="Group">
              <SidebarSeparator data-testid="separator" />
            </SidebarGroup>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    const wrapper = getByTestId("separator").parentElement;
    expect(wrapper?.tagName).toBe("LI");
  });

  it("hides the wrapper from screen readers only when decorative", () => {
    const { getByTestId } = render(
      <SidebarProvider defaultOpen>
        <SidebarBody>
          <SidebarNav>
            <SidebarSeparator data-testid="decorative" />
            <SidebarSeparator variant="theme-break" data-testid="theme-break" />
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    const decorative = getByTestId("decorative").parentElement;
    expect(decorative?.getAttribute("aria-hidden")).toBe("true");

    const themeBreak = getByTestId("theme-break").parentElement;
    expect(themeBreak?.getAttribute("aria-hidden")).toBeNull();
    expect(getByTestId("theme-break").getAttribute("role")).toBe("separator");
  });

  it("throws when used outside of SidebarNav", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() =>
      render(
        <SidebarProvider defaultOpen>
          <SidebarBody>
            <SidebarSeparator />
          </SidebarBody>
        </SidebarProvider>,
      ),
    ).toThrow(
      "[WonDesign Sidebar] SidebarItem components must be used inside SidebarNav.",
    );

    vi.restoreAllMocks();
  });
});
