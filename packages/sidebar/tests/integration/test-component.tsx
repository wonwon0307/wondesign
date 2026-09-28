import { type BindableShortkey } from "@wondesign/key-events/shortkey";

import { SidebarProvider } from "@/contexts/Provider";
import { SidebarBody } from "@/Body/Body";
import { SidebarNav } from "@/Nav/Nav";
import { SidebarHeader } from "@/Section/Header";
import { SidebarFooter } from "@/Section/Footer";
import { SidebarGroup } from "@/Item/Group/Group";
import { SidebarItem } from "@/Item/Item/Item";
import { SidebarToggle } from "@/Toggle/Toggle";

export function TestComponent({
  defaultOpen = false,
  collapse,
  keepMounted = false,
  shortkey = null,
  side = "left",
}: Readonly<{
  defaultOpen?: boolean;
  collapse?: "hide" | "icons" | "disable";
  keepMounted?: boolean;
  shortkey?: BindableShortkey | null;
  side?: "left" | "right";
}>) {
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      collapse={collapse}
      shortkey={shortkey}
      side={side}
    >
      <SidebarBody keepMounted={keepMounted} data-testid="body">
        <SidebarHeader>Header</SidebarHeader>
        <SidebarNav>
          <SidebarGroup label="Test Group" data-testid="test-group">
            <SidebarItem
              href="/grouped-item-1"
              label="Grouped Item 1"
              icon="test-icon"
              isActive
            />
            <SidebarItem
              href="/grouped-item-2"
              label="Grouped Item 2"
              icon="test-icon"
            />
          </SidebarGroup>
          <SidebarGroup
            label="Another Test Group"
            collapsedBehavior="flatten"
            data-testid="another-test-group"
          >
            <SidebarItem
              href="/another-grouped-item-1"
              label="Another Grouped Item 1"
              icon="test-icon"
            />
            <SidebarItem
              href="/another-grouped-item-2"
              label="Another Grouped Item 2"
              icon="test-icon"
            />
          </SidebarGroup>
          <SidebarItem href="/test-item" label="Test Item" icon="test-icon">
            <SidebarItem
              href="/nested-item-1"
              label="Nested Item 1"
              icon="test-icon"
            />
            <SidebarItem
              href="/nested-item-2"
              label="Nested Item 2"
              icon="test-icon"
            />
          </SidebarItem>
          <SidebarItem
            href="/test-item-2"
            label="Test Item 2"
            icon="test-icon"
            collapsedBehavior="flatten"
          >
            <SidebarItem
              href="/nested-item-3"
              label="Nested Item 3"
              icon="test-icon"
            />
            <SidebarItem
              href="/nested-item-4"
              label="Nested Item 4"
              icon="test-icon"
            />
          </SidebarItem>
        </SidebarNav>
        <SidebarFooter>Footer</SidebarFooter>
      </SidebarBody>
      <SidebarToggle data-testid="toggle" />
    </SidebarProvider>
  );
}
