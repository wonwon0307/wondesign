import { render, renderHook } from "@testing-library/react";

import { useSidebarBody, useSidebarNav } from "@/contexts/body";
import { useSidebarItem } from "@/contexts/item";
import { useInternalSidebar, useSidebar } from "@/contexts/sidebar";
import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarItemWrapper } from "@/Item/fragments/Wrapper";
import { SidebarItemHeader } from "@/Item/fragments/Header";
import { SidebarLink } from "@/Item/fragments/Link";
import { SidebarItemSubitems } from "@/Item/fragments/Subitems";
import { SidebarItemToggle } from "@/Item/fragments/Toggle";
import { SidebarItemLink } from "@/Item/Item/ItemLink";

describe("Sidebar - corner cases", () => {
  it("useSidebar and useInternalSidebar throw when used outside of a SidebarProvider", () => {
    expect(() => renderHook(() => useSidebar())).toThrow(
      "[WonDesign Sidebar] useSidebar() must be used inside the Sidebar wrapper.",
    );
    expect(() => renderHook(() => useInternalSidebar())).toThrow(
      "[WonDesign Sidebar] useSidebar() must be used inside the Sidebar wrapper.",
    );
  });

  it("useSidebarNav throws an error when used outside of SidebarNav", () => {
    expect(() => renderHook(() => useSidebarNav())).toThrow(
      "[WonDesign Sidebar] SidebarItem components must be used inside SidebarNav.",
    );
  });

  it("useSidebarBody throws an error when used outside of SidebarBody", () => {
    expect(() => renderHook(() => useSidebarBody())).toThrow(
      "[WonDesign Sidebar] useSidebarBody() must be used inside SidebarBody.",
    );
  });

  it("useSidebarItem throws an error when used outside of SidebarItemWrapper", () => {
    expect(() => renderHook(() => useSidebarItem())).toThrow(
      "[WonDesign Sidebar] useSidebarItem() must be used inside a SidebarItemWrapper.",
    );
  });

  it("should warn in console and render nothing if item is not collapsible", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const { queryByTestId } = render(
      <SidebarProvider collapse="icons" isOpen={false}>
        <SidebarBody keepMounted>
          <SidebarNav>
            <SidebarItemWrapper variant="flat">
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

    expect(console.warn).toHaveBeenCalledWith(
      "[WonDesign Sidebar] Invalid usage of SidebarItemToggle. Use it when SidebarItem is collapsible.",
    );
    expect(queryByTestId("toggle")).toBeNull();

    vi.restoreAllMocks();
  });

  it("should not warn in console if production environment", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    render(
      <SidebarProvider collapse="icons" isOpen={false}>
        <SidebarBody keepMounted>
          <SidebarNav>
            <SidebarItemWrapper variant="flat">
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

    expect(console.warn).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
  });
});
