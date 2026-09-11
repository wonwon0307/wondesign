import { render } from "@testing-library/react";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarItemWrapper } from "@/Item/fragments/Wrapper";
import { SidebarItemHeader } from "@/Item/fragments/Header";
import { SidebarLink } from "@/Item/fragments/Link";
import { SidebarItemSubitems } from "@/Item/fragments/Subitems";
import { SidebarItemToggle } from "@/Item/fragments/Toggle";
import { SidebarItemLink } from "@/Item/Item/ItemLink";

describe("SidebarItemLink", () => {
  it("should render custom SidebarItemLink correctly", () => {
    const testIcon = <span>Test Custom Icon</span>;
    const testRight = <span>Test Right</span>;
    const testActiveIcon = <span>Test Active Icon</span>;

    const { getByText } = render(
      <SidebarProvider isOpen>
        <SidebarBody keepMounted>
          <SidebarNav>
            <SidebarItemWrapper>
              <SidebarItemLink
                href="/item"
                label="Item"
                icon={testIcon}
                right={testRight}
              />
            </SidebarItemWrapper>
            <SidebarItemWrapper>
              <SidebarItemLink
                href="/item"
                label="Item"
                icon={testActiveIcon}
                isActive
              />
            </SidebarItemWrapper>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(getByText("Test Custom Icon")).toBeTruthy();
    expect(getByText("Test Right")).toBeTruthy();

    expect(getByText("Test Active Icon")).toBeTruthy();
  });

  it("should warn when icon is not provided, but sidebar is collapse-to-icon mode", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <SidebarProvider collapse="icons">
        <SidebarBody>
          <SidebarNav>
            <SidebarItemWrapper>
              <SidebarItemLink href="/item" label="Item" />
            </SidebarItemWrapper>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Sidebar] SidebarItem: 'icon' prop is required when sidebar collapse is 'icons'.",
    );
  });

  it("should render tooltip if sidebar is collapse-to-icon mode", () => {
    const { getByTestId } = render(
      <SidebarProvider collapse="icons" isOpen={false}>
        <SidebarBody keepMounted>
          <SidebarNav>
            <SidebarItemWrapper>
              <SidebarItemLink
                href="/item"
                label="Item"
                icon={<span>Test Icon</span>}
              />
            </SidebarItemWrapper>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    const tooltip = getByTestId("tooltip");
    expect(tooltip).toBeTruthy();
    expect(tooltip.dataset.placement).toBe("right");
  });

  it("should render tooltip on the left if sidebar side is right", () => {
    const { getByTestId } = render(
      <SidebarProvider collapse="icons" isOpen={false} side="right">
        <SidebarBody keepMounted>
          <SidebarNav>
            <SidebarItemWrapper>
              <SidebarItemLink
                href="/item"
                label="Item"
                icon={<span>Test Icon</span>}
              />
            </SidebarItemWrapper>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    const tooltip = getByTestId("tooltip");
    expect(tooltip).toBeTruthy();
    expect(tooltip.dataset.placement).toBe("left");
  });
});

describe("SidebarItemToggle", () => {
  it("should not render the toggle even if it has children when sidebar is not expanded", () => {
    const { queryByTestId } = render(
      <SidebarProvider collapse="icons" isOpen={false}>
        <SidebarBody keepMounted>
          <SidebarNav>
            <SidebarItemWrapper>
              <SidebarItemHeader>
                <SidebarLink href="/item">Item</SidebarLink>
              </SidebarItemHeader>
              <SidebarItemSubitems>
                <SidebarItemLink href="/item/child" label="Child Item" />
              </SidebarItemSubitems>
              <SidebarItemToggle data-testid="toggle" />
            </SidebarItemWrapper>
          </SidebarNav>
        </SidebarBody>
      </SidebarProvider>,
    );

    expect(queryByTestId("toggle")).toBeNull();
  });
});
